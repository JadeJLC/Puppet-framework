import { createElement } from "../../puppet/index.js";

/**
 * Fonction de soutien pour créer chaque élément de la liste de tâches
 * @param {object} task Les données de la tâche à créer
 * @param {array} allTasks Le bloc contenant tous les objets de tâche de la liste
 */
function createListItem(task, allTasks) {
  const label = createElement("label", null, task.text);
  const checkBox = createElement("input", {
    class: "toggle",
    type: "checkbox",
  });
  const deleteBtn = createElement("button", { class: "destroy" });
  const wrapper = createElement(
    "div",
    { class: "view" },
    checkBox,
    label,
    deleteBtn,
  );

  console.log("task :", task);
  const item = createElement(
    "li",
    {
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
  const markAllLabel = createElement("label", {
    class: "toggle-all-label",
    for: "toggle-all",
  });
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
function createToDoList(list) {
  const allTasks = [];
  if (list.length > 0) {
    list.forEach((task) => {
      createListItem(task, allTasks);
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
