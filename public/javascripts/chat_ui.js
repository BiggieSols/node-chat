var socket = io.connect();

var chat = new ChatRoom.Chat(socket);

var getInput = function() {
  var message = $('#message').val();
  $('#message').val("");
  return message;

};

var sendMessage = function(message) {
  chat.sendMessage(message);
};

var displayMessage = function(message) {
  // alert(message);
  $('#chatRoom').prepend("<div>"+message+"</div>");
}

$(function (){
  $("form").on("submit", function(event) {
    console.log(event);

    event.preventDefault();
    var message = getInput();
    sendMessage(message);
    displayMessage(message);
  })
})