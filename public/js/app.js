define([
    'router',
    'backbone',
    'bootstrap', 
    'jquery.serialize-object',
    'jquery.color'
], function(Router) {
    var initialize = function() {
//        require(['iosync'], function() {
            Router.initialize();
//        });
    }

    return {
        initialize: initialize
    };
});