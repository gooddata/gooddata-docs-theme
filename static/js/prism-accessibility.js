// (C) 2023 GoodData Corporation

(function ($) {
    $(document).ready(function () {
        setTimeout(function() {
            // Find all copy buttons
            $('.copy-to-clipboard-button').each(function() {
                var button = $(this);
                
                // Add ARIA attributes for better accessibility
                button.attr('aria-label', 'Copy code to clipboard');
                
                // Make the button focusable
                button.attr('tabindex', '0');
                
                // Add keyboard event listeners
                button.on('keydown', function(e) {
                    // Allow Escape key to dismiss the button
                    if (e.key === 'Escape') {
                        button.blur();
                        e.preventDefault();
                    }
                    
                    // Allow Enter or Space to activate the button
                    if (e.key === 'Enter' || e.key === ' ') {
                        button.click();
                        e.preventDefault();
                    }
                });
            });
            
            // Add global escape key handler for code blocks
            $(document).on('keydown', function(e) {
                if (e.key === 'Escape') {
                    // Find any focused copy buttons and blur them
                    $('.copy-to-clipboard-button:focus').blur();
                }
            });
            
            // Make the toolbar stay visible when tabbing into it
            $('div.code-toolbar > .toolbar').each(function() {
                var toolbar = $(this);
                
                toolbar.on('focusin', function() {
                    toolbar.css('opacity', '1');
                });
                
                toolbar.on('focusout', function(e) {
                    // Only hide if focus moved outside the toolbar
                    if (!$.contains(toolbar[0], e.relatedTarget)) {
                        toolbar.css('opacity', '');
                    }
                });
            });
        }, 500); // Wait 500ms for Prism to initialize
    });
})(jQuery); 