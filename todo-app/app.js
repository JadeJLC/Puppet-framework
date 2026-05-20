import { createRouter, createStore } from "../monFramework/rindex.js";

/**
 * Mise en place de l'état initial du site
 */
const store = createStore({
  todos: [],
  filter: "/",
});

/**
 * Objet contenant la liste de toutes les routes disponibles sur l'appli
 */
const router = createRouter({
  "/active": displayTasksInProgress,
  "/todo": displayUnstartedTasks,
  "/completed": displayCompletedTasks,
  "/": displayAllTasks,
  "/all": displayAllTasks,
  "/clear": clearAllCompletedTasks,
  "/new": addNewTask,
});
