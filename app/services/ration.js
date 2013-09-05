module.exports = function(serviceLocator) {

    var async = require('async');
    var _ = require('underscore');

    var api = require('../api');
    var response = new api.response();

    var inputFilterRules = require('../input-filters-rules/ration')(
        serviceLocator);
    var inputFilter = require('input-filter-async');

    var mapperRation = serviceLocator['rationMapper']();

    this.post = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.post);

        inputFilter.isValid(params, function(is) {
            if (is) {
                var values = inputFilter.getValues();
                mapperRation.post(values, function(err, doc) {
                    if (err) {
                        response.error(err);
                    } else {
                        var data = {
                            item: doc,
                        };
                        response.success(data);
                    }
                    callback(response);
                });
            } else {
                response.error(null, inputFilter.getErrors());
                callback(response);
            }
        });
    };

    this.put = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.put);

        inputFilter.isValid(params, function(is) {
            if (is) {
                var values = inputFilter.getValues();
                mapperRation.put(values, function(err, doc) {
                    if (err) {
                        response.error(err);
                    } else {
                        var data = {
                            item: doc,
                        };
                        response.success(data);
                    }
                    callback(response);
                });
            } else {
                response.error(null, inputFilter.getErrors());
                callback(response);
            }
        });
    };

    this.delete = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.delete);

        inputFilter.isValid(params, function(is) {
            if (is) {
                var values = inputFilter.getValues();
                mapperRation.delete(values, function(err, numAffected) {
                    if (err) {
                        response.error(err);
                    } else {
                        var data = {
                            affected_number: numAffected,
                        };
                        response.success(data);
                    }
                    callback(response);
                });
            } else {
                response.error(null, inputFilter.getErrors());
                callback(response);
            }
        });
    };

    this.get = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.get);

        inputFilter.isValid(params, function(is) {
            if (is) {
                var values = inputFilter.getValues();
                mapperRation.get(values, function(err, doc) {
                    if (err) {
                        response.error(err);
                    } else {
                        var data = {
                            item: doc,
                        };
                        response.success(data);
                    }
                    callback(response);
                });
            } else {
                response.error(null, inputFilter.getErrors());
                callback(response);
            }
        });
    };

    this.getAll = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.getAll);

        inputFilter.isValid(params, function(is) {
            if (is) {
                var values = inputFilter.getValues();
                mapperRation.getAll(values, function(err, docs) {
                    if (err) {
                        response.error(err);
                    } else {
                        var data = {
                            items: docs,
                        };
                        response.success(data);
                    }
                    callback(response);
                });
            } else {
                response.error(null, inputFilter.getErrors());
                callback(response);
            }
        });
    };

    this.moveUp = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.moveUp);

        inputFilter.isValid(params, function(is) {
            if (is) {
                var values = inputFilter.getValues();
                mapperRation.move('up', values, function(err, doc) {
                    if (err) {
                        response.error(err);
                    } else {
                        response.success();
                    }
                    callback(response);
                });
            } else {
                response.error(null, inputFilter.getErrors());
                callback(response);
            }
        });
    };

    this.moveDown = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.moveDown);

        inputFilter.isValid(params, function(is) {
            if (is) {
                var values = inputFilter.getValues();
                mapperRation.move('down', values, function(err, doc) {
                    if (err) {
                        response.error(err);
                    } else {
                        response.success();
                    }
                    callback(response);
                });
            } else {
                response.error(null, inputFilter.getErrors());
                callback(response);
            }
        });
    };

}