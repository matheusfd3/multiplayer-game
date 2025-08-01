export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId) {
  const context = screen.getContext('2d')
  context.fillStyle = 'white'
  context.globalAlpha = 1
  context.fillRect(0, 0, game.state.screen.width, game.state.screen.height)

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId]
    context.fillStyle = 'black'
    context.globalAlpha = 0.1
    context.fillRect(player.x, player.y, 1, 1)
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId]
    
    // Escolher cor baseada no tipo da fruta
    if (fruit.type === 'red') {
      context.fillStyle = 'red'
    } else {
      context.fillStyle = 'green'
    }
    
    context.globalAlpha = 1
    context.fillRect(fruit.x, fruit.y, 1, 1)
  }

  const currentPlayer = game.state.players[currentPlayerId]

  if(currentPlayer) {
    context.fillStyle = '#F0DB4F'
    context.globalAlpha = 1
    context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
  }

  requestAnimationFrame(() => {
    renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
  })
}