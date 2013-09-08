define([
    'mappers/auth',
    'router',
    'backbone',
    'bootstrap',
    'jquery.serialize-object',
    'jquery.color'
], function(authMapper, Router) {
    function varifyAuth(callback) {
        var session = localStorage.session;
        session = JSON.parse(session);
        if (session.id) {
            authMapper.isLogged(session.id, function(response) {
                callback(response.RES_STATUS);
            });
        } else {
            callback(false);
        }
    }


    var initialize = function() {
        varifyAuth(function(isVarified) {
            if (isVarified) {
                Router.initialize();
            } else {
                document.location.href = document.location.origin + '/login/';
            }
        });
    }

    return {
        initialize: initialize
    };
});