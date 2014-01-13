// var app = require('http').createServer(handler)

  // , fs = require('fs')

//Socket.io is required in chat_server.js
//HTTP is required in server.js

//This will be in your server.js file
// app.listen(80);
//
// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//
//     res.writeHead(200);
//     res.end(data);
//   });
// }

//This will be in your chat_server.js file

var socketIO = require('socket.io');

var createChat = function(server){
  var io = socketIO.listen(server);

  io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('message', function (data) {
      console.log(data);
    });
  });
}

exports.createChat = createChat;