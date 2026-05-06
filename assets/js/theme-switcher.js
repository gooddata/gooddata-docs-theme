// (C) 2025 GoodData Corporation
// Theme switcher — light / dark preference with localStorage persistence
// and respect for the OS prefers-color-scheme media query.
//
// This script is split in two parts:
//   1. A tiny inline snippet (injected into <head> via Hugo) that applies the
//      stored / OS theme *before* first paint to prevent FOUC.
//   2. The interactive toggle wired to #gd-theme-switcher once the DOM loads.
//
// Only part 2 lives in this file.  Part 1 is a separate <script> block in
// layouts/partials/theme-init.html (rendered as an inline script).

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

  // Sync with OS preference changes (e.g. the user toggles system dark mode
  // while the page is open) — only if they haven't made an explicit choice.
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
