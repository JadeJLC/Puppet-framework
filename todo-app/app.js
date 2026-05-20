import {
  createRouter,
  createStore,
  createElement,
  renderElement,
  patchElement,
  userAction,
} from "../monFramework/index.js";
import { createFilters } from "./components/filters.js";
import { addNewTask, createForm } from "./components/form-add.js";
import { createToDoList } from "./components/main-page.js";

/**
 * Mise en place de l'état initial du site
 */
const store = createStore({
  tasks: [],
  filter: "/",
});
let oldVnode = null;
const container = document.getElementById("app");
init();

function init() {
  store.subscribe(renderList);
  renderList();
  createListeners();
}

/**
 * Objet contenant la liste de toutes les routes disponibles sur l'appli
 */
const router = createRouter({
  "/": () => store.setState({ filter: "/" }),
  "/active": () => store.setState({ filter: "/active" }),
  "/completed": () => store.setState({ filter: "/completed" }),
});

function renderList() {
  const state = store.getState();

  const newVnode = createMainPage(state.tasks, state.filter);

  if (oldVnode === null) {
    container.appendChild(renderElement(newVnode));
  } else {
    patchElement(oldVnode, newVnode, container.firstChild);
  }
  oldVnode = newVnode;
}

function createListeners() {
  userAction(
    document.querySelector("header"),
    "keydown",
    "#todo-input",
    (event) => {
      if (event.key === "Enter") {
        addNewTask(event.target.value);
        event.target.value = "";
      }
    },
  );
}

function createMainPage(list, currentFilter) {
  return createElement(
    "section",
    {
      class: "todoapp",
      id: "root",
    },
    createForm(),
    createToDoList(list),
    createFilters(list, currentFilter),
  );
}

export { store };
