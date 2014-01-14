(function(root){
  var ChatRoom = root.ChatRoom = root.ChatRoom || {};

  var Chat = ChatRoom.Chat = function(socket) {
    this.socket = socket;
  }

  Chat.prototype.sendMessage = function(message) {
    msgArr = message.split(" ");
    if(msgArr[1] == "/nick") {
      console.log("attempting to update nickname");
      this.socket.emit('nicknameChangeRequest', msgArr[2]);
    } else {
      this.socket.emit('message', message);
    }
  }
})(this)