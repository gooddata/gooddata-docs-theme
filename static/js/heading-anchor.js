// (C) 2023 GoodData Corporation

(function ($) {
    $(document).ready(function () {
        // Get all anchor links
        $('[data-anchor-link="true"]').each(function() {
            var link = $(this);
            
            // Handle keyboard navigation
            link.on("keydown", function(e) {
                // Allow Escape key to dismiss the anchor
                if (e.key === "Escape") {
                    link.blur();
                    e.preventDefault();
                }
                
                // Allow Enter or Space to activate the link
                if (e.key === "Enter" || e.key === " ") {
                    window.location.href = link.attr("href");
                    e.preventDefault();
                }
            });
        });
        
        // Add global escape key handler
        $(document).on("keydown", function(e) {
            if (e.key === "Escape") {
                // Find any focused anchor links and blur them
                $('[data-anchor-link="true"]:focus').blur();
            }
        });
    });
})(jQuery); 