// (C) 2023 GoodData Corporation

$(document).ready(function () {
    // Side menu
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
    // Mobile header menu
    var $mobileMenuTrigger = $("#gd-header-mobile-menu-trigger-input");
    var $mobileMenuLabel = $("label[for='gd-header-mobile-menu-trigger-input']");
    var scrollPosition = 0; // Store scroll position

    // Function to toggle menu state
    function toggleMobileMenu() {
        var isChecked = $mobileMenuTrigger.is(":checked");
        
        // Update aria-expanded for accessibility
        $mobileMenuTrigger.attr("aria-expanded", isChecked);
        
        // Prevent body scrolling when menu is open
        if (isChecked) {
            // Save current scroll position
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            // Menu is open - disable body scroll and maintain position
            $("body").css({
                "overflow": "hidden",
                "position": "fixed",
                "top": -scrollPosition + "px",
                "width": "100%"
            });
            $mobileMenuTrigger.attr("aria-label", "Close navigation menu");
        } else {
            // Menu is closed - enable body scroll and restore position
            $("body").css({
                "overflow": "",
                "position": "",
                "top": "",
                "width": ""
            });
            $mobileMenuTrigger.attr("aria-label", "Open navigation menu");
            // Restore scroll position
            window.scrollTo(0, scrollPosition);
        }
    }

    $mobileMenuTrigger.on("change", toggleMobileMenu);
    $mobileMenuLabel.on("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            $mobileMenuTrigger.prop("checked", !$mobileMenuTrigger.prop("checked"));
            $mobileMenuTrigger.trigger("change");
        }
    });
    // TOC menu
    var $tocMenu = $("#TableOfContents");
    $tocMenu.attr("aria-label", "Table of contents");
});