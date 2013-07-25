#!/usr/bin/env node

var _ = require('underscore');

module.exports = {
    setUp: function(callback) {
        this.filter = require('../../../app/filters/rationIntake');

        callback();
    },
    successGeneral: function(test) {
        var value = {
            foodstuff_id: 1,
            mass: 1,
        };

        var actual = this.filter(value);
        var expected = value;
        test.deepEqual(actual, expected);

        test.done();
    },
    failInputNotAnObject: function(test) {
        var value = 'not an object';

        var actual = this.filter(value);
        var expected = {
            foodstuff_id: null,
            mass: null,
        };
        test.deepEqual(actual, expected);

        test.done();
    },
    failMissingFoodstuffId: function(test) {
        var value = {
            mass: 10,
        };

        var actual = this.filter(value);
        var expected = _.extend({foodstuff_id: null}, value);
        test.deepEqual(actual, expected);

        test.done();
    },
    failMissingMass: function(test) {
        var value = {
            foodstuff_id: 10,
        };

        var actual = this.filter(value);
        var expected = _.extend({mass: null}, value);
        test.deepEqual(actual, expected);

        test.done();
    },
};