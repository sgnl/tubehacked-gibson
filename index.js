const App = require('express')()
const Server = require('http').Server(App)
const IO = require('socket.io')(Server)
const BodyParser = require('body-parser')
const Secret = require('./lib/secret')()

App.use(BodyParser.urlencoded({extended: true}))

App.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

App.post('/bouncer', (req, res) => {
  Secret.check(req.body.guess, err => {
    let resBody = {}

    if (err) {
      resBody.success = false
      resBody.message = 'no sauce for you'
    } else {
      resBody.success = true
      resBody.message = 'GRATS YOU GET SAUCE!!!! PLAYING VIDEO ~~~ secret has been increased'
    }

    return res.json(resBody)
  })
})

IO.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

Server.listen(8081)

