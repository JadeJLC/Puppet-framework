import { createRouter, createStore } from "../monFramework/rindex.js";

const store = createStore({
  todos: [],
  filter: "/",
});

const router = createRouter({
  "/active": displayTasksInProgress,
  "/todo": displayUnstartedTasks,
  "/completed": displayCompletedTasks,
  "/": displayAllTasks,
  "/all": displayAllTasks,
  "/clear": clearAllCompletedTasks,
  "/new": addNewTask,
});
