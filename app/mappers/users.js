module.exports = function(mongoose, modelsProxy) {

    require('datejs');
    var async = require('async');
    var _ = require('underscore');

    var schema = mongoose.Schema({
        identity: {type: String, unique: true},
        credential_hash: String,
    }, {strict: true});
    var Model = modelsProxy.getOrCreateModel('User', schema);


    this.get = function(identity, callback) {
        Model
            .findOne()
            .where('identity', identity)
            .exec(callback)
            ;
    };

    this.post = function(identity, credentialHash, callback) {
        var data = {
            identity: identity,
            credential_hash: credentialHash
        };

        var doc = new Model(data);
        doc.save(function(err) {
            callback(err, doc);
        });
    };

    this.delete = function(identity, callback) {
        Model
            .remove()
            .where('identity', identity)
            .exec(callback)
            ;
    };

}
