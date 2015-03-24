var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 5000;
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/assets'));


var usernames= {};

io.on('connection', function(socket) {
	console.log("alguien se conecto");
	var addedUser = false;

	socket.on('add connection', function(name) {
		if(usernames[name]){
			addedUser= false;
			socket.emit("already exist");
		}else{
		addedUser= true;
		usernames[name]= name;
		socket.user= name;
		console.log("Se conecto " + name);
		socket.broadcast.emit("add user", name);
		socket.emit("connect user", true);
		}
	});
	socket.on('message', function(message) {
	  console.log("nuevo mensaje");
	  var data = {username: socket.user,
     			 message: message};

	  socket.broadcast.emit("send message", data)
	});

	socket.on('disconnect', function() {
		socket.broadcast.emit("user desconected", socket.user);
		if (addedUser) delete usernames[socket.user];
	  console.log("alguien se desconecto");
	});
});



http.listen(port,function(){
 console.log("port:5000")
});