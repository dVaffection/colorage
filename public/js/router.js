define([
    'views/top-menu',
    'views/foodstuff'
], function(TopMenuView, FoodstuffView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'foodstuff/': 'foodstuff',
        }
    });

    var initialize = function() {
        var topMenuView, foodstuffView;
        var appRouter = new AppRouter;

        appRouter.on('all', function(routeEvent) {
            // render top menu
            topMenuView = topMenuView || new TopMenuView;
            topMenuView.render(Backbone.history.fragment);
        });

        appRouter.on('route:foodstuff', function() {
//            page = page || 1;
            foodstuffView = foodstuffView || new FoodstuffView();
            foodstuffView.render();
        });

        appRouter.on('route:index', function() {
            $('#content').html('<h1>Index page</h1>');
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
}); 