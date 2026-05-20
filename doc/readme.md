# Introduction

Puppet est un mini-framework conçu pour manipuler facilement le DOM et réduire le codage manuel du HTML. Il gère :

- La création et la mise à jour d'élément du DOM
- La réactivité en temps réel de l'affichage
- L'utilisation de plusieurs routes en /#/ pour les SPA
- Les événements

Toutes les fonctions peuvent être importée via puppet/index.js.

## DOM - dom.js

- Fonctions : createElement, renderElement, patchElement

### createElement()

Fabrique un "plan" d'élément HTML, sous forme d'objet. Permet d'imbriquer plusieurs éléments HTML avant de les afficher sur la page avec renderElement.

**_Prend en paramètres :_**

- tag{string}, le type d'élément HTML à créer (div, span, a, etc)
- attrs{object} La liste des attributs de l'élément (class, id, placeholder, etc) sous forme d'objet {class: "", id:""}
- children{...any} Tous les éventuels éléments enfants, sous forme d'objets pour les éléments HTML ou de string pour le textContent

**_Renvoie_**

- Un objet contenant toutes les informations pour créer l'élément HTML, sous ce format :

```js
    {
    tag: string,
    attrs: {},
    children: [],
    };
```

**_Exemple avec imbrication_**

```js
const container = createElement(
  "div",
  { class: "container" },
  "Insérez un texte ici",
);
const main = createElement("main", null, container);
```

Sortie :

```bash
 {
    tag:"main",
    attrs:{},
    children:[
        {tag:"div",attrs:{class:container},children:["Insérez un texte ici"]}
    ]
 }
```

### renderElement()

À partir d'un plan d'élément HTML (un objet créé par createElement), construit une structure HTML prête à l'emploi contenant tous les _children_ et les attributs. L'élément obtenu peut ensuite être ajouté au DOM.

**_Prend en paramètres_**

- vnode{object} un objet HTML créé par createElement

**_Renvoie_**

- Un élément HTML prêt à être intégré dans le DOM

**_Exemple_**

```js
const container = createElement(
  "div",
  { class: "container" },
  "Insérez un texte ici",
);

renderElement(container);
```

Sortie :

```html
Node :
<div class="container">Insérez un texte ici</div>
```

### patchElement()

Met à jour le DOM en fonction des modifications appliquées par des actions serveur ou utilisateur. Peut : supprimer un élément, modifier un élément, ajouter un élément.
Compare l'ancien et le nouveau vnode (l'objet pseudo-HTML) pour ne modifier que ce qui a changé dans le DOM, sans reconstruire toute la page.

**_Prend en paramètres_**

- oldVnode{object} La version actuelle de l'objet javascript lié à l'élément
- newVnode{object} La nouvelle version de l'objet javascript
- domElement{object} L'élément HTML lui-même (dans le DOM) qui sera modifié
- parentElement{object} L'élément parent du domElement, utilisé quand un nouvel élément doit être inséré
- index{int} L'emplacement de l'élément dans la hiérarchie (pour le traitement des _children_)

**_Exemple_**

```js
const oldVnode = container;
const newVnode = createElement(
  "h1",
  { class: "title" },
  "Insérer un titre ici",
);
patchElement(oldVnode, newVnode, container);
```

Sortie :

```html
Node supprimé :
<div class="container">Insérez un texte ici</div>

Remplacé par :
<h1 class="title">Insérez un titre ici</h1>
```

Store — createStore, setState, getState, subscribe
Router — createRouter
Events — userAction
Exemple complet — un mini exemple qui utilise tout
