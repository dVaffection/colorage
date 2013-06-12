module.exports = {
    timezone: 'UTC',
    mongo: {
        connectionString: 'mongodb://localhost/colorage',
        debug: false,
    },
    routes: {
        'FOODSTUFF:POST': {
            service: 'foodstuff',
            action: 'post',
        },
        'FOODSTUFF:PUT': {
            service: 'foodstuff',
            action: 'put',
        },
        'FOODSTUFF:DELETE': {
            service: 'foodstuff',
            action: 'delete',
        },
        'FOODSTUFF:GET': {
            service: 'foodstuff',
            action: 'get',
        },
        'FOODSTUFF:GET_ALL': {
            service: 'foodstuff',
            action: 'getAll',
        },
        'FOODSTUFF:SEARCH': {
            service: 'foodstuff',
            action: 'search',
        },
        'RATION:POST': {
            service: 'ration',
            action: 'post',
        },
        'RATION:PUT': {
            service: 'ration',
            action: 'put',
        },
        'RATION:GET': {
            service: 'ration',
            action: 'get',
        },
        'RATION:DELETE': {
            service: 'ration',
            action: 'delete',
        },
        'RATION:MOVE_UP': {
            service: 'ration',
            action: 'moveUp',
        },
        'RATION:MOVE_DOWN': {
            service: 'ration',
            action: 'moveDown',
        },
        'RATION:GET_ALL': {
            service: 'ration',
            action: 'getAll',
        },
    },
};