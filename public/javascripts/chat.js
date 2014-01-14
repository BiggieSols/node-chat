(function(root){
  var ChatRoom = root.ChatRoom = root.ChatRoom || {};

  var Chat = ChatRoom.Chat = function(socket) {
    this.socket = socket;
  }

  Chat.prototype.sendMessage = function(message) {
    msgArr = message.split(" ");
    if(msgArr[1].slice(0,1) === "/") {
      this.performAction(msgArr)
    } else {
      this.socket.emit('message', message);
    }
    // if(msgArr[1] == "/nick") {
    //   console.log("attempting to update nickname");
    //   this.socket.emit('nicknameChangeRequest', msgArr[2]);
  }

  Chat.prototype.performAction = function(data) {
    var action = data[1];
    var param = data[2];

    switch(action) {
    case "/nick":
      console.log("attempting to update nickname");
      this.socket.emit('nicknameChangeRequest', param);
      break;
    case "/join":
      console.log("attempting to change room");
      this.socket.emit('joinRoom', param);
      break;
    default:
      console.log("default");
      this.socket.emit('errorMessage', "Not a valid command");
    }
  }
})(this);