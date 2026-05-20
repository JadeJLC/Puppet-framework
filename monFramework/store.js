/**
 * Fonction de gestion de la page par le framework. Crée une "librairie" de fonctions qui seront utilisées par l'appli
 * @param {object} initialState Toutes les données actuelles de la page
 * @returns {Array} La liste des fonctions créées par le store
 */
function createStore(initialState) {
  const functionsToNotify = [];
  let currentState = initialState;

  function subscribe(func) {
    functionsToNotify.push(func);
  }

  function setState(newState) {
    currentState = { ...currentState, ...newState };
    functionsToNotify.forEach((func) => {
      func();
    });
  }

  function getState() {
    return currentState;
  }

  return { setState, getState, subscribe };
}

export { createStore };
