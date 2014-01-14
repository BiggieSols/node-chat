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
var numGuests = 0;
var nickNames = {};

var createChat = function(server){
  var io = socketIO.listen(server);

  io.sockets.on('connection', function (socket) {
    numGuests ++;
    socket.emit("nicknameChangeRequest", "guest_" + numGuests);

    socket.on('message', function (data) {
      io.sockets.emit('message', data);
    });

    socket.on('nicknameChangeRequest', function(data) {
      if(nickNames[data]) {
        socket.emit("message", "nickname already taken");
      } else if(data.slice(0, 6) === "guest_") {
        socket.emit("message", "nickname cannot start with 'guest'");
      } else {
        socket.emit("nicknameChangeRequest", data);
        socket.emit("message", "nickname changed to " + data);
        nickNames[data] = true;
      }
    })
  });
}

exports.createChat = createChat;