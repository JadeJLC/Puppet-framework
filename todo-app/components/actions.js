import {
  createElement,
  renderElement,
  userAction,
} from "../../puppet/index.js";
import { store } from "../app.js";

let nextId = 1;
/**
 * Fonction pour ajouter une tâche à la liste
 * Enregistre la tâche dans le "state" pour que le DOM se mette à jour tout seul
 * @param {string} text Le nom de la tâche à ajouter
 */
function addNewTask(text) {
  const state = store.getState();
  const newTask = {
    id: nextId,
    text: text,
    completed: false,
  };
  store.setState({
    tasks: [...state.tasks, newTask],
  });

  nextId++;
}

function updateTaskStatus(event) {
  const state = store.getState();
  const id = Number(event.target.closest("[data-taskid]").dataset.taskid);

  const newTasks = state.tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  store.setState({ tasks: newTasks });
}

function deleteTask(event) {
  const state = store.getState();
  const id = Number(event.target.closest("[data-taskid]").dataset.taskid);

  const newTasks = state.tasks.filter((task) => task.id != id);

  store.setState({ tasks: newTasks });
}

function clearCompleted() {
  const state = store.getState();

  const newTasks = state.tasks.filter((task) => !task.completed);

  store.setState({ tasks: newTasks });
}

function markAllDone() {
  const state = store.getState();

  const newTasks = state.tasks.map((task) => {
    return { ...task, completed: true };
  });
  store.setState({ tasks: newTasks });
}

function markAllNew() {
  const state = store.getState();

  const newTasks = state.tasks.map((task) => {
    return { ...task, completed: false };
  });
  store.setState({ tasks: newTasks });
}

function startEdit(event) {
  const id = Number(event.target.closest("li").dataset.taskid);
  store.setState({ editingID: id });
}

function saveEdit(text, id) {
  const state = store.getState();

  const newTasks = state.tasks.map((task) => {
    if (task.id === id) {
      return { ...task, text: text };
    }
    return task;
  });

  store.setState({
    tasks: newTasks,
    editingID: null,
  });
}

function cancelEdit() {
  const state = store.getState();
  store.setState({
    editingID: null,
  });
}

export {
  addNewTask,
  updateTaskStatus,
  deleteTask,
  clearCompleted,
  markAllDone,
  markAllNew,
  startEdit,
  saveEdit,
  cancelEdit,
};
