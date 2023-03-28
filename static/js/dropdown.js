// (C) 2023 GoodData Corporation

$(window).click(function(event) {
    $(".gd-docs-dropdown-trigger").each(function(index, element) {
        if(element.parentElement !== event.target.parentElement) {
            $(element).prop("checked", false);
        }
    });
});