var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("a user disconnected");
  });

  socket.on("testPing", function(msg) {
    io.emit("pinged", msg);
    console.log("pinggg!!!");
  });

  socket.on("userDrawing", function(canvasEvent) {
    io.emit("userDrew", canvasEvent);
  });
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
