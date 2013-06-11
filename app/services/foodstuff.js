module.exports = function(serviceLocator) {

    var async = require('async');

    var api = require('../api');
    var response = new api.response();

    var inputFilterRules = require('../input-filters-rules/foodstuff');
    var inputFilter = require('../input-filter-async').inputFilter;

    var mapperFoodstuff = serviceLocator['foodstuffMapper']();

    this.post = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.post);

        inputFilter.isValid(params, function(is) {
            if (is) {
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
        });
    };

    this.put = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.put);

        inputFilter.isValid(params, function(is) {
            if (is) {
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
        });
    };

    this.delete = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.delete);

        inputFilter.isValid(params, function(is) {
            if (is) {
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
        });
    };

    this.get = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.get);

        inputFilter.isValid(params, function(is) {
            if (is) {
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
        });
    };

    this.getAll = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.getAll);

        inputFilter.isValid(params, function(is) {
            if (is) {
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
        });
    };

    this.search = function(params, callback) {
        inputFilter = new inputFilter(inputFilterRules.search);

        inputFilter.isValid(params, function(is) {
            if (is) {
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
        });
    };

}