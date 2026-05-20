import { createElement } from "../../puppet/index.js";

/**
 * Fonction pour la création du formulaire d'ajout de nouvelle tâche
 * Fabrique les données HTML et les renvoie pour le render dans app.js
 * @returns {object} L'objet de base du header qui sera transformé en élément HTML
 */
function createForm() {
  const input = createElement("input", {
    class: "new-todo",
    id: "todo-input",
    type: "text",
    "data-testid": "text-input",
    placeholder: "Ajouter une tâche",
  });
  const label = createElement("label", {
    class: "visually-hidden",
    for: "todo-input",
  });
  const container = createElement(
    "div",
    { class: "input-container" },
    input,
    label,
  );
  const title = createElement("h1", null, "Cozy To-do list");
  const header = createElement(
    "header",
    { class: "header", "data-testid": "header" },
    title,
    container,
  );

  return header;
}

export { createForm };
