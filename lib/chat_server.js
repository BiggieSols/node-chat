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
var nickNames = {}; //{socketId: nickName}
var currentRooms = {}; //{socketId: roomName}
var _ = require('underscore');

var joinRoom = function(socket, room) {
  socket.join(room);
  currentRooms[socket.id] = room;
}

var createChat = function(server){
  var io = socketIO.listen(server);

  io.sockets.on('connection', function (socket) {
    numGuests ++;
    socket.emit("nicknameChangeRequest", "guest_" + numGuests);
    joinRoom(socket, 'lobby');

    socket.on('message', function (data) {
      var room = currentRooms[socket.id];
      io.sockets.in(room).emit('message', data);
    });

    socket.on('joinRoom', function (data) {
      joinRoom(socket, data);
      socket.emit("message", "You have joined " + data);
      io.sockets.in(data).emit("A user has joined the room");
    });

    socket.on('nicknameChangeRequest', function(data) {
      // console.log("existing nicknames are " + _.keys(nickNames));
      // console.log("new name is " + data);
      //
      if(_.contains(_.values(nickNames), data)) {
        socket.emit("message", "nickname already taken");
      } else if(data.slice(0, 6) === "guest_") {
        socket.emit("message", "nickname cannot start with 'guest'");
      } else {
        socket.emit("nicknameChangeRequest", data);
        socket.emit("message", "nickname changed to " + data);
        nickNames[socket.id] = data;
      }

      socket.on('errorMessage', function(data) {
        socket.emit("message", data);
      })
    })
  });
}

exports.createChat = createChat;