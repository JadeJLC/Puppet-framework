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
