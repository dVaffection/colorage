module.exports = {
    'mongo' : {
        'connectionString' : 'mongodb://localhost/colorage',
        'debug': false,
    },
    'routes': {
        'FOODSTUFF:POST': {
            'service': 'foodstuff',
            'action': 'post',
        },
        'FOODSTUFF:PUT': {
            'service': 'foodstuff',
            'action': 'put',
        },
        'FOODSTUFF:DELETE': {
            'service': 'foodstuff',
            'action': 'delete',
        },
        'FOODSTUFF:GET': {
            'service': 'foodstuff',
            'action': 'get',
        },
        'FOODSTUFF:GET_ALL': {
            'service': 'foodstuff',
            'action': 'getAll',
        },
        'FOODSTUFF:SEARCH': {
            'service': 'foodstuff',
            'action': 'search',
        },
    },
};