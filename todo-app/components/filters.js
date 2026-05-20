import { createElement } from "../../monFramework/index.js";

// <footer class="footer" data-testid="footer">
//   <span class="todo-count">1 item left!</span>
//   <ul class="filters" data-testid="footer-navigation">
//     <li><a class="selected" href="#/">All</a></li>
//     <li><a class="" href="#/active">Active</a></li>
//     <li><a class="" href="#/completed">Completed</a></li>
//   </ul>
//   <button class="clear-completed">Clear completed</button>
// </footer>

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
