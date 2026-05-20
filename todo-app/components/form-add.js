import { createElement } from "monFramework/index.js";

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
