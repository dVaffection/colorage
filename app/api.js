function apiRequest(data) {
    "use strict";

    if (! (this instanceof apiRequest)) {
        throw new Error('Constructor called as a function');
    }

    this.cmd = data.REQ_CMD || false;
    this.id = data.REQ_ID || false;
    this.params = data.REQ_PARAMS || {};
}


function apiResponse(ns) {
    "use strict";

    if (! (this instanceof apiResponse)) {
        throw new Error('Constructor called as a function');
    }

    var _ns = ns || 'default',
        _status,
        _errorDesc,
        _data = {},
        _errors = {};

    this.success = function (data) {
        _status = true;
        if (data) {
            _data = data;
        }
    };

    this.error = function (errorDesc, errors) {
        _status = false;

        if (errorDesc) {
            _errorDesc = errorDesc;
        }
        if (errors) {
            _errors = errors;
        }
    }

    this.export = function (request) {
        if (! request instanceof apiRequest) {
            throw new Error('Request must be an instance of apiRequest');
        }

        var response = {
            RES_ID: request.id
        };

        switch (_status) {
            case true :
                response.RES_STATUS = true;
                response.RES_DATA = _data;
                break;

            case false :
                response.RES_STATUS = false;
                response.RES_ERROR_DESC = _errorDesc;
                response.RES_ERRORS = _errors;
                break;

            default :
                throw new Error('Response status was not set');
                break;
        }

        return response;
    }

    this.getNS = function () {
        return _ns;
    }
}


function apiRouter(serviceLocator, grantee, acl) {
    "use strict";

    if (! (this instanceof apiRouter)) {
        throw new Error('Constructor called as a function');
    }

    this.dispatch = function (routes, request, callback) {
        if (! request instanceof apiRequest) {
            throw new Error('Request must be an instance of apiRequest');
        }

        var response,
            resource = request.cmd,
            found = routes[request.cmd] || false;

        // call an appropriate service
        if (found) {
            acl.assert(grantee, resource, function (err, res) {
                if (res) {
                    var service = require('./services/' + found.service),
                        service = new service(serviceLocator);
                    service[found.action](request.params, callback);
                } else {
                    response = new apiResponse('acl');
                    response.error('Acl error');

                    callback(response);
                }
            });
        } else {
            response = new apiResponse();
            response.error('Unidentified route');

            callback(response);
        }
    }
}

exports.request = apiRequest;
exports.response = apiResponse;
exports.router = apiRouter;
