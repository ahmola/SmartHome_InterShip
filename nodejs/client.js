<<<<<<< HEAD
const spawn = require('child_process').spawn; // child_process 모듈의 spawn 흭득
const argument = [5, 3.141592/2];
const result = spawn('python', ['py_node/nodejs.py', JSON.stringify(argument)]); // python 파일 정보를 가져옴
var output;

result.stdout.on('data', function (data) {    // python파일의 출력결과를 가져옴
    output = {
        result: data.toString() * 1
    };

    var http = require('http');
    var fs = require('fs');
    const json_output = JSON.stringify(output);
    fs.writeFile('python_result.json', json_output, () => {
        console.log('python_result.json is written! : ' + output['result']);
    });
    var socketio = require('socket.io');
    
    var server = http.createServer(function (request, response) {
        response.writeHead(400);
        fs.readFile('python_result.json', function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        });
    }).listen(3000, () => {
        console.log("Server Running at http://172.30.1.2:3000");
        var os = require('os');
        function getServerIp() {
            var ifaces = os.networkInterfaces();
            var result = '';
            for (var dev in ifaces) {
                var alias = 0;
                ifaces[dev].forEach(function (details) {
                    if (details.family == 'IPv4' && details.internal === false) {
                        result = details.address;
                        ++alias;
                    }
                });
            }
            return result;
        }
        console.log(getServerIp());
    });
     
    var io = socketio.listen(server);
    io.sockets.on('connection', (socket) => {
        console.log("Connected!");
    });
=======
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
>>>>>>> 9ea6a00278254b4bc68921b05aa288e0a79929a2
});