define([
    'mappers/auth',
    'views/top-menu',
    'views/foodstuff',
    'views/ration'
], function (authMapper, TopMenuView, FoodstuffView, RationView) {
    "use strict";

    function authMiddleware(callback) {
        var session = JSON.parse(localStorage.session);
        if (session.id) {
            authMapper.isLogged(session.id, function (response) {
                is(response.RES_STATUS);
            });
        } else {
            is(false);
        }

        function is(result) {
            console.log('Is authorized: ' + result);
            if (result) {
                callback();
            } else {
                document.location.href = document.location.origin + '/login/';
            }
        }
    }

    var Router = Backbone.Router.extend({
        initialize: function () {
            // ...
        },
        routes: {
            '': 'index',
            'foodstuff/': 'foodstuff'
        }
    });


    var initialize = function () {
        var topMenuView,
            foodstuffView,
            rationView,
            router = new Router();

        // this route handler is triggered on every request
        router.on('route', function () {
            // render top menu
            topMenuView = topMenuView || new TopMenuView;
            topMenuView.render(Backbone.history.fragment);

            // preventively unbind
            $(document).unbind('scroll.foodstuffList');
        });

        router.on('route:foodstuff', function () {
            authMiddleware(function () {
                foodstuffView = foodstuffView || new FoodstuffView();
                foodstuffView.render();
            });
        });

        router.on('route:index', function () {
            authMiddleware(function () {
                rationView = rationView || new RationView();
                rationView.render();
            });
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
