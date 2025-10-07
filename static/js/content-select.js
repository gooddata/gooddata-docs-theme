// (C) 2023 GoodData Corporation

(function ($) {
    $(document).ready(function () {
        // Code needed to load the hidden content blocks for the prism-accessibility.js to apply to the code blocks in them
        $(".gd-docs-content__block").each(function(index) {
            if (index > 0) {
                $(this).css({
                    "display": "block",
                    "position": "absolute",
                    "opacity": 0,
                });
            }
        });

        setTimeout(function() {
            $(".gd-docs-content__block").each(function(index) {
                if (index > 0) {
                    $(this).css({
                        "display": "",
                        "position": "",
                        "opacity": "",
                    });
                }
            });
        }, 100);

        // Set up tab click behavior
        $(".gd-docs-content-select__tab").on("click", setActive);

        // Set up keyboard navigation
        $(".gd-docs-content-select__tab").on("keydown", handleKeydown);

        // Set up unique ids and aria attributes
        $(".gd-docs-content-select").each(function(index) {
            $(this).find(".gd-docs-content-select__tabs").children().each(function(tabIndex) {
                $(this).attr("id", "tab-" + (index + 1) + "-" + (tabIndex + 1));
                $(this).attr("aria-controls", "panel-" + (index + 1) + "-" + (tabIndex + 1));
                $(this).attr("data-content", "panel-" + (index + 1) + "-" + (tabIndex + 1));
            });
            $(this).find(".gd-docs-content__block").each(function(panelIndex) {
                $(this).attr("aria-labelledby", "tab-" + (index + 1) + "-" + (panelIndex + 1));
                $(this).attr("id", "panel-" + (index + 1) + "-" + (panelIndex + 1));
                $(this).addClass("content-panel-" + (index + 1) + "-" + (panelIndex + 1));
            });
        });
    });

    var setActive = function() {
        if(!$(this).hasClass("active")) {
            // Update tabs
            $(this).siblings()
                .removeClass("active")
                .attr("aria-selected", "false");

            $(this)
                .addClass("active")
                .attr("aria-selected", "true");

            // Update panels
            var contentId = $(this).data("content");
            var tabContainer = $(this).parent().parent();

            tabContainer
                .find(".gd-docs-content__block")
                .removeClass("active")
                .filter(".content-" + contentId)
                .addClass("active");
        }
    };

    var handleKeydown = function(e) {
        var $tabs = $(this).parent().find(".gd-docs-content-select__tab");
        var index = $tabs.index(this);
        var newIndex;

        switch(e.which) {
            // Left arrow
            case 37:
                newIndex = index - 1;
                if (newIndex < 0) newIndex = $tabs.length - 1;
                e.preventDefault();
                $tabs.eq(newIndex).focus().click();
                break;

            // Right arrow
            case 39:
                newIndex = index + 1;
                if (newIndex >= $tabs.length) newIndex = 0;
                e.preventDefault();
                $tabs.eq(newIndex).focus().click();
                break;

            // Home
            case 36:
                e.preventDefault();
                $tabs.eq(0).focus().click();
                break;

            // End
            case 35:
                e.preventDefault();
                $tabs.eq($tabs.length - 1).focus().click();
                break;
        }
    };
}(jQuery));