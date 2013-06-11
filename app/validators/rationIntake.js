var _ = require('underscore');

module.exports = function(serviceLocator) {

    function validateFoodstuff(foodstuffId, callback) {
        var message = 'Supplied foodstuff_id "' + foodstuffId + '" does not exist';

        if (!foodstuffId) {
            callback(message);
        } else {
            var mapperFoodstuff = serviceLocator['foodstuffMapper']();
            mapperFoodstuff.__get(foodstuffId, function(err, doc) {
                if (err) {
                    console.log(err);
                }
                callback(!doc ? message : null);
            });
        }
    }
    ;

    function validateMass(mass, callback) {
        var message = 'Mass must be greater than zero';

        if (!_.isNumber(mass) || mass < 1) {
            callback(message);
        } else {
            callback(null);
        }
    }
    ;

    return function(intake, params, callback) {
        
        validateFoodstuff(intake.foodstuff_id, function(err) {
            if (err) {
                callback(err);
            } else {
                validateMass(intake.mass, function(err) {
                    callback(err);
                });
            }
        });

    };
};