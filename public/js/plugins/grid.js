define([
    'jquery',
], function() {
    function gridPlugin($grid) {

        this.highlightCheckedRows = function() {
            $grid.on('change', 'input[name^="ids"]', function() {
                var $checkbox = $(this);
                var $tr = $checkbox.closest('tr');
                if ($checkbox.is(':checked')) {
                    $tr.addClass('info');
                } else {
                    $tr.removeClass('info');
                }
            });

            return this;
        };

        this.highlightJustInserted = function($rowCells) {
            $rowCells = $rowCells || $('tbody tr:first td', $grid);

            $rowCells.css('background-color', 'yellow').animate({
                backgroundColor: 'transparent',
            }, 3000, function() {
                $(this).removeAttr('style');
            });

            return this;
        };

        var isAnyCheckboxChecked = function($form) {
            return $form.find('input[name^="ids"]:checked').length;
        };

        this.trackButtonsState = function($form) {
            $form = $form || $($grid).closest('form');

            function track($form) {
                $('*[type="button"]:disabled', $form)
                    .attr('disabled', !isAnyCheckboxChecked($form));
            }
            track($form);

            // track submit button(s) state
            $form.on('change', 'input[name^="ids"]', function() {
                track($form);
            });

            return this;
        };
    }

    return function($grid) {
        return new gridPlugin($grid);
    };
});