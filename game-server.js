export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 35,
      height: 30
    }
  }

  const observers = []

  let fruitInterval = null

  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function setState(newState) {
    Object.assign(state, newState)
  }

  function startFruitSpawn(frequency) {
    clearInterval(fruitInterval)
    fruitInterval = setInterval(addFruit, frequency)
  }

  function stopFruitSpawn() {
    clearInterval(fruitInterval)
  }

  function addPlayer(command) {
    const playerId = command.playerId
    const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width)
    const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height)

    // Gerar nome único no formato "Jogador XXX"
    let playerName
    if (command && command.playerName) {
      playerName = command.playerName
    } else {
      let nameNumber
      let attempts = 0
      const maxAttempts = 1000
      
      do {
        nameNumber = Math.floor(Math.random() * 900) + 100 // Número entre 100-999 (3 dígitos)
        playerName = `Jogador ${nameNumber}`
        attempts++
        
        if (attempts >= maxAttempts) {
          // Fallback para timestamp se não conseguir gerar nome único
          playerName = `Jogador ${Date.now().toString().slice(-3)}`
          break
        }
      } while (isPlayerNameTaken(playerName))
    }

    state.players[playerId] = {
      name: playerName,
      score: 0,
      x: playerX,
      y: playerY,
    }

    notifyAll({
      type: 'add-player',
      playerId: playerId,
      playerX: playerX,
      playerY: playerY,
      playerName: playerName
    })
  }

  function isPlayerNameTaken(name) {
    for (const playerId in state.players) {
      if (state.players[playerId].name === name) {
        return true
      }
    }
    return false
  }

  function removePlayer(command) {
    const playerId = command.playerId
    delete state.players[playerId]

    notifyAll({
      type: 'remove-player',
      playerId: playerId
    })
  }

  function addFruit(command) {
    let fruitId
    if (command && command.fruitId) {
      fruitId = command.fruitId
    } else {
      do {
        fruitId = Math.floor(Math.random() * 10000000)
      } while (state.fruits[fruitId])
    }

    let fruitX, fruitY
    let attempts = 0
    const maxAttempts = 1000 // Evita loop infinito

    do {
      fruitX = command && 'fruitX' in command ? command.fruitX : Math.floor(Math.random() * state.screen.width)
      fruitY = command && 'fruitY' in command ? command.fruitY : Math.floor(Math.random() * state.screen.height)
      attempts++

      if (attempts >= maxAttempts) {
        console.warn('Could not find empty position for fruit after', maxAttempts, 'attempts')
        return // Não adiciona fruta se não encontrar posição
      }
    } while (isPositionOccupied(fruitX, fruitY))

    // Determinar tipo de fruta com probabilidade
    const fruitType = Math.random() < 0.1 ? 'red' : 'normal' // 10% chance de fruta vermelha

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
      type: fruitType
    }

    notifyAll({
      type: 'add-fruit',
      fruitId: fruitId,
      fruitX: fruitX,
      fruitY: fruitY,
      fruitType: fruitType
    })
  }

  function isPositionOccupied(x, y) {
    // Verifica se há player na posição
    for (const playerId in state.players) {
      const player = state.players[playerId]
      if (player.x === x && player.y === y) {
        return true
      }
    }

    // Verifica se há fruta na posição
    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]
      if (fruit.x === x && fruit.y === y) {
        return true
      }
    }

    return false
  }

  function removeFruit(command) {
    const fruitId = command.fruitId
    delete state.fruits[fruitId]

    notifyAll({
      type: 'remove-fruit',
      fruitId: fruitId,
    })
  }

  function movePlayer(command) {
    const acceptedMoves = {
      ArrowUp(player) {
        player.y = player.y - 1
        if (player.y < 0) {
          player.y = state.screen.height - 1 // Teleporta para a parte de baixo
        }
      },
      ArrowRight(player) {
        player.x = player.x + 1
        if (player.x >= state.screen.width) {
          player.x = 0 // Teleporta para a esquerda
        }
      },
      ArrowDown(player) {
        player.y = player.y + 1
        if (player.y >= state.screen.height) {
          player.y = 0 // Teleporta para a parte de cima
        }
      },
      ArrowLeft(player) {
        player.x = player.x - 1
        if (player.x < 0) {
          player.x = state.screen.width - 1 // Teleporta para a direita
        }
      }
    }

    const keyPressed = command.keyPressed
    const playerId = command.playerId
    const player = state.players[playerId]
    const moveFunction = acceptedMoves[keyPressed]

    if (player && moveFunction) {
      moveFunction(player)
      checkForFruitCollision(playerId)
      command.type = 'move-player'
      notifyAll(command)
    }
  }

  function checkForFruitCollision(playerId) {
    const player = state.players[playerId]

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]

      if (player.x === fruit.x && player.y === fruit.y) {
        // Adicionar pontos baseado no tipo da fruta
        const points = fruit.type === 'red' ? 5 : 1 // Fruta vermelha vale 5 pontos
        player.score += points
        
        console.log(`Player ${player.name} collected ${fruit.type} fruit for ${points} points! Total: ${player.score}`)
        
        removeFruit({ fruitId: fruitId })
        
        // Notificar sobre mudança de score
        notifyAll({
          type: 'score-update',
          playerId: playerId,
          playerName: player.name,
          score: player.score,
          points: points
        })
      }
    }
  }

  return {
    subscribe,
    setState,
    startFruitSpawn,
    stopFruitSpawn,
    addPlayer,
    removePlayer,
    movePlayer,
    state
  }
}