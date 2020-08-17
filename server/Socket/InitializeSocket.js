const dotenv = require("dotenv");
const redis = require("../Redis/CRUD");
dotenv.config();

function SocketInitialize(io) {
  var iochatroom = io.of("/chatroom");
  iochatroom.on("connect", (socket) => {
    console.log("Connected...", socket.id);
    /*Room Join request */
    socket.on("Join", ({ Name, Room }) => {
      console.log(Room, Name);
      redis.AddUsers(Room, Name);
      socket.join(Room);
      console.log("User " + Name + " added to: " + Room);
    });
    /*Client Message */
    socket.on("client-message", ({ Name, Room, message, time }) => {
      console.log(Name, Room, message);
      redis.AddMessage(Room, Name, message, time);
      iochatroom
        .to(Room)
        .emit("message", { Name, Room, message, currenttime: time });
      console.log(time);
    });
    /*Client Disconnect */
    socket.on("disconnect", (socket) => {
      console.log("Disconnect...", socket);
      //redis.Flush();
    });
  });
}
module.exports = { SocketInitialize };
