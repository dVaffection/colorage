define([
    'views/top-menu',
    'views/foodstuff',
    'views/ration',
], function(TopMenuView, FoodstuffView, RationView) {
    var Router = Backbone.Router.extend({
        initialize: function() {

        },
        routes: {
            '': 'index',
            'foodstuff/': 'foodstuff',
        }
    });

    var initialize = function() {
        var topMenuView, foodstuffView, rationView;
        var router = new Router;

        // this route handler is triggered on every request
        router.on('route', function() {
            // render top menu
            topMenuView = topMenuView || new TopMenuView;
            topMenuView.render(Backbone.history.fragment);

            // preventively unbind 
            $(document).unbind('scroll.foodstuffList');
        });

        router.on('route:foodstuff', function() {
            foodstuffView = foodstuffView || new FoodstuffView();
            foodstuffView.render();
        });

        router.on('route:index', function() {
            rationView = rationView || new RationView();
            rationView.render();
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
}); 