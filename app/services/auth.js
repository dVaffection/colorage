module.exports = function (serviceLocator) {
    "use strict";

    var async = require('async'),
        bcrypt = require('bcrypt');


    var api = require('../api');
    var response = new api.response();
    var mapperUsers = serviceLocator['UsersMapper'](),
        mapperSessions = serviceLocator['SessionsMapper'](),
        socket = serviceLocator.socket;

    this.createSession = function (params, callback) {
        var identity = params.identity,
            credentail = params.credential,
            err;

        async.waterfall([
            findUser,
            varifyCredential,
            createSession
        ], function (err, session) {
            if (err) {
                response.error(err);
            } else if (! session) {
                err = 'Session was not created';
                response.error(err);
            } else {
                var data = {
                    session: {
                        id: session._id,
                        expired: 3600
                    }
                };
                response.success(data);
            }

            callback(response);
        });

        function findUser(callback) {
            identity = identity.toLowerCase();
            mapperUsers.getByIdentity(identity, callback);
        }

        function varifyCredential(user, callback) {
            if (user) {
                if (bcrypt.compareSync(credentail, user.credential_hash)) {
                    callback(null, user);
                } else {
                    var err = 'Supplied credentail does not match';
                    callback(err);
                }
            } else {
                var err = 'Supplied identity not found';
                callback(err);
            }
        }

        function createSession(user, callback) {
            mapperSessions.post(user._id, callback);
        }
    }

    this.restoreSession = function (params, callback) {
        var err,
            sessionId = params.sessionId;

        function getSession(callback) {
            mapperSessions.get(params.sessionId, callback);
        }

        function restoreSession(session, callback) {
            if (session) {
                socket.clientSessionId = session._id.toString();
                callback(null);
            } else {
                err = 'Session was not found';
                callback(err);
            }
        }

        async.waterfall([
            getSession,
            restoreSession
        ], function (err, session) {
            if (err) {
                response.error(err);
            } else {
                response.success();
            }

            callback(response);
        });

    }

    this.isSessionValid = function (params, callback) {
        mapperSessions.get(params.sessionId, function (err, doc) {
            if (err) {
                response.error(err);
            } else if (! doc) {
                var err = 'Session was not found';
                response.error(err);
            } else {
                response.success();
            }

            callback(response);
        });
    }

}
