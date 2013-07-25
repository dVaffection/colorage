#!/usr/bin/env node

module.exports = {
    setUp: function(callback) {
        var findFoodstuffByIdCallback = function(foodstuffId, callback) {
            var doc = {
                foodstuff_id: foodstuffId,
                mass: 1,
            };
            callback(null, doc);
        };

        var validator = require('../../../app/validators/rationIntake');
        this.validator = validator(findFoodstuffByIdCallback);

        callback();
    },
    success: function(test) {
        var value = {
            foodstuff_id: 1,
            mass: 1,
        };
        var params = {};

        this.validator(value, params, function(message) {
            test.strictEqual(message, null, [message]);
        });

        test.done();
    },
    failNoAnObject: function(test) {
        var value = 'not an object';
        var params = {};

        this.validator(value, params, function(message) {
            test.notStrictEqual(message, null, [message]);
        });

        test.done();
    },
    failMissingFoodstuffId: function(test) {
        var value = {
            not_a_foodstuff_id: 1,
            mass: 1,
        };
        var params = {};

        this.validator(value, params, function(message) {
            test.notStrictEqual(message, null, [message]);
        });

        test.done();
    },
    failMissingMass: function(test) {
        var value = {
            foodstuff_id: 1,
            not_mass: 1,
        };
        var params = {};

        this.validator(value, params, function(message) {
            test.notStrictEqual(message, null, [message]);
        });

        test.done();
    },
};