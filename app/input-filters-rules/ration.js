var _ = require('underscore');
var rationIntakeFilter = require('../filters/rationIntake');
var dateFormatValidator = require('../validators/dateFormat');
var rationIntakeValidator = require('../validators/rationIntake');

module.exports = function(serviceLocator) {
    var mapperFoodstuff = serviceLocator['foodstuffMapper']();
    mapperFoodstuff.findOneById();

    var post = {
        date: {
            required: true,
            validators: [
                dateFormatValidator,
            ],
        },
        intake: {
            required: true,
            preFilters: [
                rationIntakeFilter,
            ],
            validators: [
                rationIntakeValidator(mapperFoodstuff.findOneById),
            ],
        },
    };

    var put = {
        intake_id: {
            required: true,
        },
    };
    _.extend(put, post);

    var get = {
        intake_id: {
            required: true,
        },
        date: {
            required: true,
            validators: [
                dateFormatValidator,
            ],
        },
    };

    var moveUp = {
        intake_id: {
            required: true,
        },
        date: {
            required: true,
            validators: [
                dateFormatValidator,
            ],
        },
    };

    var moveDown = {
        intake_id: {
            required: true,
        },
        date: {
            required: true,
            validators: [
                dateFormatValidator,
            ],
        },
    };

    var remove = {
        intake_id: {
            required: true,
        },
        date: {
            required: true,
            validators: [
                dateFormatValidator,
            ],
        },
    };

    var getAll = {
        since_date: {
            required: true,
            validators: [
                dateFormatValidator,
            ],
        },
        until_date: {
            required: true,
            validators: [
                dateFormatValidator,
            ],
        },
    };

    return {
        post: post,
        put: put,
        get: get,
        delete: remove,
        moveUp: moveUp,
        moveDown: moveDown,
        getAll: getAll,
    };
};
