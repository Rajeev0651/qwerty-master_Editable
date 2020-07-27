const room_data = [];

const addRoom = (room) => {
  room = room.trim().toLowerCase();
  const existingUser = room_data.find((roomObj) => roomObj === room);
  if(existingUser===undefined)
  {
    room_data.push(room)
    console.log(room_data)
  }
};

module.exports = { addRoom };