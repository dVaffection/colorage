var _ = require('underscore');

module.exports = function(value) {
    var filteredValue;

    if (_.isObject(value)) {
        filteredValue = {
            foodstuff_id: value.foodstuff_id,
            mass: parseInt(value.mass, 10),
        };
    } else {
        filteredValue = {
            foodstuff_id: null,
            mass: null,
        };
    }

    return filteredValue;
}