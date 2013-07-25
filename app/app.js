var serviceLocator;
if (typeof serviceLocator === 'undefined') {
    var config = require('./config/index');
    var bootstrap = require('./bootstrap');
    serviceLocator = bootstrap(config);
}

var app = require('http').createServer(htmlHandler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    ;

app.listen(require('./config/index').port);

function htmlHandler(req, res) {
    var filename;
    var code;
    switch (req.url) {
        case '/' :
            filename = __dirname + '/../public/index.html';
            break;
        case '/login/' :
            filename = __dirname + '/../public/login.html';
            break;
        default :
            code = 404;
            filename = __dirname + '/../public/404.html';
            break;
    }
    
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading html');
        }

        res.writeHead(code ? code : 200);
        res.end(data);
    });
}


io.of('/colorage').on('connection', function(socket) {

//    socket.get('auth', function(err, value) {
//        console.log('handshake:', socket.handshake);
//        console.log('Auth:', value);
//
//        if (!value) {
//            // auth
//            var value = {userId: 12345678};
//            socket.set('auth', value, function() {
//
//            });
//        } else {
//
//        }
//    });


    socket.on('default', function(data) {
        var config = require('./config/index');
        var api = require('./api');

        var request = new api.request(data);
        var router = new api.router(serviceLocator);

        router.dispatch(config.routes, request, function(response) {
            socket.emit('default', response.export(request));
        });

//        socket.broadcast.emit('broadcast', response);

    });
});