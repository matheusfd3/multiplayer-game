import express from 'express'
import { createServer } from 'node:http';
import createGame from './public/game.js'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()

console.log(game.state)

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`> Player connected on Server with id: ${playerId}`)

  socket.emit('setup', game.state)
})

server.listen(3000, () => {
  console.log(`> Server listening on port: 3000`)
})