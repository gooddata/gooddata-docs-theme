$(document).ready(function () {
  let isModalPresent = false;
  const $askAiButton = $("#ask-ai-button");
  const observedShadowRoots = new WeakSet();

  function updateModalState() {
    const $kapaContainer = $("#kapa-widget-container");

    if (!$kapaContainer.length || !$kapaContainer[0].shadowRoot) {
      return;
    }

    const shadowRoot = $kapaContainer[0].shadowRoot;
    const modalElement = shadowRoot.getElementById("kapa-modal-content");
    const exists = !!modalElement;

    if (exists && !isModalPresent) {
      isModalPresent = true;
      $askAiButton.attr("aria-expanded", "true");
      $askAiButton.attr("aria-controls", "kapa-modal-content");
      enhanceModalAccessibility(shadowRoot);
    } else if (!exists && isModalPresent) {
      isModalPresent = false;
      $askAiButton.attr("aria-expanded", "false");
      $askAiButton.removeAttr("aria-controls");
    }
  }

  function setupAnswerButtonsAccessibility(shadowRoot) {
    const buttons = shadowRoot.querySelectorAll("button.mantine-Button-root");
    if (!buttons.length) return;

    buttons.forEach((button) => {
      if (button.hasAttribute("data-button-a11y-setup")) return;

      const buttonText = button.textContent.trim();
      const actionTypes = ["Good answer", "Bad answer", "New chat", "Copy"];

      if (!actionTypes.some(text => buttonText.includes(text))) return;

      button.setAttribute("data-button-a11y-setup", "true");

      if (!button.getAttribute("aria-label")) {
        button.setAttribute("aria-label", buttonText);
      }

      const icon = button.querySelector("svg");
      if (icon) {
        icon.setAttribute("role", "img");
        icon.setAttribute("aria-label", buttonText);
        icon.setAttribute("aria-hidden", "true");
      }

      button.addEventListener("click", function () {
        setTimeout(() => {
          const popup = shadowRoot.querySelector(".mantine-Popover-dropdown");
          if (popup) {
            popup.focus();
          }
        }, 50);
      });

      button.setAttribute("data-button-style-applied", "true");
    });

    // Watch for dynamically added buttons
    if (!observedShadowRoots.has(shadowRoot)) {
      observedShadowRoots.add(shadowRoot);

      const answerButtonsObserver = new MutationObserver(() => {
        setupAnswerButtonsAccessibility(shadowRoot);
        setupRecaptchaAccessibility(shadowRoot);
      });

      answerButtonsObserver.observe(shadowRoot, {
        childList: true,
        subtree: true
      });
    }
  }

  function setupRecaptchaAccessibility(shadowRoot) {
    const recaptchaLink = Array.from(shadowRoot.querySelectorAll("a")).find(a => a.textContent.trim() === "reCAPTCHA");

    if (!recaptchaLink) {
      return;
    }

    if (recaptchaLink.hasAttribute("data-recaptcha-a11y-setup")) {
      return;
    }

    recaptchaLink.setAttribute("data-recaptcha-a11y-setup", "true");

    // Set proper button semantics since it opens a dialog
    recaptchaLink.setAttribute("role", "button");

    // Set accessible name
    if (!recaptchaLink.getAttribute("aria-label")) {
      recaptchaLink.setAttribute("aria-label", "Protected by reCAPTCHA");
    }

    // Make keyboard accessible
    if (!recaptchaLink.hasAttribute("tabindex")) {
      recaptchaLink.setAttribute("tabindex", "0");
    }

    // Setup reCAPTCHA dialog accessibility
    recaptchaLink.addEventListener("click", function () {
      recaptchaLink.setAttribute("aria-expanded", "true");

      setTimeout(() => {
        const dialog = shadowRoot.querySelector(".mantine-Popover-dropdown[role='dialog']");
        if (dialog) {
          const dialogText = dialog.querySelector("p");
          if (dialogText && !dialogText.id) {
            dialogText.id = "recaptcha-dialog-description";
          }

          if (!dialog.getAttribute("aria-label")) {
            dialog.setAttribute("aria-label", "reCAPTCHA information");
          }

          if (dialogText && dialogText.id) {
            dialog.setAttribute("aria-describedby", dialogText.id);
          }

          dialog.setAttribute("aria-modal", "true");
          dialog.focus();
        }
      }, 100);
    });

    // Handle dialog close to update aria-expanded
    const closeObserver = new MutationObserver(() => {
      const dialog = shadowRoot.querySelector(".mantine-Popover-dropdown[role='dialog']");
      if (!dialog) {
        recaptchaLink.setAttribute("aria-expanded", "false");
      }
    });

    closeObserver.observe(shadowRoot, {
      childList: true,
      subtree: true
    });
  }

  function setupDeepThinkingButtonAccessibility(shadowRoot) {
    const deepThinkingIcon = shadowRoot.querySelector(".tabler-icon-file-search");
    if (!deepThinkingIcon) return;

    const deepThinkingButton = deepThinkingIcon.closest("button");
    if (!deepThinkingButton || deepThinkingButton.hasAttribute("data-dt-setup")) return;

    deepThinkingButton.setAttribute("data-dt-setup", "true");

    deepThinkingButton.removeAttribute("aria-haspopup");
    deepThinkingButton.removeAttribute("aria-expanded");
    deepThinkingButton.removeAttribute("aria-controls");

    deepThinkingButton.setAttribute("aria-pressed", "false");
    deepThinkingButton.setAttribute("aria-label", "Deep thinking off");

    // Inject styles for better state indication beyond color
    if (!shadowRoot.getElementById("deep-thinking-styles")) {
      const style = document.createElement("style");
      style.id = "deep-thinking-styles";
      style.textContent = `
        button[aria-pressed="true"] .tabler-icon-file-search {
          stroke-width: 2.5;
        }
        button[aria-pressed="true"] {
          box-shadow: inset 0 0 0 1px currentColor, 0 0 0 2px currentColor;
        }
      `;
      shadowRoot.appendChild(style);
    }

    let isPressed = false;

    deepThinkingButton.addEventListener("click", function (e) {
      setTimeout(() => {
        isPressed = !isPressed;
        deepThinkingButton.setAttribute("aria-pressed", isPressed ? "true" : "false");
        deepThinkingButton.setAttribute("aria-label", isPressed ? "Deep thinking on" : "Deep thinking off");
      }, 50);
    });

    // Monitor popover appearance and attribute changes
    const buttonObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const popoverDropdown = shadowRoot.querySelector(".mantine-Popover-dropdown");
          if (popoverDropdown && popoverDropdown.id) {
            deepThinkingButton.setAttribute("aria-describedby", popoverDropdown.id);
          } else if (!popoverDropdown) {
            deepThinkingButton.removeAttribute("aria-describedby");
          }
          setupAnswerButtonsAccessibility(shadowRoot);
          const kpaInput = shadowRoot.querySelector("#kapa-ask-ai-input");
          if (kpaInput && !kpaInput.hasAttribute("aria-label")) {
            kpaInput.setAttribute("aria-label", "Ask me a question about GoodData");
            kpaInput.setAttribute("autocomplete", "off");
          }
        } else if (mutation.type === "attributes") {
          if (deepThinkingButton.hasAttribute("aria-expanded")) {
            deepThinkingButton.removeAttribute("aria-expanded");
          }
          if (deepThinkingButton.hasAttribute("aria-haspopup")) {
            deepThinkingButton.removeAttribute("aria-haspopup");
          }
          if (deepThinkingButton.hasAttribute("aria-controls")) {
            deepThinkingButton.removeAttribute("aria-controls");
          }
        }
      });
    });

    buttonObserver.observe(shadowRoot, {
      childList: true,
      subtree: true
    });

    buttonObserver.observe(deepThinkingButton, {
      attributes: true,
      attributeFilter: ["class", "aria-expanded", "aria-haspopup", "aria-controls"]
    });
  }

  function enhanceModalAccessibility(shadowRoot) {
    // Style close button
    const closeButton = shadowRoot.querySelector(".mantine-Modal-close");
    if (closeButton && !closeButton.getAttribute("aria-label")) {
      closeButton.setAttribute("aria-label", "Close");
    }

    if (closeButton) {
      const svg = closeButton.querySelector("svg");
      if (svg && !svg.getAttribute("aria-hidden")) {
        svg.setAttribute("aria-hidden", "true");
      }
    }

    // Style send message button (up arrow icon)
    const backToTopSvg = shadowRoot.querySelector(".tabler-icon-arrow-up");
    if (backToTopSvg) {
      const backToTopButton = backToTopSvg.closest("button");
      if (backToTopButton && !backToTopButton.getAttribute("aria-label")) {
        backToTopButton.setAttribute("aria-label", "Send message");
        if (!backToTopSvg.getAttribute("aria-hidden")) {
          backToTopSvg.setAttribute("aria-hidden", "true");
        }
      }
    }

    setupDeepThinkingButtonAccessibility(shadowRoot);
    setupAnswerButtonsAccessibility(shadowRoot);
    setupRecaptchaAccessibility(shadowRoot);

    // Fix input accessibility
    const kpaInput = shadowRoot.querySelector("#kapa-ask-ai-input");
    if (kpaInput) {
      kpaInput.setAttribute("aria-label", "Ask me a question about GoodData");
      kpaInput.setAttribute("autocomplete", "off");
    }
  }

  setTimeout(function () {
    const $kapaContainer = $("#kapa-widget-container");

    if ($kapaContainer.length && $kapaContainer[0].shadowRoot) {
      $askAiButton.attr("aria-expanded", "false");
      updateModalState();

      const observer = new MutationObserver(updateModalState);
      observer.observe($kapaContainer[0].shadowRoot, {
        childList: true,
        subtree: true,
      });
    }
  }, 700);
});

