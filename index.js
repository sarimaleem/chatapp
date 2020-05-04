var app = require('express')();
const express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.use(express.static('public'))

io.on('connection', function(serverSocket){
    
    serverSocket.broadcast.emit('join', serverSocket.id)
    serverSocket.on('chat message', function(msg){
    serverSocket.broadcast.emit('chat message', msg);
  });
  
  serverSocket.on('joinRoom', ({username, room}) => {
    serverSocket.join(room)
    
  })

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
