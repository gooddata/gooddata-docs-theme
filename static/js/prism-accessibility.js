// (C) 2023 GoodData Corporation

(function ($) {
    $(document).ready(function () {
        // Set initial ARIA attributes and variables
        var $codeBlock = $('.code-toolbar');
        var $codeBlockToolBar = $('.toolbar');
        var $codeBlockContent = $('pre');
        var $accordionOptions = $('.accordion-options');
        var $defaultThreshold = 200;

        $codeBlock.attr('aria-expanded', 'false');

        // Find all copy buttons
        $('.copy-to-clipboard-button').each(function() {
            var button = $(this);
            
            // Add ARIA attributes for better accessibility
            button.attr('aria-label', 'Copy code to clipboard');
        });

        // Expand buttons and expand code block options
        $codeBlockToolBar.each(function() {
            var nearestCodeBlock = $(this).closest($codeBlock);
            var nearestCodeBlockContent = nearestCodeBlock.find($codeBlockContent);
            var nearestAccordionOptions = nearestCodeBlock.closest($accordionOptions);
            var threshold = nearestAccordionOptions.data('threshold') ? nearestAccordionOptions.data('threshold') : $defaultThreshold;

            var expandButton = $('<button class="expand-button">Expand</button>');
            if (nearestCodeBlockContent.outerHeight(true) > threshold && !nearestAccordionOptions.hasClass('accordion-options--not-collapsible')) {
                $(this).prepend(expandButton);
                nearestCodeBlock.css('max-height', threshold + 'px');
                nearestCodeBlock.addClass('overflowing');
                expandButton.attr('aria-label', 'Expand code block');
                expandButton.wrap('<div class="toolbar-item"></div>');
            }
        });

        var $expandButton = $('.expand-button');

        $expandButton.on('click', function() {
            var nearestCodeBlock = $(this).closest($codeBlock);
            var nearestCodeBlockContent = $(this).closest($codeBlock).find($codeBlockContent);
            var nearestAccordionOptions = nearestCodeBlock.closest($accordionOptions);
            var threshold = nearestAccordionOptions.data('threshold') ? nearestAccordionOptions.data('threshold') : $defaultThreshold;

            // Toggle expanded state
            nearestCodeBlock.toggleClass('expanded');
            nearestCodeBlock.attr('aria-expanded', nearestCodeBlock.hasClass('expanded'));
            $(this).attr('aria-expanded', nearestCodeBlock.hasClass('expanded'));
            $(this).attr('aria-label', nearestCodeBlock.hasClass('expanded') ? 'Collapse code block' : 'Expand code block');
            $(this).text(nearestCodeBlock.hasClass('expanded') ? 'Collapse' : 'Expand');
            $(this).toggleClass('expand-button--expanded');

            // Adjust max-height based on expanded state
            if (nearestCodeBlock.hasClass('expanded')) {
                nearestCodeBlock.css('max-height', nearestCodeBlockContent.outerHeight(true) + 'px');
            } else {
                nearestCodeBlock.css('max-height', threshold + 'px');
                $('html, body').animate({
                    scrollTop: nearestCodeBlock.offset().top - 300
                }, 300);
                nearestCodeBlockContent.animate({
                    scrollLeft: 0
                }, 300);
            }
        });

        // Add global escape key handler for code blocks
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                // Find any focused copy buttons and blur them
                $('.copy-to-clipboard-button:focus').blur();
            }
        });

        // Accessibility for buttons
        $codeBlockToolBar.find('button').each(function() {
            var button = $(this);

            button.attr('tabindex', '0');

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
    });
})(jQuery); 