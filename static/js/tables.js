// (C) 2023 GoodData Corporation

$(document).ready(function () {
    const responsiveTables = function() {
        $(".table-responsive").each(function() {
            const wrapperWidth = $(this).width();
            const tableWidth = $(this).find("table").width();
            $(this).toggleClass("table-responsive__wide", tableWidth > wrapperWidth);
        });
    }

    $(".td-content table").wrap($("<div>").addClass("table-responsive")).wrap($("<div>").addClass("table-responsive__inner"));
    responsiveTables();
    $(window).on("resize", responsiveTables);

    // Vertical column in tables - wrap around span
    const verticalColumn = document.querySelector("tbody tr:first-child td[rowspan]:first-child");
    if (verticalColumn) {
        verticalColumn.innerHTML = `<span class="table-vertical__text">${verticalColumn.innerText}</span>`;
    }
});
