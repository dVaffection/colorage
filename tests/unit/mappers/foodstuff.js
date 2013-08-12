#!/usr/bin/env node

module.exports = {
    setUp: function(callback) {
        this.mapper = require('../../../app/mappers/foodstuff');
        callback();
    },
    post: function(test) {
        var mongoose = {
            Schema: function(spec) {
                return spec;
            },
        };
        var modelsProxy = {
            getOrCreateModel: function(name, schema) {
                return function() {
                    this.save = function(callback) {
                        callback(null);
                    };
                };
            },
        };

        var mapper = new this.mapper(mongoose, modelsProxy);

        var data = {
            name: 'Minute Maid',
            fat: 0.8,
            carbohydrate: 12,
            protein: 123,
            per_gramm: 100,
        };
        mapper.post(data, function(err, doc) {
            doc = JSON.parse(JSON.stringify(doc));
            test.deepEqual(data, doc);

            test.done();
        });
    },
    delete: function(test) {
        var id = '50a2a4f74dfd7cb316000000';

        var mongoose = {
            Schema: function(spec) {
                return spec;
            },
        };
        var modelsProxy = {
            getOrCreateModel: function(name, schema) {
                return {
                    remove: function() {
                        return this;
                    },
                    where: function(field) {
                        test.strictEqual(field, '_id');
                        return this;
                    },
                    in: function(ids) {
                        test.deepEqual(ids, [id]);
                        return this;
                    },
                    exec: function(callback) {
                        callback(null);
                    },
                };
            },
        };

        var mapper = new this.mapper(mongoose, modelsProxy);

        var data = {
            id: id,
        };
        mapper.delete(data, function() {
            test.done();
        });
    },
    get: function(test) {
        var id = '50a2a4f74dfd7cb316000000';

        var mongoose = {
            Schema: function(spec) {
                return spec;
            },
        };
        var modelsProxy = {
            getOrCreateModel: function(name, schema) {
                return {
                    findOne: function(condition, callback) {
                        test.deepEqual(condition, {_id: id});

                        callback();
                    },
                };
            },
        };

        var mapper = new this.mapper(mongoose, modelsProxy);
        mapper.findOneById = function(value, callback) {
            test.strictEqual(value, id);
            callback();
        };
        var data = {
            id: id,
        };

        mapper.get(data, function() {
            test.done();
        });
    },
    findOneById: function(test) {
        var id = '50a2a4f74dfd7cb316000000';

        var mongoose = {
            Schema: function(spec) {
                return spec;
            },
        };
        var modelsProxy = {
            getOrCreateModel: function(name, schema) {
                return {
                    findOne: function(condition, callback) {
                        test.deepEqual(condition, {_id: id});

                        callback();
                    },
                };
            },
        };

        var mapper = new this.mapper(mongoose, modelsProxy);
        mapper.findOneById(id, function() {
            test.done();
        });
    },
    getAll: function(test) {
        var limitOffset = 0;
        var limitCount = 10;

        var mongoose = {
            Schema: function(spec) {
                return spec;
            },
        };
        var modelsProxy = {
            getOrCreateModel: function(name, schema) {
                return {
                    find: function() {
                        return this;
                    },
                    skip: function(value) {
                        test.strictEqual(value, limitOffset);
                        return this;
                    },
                    limit: function(value) {
                        test.strictEqual(value, limitCount);
                        return this;
                    },
                    sort: function() {
                        return this;
                    },
                    exec: function(callback) {
                        callback(null);
                    },
                };
            },
        };

        var mapper = new this.mapper(mongoose, modelsProxy);

        var data = {
            limit_offset: limitOffset,
            limit_count: limitCount,
        };
        mapper.getAll(data, function() {
            test.done();
        });
    },
    search: function(test) {
        var limitOffset = 0;
        var limitCount = 10;

        var mongoose = {
            Schema: function(spec) {
                return spec;
            },
        };
        var modelsProxy = {
            getOrCreateModel: function(name, schema) {
                return {
                    find: function() {
                        return this;
                    },
                    regex: function(key, value) {
                        var regexp = new RegExp('asd', 'i');

                        test.strictEqual(value instanceof RegExp, true);
                        test.strictEqual(value.toString(), regexp.toString());

                        return this;
                    },
                    limit: function() {
                        return this;
                    },
                    sort: function() {
                        return this;
                    },
                    exec: function(callback) {
                        callback(null);
                    },
                };
            },
        };

        var mapper = new this.mapper(mongoose, modelsProxy);

        var data = {
            q: 'asd',
        };
        mapper.search(data, function() {
            test.done();
        });
    },
};