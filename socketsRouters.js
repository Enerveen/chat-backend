const { onJoin, onSendMessage, onDisconnect } = require('./sockets');

const handleSockets = (socket, io) => {
  //handling of new user joining chat room

  socket.on('join', ({ name, room }, callback) =>
    onJoin({ name, room }, callback, socket, io)
  );

  //handling of new message

  socket.on('sendMessage', (message, callback) =>
    onSendMessage(message, callback, socket, io)
  );

  //handling of user disconnection

  socket.on('disconnect', () => onDisconnect(socket, io));
};

module.exports = handleSockets;
