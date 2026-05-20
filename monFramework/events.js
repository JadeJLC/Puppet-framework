/**
 * Mise en place des event listener pour le fonctionnement de l'appli
 * @param {HTMLElement} parent Élément parent sur lequel est placé l'event listener
 * @param {string} eventType Type d'événement à écouter (click, keydown, etc)
 * @param {string} selector id ou class de l'élément sur lequel l'action doit être effectuée
 * @param {func} handler Fonction à lancer si les conditions sont remplies
 */
function userAction(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (event) => {
    const targetClick = event.target.closest(selector);
    if (targetClick) handler(event);
  });
}

export { userAction };
