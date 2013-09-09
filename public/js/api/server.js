/* 
 * Server API
 */

define(function () {
//    var connectionString = 'http://colorage.dev/colorage';
    var debuger = function () {
        console.debug.apply(console, arguments);
    };

    function API(connectionString, options) {
        var api = this;

        if (! connectionString) {
            throw new Error('Connection string is empty: ' + connectionString);
        }

        var socket = io.connect(connectionString);
        var globalReqId = 0;
        // bridge between request and its response connected with global reqId
        var reqResMap = {};

        this.cmd = function (cmd, params, callback) {
            var reqId = ++ globalReqId;

            var request = {
                REQ_CMD: cmd,
                REQ_ID: reqId,
                REQ_PARAMS: params
            };
            reqResMap[reqId] = {
                callback: callback,
                request: request,
            };
            socket.emit('default', request);

            debuger('%c Websocket: request %s (%s)',
                'background-color: #E6E6E6', cmd, reqId, request);
        };

        socket.on('default', function (response) {
            var debugStyle = response.RES_STATUS
                ? 'background-color: white'
                : 'background-color: #E75048; color: white; font-style: bold';
            debuger('%c Websocket: response (%s)', debugStyle,
                response.RES_ID,
                response);

            var reqId = response.RES_ID;
            if (reqResMap[reqId]) {
                var callback = reqResMap[reqId].callback;
                var request = reqResMap[reqId].request;

                if (! callback) {
                    var message = 'Callback is not provided for response #' + reqId;
                    throw new Error(message);
                }

                callback.call(this, response, request);
            }
        });

        socket.on('acl', function (response) {
            var debugStyle = response.RES_STATUS
                ? 'background-color: white'
                : 'background-color: #E75048; color: white; font-style: bold';
            debuger('%c Websocket: response (%s)', debugStyle,
                response.RES_ID,
                response);


            var err;
            if (! response.RES_STATUS) {
                document.location.href = document.location.origin + '/login/';
            } else {
                err = 'Unhandled response on acl namespace';
                throw err;
            }
        });

        // on connect try to restore session if it's valid
        socket.on('connect', function () {
            var session,
                cmd,
                params;

            // don't try to restore session on login page
            if (document.location.href !== document.location.origin + '/login/') {
                try {
                    if (localStorage.session) {
                        session = JSON.parse(localStorage.session);
                        if (session.id) {
                            cmd = 'AUTH:IS_SESSION_VALID';
                            params = {
                                sessionId: session.id
                            };
                            api.cmd(cmd, params, function (response) {
                                if (response.RES_STATUS) {
                                    // try to restore session
                                    cmd = 'AUTH:RESTORE_SESSION';
                                    params = {
                                        sessionId: session.id
                                    };
                                    api.cmd(cmd, params, function (response) {
                                        // in case of failure there's nothing much to do
                                        // on the next request to the server it will response with an error on acl ns
                                        // and the client will be redirected to the login page
                                    });
                                }
                            });
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }


            socket.on('broadcast', function (response) {
                debuger('Broadcast received', response);
            });
        });
    }

//    return API;

    var instance;
    return function (connectionString, options) {
        if (typeof instance === 'undefined') {
            instance = new API(connectionString, options);
        }

        return instance;
    };
});
