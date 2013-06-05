define([
    'text!/templates/_pagination.tpl',
], function(paginationTpl) {
    var render = function(totalItems, currentPage, perPage, route) {

        totalItems = parseInt(totalItems, 10);
        currentPage = parseInt(currentPage, 10);
        perPage = parseInt(perPage, 10);

        var rendered = '';
        var totalPages = Math.ceil(totalItems / perPage);

        if (totalPages) {
            rendered = _.template(paginationTpl, {
                totalPages: totalPages,
                currentPage: currentPage,
                perPage: perPage,
                route: route,
            });
        }

        return rendered;
    };

    return {
        render: render
    };
});