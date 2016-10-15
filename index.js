const App = require('express')()
const Server = require('http').Server(App)
const IO = require('socket.io')(Server)
const PORT = 8081;

const BodyParser = require('body-parser')

const Secret = require('./lib/secret')()
const SockPuppet = require('./lib/puppet')()

const Interfaces = require('os').networkInterfaces()

const NetworkIP = Object.keys(Interfaces)
  .map(key => {
    return Interfaces[key]
      .filter(connection => {
        return connection.family === 'IPv4' && !connection.internal
      })[0]
  })
  .filter(x => x)[0].address

App.use(BodyParser.urlencoded({extended: true}))

IO.on('connection', (socket) => {
  SockPuppet.init(socket)
  socket.emit('news', { hello: 'world' })

  socket.on('client', function (data) {
    console.log('client connected')
  })
})

App.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

App.post('/bouncer', (req, res) => {
  Secret.check(req.body.guess, err => {
    let resBody = {}

    if (err) {
      resBody.success = false
      resBody.message = 'no sauce for you'
      SockPuppet.emit('attempt', {
        username: req.body.username,
        guess: req.body.guess
      })
    } else {
      resBody.success = true
      resBody.message = 'GRATS YOU GET SAUCE!!!! PLAYING VIDEO ~~~ secret has been increased'

      SockPuppet.emit('video_change', {video_id: req.body.video_id})
    }
    return res.json(resBody)
  })
})

Server.listen(PORT, _ => process.stdout.write(`tube-sock-puppet server running @ http://${NetworkIP}:${PORT}\r\n`))
