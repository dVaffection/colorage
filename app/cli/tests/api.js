var util = require('util');
var clc = require('cli-color');
var _ = require('underscore');

var debuger = function(type) {
    var label;
    switch (type) {
        case 'error' :
            label = clc.white.bold.bgRed('error - ');
            break;
        default :
            label = clc.bold.bgCyan('log   - ');
            break;
    }

    var args = Array.prototype.slice.call(arguments).slice(1);
    var message = '';
    args.forEach(function(value) {
        // expand objects
        if (_.isObject(value)) {
            value = "\n" + util.inspect(value, {depth: null, colors: true});
        }
        message += value;
    });
    console.log(label + message);
};

function API(connectionString, options, debug) {
    var defaultOptions = {
        'connect timeout': 1000,
    };
    options = _.extend(defaultOptions, options);

    var socket = require('socket.io-client')
        .connect(connectionString, options);
    var globalReqId = 0;
    // bridge between request and its response connected with global reqId
    var reqResMap = {};

    socket.on('connect', function() {
        socket.on('disconnect', function() {
            if (debug) {
                debuger('error', 'Server diconnected!');
                process.exit();
            }
        });
    });

    socket.on('error', function(err) {
        if (debug) {
            debuger('error', err);
            process.exit();
        }
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

        if (debug) {
            debuger('debug', 'request "' + cmd + '" (' + reqId + ')', request);
        }
    };

    socket.on('default', function(response) {
        if (debug) {
            var type = response.RES_STATUS
                ? 'debug'
                : 'error';
            debuger(type, 'response (' + response.RES_ID + ')', response);
        }

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


var instance;
module.exports = function(connectionString, options, debug) {
    if (typeof instance === 'undefined') {
        instance = new API(connectionString, options, debug);
    }

    return instance;
};