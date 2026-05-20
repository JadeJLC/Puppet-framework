import { createElement } from "../../monFramework/index.js";

function createToDoList(list) {
  const allTasks = [];
  if (list.length > 0) {
    list.forEach((task) => {
      const label = createElement("label", null, task.name);
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

      const item = createElement(
        "li",
        {
          class: task.completed ? "completed" : "",
          "data-testid": "todo-item",
        },
        wrapper,
      );
      allTasks.push(item);
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
