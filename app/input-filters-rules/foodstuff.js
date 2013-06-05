var _ = require('underscore');

var post = {
    'name': {
        'required': true,
        'preFilters': [
            'trim',
        ],
    },
    'carbohydrate': {
        'required': true,
        'preFilters': [
            'trim',
        ],
        'validators': [
            'isFloat',
        ],
        'postFilters': [
            'toFloat',
        ],
    },
    'fat': {
        'required': true,
        'preFilters': [
            'trim',
        ],
        'validators': [
            'isFloat',
        ],
        'postFilters': [
            'toFloat',
        ],
    },
    'protein': {
        'required': true,
        'preFilters': [
            'trim',
        ],
        'validators': [
            'isFloat',
        ],
        'postFilters': [
            'toFloat',
        ],
    },
    'per_gramm': {
        'required': true,
        'preFilters': [
            'trim',
        ],
        'validators': [
            'isInt',
        ],
        'postFilters': [
            'toInt',
        ],
    },
};

exports.post = post;

var put = {
    id: {
        'required': true,
    },
};
exports.put = _.extend(put, post);

var DEFAULT_OFFSET = 0;
var DEFAULT_LIMIT = 101;

exports.getAll = {
    limit_offset: {
        'required': false,
        'preFilters': [
            function(value) {
                if (value < 0) {
                    value = DEFAULT_OFFSET;
                }
                return value;
            },
            'toInt',
            function(value) {
                if (!value) {
                    value = DEFAULT_OFFSET;
                }
                return value;
            },
        ],
    },
    limit_count: {
        'required': false,
        'preFilters': [
            function(value) {
                if (!value) {
                    value = DEFAULT_LIMIT;
                }
                return value;
            },
            'toInt',
            function(value) {
                if (value > DEFAULT_LIMIT || value < 1) {
                    value = DEFAULT_LIMIT;
                }
                return value;
            }
        ],
    },
};

exports.search = {
    q: {
        'required': true,
    },
};

exports.delete = {
    id: {
        'required': true,
    },
};

exports.get = {
    id: {
        'required': true,
    },
};