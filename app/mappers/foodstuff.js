module.exports = function(serviceLocator) {

    var async = require('async');
    var _ = require('underscore');
    var mongoose = serviceLocator.mongoose;


    var schema = mongoose.Schema({
        name: {type: String, index: true},
        fat: Number,
        carbohydrate: Number,
        protein: Number,
        per_gramm: Number,
    }, {strict: true});
    var Model = serviceLocator.modelsProxy.getOrCreateModel('Foodstuff',
        schema);


    this.post = function(data, callback) {

        var doc = new Model({});
        doc = _.extend(doc, data);
        doc.save(function(err) {
            callback(err, doc);
        });
    }

    this.put = function(data, callback) {
        this.findOneById(data.id, function(err, doc) {
            if (err) {
                callback(err);
            } else {
                doc = _.extend(doc, data);
                doc.save(function(err) {
                    callback(err, doc);
                });
            }
        });
    }

    this.delete = function(data, callback) {
        var ids = _.isArray(data.id)
            ? data.id
            : [data.id];

        Model
            .remove()
            .where('_id').in(ids)
            .exec(callback)
            ;
    }

    this.get = function(data, callback) {
        this.findOneById(data.id, callback);
    }

    this.findOneById = function(id, callback) {
        Model.findOne({_id: id}, callback);
    }

    this.getAll = function(data, callback) {
        Model
            .find()
            .skip(data.limit_offset)
            .limit(data.limit_count)
            .sort({'name': 1})
            .exec(callback)
            ;
    }

    this.count = function(callback) {
        Model.count(callback);
    }

    this.search = function(data, callback) {
        var regexp = new RegExp(data.q, 'i');

        Model
            .find()
            .regex('name', regexp)
            .limit(101) // default batch size
            .sort({'name': 1})
            .exec(callback)
            ;
    }

}
