module.exports = function (serviceLocator) {
    "use strict";

    var async = require('async');


    var api = require('../api');
    var response = new api.response();
    var mapperUsers = serviceLocator['UsersMapper'](),
        mapperSessions = serviceLocator['SessionsMapper']();

    this.get = function (params, callback) {
        var sessionId = params.sessionId;

        function getSession(callback) {
            mapperSessions.get(sessionId, callback);
        }

        function getUser(session, callback) {
            var err;

            if (session) {
                mapperUsers.getById(session.userId, callback);
            } else {
                err = 'Session was not found';
                callback(err);
            }
        }

        async.waterfall([
            getSession,
            getUser
        ], function (err, user) {
            if (err) {
                response.error(err);
            } else if (! user) {
                err = 'User was not found';
                response.error(err);
            } else {
                var data = {
                    user: user
                };
                response.success(data);
            }

            callback(response);
        });
    }

}
