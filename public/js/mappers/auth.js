define([
    'config/index',
    'api/server'
], function (config, API) {
    API = API(config.API.connectionString);

    return {
        createSession: function (identity, credential, callback) {
            var cmd = 'AUTH:CREATE_SESSION';
            var params = {
                identity: identity,
                credential: credential
            };
            API.cmd(cmd, params, callback);
        },
        restoreSession: function (sessionId, callback) {
            var cmd = 'AUTH:RESTORE_SESSION';
            var params = {
                sessionId: sessionId
            };
            API.cmd(cmd, params, callback);
        },
        isSessionValid: function (sessionId, callback) {
            var cmd = 'AUTH:IS_SESSION_VALID';
            var params = {
                sessionId: sessionId
            };
            API.cmd(cmd, params, callback);
        }
    };

});
