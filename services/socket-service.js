
/**
 * Socket helper module
 *
 * gives us the ability to have access
 * to the socket connection with the front-end
 * anywhere we need it.
 *
 * @param  {Socket instance}
 * @return {Object} exposes interface methods
 */
module.exports = _ => {
  let socket;

  return {
    emit: (eventName, data) => {
      socket.emit(eventName, data);
    },
    init: newSocket => {
      socket = newSocket;

      socket.on('connection', function (data) {
        console.log('front-end has connected');
      });
    }
  }
}