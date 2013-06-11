module.exports = function(serviceLocator) {

    require('datejs');
    var async = require('async');
    var _ = require('underscore');
    var mongoose = serviceLocator.mongoose;


    var schema = mongoose.Schema({
        date: Date,
        intakes: {
            _id: mongoose.Schema.ObjectId,
            foodstuff_id: mongoose.Schema.ObjectId,
            mass: Number,
        },
    }, {strict: true});
    schema.index({date: -1}, {unique: true});
    var Model = serviceLocator.modelsProxy.getOrCreateModel('Ration', schema);


    this.post = function(data, callback) {
        var date = Date.parse(data.date);

        Model.findOne({date: date}, function(err, doc) {
            if (err) {
                callback(err);
            } else {
                var intake = {
                    _id: new mongoose.Types.ObjectId(),
                    foodstuff_id: new mongoose.Types.ObjectId(
                        data.intake.foodstuff_id),
                    mass: data.intake.mass,
                };

                if (doc) {
                    // add to set
                    var condition = {
                        _id: doc._id,
                    };
                    var update = {
                        '$push': {
                            intakes: intake,
                        },
                    };

                    Model.update(condition, update, function(err,
                        numAffected) {
                        callback(err, intake);
                    });
                } else {
                    // create fresh document
                    var doc = new Model({
                        date: data.date,
                        intakes: [intake],
                    });

                    doc.save(function(err) {
                        callback(err, intake);
                    });
                }
            }
        });
    }

    this.put = function(data, callback) {
        var date = Date.parse(data.date);

        Model.findOne({date: date}, function(err, doc) {
            if (err) {
                callback(err);
            } else if (!doc) {
                callback('Document was not found');
            } else {
                var intake = {
                    _id: new mongoose.Types.ObjectId(),
                    foodstuff_id: new mongoose.Types.ObjectId(
                        data.intake.foodstuff_id),
                    mass: data.intake.mass,
                };
                var condition = {
                    _id: doc._id,
                };
                var update = {
                    $push: {
                        intakes: intake,
                    },
                };

                Model.update(condition, update, function(err, numAffected) {
                    callback(err, intake);
                });
            }
        });
    }

//    this.delete = function(data, callback) {
//        var ids = _.isArray(data.id)
//            ? data.id
//            : [data.id];
//
//        Model
//            .remove()
//            .where('_id').in(ids)
//            .exec(callback)
//            ;
//    }
//
//    this.get = function(data, callback) {
//        this.__get(data.id, callback);
//    }
//
//    this.__get = function(id, callback) {
//        Model.findOne({_id: id}, callback);
//    }

    this.getAll = function(data, callback) {
        Model
            .find()
            .where('date', {'$gte': data.since_date, '$lte': data.until_date})
            .sort({date: -1})
            .exec(callback)
            ;
    }

}
