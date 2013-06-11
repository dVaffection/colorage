var _ = require('underscore');
var rationIntakeFilter = require('../filters/rationIntake');
var dateFormatValidator = require('../validators/dateFormat');
var rationIntakeValidator = require('../validators/rationIntake');

module.exports = exports = function(serviceLocator) {
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
                rationIntakeValidator(serviceLocator),
            ],
        },
    };

    var put = {
        intake_id: {
            required: true,
        },
    };

    return {
        post: post,
        put: put,
    };
};


//exports.getAll = {
//    since_date: {
//        required: true,
//        validators: [
//            dateFormatValidator,
//        ],
//    },
//    until_date: {
//        required: true,
//        validators: [
//            dateFormatValidator,
//        ],
//    },
//};
//
//exports.delete = {
//    intake_id: {
//        required: true,
//    },
//};
//
//exports.get = {
//    intake_id: {
//        required: true,
//    },
//};
//
//exports.moveUp = {
//    intake_id: {
//        required: true,
//    },
//};
//
//exports.moveDown = {
//    intake_id: {
//        required: true,
//    },
//};