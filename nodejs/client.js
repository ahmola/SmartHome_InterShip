var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(request, response){
    fs.readFileSync('index.html', function(error, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
}).listen(3000, function(){
    console.log('server running 3000');
});

var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
    console.log("connected!");
});