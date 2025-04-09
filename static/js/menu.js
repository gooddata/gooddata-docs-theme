// (C) 2023 GoodData Corporation

$(document).ready(function () {
    var menu = $(".gd-docs-menu"),
        menuActive = $(".gd-docs-menu-page.active");

    if(menuActive.length > 0) {
        menu.scrollTop(menuActive.offset().top - menu.offset().top - parseInt(menu.css("paddingTop")));
    }

    menu.removeClass("init");
    
    $(".gd-docs-menu-page__toggle-btn").on("click", function() {
        var $button = $(this);
        var sectionId = $button.attr("aria-controls");
        var $section = $("#" + sectionId);
        var isExpanded = $button.attr("aria-expanded") === "true";
        
        // Update button state
        $button.attr("aria-expanded", !isExpanded);
        $button.attr("aria-label", (isExpanded ? "Expand" : "Collapse") + " " + 
                                   $button.closest(".gd-docs-menu-page__title").find(".gd-docs-menu-page__link").text() + " section");
        
        // Fallback: if section not found by ID, look for the next sibling wrapper
        if ($section.length === 0) {
            $section = $button.closest(".gd-docs-menu-page__title").next(".gd-docs-menu-section-wrapper");
        }
        
        // Toggle expanded state
        $section.toggleClass("expanded");
    });
    
    $("#gd-docs-menu__mobile-trigger").on("click", function() {
        var $button = $(this);
        var isExpanded = $button.attr("aria-expanded") === "true";
        
        $button.attr("aria-expanded", !isExpanded);
    });
});