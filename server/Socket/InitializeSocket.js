const dotenv = require("dotenv");
const redis = require("../Redis/CRUD");
dotenv.config();

function SocketInitialize(io) {
  var iochatroom = io.of("/chatroom");

  iochatroom.on("connect", (socket) => {
    console.log("Connected...", socket.id);
    /*Room Join request */
    socket.on("Join", ({ Name, Room, UserId }) => {
      console.log(Room, Name);
      redis.RedisAddUsers(true, Room ,UserId, Name);
      socket.join(Room);
      console.log("User " + Name + " added to: " + Room);
    });
    /*Client Message */
    socket.on("client-message", ({ Name, UserId, Room, message, time }) => {
      console.log(Name, Room, message, time);
      redis.RedisAddMessage(true, Room, UserId, Name, message, time);
      iochatroom
        .to(Room)
        .emit("message", { Name, Room, message, currenttime: time });
    });
    /*Client Disconnect */
    socket.on("disconnect", (socket) => {
      console.log("Disconnect...", socket);
    });
  });
}
module.exports = { SocketInitialize };
