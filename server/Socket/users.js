const { addRoom } = require("./room");
const users = [];

const addUser = ({ id, name, room }) => {
  console.log(id, name, room);
  if (name != null && room != null) {
    name = name.toLowerCase();
    room = room.toLowerCase();
  } else {
    return { error: "Username and room are required." };
  }
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "Username and room are required." };

  const user = { id, name, room };

  users.push(user);
  addRoom(room);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
