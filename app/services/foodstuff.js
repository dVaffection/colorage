module.exports = function(serviceLocator) {

    var async = require('async');

    var api = require('../api');
    var response = new api.response();

    var inputFilterRules = require('../input-filters-rules/foodstuff');
    var inputFilter = require('../input-filter').inputFilter;

    var mapperFoodstuff = serviceLocator['foodstuffMapper']();

    this.post = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.post);

        if (inputFilter.isValid(params)) {
            var values = inputFilter.getValues();

            mapperFoodstuff.post(values, function(err, doc) {
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
    };

    this.put = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.put);

        if (inputFilter.isValid(params)) {
            var values = inputFilter.getValues();

            mapperFoodstuff.put(values, function(err, doc) {
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
    };

    this.delete = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.delete);

        if (inputFilter.isValid(params)) {
            var values = inputFilter.getValues();

            mapperFoodstuff.delete(values, function(err) {
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
    };

    this.get = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.get);

        if (inputFilter.isValid(params)) {
            var values = inputFilter.getValues();

            mapperFoodstuff.get(values, function(err, doc) {
                if (err) {
                    response.error(err);
                } else {
                    data = {
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
    };

    this.getAll = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.getAll);

        if (inputFilter.isValid(params)) {
            var values = inputFilter.getValues();

            async.parallel({
                total: function(callback) {
                    mapperFoodstuff.count(function(err, count) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, count);
                        }
                    });
                },
                items: function(callback) {
                    mapperFoodstuff.getAll(values, function(err, docs) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, docs);
                        }
                    });
                }
            }, function(err, data) {
                if (err) {
                    response.error(err);
                } else {
                    response.success(data);
                }

                callback(response);
            });
        } else {
            response.error(null, inputFilter.getErrors());
            callback(response);
        }
    };

    this.search = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.search);

        if (inputFilter.isValid(params)) {
            var values = inputFilter.getValues();

            mapperFoodstuff.search(values, function(err, docs) {
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
    };

}