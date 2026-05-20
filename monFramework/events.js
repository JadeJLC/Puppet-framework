function userAction(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (event) => {
    const targetClick = event.target.closest(selector);
    if (targetClick) handler(event);
  });
}

export { userAction };
