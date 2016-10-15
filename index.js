const App = require('express')()
const Server = require('http').Server(App)
const IO = require('socket.io')(Server)

App.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
})

App.post('/bouncer', (req, res) => {
  console.log('req.body: ', req.body);
})

IO.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

Server.listen(8081)