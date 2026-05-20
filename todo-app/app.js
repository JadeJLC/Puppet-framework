import {
  createRouter,
  createStore,
  createElement,
  renderElement,
  patchElement,
  userAction,
} from "../puppet/index.js";
import { createFilters } from "./components/filters.js";
import { createForm } from "./components/form-add.js";
import { createToDoList } from "./components/main-page.js";
import {
  updateTaskStatus,
  addNewTask,
  deleteTask,
  clearCompleted,
} from "./components/actions.js";

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

  const newVnode = createHTMLstructure(state.tasks, state.filter);

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

  userAction(
    document.querySelector("main ul.todo-list"),
    "click",
    ".toggle",
    updateTaskStatus,
  );

  userAction(
    document.querySelector("main ul.todo-list"),
    "click",
    ".destroy",
    deleteTask,
  );

  userAction(
    document.querySelector("footer"),
    "click",
    ".clear-completed",
    clearCompleted,
  );
}

function createHTMLstructure(list, currentFilter) {
  let filteredList = list;

  if (currentFilter === "/active") {
    filteredList = list.filter((task) => !task.completed);
  } else if (currentFilter === "/completed") {
    filteredList = list.filter((task) => task.completed);
  }

  return createElement(
    "section",
    {
      class: "todoapp",
      id: "root",
    },
    createForm(),
    createToDoList(filteredList),
    createFilters(list, currentFilter),
  );
}

export { store };
