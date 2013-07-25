#!/usr/bin/env node

module.exports = {
    setUp: function(callback) {
        this.validator = require('../../../app/validators/dateFormat');
        callback();
    },
    success: function(test) {
        var value = '2013-07-24';
        var params = {};
        this.validator(value, params, function(message) {
            test.strictEqual(message, null, [message]);
        });

        test.done();
    },
    fail: function(test) {
        var value = '2013-07-2';
        var params = {};
        this.validator(value, params, function(message) {
            test.notStrictEqual(message, null, [message]);
        });

        test.done();
    },
};