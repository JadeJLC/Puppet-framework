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

export { addNewTask, updateTaskStatus };
