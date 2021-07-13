const spawn = require('child_process').spawn; // child_process 모듈의 spawn 흭득
const result = spawn('python', ['py_node/nodejs.py']); // python 파일 정보를 가져옴
var output;

result.stdout.on('data', function(data){    // python파일의 출력결과를 가져옴
    output = data.toString();
    console.log(output);    
});

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var clients = [];

server.listen(3000, ()=>{
    console.log('Socket IO Server listening on port 3000');
});

io.on('connection', function(socket){
    clients.push(socket);
    console.log("New Client");

    socket.on('disconnect', function(data){
        console.log('Disconnected');

        var i = clients.indexOf(socket);
        clients.splice(i, 1);
    });

    socket.on('SEND', function(data){
        console.log("ID와 패스워드 : "+ data.message);
        data.message = output.toString();
        socket.emit('SEND', data); 
    });
});