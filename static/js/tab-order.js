$(document).ready(function () {
    // mobile menu trigger
    const mobileTrigger = $("#gd-header-mobile-menu-trigger-input");
    // sidebar trigger
    const sideTrigger = $("#gd-docs-menu__mobile-trigger");

    // Initial check
    if (mobileTrigger.attr('aria-expanded') === 'false') {
        sideTrigger.attr('tabindex', 6)
    }

    // Function to handle aria-expanded changes
    function handleAriaExpandedChange(element, isExpanded) {
        const elementId = element.attr('id');

        if (elementId === 'gd-header-mobile-menu-trigger-input') {
            // Mobile menu trigger logic
            if (isExpanded) {
                sideTrigger.removeAttr('tabindex');
            } else {
                sideTrigger.attr('tabindex', 6);
            }
        } else if (elementId === 'gd-docs-menu__mobile-trigger') {
            // Sidebar trigger logic
            if (isExpanded) {
                sideTrigger.removeAttr('tabindex');
            } else {
                sideTrigger.attr('tabindex', 6);
            }
        }
    }

    // Create observer for both elements
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'aria-expanded') {
                const $target = $(mutation.target);
                const isExpanded = $target.attr('aria-expanded') === 'true';
                handleAriaExpandedChange($target, isExpanded);
            }
        });
    });

    // Observe mobile trigger
    if (mobileTrigger.length > 0) {
        observer.observe(mobileTrigger[0], {
            attributes: true,
            attributeFilter: ['aria-expanded']
        });
    }

    // Observe sidebar trigger
    if (sideTrigger.length > 0) {
        observer.observe(sideTrigger[0], {
            attributes: true,
            attributeFilter: ['aria-expanded']
        });
    }
});