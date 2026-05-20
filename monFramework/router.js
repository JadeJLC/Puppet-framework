function createRouter(routes) {
  function loadRoute() {
    const hashUrl = window.location.hash;
    const destination = hashUrl.replace("#", "") || "/all";
    routes[destination]();
  }

  loadRoute();

  window.addEventListener("hashchange", () => {
    loadRoute();
  });
}

export { createRouter };
