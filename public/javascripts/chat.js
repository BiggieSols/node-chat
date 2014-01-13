(function(root){
  var ChatRoom = root.ChatRoom = root.ChatRoom || {};

  var Chat = ChatRoom.Chat = function(socket) {
    this.socket = socket;
  }

  Chat.prototype.sendMessage = function(message) {
    this.socket.emit('message', message);
  }
})(this)