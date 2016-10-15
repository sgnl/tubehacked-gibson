const App = require('express')()
const Server = require('http').Server(App)
const IO = require('socket.io')(Server)
const BodyParser = require('body-parser')

App.use(BodyParser.urlencoded({extended: true}))

App.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

App.post('/bouncer', (req, res) => {
  res.json(req.body)
})

IO.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

Server.listen(8081)