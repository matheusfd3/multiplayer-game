export default function createGame() {
  let myPlayerId = ""
  const state = {}
  const observers = []
  
  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function unsubscribeAll() {
    observers.length = 0
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function registerPlayerId(playerId) {
    myPlayerId = playerId
  }

  function setState(newState) {
    Object.assign(state, newState)
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
    const player = state.players[myPlayerId]
    const moveFunction = acceptedMoves[keyPressed]

    if (player && moveFunction) {
      moveFunction(player)
      checkForFruitCollision(myPlayerId)
      notifyAll({
        type: 'move-player',
        playerId: myPlayerId,
        keyPressed: keyPressed
      })
    }
  }

  function checkForFruitCollision(playerId) {
    const player = state.players[playerId]

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId]

      if (player.x === fruit.x && player.y === fruit.y) {
        // Adicionar pontos baseado no tipo da fruta
        const points = fruit.type === 'red' ? 5 : 1 // Fruta vermelha vale 5 pontos
        const soundPath = fruit.type === 'red' ? './collect-red.mp3' : './collect-green.mp3'

        playCollectSound(soundPath)
        addScore(playerId, points)
        removeFruit({ fruitId: fruitId })
        updateLeaderboard()
      }
    }
  }

  function playCollectSound(path) {
    try {
      const audio = new Audio(path)
      audio.play().catch(error => {
        console.log('Could not play collect sound:', error)
      })
    } catch (error) {
      console.log('Error creating audio:', error)
    }
  }

  function addScore(playerId, points) {
    const player = state.players[playerId]
    player.score += points
  }

  function removeFruit(command) {
    const fruitId = command.fruitId
    delete state.fruits[fruitId]
  }

  function updateLeaderboard() {
    const players = state.players

    // Converter para array e ordenar por pontos
    const playersArray = Object.keys(players).map(playerId => ({
      id: playerId,
      name: players[playerId].name,
      score: players[playerId].score
    }))

    // Ordenar por pontos (maior para menor)
    playersArray.sort((a, b) => b.score - a.score)

    // Pegar apenas os top 10
    const top10 = playersArray.slice(0, 10)

    // Atualizar tabela
    const tbody = document.getElementById('leaderboard-body')
    tbody.innerHTML = ''

    top10.forEach((player, index) => {
      const rank = index + 1
      const row = document.createElement('tr')

      // Adicionar classe para top 3
      if (rank <= 3) {
        row.className = `rank-${rank}`
      }

      // Destacar meu player
      if (player.id === myPlayerId) {
        row.className += (row.className ? ' ' : '') + 'my-player'
      }

      row.innerHTML = `
        <td>${rank}</td>
        <td>${player.name}</td>
        <td>${player.score}</td>
      `

      tbody.appendChild(row)
    })
  }

  return {
    subscribe,
    unsubscribeAll,
    registerPlayerId,
    movePlayer,
    updateLeaderboard,
    state,
    setState
  }
}