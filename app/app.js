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

app.listen(8181);

function htmlHandler(req, res) {
    fs.readFile(__dirname + '/../public/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading html');
            }

            res.writeHead(200);
            res.end(data);
        });
}


io.of('/colorage').on('connection', function(socket) {

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