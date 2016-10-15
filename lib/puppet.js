module.exports = _ => {
  let socket;

  return {
    emit: (eventName, data) => {
      socket.emit(eventName, data);
    },
    init: newSocket => {
      socket = newSocket;

      socket.on('client', function (data) {
        console.log('client connected');
      });
    }
  }
}