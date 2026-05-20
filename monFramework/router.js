/**
 * Fonction pour la création d'un routeur fonctionnel à partir des routes de l'appli
 * @param {Object} routes Une liste de route contenant {lien:"/", fonction : func}
 */
function createRouter(routes) {
  function loadRoute() {
    const hashUrl = window.location.hash;
    const destination = hashUrl.replace("#", "") || "/";
    routes[destination]();
  }

  loadRoute();

  window.addEventListener("hashchange", () => {
    loadRoute();
  });
}

export { createRouter };
