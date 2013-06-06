define([
    'async',
    'mappers/foodstuff',
    'plugins/pagination',
    'plugins/grid',
    'text!/templates/foodstuff.tpl',
    'text!/templates/foodstuff/form.tpl',
    'text!/templates/foodstuff/list.tpl',
    'text!/templates/foodstuff/list/row.tpl',
    'backbone',
], function(async, foodstuffMapper, paginationPlugin, gridPlugin,
    foodStuffTpl, foodStuffFormTpl, foodStuffListTpl, foodStuffListRowTpl) {

    var renderList = function(data, currentPage, perPage) {
        var rows = [];
        _.each(data.items, function(item) {
            rows.push(_.template(foodStuffListRowTpl, {item: item}));
        });

//        var pagination = paginationPlugin
//            .render(data.total, currentPage, perPage, 'foodstuff/');

        return _.template(foodStuffListTpl, {
            rows: rows,
//            pagination: pagination,
        });
    };

    var renderForm = function(values, errors) {
        var data = {
            values: values,
            errors: errors,
        };
        return _.template(foodStuffFormTpl, data);
    }

    var autosuggestName = function(term, callback) {
        foodstuffMapper.search(term, function(response) {
            if (!response.RES_STATUS) {
                console.error(response.RES_ERROR_DESC);
                return;
            }

            var data = _.pluck(response.RES_DATA.items, 'name');
            callback(data);
        });
    };

    var onFoodStuffFilterValueChange = function(event) {
        var view = this;
        var term = $(event.target).val();

        var callback = function(response) {
            if (!response.RES_STATUS) {
                console.error(response.RES_ERROR_DESC);
                return;
            }

            var rows = [];
            _.each(response.RES_DATA.items, function(item) {
                rows.push(_.template(foodStuffListRowTpl,
                    {item: item}));
            });
            view.dom.grid.find('tbody').html(rows);
        };

        if (term) {
            foodstuffMapper.search(term, callback);
        } else {
            foodstuffMapper.getAll(0, callback);
        }
    };

    var onSubmitFoodstuffForm = function(event) {
        event.preventDefault();
        var view = this;

        var data = $(event.target).serializeObject();
        var callback = function(response, request) {
            if (response.RES_STATUS) {
                onResetFoodstuffForm.apply(view);

                var data = response.RES_DATA;
                var compiled = _.template(foodStuffListRowTpl, data);

                // either replace row or append new one
                if (request.REQ_PARAMS.id) {
                    view.dom.grid.find('tr[data-id="' + data.item._id + '"]')
                        .replaceWith(compiled);
                } else {
                    view.dom.grid.find('tbody').prepend(compiled);
                }

                var $rowCells = view.dom.grid
                    .find('tr[data-id="' + data.item._id + '"] td');
                gridPlugin(view.dom.grid).highlightJustInserted($rowCells);
            } else {
                // render form errors
                var compiled = renderForm(request.REQ_PARAMS,
                    response.RES_ERRORS);
                view.$el.find('form[name="add-foodstuff"]').html(compiled);
            }
        };

        if (data.id) {
            foodstuffMapper.put(data, callback);
        } else {
            foodstuffMapper.post(data, callback);
        }
    };

    var onResetFoodstuffForm = function() {
        var values = {per_gramm: 100}
        , errors = {};
        var compiled = renderForm(values, errors);
        this.$el.find('#add-foodstuff-form').html(compiled);

        $('#add-foodstuff-form input[name="name"]').typeahead({
            source: autosuggestName,
        });
    };

    var onDeleteFoodstuffs = function(event) {
        event.preventDefault();
        var view = this;

        var message = 'Are you sure you want to delete checked items?';
        if (!confirm(message)) {
            return false;
        }

        var data = [];
        var $checkboxes = $(event.target).closest('form')
            .find('input[name^="ids"]:checked');
        $checkboxes.each(function() {
            data.push($(this).val());
            $(this).closest('tr').slideUp();
        });

        var callback = function(response, request) {
            if (response.RES_STATUS) {
                $checkboxes.each(function() {
                    $(this).closest('tr').remove();
                });
            } else {
                // revert
                $checkboxes.each(function() {
                    $(this).closest('tr').slideDown();
                });
                console.error(response.RES_ERROR_DESC, response.RES_ERRORS);
            }

            gridPlugin(view.dom.grid)
                .trackButtonsState()
                ;
        };

        foodstuffMapper.delete(data, callback);
    };

    var onEditFoodStuff = function(event) {
        event.preventDefault();
        var view = this;
        var $form = $('form[name="add-foodstuff"]');

        $(event.target).closest('tr').find('td').each(function() {
            var name = $(this).data('name');
            if (name) {
                var value;
                switch (name) {
                    case 'id' :
                        value = $(this).find('input').val();
                        break;
                    default :
                        value = $(this).text();

                        break;
                }
                $form.find('input[name="' + name + '"]').val(value);
            }
        });
    };

    var paginateList = function() {
        var view = this,
            processing = false,
            fullyLoaded = false,
            offset = 30;


        $(document).on('scroll.foodstuffList', function(event) {
            if (processing || fullyLoaded) {
                return;
            }

            if ($(window).scrollTop() >= $(document).height() - $(
                window).height() - 200) {
                processing = true;

                foodstuffMapper.getAll(offset, function(response) {
                    if (response.RES_STATUS) {
                        var rows = [];
                        _.each(response.RES_DATA.items, function(item) {
                            rows.push(_.template(foodStuffListRowTpl,
                                {item: item}));
                        });
                        if (rows.length) {
                            view.dom.grid.find('tbody').append(rows);
                        } else {
                            fullyLoaded = true;
                        }
                    }

                    offset += 30;
                    processing = false;
                });
            }
        });
    };

    return Backbone.View.extend({
        el: $('#content'),
        initialize: function() {
            // container for others DOM elements
            this.dom = {};
        },
        events: {
            'submit form[name="add-foodstuff"]': onSubmitFoodstuffForm,
            'click form[name="manage-foodstuff"] *[name="delete"]': onDeleteFoodstuffs,
            'click form[name="manage-foodstuff"] *[name="edit"]': onEditFoodStuff,
            'keyup form[name="manage-foodstuff"] *[name="name"]': onFoodStuffFilterValueChange,
            'click form[name="add-foodstuff"] *[name="reset"]': onResetFoodstuffForm,
        },
        render: function() {
            var view = this;

            async.parallel({
                list: function(callback) {
                    foodstuffMapper.getAll(0, function(
                        response) {
                        if (response.RES_STATUS) {
                            callback(null, renderList(response.RES_DATA));
                        }
                    });
                },
                form: function(callback) {
                    var values = {per_gramm: 100}
                    , errors = {};
                    callback(null, renderForm(values, errors));
                }
            }, function(err, data) {
                if (err) {
                    console.error(err);
                } else {
                    view.$el.html(_.template(foodStuffTpl, data));

                    // grid
                    view.dom.grid = view.$el.find('.table');
                    gridPlugin(view.dom.grid)
                        .highlightCheckedRows()
                        .trackButtonsState()
                        ;

                    // form
                    $('#add-foodstuff-form input[name="name"]').typeahead({
                        source: autosuggestName,
                    });

                    // dynamicly load list data
                    paginateList.apply(view);
                }
            });
        }
    });
});