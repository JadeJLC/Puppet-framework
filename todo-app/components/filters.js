import { createElement } from "../../puppet/index.js";

/**
 * Fonction de soutien pour créer le HTML du footer
 * @param {int} todoCount Nombre de tâches restantes à faire
 * @param {array} buttons Liste des boutons de filtre à créer
 * @returns {object} Les bases de l'élément HTML du footer pour le rendu
 */
function buildFooter(todoCount, buttons) {
  const items = [];

  for (let i = 0; i < 3; i++) {
    const item = createElement("li", null, buttons[i]);
    items.push(item);
  }

  const btnWrapper = createElement(
    "ul",
    { class: "filters", "data-testid": "footer-navigation" },
    ...items,
  );

  const clearBtn = createElement(
    "button",
    { class: "clear-completed" },
    "Retirer les tâches terminées",
  );

  const counter = createElement(
    "span",
    { class: "todo-count" },
    `Encore ${todoCount} tâches à finir !`,
  );

  const container = createElement(
    "footer",
    { class: "footer", "data-testid": "footer" },
    counter,
    btnWrapper,
    clearBtn,
  );

  return container;
}

/**
 * Fonction pour créer les différents filtres de la page
 * Fabrique les données HTML et les renvoie pour le render dans app.js
 * @param {array} list Liste des tâches disponibles
 * @param {string} currentFilter Filtre actuellement actif
 * @returns {object} Le footer créé à partir des informations de filtre
 */
function createFilters(list, currentFilter) {
  const completed = list.filter((task) => task.completed);
  const todo = list.filter((task) => !task.completed);

  const buttons = [
    createElement(
      "a",
      { href: "#/", class: currentFilter === "/" ? "selected" : "" },
      "Toutes",
    ),
    createElement(
      "a",
      {
        href: "#/active",
        class: currentFilter === "/active" ? "selected" : "",
      },
      "En cours",
    ),
    createElement(
      "a",
      {
        href: "#/completed",
        class: currentFilter === "/completed" ? "selected" : "",
      },
      "Terminées",
    ),
  ];

  return buildFooter(todo.length, buttons);
}

export { createFilters };
