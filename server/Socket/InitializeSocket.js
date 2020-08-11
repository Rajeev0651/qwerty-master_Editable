const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

function SocketInitialize(io) {
  io.on("connect", (socket) => {
    console.log("Connected...", socket.id);
    socket.on("message.send", (data) => {
      io.emit("message.sent", data);
    });

    socket.on("disconnect", (socket) => {
      console.log("Disconnect...", socket);
    });
  });
}
module.exports = { SocketInitialize };
