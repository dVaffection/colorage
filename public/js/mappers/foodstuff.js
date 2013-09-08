define([
    'config/index',
    'api/server',
], function(config, API) {

    var instance;
    function createInstance(connectionString, options) {
        if (typeof instance === 'undefined') {
            instance = new API(connectionString, options);
        }

        return instance;
    };

    API = createInstance(config.API.connectionString);

    return {
        post: function(data, callback) {
            var cmd = 'FOODSTUFF:POST';
            var params = data;
            API.cmd(cmd, params, callback);
        },
        put: function(data, callback) {
            var cmd = 'FOODSTUFF:PUT';
            var params = data;
            API.cmd(cmd, params, callback);
        },
        delete: function(id, callback) {
            var cmd = 'FOODSTUFF:DELETE';
            var params = {
                id: id,
            };
            API.cmd(cmd, params, callback);
        },
        get: function(id, callback) {
            var cmd = 'FOODSTUFF:GET';
            var params = {
                id: id,
            };
            API.cmd(cmd, params, callback);
        },
//        getAll: function(page, perPage, callback) {
//            var cmd = 'FOODSTUFF:GET_ALL';
//
//            page = parseInt(page, 10);
//            if (page < 1) {
//                page = 1;
//            }
//            perPage = parseInt(perPage, 10);
//            var offset = perPage * (page - 1);
//
//            var params = {
//                limit_offset: offset,
//                limit_count: perPage,
//            };
//            API.cmd(cmd, params, callback);
//        },
        getAll: function(offset, callback) {
            var cmd = 'FOODSTUFF:GET_ALL';
            var count = 30;

            var params = {
                limit_offset: offset,
                limit_count: count,
            };
            API.cmd(cmd, params, callback);
        },
        search: function(q, callback) {
            var cmd = 'FOODSTUFF:SEARCH';
            var params = {
                q: q,
            };
            API.cmd(cmd, params, callback);
        },
    };

});