var _ = require('underscore');
var check = require('validator').check,
    sanitize = require('validator').sanitize;

function inputFilter(rules) {
    var values = {},
        errors = {};

    this.isValid = function(data) {

        _.each(rules, function(handlers, name) {
            if (_.has(data, name)) {
                values[name] = data[name];
            } else {
                values[name] = null;
            }

            // ------------- READY, STEADY...

            function preFilter() {
                // first pre-filter value
                if (handlers.preFilters) {
                    _.each(handlers.preFilters, function(filter) {
                        if (typeof filter === 'function') {
                            values[name] = filter(values[name]);
                        } else {
                            values[name] = sanitize(values[name])[filter]();
                        }
                    });
                }
            }

            function validate() {
                // then validate and gather errors
                if (handlers.validators) {
                    try {
                        // yea, use one validator per time
                        // in most cases it should be sufficient
                        _.each(handlers.validators, function(validator) {
                            if (typeof validator === 'function') {
                                validator(values[name]);
                            } else {
                                check(values[name])[validator]();
                            }
                        });
                    } catch (e) {
                        errors[name] = e.message;
                    }
                }
            }

            function postFilter() {
                // post-filter those values which passed validation
                if (handlers.postFilters && !(name in errors)) {
                    _.each(handlers.postFilters, function(filter) {
                        if (typeof filter === 'function') {
                            values[name] = filter(values[name]);
                        } else {
                            values[name] = sanitize(values[name])[filter]();
                        }
                    });
                }
            }

            // ------------- GO!!!

            // first pre-filter value
            preFilter();

            // by default value is optional
            if (!_.has(handlers, 'required')) {
                handlers.required = false;
            }

            // necessarily process value further if it's mandatory
            // and in case it's optional process only if it's not empty
            if (handlers.required) {
                if (!_.isEmpty(values[name])) {
                    validate();
                    postFilter();
                } else {
                    errors[name] = "Value is required and can't be empty";
                }
            } else {
                if (values[name]) {
                    validate();
                    postFilter();
                }
            }

        });

        return _.isEmpty(errors);
    }

    this.getValue = function(name) {
        return values[name];
    }

    this.getValues = function() {
        return values;
    }

    this.getErrors = function() {
        return errors;
    }
}

exports.inputFilter = inputFilter;