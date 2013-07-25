var _ = require('underscore');


module.exports = function(connectionString, options, debug) {
    var defaultOptions = {
        'connect timeout': 1000,
    };
    options = _.extend(defaultOptions, options);
    if (!_.isFunction(debug)) {
        throw new Error('Debug must be a valid function');
    }

    var socket = require('socket.io-client')
        .connect(connectionString, options);
    var globalReqId = 0;
    // bridge between request and its response connected with global reqId
    var reqResMap = {};

    socket.on('connect', function() {
        socket.on('disconnect', function() {
            debug('error', 'Server diconnected!');
        });
    });

    socket.on('error', function(err) {
        debug('error', err);
    });

    this.cmd = function(cmd, params, callback) {
        var reqId = ++globalReqId;

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

        debug('debug', 'request "' + cmd + '" (' + reqId + ')', request);
    };

    socket.on('default', function(response) {
        var type = response.RES_STATUS
            ? 'debug'
            : 'error';
        debug(type, 'response (' + response.RES_ID + ')', response);

        var reqId = response.RES_ID;
        if (reqResMap[reqId]) {
            var callback = reqResMap[reqId].callback;
            var request = reqResMap[reqId].request;

            if (!callback) {
                var message = 'Callback is not provided for response #' + reqId;
                throw new Error(message);
            }
            callback.call(this, response, request);
        }
    });

}

//module.exports = function(connectionString, options, debug) {
//    return new API(connectionString, options, debug);
//};