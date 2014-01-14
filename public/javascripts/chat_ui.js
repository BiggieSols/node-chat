var socket = io.connect();

var chat = new ChatRoom.Chat(socket);

var getInput = function() {
  var message = $('#message').val();
  $('#message').val("");
  return message;
};

var sendMessage = function(message) {
  var data = $('#nickname').text() + ": " + message
  chat.sendMessage(data);
};

var displayMessage = function(message) {
  // alert(message);
  $('#chatRoom').prepend("<div>"+message+"</div>");
}

var changeNickname = function(nickName) {
  $('#nickname').text(nickName)
}

$(function (){
  $("form").on("submit", function(event) {
    console.log(event);

    event.preventDefault();
    var message = getInput();
    sendMessage(message);
  })

  socket.on('message', function(data){
    displayMessage(data);
  });

  socket.on("nicknameChangeRequest", function(data) {
    changeNickname(data);
  });
});

