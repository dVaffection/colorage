var serviceLocator,
    config,
    bootstrap,
    async = require('async');
if (typeof serviceLocator === 'undefined') {
    config = require('./config/index');
    bootstrap = require('./bootstrap');
    serviceLocator = bootstrap(config);
}

var app = require('http').createServer(htmlHandler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(config.port);
console.log('http://localhost:' + config.port);

function htmlHandler(req, res) {
    var filename = __dirname + '/../public/';
    var code;
    switch (req.url) {
        case '/' :
            filename += 'index.html';
            break;
        case '/login/' :
            filename += 'login.html';
            break;
        default :
            code = 404;
            filename += '404.html';
            break;
    }

    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading html');
        }

        res.writeHead(code || 200);
        res.end(data);
    });
}


// send minified client
io.enable('browser client minification');
io.of('/colorage').on('connection', function (socket) {
    if (typeof serviceLocator.socket === 'undefined') {
        serviceLocator.register('socket', socket);
    }

    socket.on('default', function (data) {
        var grantee = 'guest',
            sessionId = serviceLocator.socket.clientSessionId,
            mapperUsers = serviceLocator['UsersMapper'](),
            mapperSessions = serviceLocator['SessionsMapper']();

        function getSession(callback) {
            mapperSessions.get(sessionId, callback);
        }

        function getUser(session, callback) {
            if (session) {
                mapperUsers.getById(session.userId, callback);
            } else {
                callback('Session was not found');
            }
        }

        async.waterfall([
            getSession,
            getUser
        ], function (err, user) {
            if (err) {
                console.log(err);
            } else {
                // for now roles are flat either authroized or not
                grantee = user ? 'user' : 'guest';
            }

            console.log('clientSessionId:', sessionId);
            console.log('Grantee: ', grantee);

            var config = require('./config/index'),
                api = require('./api'),
                request = new api.request(data),
                router = new api.router(serviceLocator, grantee, serviceLocator.acl());

            router.dispatch(config.routes, request, function (response) {
                socket.emit(response.getNS(), response.export(request));
            });

//                    socket.broadcast.emit('broadcast', response);
        });
    });
});
