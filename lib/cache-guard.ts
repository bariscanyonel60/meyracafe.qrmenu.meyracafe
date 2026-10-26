export const cacheGuardScript = `(function () {
  var RELOAD_KEY = "meyra-cache-reload";

  function textOf(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (value.message) return String(value.message);
    return String(value);
  }

  function isChunkFailure(value) {
    var text = textOf(value);
    return (
      text.indexOf("ChunkLoadError") !== -1 ||
      text.indexOf("Loading chunk") !== -1 ||
      text.indexOf("Failed to fetch dynamically imported module") !== -1 ||
      text.indexOf("Importing a module script failed") !== -1 ||
      text.indexOf("error loading dynamically imported module") !== -1
    );
  }

  function clearStores() {
    var tasks = [];
    if ("serviceWorker" in navigator) {
      tasks.push(
        navigator.serviceWorker.getRegistrations().then(function (regs) {
          return Promise.all(
            regs.map(function (reg) {
              return reg.unregister();
            })
          ).then(function () {
            return regs.length > 0;
          });
        })
      );
    }
    if (window.caches && window.caches.keys) {
      tasks.push(
        window.caches.keys().then(function (keys) {
          return Promise.all(
            keys.map(function (key) {
              return window.caches.delete(key);
            })
          ).then(function () {
            return keys.length > 0;
          });
        })
      );
    }
    return Promise.all(tasks).then(function (flags) {
      return flags.some(Boolean);
    });
  }

  function stripNocache() {
    try {
      var current = new URL(window.location.href);
      if (!current.searchParams.has("nocache")) return;
      current.searchParams.delete("nocache");
      window.history.replaceState(null, "", current.pathname + current.search + current.hash);
    } catch (e) {}
  }

  function reloadFresh() {
    try {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_KEY, "1");
    } catch (e) {
      return;
    }
    clearStores().then(go).catch(go);
    function go() {
      var url = new URL(window.location.href);
      url.searchParams.set("nocache", String(Date.now()));
      window.location.replace(url.toString());
    }
  }

  window.__meyraRecoverCache = reloadFresh;

  window.addEventListener(
    "error",
    function (event) {
      var target = event.target;
      if (target && target !== window && target.tagName === "SCRIPT") {
        var src = target.src || "";
        if (src.indexOf("/_next/") !== -1) reloadFresh();
        return;
      }
      if (isChunkFailure(event.message)) reloadFresh();
    },
    true
  );

  window.addEventListener("unhandledrejection", function (event) {
    if (isChunkFailure(event.reason)) reloadFresh();
  });

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) reloadFresh();
  });

  clearStores()
    .then(function (hadStaleCache) {
      var meta = document.querySelector('meta[name="meyra-build"]');
      var buildId = meta ? meta.getAttribute("content") || "" : "";
      var previous = "";
      try {
        previous = localStorage.getItem("meyra-build") || "";
        if (buildId) localStorage.setItem("meyra-build", buildId);
      } catch (e) {}
      if (hadStaleCache || (previous && buildId && previous !== buildId)) {
        reloadFresh();
        return;
      }
      stripNocache();
    })
    .catch(function () {
      stripNocache();
    });
})();
`;
