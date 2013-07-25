var _ = require('underscore');

module.exports = function(value) {
    var filteredValue;

    if (_.isObject(value)) {
        filteredValue = {
            foodstuff_id: value.foodstuff_id ? value.foodstuff_id : null,
            mass: value.mass ? parseInt(value.mass, 10) : null,
        };
    } else {
        filteredValue = {
            foodstuff_id: null,
            mass: null,
        };
    }

    return filteredValue;
}