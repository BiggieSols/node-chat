var http = require("http");

var fs = require("fs");
var path = require("path");
// var mime = require("mime");
var chat = require("./lib/chat_server.js")

// var router = require("./router.js")

var server = http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});

  console.log(req.url);
  // res.end("Hello, world");
  var filePath = "";
  if(req.url === "/") {
    filePath = './public/index.html'
  } else {
    filePath = '.' + req.url;
  }

  fs.readFile(filePath, {encoding: 'utf8'}, function(err, data) {
    if(err) {
      res.statusCode = 404;
      res.end("File not found");
      console.log("error!")
    } else {
      console.log(data);
      res.end(data);
    }
  });
});

server.listen(8080);

console.log("server running!");

chat.createChat(server);