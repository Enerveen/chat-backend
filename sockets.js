const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const onJoin = ({ name, room }, callback, socket, io) => {
  const { error, user } = addUser({ id: socket.id, name, room });

  if (error) return callback(error);

  socket.join(user.room);

  socket.emit('message', {
    user: 'system',
    text: `${user.name}, welcome to ${user.room}.`,
  });
  socket.broadcast
    .to(user.room)
    .emit('message', { user: 'system', text: `${user.name} has joined!` });

  io.to(user.room).emit('roomData', {
    room: user.room,
    users: getUsersInRoom(user.room),
  });

  callback();
};

const onSendMessage = (message, callback, socket, io) => {
  const user = getUser(socket.id);

  io.to(user.room).emit('message', { user: user.name, text: message });

  callback();
};

const onDisconnect = (socket, io) => {
  const user = removeUser(socket.id);

  if (user) {
    io.to(user.room).emit('message', {
      user: 'system',
      text: `${user.name} has left.`,
    });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  }
};

module.exports = { onJoin, onSendMessage, onDisconnect };
