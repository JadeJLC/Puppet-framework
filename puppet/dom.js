/**
 * Fonction pour créer un élément HTML
 * @param {string} tag Type d'élément HTML ('div', 'span', etc)
 * @param {object} attrs Attributs de l'élément ({class:, id:,} etc)
 * @param  {...any} children Tous les éventuels éléments enfants
 * @returns {object} Un objet contenant toutes les informations
 */
function createElement(tag, attrs, ...children) {
  return {
    tag: tag,
    attrs: attrs || {},
    children: children.filter((child) => child != null),
  };
}

/**
 * Transforme un objet en élément HTML exploitable
 * @param {object} vnode Les données de l'élément à afficher, créées dans createElement
 * @returns {HTMLElement} L'élément HTML prêt à être intégré dans le DOM
 */
function renderElement(vnode) {
  // 1. Handle string nodes (both plain text and <br> strings)
  if (typeof vnode === "string") {
    if (vnode.includes("<br>") || vnode.includes("<br/>")) {
      const contain = document.createElement("span");
      contain.innerHTML = vnode;
      return contain;
    }
    return document.createTextNode(vnode);
  }

  // 2. Handle component object nodes (Notice this is OUTSIDE the string check)
  if (!vnode.tag) return;
  const el = document.createElement(vnode.tag);

  for (const key in vnode.attrs) {
    if (key === "key") continue;
    if (key === "checked") {
      el.checked = vnode.attrs[key];
    } else {
      el.setAttribute(key, vnode.attrs[key]);
    }
  }

  vnode.children.forEach((child) => {
    // Delegate all child rendering to renderElement so <br> strings work inside children too
    el.appendChild(renderElement(child));
  });

  return el;
}

/**
 * Met à jour un élément HTML après modification
 * @param {object} oldVnode La version actuelle de l'objet javascript liée à l'élément
 * @param {object} newVnode La nouvelle version que l'on souhaite créer
 * @param {object} domElement L'élément HTML lui-même, sur la page (DOM) qui sera modifié
 * @param {int} index L'emplacement de l'élément dans la hiérarchie (pour le traitement des children)
 * @returns
 */
function patchElement(
  oldVnode,
  newVnode,
  domElement,
  parentElement,
  index = 0,
) {
  if (oldVnode === newVnode) return;
  if (!domElement && !newVnode) return;
  if (!domElement && newVnode) {
    parentElement.appendChild(renderElement(newVnode));
    return;
  }

  const parent = domElement.parentNode;

  if (!oldVnode || !newVnode) {
    domElement.remove();
    return;
  }

  if (typeof oldVnode === "string" && typeof newVnode === "string") {
    if (oldVnode != newVnode) {
      domElement.textContent = newVnode;
    }
    return;
  }

  if (oldVnode.tag != newVnode.tag) {
    parent.replaceChild(renderElement(newVnode), domElement);
    return;
  }

  for (const key in oldVnode.attrs) {
    if (key === "key") continue;
    if (!(key in newVnode.attrs)) {
      if (key === "checked") {
        domElement.checked = false;
      } else {
        domElement.removeAttribute(key);
      }
    }
  }

  for (const key in newVnode.attrs) {
    if (key === "key") continue;
    if (oldVnode.attrs[key] != newVnode.attrs[key]) {
      if (key === "checked") {
        domElement.checked = newVnode.attrs[key];
      } else {
        domElement.setAttribute(key, newVnode.attrs[key]);
      }
    }
  }

  patchChildren(oldVnode.children, newVnode.children, domElement);
}

/**
 * Fonction de soutien : associe un noeud DOM à une tâche précise (via sa clé),
 * plutôt qu'à une position dans la liste. Sans cela, quand un élément est
 * retiré ou déplacé, les noeuds DOM sont réutilisés pour la mauvaise tâche
 * (ex: une case à cocher déjà cochée nativement par le navigateur qui reste
 * cochée alors qu'elle représente maintenant une autre tâche, non terminée).
 * @param {array} oldChildren Les anciens enfants (vnodes)
 * @param {array} newChildren Les nouveaux enfants (vnodes)
 * @param {HTMLElement} domElement Le parent DOM contenant les enfants
 */
function patchChildren(oldChildren, newChildren, domElement) {
  const domChildren = Array.from(domElement.childNodes);

  const getKey = (vnode) =>
    vnode && typeof vnode === "object" && vnode.attrs
      ? vnode.attrs.key
      : undefined;

  const canUseKeys =
    oldChildren.length > 0 &&
    newChildren.length > 0 &&
    oldChildren.every((child) => getKey(child) != null) &&
    newChildren.every((child) => getKey(child) != null);

  if (!canUseKeys) {
    const maxLength = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLength; i++) {
      patchElement(oldChildren[i], newChildren[i], domChildren[i], domElement);
    }
    return;
  }

  const oldKeyToIndex = new Map();
  oldChildren.forEach((child, i) => oldKeyToIndex.set(getKey(child), i));

  const usedOldIndices = new Set();

  newChildren.forEach((newChild, newIndex) => {
    const oldIndex = oldKeyToIndex.get(getKey(newChild));
    let domNode;

    if (oldIndex !== undefined) {
      usedOldIndices.add(oldIndex);
      domNode = domChildren[oldIndex];
      patchElement(oldChildren[oldIndex], newChild, domNode, domElement);
    } else {
      domNode = renderElement(newChild);
    }

    const refNode = domElement.childNodes[newIndex] || null;
    if (refNode !== domNode) {
      domElement.insertBefore(domNode, refNode);
    }
  });

  oldChildren.forEach((child, i) => {
    if (!usedOldIndices.has(i)) {
      domChildren[i].remove();
    }
  });
}

export { createElement, renderElement, patchElement };
