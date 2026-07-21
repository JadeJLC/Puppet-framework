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

## STORE - store.js

- Fonctions : createStore, setState, getState, subscribe

### createStore()

Fonction de gestion de la page par le framework. Crée une "bibliothèque" de fonctions qui seront utilisées par l'appli pour mettre à jour le contenu de la page

**_Prend en paramètre_**

- initialState{object} Toutes les données actuelles de la page

**_Renvoie_**

- La liste des fonctions créées par le store

**_Exemple d'appel initial_**

```js
const store = createStore({
  tasks: [],
  filter: "/",
});
```

### setState() - dépendante de createStore

Récupère les modifications suite à une action utilisateur et les stocke comme nouvel état de la page. Appelle toutes les fonctions nécessaires pour mettre à jour l'information dans le DOM. Les données existantes sont conservées, seules les clés passées en paramètre sont mises à jour.
**_Prend en paramètre_**

- newState{object} Les données rajoutées à la page (nouvel élément, url, etc)

**_Exemple_**

```js
    store.setState({ filter: "/active" }),
```

### getState() - dépendante de createStore

Renvoie l'état actuel de la page. Permet de récupérer des informations pour pouvoir ensuite agir dessus ou les afficher

**_Renvoie_**

- Les données actuelles de la page (tout ce qui peut être utilisé par l'app)

**_Exemple_**

```js
// Récupération du state
const state = store.getState();
// Agir sur ce que renvoie le state
const newVnode = createHTMLstructure(state.tasks, state.filter);
```

### subscribe() - dépendante de createStore

Ajoute une fonction à la liste des "fonctions à notifier". Ce sont les fonctions qui se relancent en cas de changement dans les données de la page (par exemple, une fonction de création d'élément aura besoin de mettre à jour l'affichage si certaines données ont changé)

**_Prend en paramètres_**

- func{function} Une fonction à ajouter à la liste, qui se lancera dans setState si une mise à jour est faite

**_ Exemple_**

```js
// La fonction renderList gère l'affichage d'une liste de tâches. Si une tâche est ajoutée, elle doit l'afficher à la suite des autres.
// On l'abonne aux mises à jour
store.subscribe(renderList);
```

## ROUTEUR - router.js

Fonctions : createRouter

### createRouter()

Crée un routeur fonctionnel adapté à une SPA : les urls attendus sont au format **/#/destination**. Analyse l'url de la page pour charger la route actuelle et coordonner l'affichage. Si aucune route ne correspond à l'url actuelle, la route "/" est chargée par défaut.

**_Prend en paramètres_**

- routes{object} Une liste de routes pour les accès à la page au format :

```js
    {
    "/destination": function
    }
```

**_Exemple_**

```js
const router = createRouter({
  "/": () => store.setState({ filter: "/" }),
  "/active": () => store.setState({ filter: "/active" }),
  "/completed": () => store.setState({ filter: "/completed" }),
});
```

## EVENTS - events.js

Fonctions : userAction

### userAction()

Gère les eventListener pour faciliter l'intégration sur les pages HTML et alléger la syntaxe de la page. Contrairement à addEventListener qui attache un listener
sur chaque élément individuellement, userAction place un seul listener sur le parent et détecte les actions sur ses enfants. Ça permet d'éviter la répétition de listeners lorsqu'on a beaucoup d'éléments similaires (comme une liste) ou un layout qui ajoute/supprime des éléments dynamiquement.

**_Prend en paramètre_**

- parent{HTMLElement} Élément parent sur lequel est placé l'event listener
- eventType{string} Type d'événement à écouter (click, keydown, etc)
- selector{string} id, class ou tag de l'élément sur lequel l'action doit être effectuée
- handler{func} Fonction à lancer si les conditions sont remplies

**_Exemple_**

```js
// Ajoute le listener sur l'élément "footer", lorsque l'utilisateur clique sur l'élément de class "clear-completed"
userAction(
  document.querySelector("footer"),
  "click",
  ".clear-completed",
  clearCompleted,
);
```

## Exemple concret

Un exemple d'application complète utilisant Puppet est disponible dans le dossier `todo-app/`. Il s'agit d'une implémentation du standard TodoMVC qui illustre l'utilisation combinée de toutes les fonctionnalités du framework.

Pour lancer l'exemple, ouvre `index.html` à la racine du projet dans un navigateur.
