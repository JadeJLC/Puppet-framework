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
  if (typeof vnode === "string") return document.createTextNode(vnode);

  if (!vnode.tag) return;
  const el = document.createElement(vnode.tag);

  for (const key in vnode.attrs) {
    el.setAttribute(key, vnode.attrs[key]);
  }

  vnode.children.forEach((child) => {
    if (typeof child === "string") {
      const node = document.createTextNode(child);
      el.appendChild(node);
    } else {
      el.appendChild(renderElement(child));
    }
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
    if (oldVnode.attrs[key] != newVnode.attrs[key]) {
      domElement.removeAttribute(key);
      domElement.setAttribute(key, newVnode.attrs[key]);
    }
  }

  for (const key in newVnode.attrs) {
    if (!oldVnode.attrs[key]) {
      domElement.setAttribute(key, newVnode[key]);
    }
  }

  const maxLength = Math.max(
    oldVnode.children.length,
    newVnode.children.length,
  );

  for (let i = 0; i < maxLength; i++) {
    patchElement(
      oldVnode.children[i],
      newVnode.children[i],
      domElement.childNodes[i],
      domElement,
      i,
    );
  }
}

export { createElement, renderElement, patchElement };
