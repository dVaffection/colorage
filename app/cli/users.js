#!/usr/bin/env node

var argv = require('optimist').argv,
    clc = require('cli-color'),
    bcrypt = require('bcrypt'),
    config = require('../config/index'),
    bootstrap = require('../bootstrap');

var serviceLocator = bootstrap(config);

switch (argv.action) {
    case 'post' :
        var identity = argv.identity;
        var credential = argv.credential;

        if (identity && credential) {
            postUser(identity, credential);
        } else {
            var m = 'Usage: --action=post --identity=<string> --credential=<string>';
            console.error(clc.bgRed(m));
        }
        break;

    case 'delete' :
        var identity = argv.identity;

        if (identity) {
            deleteUser(identity);
        } else {
            var m = 'Usage: --action=post --identity=<string>';
            console.error(clc.bgRed(m));
        }
        break;

    default :
        var m = 'Usage: --action=post|delete';
        console.error(clc.bgRed(m));
        break;
}

function postUser(identity, credential) {
    // make sure it is string
    credential += '';

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(credential, salt);

    var mapperUsers = serviceLocator['UsersMapper']();
    mapperUsers.post(identity, hash, function(err, doc) {
        if (err) {
            console.error(clc.bgRed(err));
        } else {
            console.log(clc.bgGreen('User successfully created'));
            console.log(doc);
        }
    });
}

function deleteUser(identity) {
    var mapperUsers = serviceLocator['UsersMapper']();
    mapperUsers.delete(identity, function(err) {
        if (err) {
            console.error(clc.bgRed(err));
        } else {
            mapperUsers.get(function(err, doc) {
                if (doc) {
                    var m = 'Document was not deleted';
                    console.error(clc.bgRed(m));
                } else {
                    var m = 'User successfully deleted';
                    console.log(clc.bgGreen(m));
                }
            });
        }
    });
}

setTimeout(function() {
    process.exit();
}, 100);