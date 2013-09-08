define([
    'config/index',
    'api/server'
], function(config, API) {

    var instance;
    function createInstance(connectionString, options) {
        if (typeof instance === 'undefined') {
            instance = new API(connectionString, options);
        }

        return instance;
    }

    API = createInstance(config.API.connectionString);

    return {
        login: function(identity, credential, callback) {
            var cmd = 'AUTH:LOGIN';
            var params = {
                identity: identity,
                credential: credential,
            };
            API.cmd(cmd, params, callback);
        },
        isLogged: function(sessionId, callback) {
            var cmd = 'AUTH:IS_LOGGED';
            var params = {
                sessionId: sessionId
            };
            API.cmd(cmd, params, callback);
        }
    };

});