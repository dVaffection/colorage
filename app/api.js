function apiRequest(data) {
    this.cmd = data.REQ_CMD
        ? data.REQ_CMD
        : false;
    this.id = data.REQ_ID
        ? data.REQ_ID
        : false;
    this.params = data.REQ_PARAMS
        ? data.REQ_PARAMS
        : {};
}


function apiResponse() {
    var _status,
        _errorDesc,
        _data = {},
        _errors = {};

    this.success = function(data) {
        _status = true;
        if (data) {
            _data = data;
        }
    };

    this.error = function(errorDesc, errors) {
        _status = false;
        if (errorDesc) {
            _errorDesc = errorDesc;
        }
        if (errors) {
            _errors = errors;
        }
    }

    this.export = function(request) {
        if (!request instanceof apiRequest) {
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
}


function apiRouter(serviceLocator) {
    this.dispatch = function(routes, request, callback) {
        if (!request instanceof apiRequest) {
            throw new Error('Request must be an instance of apiRequest');
        }

        var found = routes[request.cmd]
            ? routes[request.cmd]
            : false;

        // call an appropriate service
        if (found) {
            var service = require('./services/' + found.service);
            var service = new service(serviceLocator);
            service[found.action](request.params, callback);
        } else {
            // or return the error response
            var response = new apiResponse();
            response.error('Unidentified route');

            callback(response);
        }
    }
}

exports.request = apiRequest;
exports.response = apiResponse;
exports.router = apiRouter;