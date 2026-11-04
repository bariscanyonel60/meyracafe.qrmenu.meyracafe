export const cacheGuardScript = `(function () {
  var RELOAD_KEY = "meyra-cache-reload";

  function textOf(value) {
    if (!value) return "";
    if (typeof value === "string") return value;
    if (value && value.message) return String(value.message);
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
          );
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
          );
        })
      );
    }
    return Promise.all(tasks).catch(function () {});
  }

  function hardReload() {
    try {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_KEY, "1");
    } catch (e) {
      return;
    }
    clearStores().finally(function () {
      window.location.reload();
    });
  }

  window.__meyraRecoverCache = hardReload;

  // Her girişte eski tarayıcı/SW önbelleğini sessizce temizle; sayfayı yenileme.
  clearStores();

  window.addEventListener(
    "error",
    function (event) {
      var target = event.target;
      if (target && target !== window && target.tagName === "SCRIPT") {
        var src = target.src || "";
        if (src.indexOf("/_next/") !== -1) hardReload();
        return;
      }
      if (isChunkFailure(event.message)) hardReload();
    },
    true
  );

  window.addEventListener("unhandledrejection", function (event) {
    if (isChunkFailure(event.reason)) hardReload();
  });

  // bfcache'den dönünce tek sefer taze yükle
  window.addEventListener("pageshow", function (event) {
    if (!event.persisted) return;
    try {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_KEY, "1");
    } catch (e) {
      return;
    }
    clearStores().finally(function () {
      window.location.reload();
    });
  });

  window.addEventListener("load", function () {
    try {
      sessionStorage.removeItem(RELOAD_KEY);
    } catch (e) {}
  });
})();
`;
