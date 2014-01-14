var socketIO = require('socket.io');
var numGuests = 0;
var nickNames = {}; //{socketId: nickName}
var currentRooms = {}; //{socketId: roomName}
var _ = require('underscore');



var roomMembers = function(room) {
  var room_members = [];

  _.pairs(currentRooms).forEach(function(pair) {
    if(pair[1] === room) {
      room_members.push(nickNames[pair[0]]);
    }
  });
  return room_members;
}


var createChat = function(server){
  var io = socketIO.listen(server);

  var joinRoom = function(socket, room) {
    io.sockets.in(room).emit('message', nickNames[socket.id] + " has joined the room");
    socket.join(room);
    currentRooms[socket.id] = room;
    socket.emit("message", "You have joined " + room);
    socket.emit("loadRoom", roomMembers(room));
  }

  io.sockets.on('connection', function (socket) {
    numGuests ++;
    var defaultNickname = "guest_" + numGuests;
    socket.emit("nicknameChangeRequest", defaultNickname);
    nickNames[socket.id] = defaultNickname;
    joinRoom(socket, 'lobby');

    socket.on('message', function (data) {
      var room = currentRooms[socket.id];
      io.sockets.in(room).emit('message', data);
    });

    socket.on('joinRoom', function (room) {
      joinRoom(socket, room);
    });

    socket.on('errorMessage', function(data) {
      console.log(data);
      socket.emit("message", data);
    });

    socket.on('nicknameChangeRequest', function(data) {
      if(_.contains(_.values(nickNames), data)) {
        socket.emit("message", "nickname already taken");
      } else if(data.slice(0, 6) === "guest_") {
        socket.emit("message", "nickname cannot start with 'guest'");
      } else {
        socket.emit("nicknameChangeRequest", data);
        socket.emit("message", "nickname changed to " + data);
        nickNames[socket.id] = data;
      }
    })
  });
}

exports.createChat = createChat;

