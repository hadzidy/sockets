var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 5000;
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'));




io.on('connection', function(socket) {
	console.log("alguien se conecto");
	socket.on('add connection', function(name) {
		console.log("Se conecto " + name);
		socket.broadcast.emit("add user", name);
	});
	socket.on('disconnect', function() {
	  console.log("alguien se desconecto");
	});
});



http.listen(port,function(){
 console.log("port:5000")
});