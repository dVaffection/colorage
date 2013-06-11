module.exports = function(value, params, callback) {
    var message = 'Date must be in format "YYYY-MM-DD"';
    var regEx = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    
    callback(!regEx.test(value) ? message : null);
}