define([
    'config/index',
    'api/server'
], function (config, API) {
    API = API(config.API.connectionString);

    return {
        login: function (identity, credential, callback) {
            var cmd = 'AUTH:LOGIN';
            var params = {
                identity: identity,
                credential: credential,
            };
            API.cmd(cmd, params, callback);
        },
        isLogged: function (sessionId, callback) {
            var cmd = 'AUTH:IS_LOGGED';
            var params = {
                sessionId: sessionId
            };
            API.cmd(cmd, params, callback);
        }
    };

});
