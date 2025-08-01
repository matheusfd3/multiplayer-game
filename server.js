import express from 'express'
import { createServer } from 'node:http'
import createGame from './game-server.js'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const sockets = new Server(server)

app.use(express.static('public'))

const game = createGame()
game.startFruitSpawn(1000)

game.subscribe((command) => {
  console.log(`> Emitting ${command.type}`)
  sockets.emit('game-update', game.state)
})

sockets.on('connection', (socket) => {
  const playerId = socket.id
  console.log(`> Player connected: ${playerId}`)

  game.addPlayer({ playerId: playerId })

  socket.emit('setup', game.state)

  socket.on('disconnect', () => {
    game.removePlayer({ playerId: playerId })
    console.log(`> Player disconnected: ${playerId}`)
  })

  socket.on('move-player', (command) => {
    command.playerId = playerId
    command.type = 'move-player'
    
    game.movePlayer(command)
  })
})

server.listen(3000, () => {
  console.log(`> Server listening on port: 3000`)
})