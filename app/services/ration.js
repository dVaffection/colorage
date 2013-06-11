module.exports = function(serviceLocator) {

    var async = require('async');
    var _ = require('underscore');

    var api = require('../api');
    var response = new api.response();

    var inputFilterRules = require('../input-filters-rules/ration')(serviceLocator);
    var inputFilter = require('../input-filter-async').inputFilter;

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

}