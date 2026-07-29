// (C) 2026 GoodData Corporation

$(document).ready(function () {
    const responsiveTable = function(wrapper) {
        if (wrapper.width() === 0) {
            return;
        }

        const hasClone = wrapper.find("table.restables-clone").length > 0;

        wrapper.removeClass("table-responsive--stacked");
        const table = wrapper.find("table").filter(":visible").first();
        const overflows = table.length > 0 &&
            (table[0].scrollWidth > table[0].clientWidth + 1 || table.width() > wrapper.width());

        if (hasClone) {
            wrapper.toggleClass("table-responsive--stacked", overflows);
        }

        const shown = wrapper.find("table").filter(":visible").first();
        const shownOverflows = shown.length > 0 &&
            (shown[0].scrollWidth > shown[0].clientWidth + 1 || shown.width() > wrapper.width());
        wrapper.toggleClass("table-responsive__wide", shownOverflows);
    };

    const responsiveTables = function() {
        $(".table-responsive").each(function() {
            responsiveTable($(this));
        });
    };

    $(".td-content table").wrap($("<div>").addClass("table-responsive")).wrap($("<div>").addClass("table-responsive__inner"));

    if ($.fn.resTables) {
        $(".td-content table").filter(function() {
            const table = $(this);

            if (table.hasClass("td-initial") ||
                table.find("table").length > 0 || table.parents("table").length > 0 ||
                table.find("[rowspan], [colspan]").length > 0) {
                return false;
            }

            const headerRows = table.find("thead tr");
            if (headerRows.length !== 1 || headerRows.find("td").length > 0) {
                return false;
            }
            const headerCount = headerRows.find("th").length;
            if (headerCount === 0) {
                return false;
            }

            const bodyRows = table.find("tbody tr");
            let regular = bodyRows.length > 0;
            bodyRows.each(function() {
                const row = $(this);
                if (row.find("th").length > 0 || row.find("td").length !== headerCount) {
                    regular = false;
                    return false;
                }
            });
            return regular;
        }).resTables();
    }

    responsiveTables();

    if (window.ResizeObserver) {
        const observer = new ResizeObserver(function(entries) {
            entries.forEach(function(entry) {
                const wrapper = $(entry.target);
                const width = entry.contentRect.width;
                if (wrapper.data("responsiveWidth") !== width) {
                    wrapper.data("responsiveWidth", width);
                    responsiveTable(wrapper);
                }
            });
        });
        $(".table-responsive").each(function() {
            observer.observe(this);
        });
    } else {
        $(window).on("resize", responsiveTables);
    }

    // Vertical column in tables - wrap around span
    const verticalColumn = document.querySelector("tbody tr:first-child td[rowspan]:first-child");
    if (verticalColumn) {
        verticalColumn.innerHTML = `<span class="table-vertical__text">${verticalColumn.innerText}</span>`;
    }
});
