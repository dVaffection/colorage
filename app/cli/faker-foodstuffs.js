var async = require('async');
var Faker = require('Faker');
var serviceLocator;
if (typeof serviceLocator === 'undefined') {
    var config = require('../config/index');
    var bootstrap = require('../bootstrap');
    serviceLocator = bootstrap(config);
}


var mapperFoodstuff = serviceLocator['foodstuffMapper']();

var i = 0;
var callback = function() {
    i ++;
    if (i > 100) {
        process.exit();
    }

    var data = {
        name: Faker.Lorem.words(1)[0],
        fat: Faker.random.number(100),
        carbohydrate: Faker.random.number(100),
        protein: Faker.random.number(100),
        per_gramm: 100,
    };

    mapperFoodstuff.post(data, callback);
};

callback();
