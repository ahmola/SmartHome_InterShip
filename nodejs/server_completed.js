var express = require('express');
var http = require('http');
var bodyParser= require('body-parser');
var app = express();
var count = 1;

app.set('port',process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res) {
    console.log((count++) + "번째 계산");
    var approve ={'approve_id':'NO','approve_pw':'NO'};

    var paramId = String(req.body.id)*1;
    var paramPassword = String(req.body.password)*1;
    console.log('id : '+paramId+'  pw : '+paramPassword);

    const spawn = require('child_process').spawn; // child_process 모듈의 spawn 흭득
    const argument = [paramId, paramPassword];
    const result = spawn('python', ['py_node/nodejs.py', JSON.stringify(argument)]); // python 파일 정보를 가져옴
    var output;

    result.stdout.on('data', (data)=>{
        output = {
            result: data.toString() * 1
        };

        var fs = require('fs');
        const json_output = JSON.stringify(output);
        if(count == 2){
            fs.writeFile("python_result.json", json_output + '\n', ()=>{
                console.log("Write " + json_output + " in json File");
            });
        }
        else {
            fs.appendFile("python_result.json", json_output + '\n', (error) => {
                if (error) { return console.log(err) };
                console.log("Write " + json_output + " in json File");
            });
        }
        res.send(output);
        output = data;
        var data = fs.readFile("python_result.json", 'utf8', function(err, data){
            console.log("Read JSON File!\n" + data);
            var mysql = require('mysql');
            var connection = mysql.createConnection({
                host : 'localhost',
                user : 'root',
                password : 'youngseo0@',
                database : 'app_data'
            });

            connection.connect();

            var sql = 'INSERT INTO table1 VALUES(?,?)';
            var param = ['result' + (count-1).toString(), output.toString()];
            connection.query(sql, param, function(error, result, fields){
                if(error) {console.log(error);}
                console.log(result);
            });

            connection.end();
        });
    });
});

var server = http.createServer(app).listen(app.get('port'),function(){
   console.log("Express로 웹 서버를 실행함 : "+ app.get('port')); 
});