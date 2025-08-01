# Multiplayer Game

Um jogo multiplayer em tempo real desenvolvido com Node.js, Express, Socket.IO e Canvas HTML5.

## 📋 Descrição

Este é um jogo multiplayer onde os jogadores controlam personagens e coletam frutas que aparecem aleatoriamente no mapa. O jogo possui sistema de pontuação, leaderboard em tempo real, diferentes tipos de frutas e efeitos sonoros.

## 🎮 Como Jogar

- Use as **setas do teclado** para mover seu personagem
- **Colete frutas** que aparecem no mapa:
  - 🟢 **Frutas verdes** = 1 ponto
  - 🔴 **Frutas vermelhas** = 5 pontos (mais raras)
- Seu personagem é destacado em **amarelo**
- **Teleporte**: Passe pelas bordas da tela para aparecer do lado oposto
- Acompanhe sua posição no **Top 10 Leaderboard**
- adversários são destacados em **preto semi-transparente**

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web  
- **Socket.IO** - Comunicação em tempo real via WebSockets
- **HTML5 Canvas** - Renderização do jogo
- **ES6 Modules** - Modularização do código
- **Nodemon** - Auto-restart do servidor em desenvolvimento

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/matheusfd3/multiplayer-game.git
cd multiplayer-game
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor em modo desenvolvimento:
```bash
npm run dev
```

Ou para produção:
```bash
npm start
```

4. Abra seu navegador e acesse:
```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
multiplayer-game/
├── public/
│   ├── game.js              # Lógica principal do cliente
│   ├── index.html           # Interface do cliente
│   ├── keyboard-listener.js # Gerenciamento de eventos do teclado
│   ├── render-screen.js     # Renderização da tela
│   ├── collect-green.mp3    # Som de coleta - fruta verde
│   └── collect-red.mp3      # Som de coleta - fruta vermelha
├── game-server.js           # Lógica principal do servidor
├── server.js                # Servidor Express com Socket.IO
├── package.json            # Configurações e dependências
└── README.md               # Documentação do projeto
```

## 🎲 Mecânicas do Jogo

### ⚡ Jogadores
1. **Conexão**: Cada jogador recebe um ID único e nome automático ("Jogador XXX")
2. **Spawn**: Jogadores aparecem em posições aleatórias
3. **Movimento**: Teleporte nas bordas - passe por uma parede para aparecer do lado oposto
4. **Identificação Visual**: 
   - Seu player: Amarelo
   - Outros: Preto semi-transparente

### 🍎 Sistema de Frutas
5. **Spawn automático**: Frutas aparecem automaticamente em posições vazias
6. **Tipos de fruta**:
   - **Verde** (90% chance): 1 ponto + som
   - **Vermelha** (10% chance): 5 pontos + som diferente

### 🏆 Sistema de Pontuação
7. **Pontuação em tempo real**: Score atualizado instantaneamente
8. **Leaderboard**: Top 10 jogadores com ranking dinâmico
9. **Identificação pessoal**: Seu player destacado na tabela

## 👨‍💻 Autor

**Matheus** - [matheusfd3](https://github.com/matheusfd3)