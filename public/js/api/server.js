/* 
 * Server API
 */

define(function () {
//    var connectionString = 'http://colorage.dev/colorage';
    var debuger = function () {
        console.debug.apply(console, arguments);
    };

    function API(connectionString, options) {

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

        socket.on('connect', function () {
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
