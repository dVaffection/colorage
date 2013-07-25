var util = require('util');
var clc = require('cli-color');
var _ = require('underscore');

var debug = function(type) {
    var label;
    switch (type) {
        case 'error' :
            label = clc.white.bold.bgRed('error - ');
            break;
        default :
            label = clc.bold.bgCyan('log   - ');
            break;
    }

    var args = Array.prototype.slice.call(arguments).slice(1);
    var message = '';
    args.forEach(function(value) {
        // expand objects
        if (_.isObject(value)) {
            value = "\n" + util.inspect(value, {depth: null, colors: true});
        }
        message += value;
    });
    console.log(label + message);

    if ('error' === type) {
        process.exit(1); // abort
    }
};

var connectionString = 'http://localhost:' + require('../../app/config/index').port + '/colorage';
var api = require('./api');
api = new api(connectionString, {}, debug);
var skeleton = require('./skeleton')(api);

tasks = require('./foodstuff').concat(require('./ration'));
skeleton.run(tasks);