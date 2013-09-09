"use strict";

module.exports = {
    timezone: 'UTC',
    port: 8181,
    mongo: {
        connectionString: 'mongodb://localhost/colorage',
        debug: false
    },
    routes: {
        'AUTH:CREATE_SESSION': {
            service: 'auth',
            action: 'createSession'
        },
        'AUTH:RESTORE_SESSION': {
            service: 'auth',
            action: 'restoreSession'
        },
        'AUTH:IS_SESSION_VALID': {
            service: 'auth',
            action: 'isSessionValid'
        },
        // ---------------------------------------------------------------------
        'USER:GET': {
            service: 'user',
            action: 'get'
        },
        // ---------------------------------------------------------------------
        'FOODSTUFF:POST': {
            service: 'foodstuff',
            action: 'post'
        },
        'FOODSTUFF:PUT': {
            service: 'foodstuff',
            action: 'put'
        },
        'FOODSTUFF:DELETE': {
            service: 'foodstuff',
            action: 'delete'
        },
        'FOODSTUFF:GET': {
            service: 'foodstuff',
            action: 'get'
        },
        'FOODSTUFF:GET_ALL': {
            service: 'foodstuff',
            action: 'getAll'
        },
        'FOODSTUFF:SEARCH': {
            service: 'foodstuff',
            action: 'search'
        },
        // ---------------------------------------------------------------------
        'RATION:POST': {
            service: 'ration',
            action: 'post'
        },
        'RATION:PUT': {
            service: 'ration',
            action: 'put'
        },
        'RATION:GET': {
            service: 'ration',
            action: 'get'
        },
        'RATION:DELETE': {
            service: 'ration',
            action: 'delete'
        },
        'RATION:MOVE_UP': {
            service: 'ration',
            action: 'moveUp'
        },
        'RATION:MOVE_DOWN': {
            service: 'ration',
            action: 'moveDown'
        },
        'RATION:GET_ALL': {
            service: 'ration',
            action: 'getAll'
        }
    },
    acl: [
        {grantee: "guest", resource: "AUTH:CREATE_SESSION"},
        {grantee: "guest", resource: "AUTH:RESTORE_SESSION"},
        {grantee: "guest", resource: "AUTH:IS_SESSION_VALID"},
        {grantee: "user", resource: "AUTH:CREATE_SESSION"},
        {grantee: "user", resource: "AUTH:RESTORE_SESSION"},
        {grantee: "user", resource: "AUTH:IS_SESSION_VALID"},
        // ---------------------------------------------------------------------
        {grantee: "user", resource: "USER:GET"},
        {grantee: "user", resource: "FOODSTUFF:POST"},
        {grantee: "user", resource: "FOODSTUFF:PUT"},
        {grantee: "user", resource: "FOODSTUFF:DELETE"},
        {grantee: "user", resource: "FOODSTUFF:GET"},
        {grantee: "user", resource: "FOODSTUFF:GET_ALL"},
        {grantee: "user", resource: "FOODSTUFF:SEARCH"},
        {grantee: "user", resource: "RATION:POST"},
        {grantee: "user", resource: "RATION:PUT"},
        {grantee: "user", resource: "RATION:GET"},
        {grantee: "user", resource: "RATION:DELETE"},
        {grantee: "user", resource: "RATION:MOVE_UP"},
        {grantee: "user", resource: "RATION:MOVE_DOWN"},
        {grantee: "user", resource: "RATION:GET_ALL"}
    ]
};
