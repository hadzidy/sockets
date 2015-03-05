var http = require('http');
var port = process.env.PORT || 5000;

http.createServer(function(req, res) {
    res.end('Hola mundo');
}).listen(port,function(){
 console.log("ando en puerto 5000");
});