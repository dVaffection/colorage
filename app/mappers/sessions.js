module.exports = function(mongoose, modelsProxy) {

    require('datejs');
    var _ = require('underscore');

    var schema = mongoose.Schema({
        userId: {type: mongoose.Schema.ObjectId},
        createdAt: {type: Date, expires: 3600},
    }, {strict: true});
    var Model = modelsProxy.getOrCreateModel('Session', schema);


    this.get = function(id, callback) {
        Model.findOne({_id: id}, callback);
    };

    this.post = function(userId, callback) {
        var data = {
            userId: userId,
            createdAt: new Date
        };

        var doc = new Model(data);
        doc.save(function(err) {
            callback(err, doc);
        });
    };

}
