//Kind of an interface for interacting with users

const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // "Creating" errors for situations with no user and reserved username, handling will take place on the frontend part

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Already existing user' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
