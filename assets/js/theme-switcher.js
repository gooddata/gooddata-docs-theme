// (C) 2026 GoodData Corporation

(function () {
  "use strict";

  var STORAGE_KEY = "gd-theme";
  var DARK_CLASS = "dark";
  var DATA_ATTR = "data-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }

  function applyTheme(theme) {
    var html = document.documentElement;
    if (theme === DARK_CLASS) {
      html.setAttribute(DATA_ATTR, DARK_CLASS);
    } else {
      html.removeAttribute(DATA_ATTR);
    }
  }

  function currentTheme() {
    return document.documentElement.getAttribute(DATA_ATTR) === DARK_CLASS
      ? DARK_CLASS
      : "light";
  }

  function wireButton() {
    var btn = document.getElementById("gd-theme-switcher");
    if (!btn) return;

    function updateAriaLabel(theme) {
      btn.setAttribute(
        "aria-label",
        theme === DARK_CLASS
          ? "Switch to light theme"
          : "Switch to dark theme"
      );
    }

    updateAriaLabel(currentTheme());

    btn.addEventListener("click", function () {
      var next = currentTheme() === DARK_CLASS ? "light" : DARK_CLASS;
      applyTheme(next);
      storeTheme(next);
      updateAriaLabel(next);
    });
  }

  // Wire up button after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wireButton);
  } else {
    wireButton();
  }

  // Sync with OS preference changes
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (!getStoredTheme()) {
        applyTheme(e.matches ? DARK_CLASS : "light");
        var btn = document.getElementById("gd-theme-switcher");
        if (btn) {
          btn.setAttribute(
            "aria-label",
            e.matches ? "Switch to light theme" : "Switch to dark theme"
          );
        }
      }
    });
  }
})();
