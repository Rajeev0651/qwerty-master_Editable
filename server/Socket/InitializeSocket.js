const dotenv = require("dotenv");
const redis = require("../Redis/CRUD");
dotenv.config();

function SocketInitialize(io) {
  var iochatroom = io.of("/chatroom");

  iochatroom.on("connect", (socket) => {
    console.log("Connected...", socket.id);
    let ClientRoom
    /*Room Join request */
    socket.on("Join", ({ Name, Room, UserId }) => {
      console.log(Room, Name);
      ClientRoom = Room
      redis.RedisAddUsers(true, Room ,UserId, Name);
      redis.RedisContentUpdate(Room, 1, 0, 0)
      socket.join(Room);
      redis.RedisSetContentEngagement(Room)
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
    socket.on("disconnect", () => {
      console.log("Disconnect...", socket.id +" "+ ClientRoom)
      redis.RedisRemoveContentEngagement(ClientRoom)
    });
  });
}
module.exports = { SocketInitialize };
