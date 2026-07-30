import { createElement } from "../../puppet/index.js";

/**
 * Fonction de soutien pour créer chaque élément de la liste de tâches
 * @param {object} task Les données de la tâche à créer
 * @param {array} allTasks Le bloc contenant tous les objets de tâche de la liste
 */
function createListItem(task, allTasks, editingID) {
  const label =
    task.id === editingID
      ? createElement("input", {
          class: "edit",
          value: task.text,
          type: "text",
        })
      : createElement("label", { "data-testid": "todo-item-label" }, task.text);
  const checkBox = createElement("input", {
    class: "toggle",
    type: "checkbox",
    id: `task-${task.id}`,
    checked: task.completed,
  });
  const deleteBtn = createElement(
    "button",
    { class: "destroy", title: "Supprimer de la liste" },
    "✘",
  );
  const wrapper = createElement(
    "div",
    { class: "view" },
    checkBox,
    label,
    deleteBtn,
  );

  const item = createElement(
    "li",
    {
      key: task.id,
      class: task.completed ? "completed" : "",
      "data-testid": "todo-item",
      "data-taskid": task.id,
    },
    wrapper,
  );

  allTasks.push(item);
}

/**
 * Fonction de soutien pour créer le bouton "Marquer tout comme terminé"
 * @returns {object} L'objet contenant toutes les informations du bouton
 */
function createMarkAllButton() {
  const markAllDone = createElement("input", {
    class: "toggle-all",
    type: "checkbox",
    id: "toggle-all",
  });
  const markAllLabel = createElement(
    "label",
    {
      class: "toggle-all-label",
      for: "toggle-all",
    },
    "✔",
  );
  const markAllWrapper = createElement(
    "div",
    {
      class: "toggle-all-container",
    },
    markAllDone,
    markAllLabel,
  );
  return markAllWrapper;
}

/**
 * Fonction principale pour la conception de la section des tâches
 * Fabrique les données HTML et les renvoie pour le render dans app.js
 * @param {array} list Une liste d'objets où chaque objet contient une tâche
 * @returns {object} La base pour fabriquer la section HTML de la todolist
 */
function createToDoList(list, editingID) {
  const allTasks = [];
  if (list.length > 0) {
    list.forEach((task) => {
      createListItem(task, allTasks, editingID);
    });
  }

  const listContainer = createElement(
    "ul",
    {
      class: "todo-list",
      "data-testid": "todo-list",
    },
    ...allTasks,
  );

  const markAllWrapper = createMarkAllButton();

  const mainContainer = createElement(
    "main",
    {
      class: "main",
      "data-testid": "main",
    },
    markAllWrapper,
    listContainer,
  );

  return mainContainer;
}

export { createToDoList };
