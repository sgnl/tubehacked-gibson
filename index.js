const Express = require('express');
const App = Express();
const Server = require('http').Server(App);
const IO = require('socket.io')(Server);

const BodyParser = require('body-parser');

const Secret = require('./lib/secret')();
const SockPuppet = require('./lib/puppet')();

App.use(Express.static('public'));
App.use(BodyParser.urlencoded({extended: true}));

IO.on('connection', socket => {
  SockPuppet.init(socket);
});

App.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

App.post('/bouncer', (req, res) => {
  Secret.check(req.body.guess, err => {
    let resBody = {};
    let payload = {
      username: req.body.username,
      guess: req.body.guess
    };

    if (err) {
      resBody.success = false;
      resBody.message = 'no sauce for you';

      payload.success = false;
      SockPuppet.emit('attempt', payload);

    } else {
      resBody.success = true;
      resBody.message = 'GRATS YOU GET SAUCE!!!! PLAYING VIDEO ~~~ secret has been increased';

      payload.success = true;
      payload.video_id = req.body.video_id;
      SockPuppet.emit('video_change', payload);
    }

    return res.json(resBody);
  });
});

const PORT = 8081;

// get network IP to print to terminal
const Interfaces = require('os').networkInterfaces();
const NetworkIP = Object.keys(Interfaces)
  .map(key => {
    return Interfaces[key]
      .filter(connection => {
        return connection.family === 'IPv4' && !connection.internal;
      })[0];
  })
  .filter(x => x)[0].address;

Server.listen(PORT, _ => {

  process.stdout.write(`
    tube-sock-puppet server running
    http://${NetworkIP}:${PORT}
  \r\n`);
});
