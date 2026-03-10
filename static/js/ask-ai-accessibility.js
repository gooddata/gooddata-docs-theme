$(document).ready(function () {
  let isModalPresent = false;
  const $askAiButton = $("#ask-ai-button");

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
      enhanceModalAccessibility(shadowRoot);
    } else if (!exists && isModalPresent) {
      isModalPresent = false;
      $askAiButton.attr("aria-expanded", "false");
    }
  }

  function enhanceModalAccessibility(shadowRoot) {
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

    const backToTopSvg = shadowRoot.querySelector(".tabler-icon-arrow-up");
    if (backToTopSvg) {
      const backToTopButton = backToTopSvg.closest("button");
      if (backToTopButton && !backToTopButton.getAttribute("aria-label")) {
        backToTopButton.setAttribute("aria-label", "Back to top");
        if (!backToTopSvg.getAttribute("aria-hidden")) {
          backToTopSvg.setAttribute("aria-hidden", "true");
        }
      }
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
