module.exports = function(serviceLocator) {

    require('datejs');
    var async = require('async');
    var _ = require('underscore');
    var mongoose = serviceLocator.mongoose;


    var schema = mongoose.Schema({
        date: Date,
        intakes: [],
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
                    console.log(intake);
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
        var intake = {
            _id: new mongoose.Types.ObjectId(data.intake_id),
            foodstuff_id: new mongoose.Types.ObjectId(
                data.intake.foodstuff_id),
            mass: data.intake.mass,
        };

        var condition = {
            date: date,
            'intakes._id': intake._id,
        };
        var update = {
            '$set': {
                'intakes.$': intake,
            },
        };

        Model.update(condition, update, function(err, numAffected) {
            callback(err, intake);
        });
    }

    this.delete = function(data, callback) {
        var date = Date.parse(data.date);
        var intakeId = new mongoose.Types.ObjectId(data.intake_id);

        var condition = {
            date: date,
        };
        var update = {
            '$pull': {
                'intakes': {_id: intakeId},
            },
        };

        Model.update(condition, update, function(err, numAffected) {
            callback(err, numAffected);
        });
    }

    this.get = function(data, callback) {
        var date = Date.parse(data.date);
        var intakeId = data.intake_id;

        Model
            .findOne()
            .where('date', date)
            .exec(function(err, doc) {
            if (err) {
                callback(err);
            } else {
                if (doc) {
                    var found = false;
                    doc.intakes.forEach(function(intake) {
                        if (intake._id.toString() === intakeId) {
                            found = intake;
                            return;
                        }
                    });

                    callback(null, found);
                } else {
                    callback('Document was not found');
                }
            }
        });
    }


    this.getAll = function(data, callback) {
        Model
            .find()
            .where('date', {'$gte': data.since_date, '$lte': data.until_date})
            .sort({date: -1})
            .exec(callback)
            ;
    }

    this.move = function(destination, data, callback) {
        var swapCallback;
        switch (destination) {
            case 'down' :
                swapCallback = function(intakes, index) {
                    if (index + 1 < intakes.length) {
                        var tmp = intakes[index];
                        intakes[index] = intakes[index + 1];
                        intakes[index + 1] = tmp;
                    }
                    return intakes;
                };
                break;
            case 'up' :
                swapCallback = function(intakes, index) {
                    if (index > 0) {
                        var tmp = intakes[index];
                        intakes[index] = intakes[index - 1];
                        intakes[index - 1] = tmp;
                    }
                    return intakes;
                };
                break;
            default :
                throw new Error('Unsupported destination: ', destination);
                break;
        }

        var date = Date.parse(data.date);
        var intakeId = data.intake_id;

        Model
            .findOne()
            .where('date', date)
            .exec(function(err, doc) {
            if (err) {
                callback(err);
            } else {
                if (doc) {
                    var index = -1;
                    doc.intakes.forEach(function(intake, i) {
                        if (intake._id.toString() === intakeId) {
                            index = i;
                            return;
                        }
                    });
                    if (-1 === index) {
                        callback('Intake was not found');
                    } else {
                        var intakes = swapCallback(doc.intakes, index);
                        var condition = {
                            _id: doc._id,
                        };
                        var update = {
                            '$set': {intakes: intakes},
                        };
                        Model.update(condition, update, function(err) {
                            callback(err);
                        });
                    }
                } else {
                    callback('Document was not found');
                }
            }
        });
    };

}
