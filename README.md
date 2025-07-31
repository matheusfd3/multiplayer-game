# Multiplayer Game

Um jogo multiplayer simples em tempo real desenvolvido com Node.js, Express, Socket.IO e Canvas HTML5.

## 📋 Descrição

Este é um jogo multiplayer onde os jogadores controlam personagens em uma grade 10x10 e coletam frutas que aparecem aleatoriamente no mapa. O jogo utiliza WebSockets para comunicação em tempo real entre o servidor e os clientes.

## 🎮 Como Jogar

- Use as **setas do teclado** para mover seu personagem
- **Colete frutas verdes** que aparecem no mapa
- Seu personagem é destacado em **amarelo (#F0DB4F)**
- Outros jogadores aparecem em **preto**

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Socket.IO** - Comunicação em tempo real via WebSockets
- **HTML5 Canvas** - Renderização do jogo
- **ES6 Modules** - Modularização do código

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

3. Inicie o servidor:
```bash
node server.js
```

4. Abra seu navegador e acesse:
```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
multiplayer-game/
├── public/
│   ├── game.js              # Lógica principal do jogo
│   ├── index.html           # Interface do cliente
│   ├── keyboard-listener.js # Gerenciamento de eventos do teclado
│   └── render-screen.js     # Renderização da tela do jogo
├── server.js                # Servidor Express com Socket.IO
├── package.json            # Configurações e dependências
└── README.md               # Documentação do projeto
```

## 🎲 Mecânicas do Jogo

1. **Conexão**: Quando um jogador se conecta, recebe um ID único
2. **Spawn**: Jogadores aparecem em posições aleatórias na grade 10x10
3. **Movimento**: Limitado aos limites da tela (0-9 em X e Y)
4. **Frutas**: Aparecem automaticamente a cada 2 segundos em posições aleatórias
5. **Colisão**: Quando um jogador toca uma fruta, ela é removida do mapa
6. **Desconexão**: Jogadores são removidos automaticamente ao desconectar

## 🚧 Possíveis Melhorias

- [ ] Aumentar o tamanho do mapa
- [ ] Teleportar o jogador nas bordas do mapa
- [ ] Sistema de pontuação
- [ ] Leaderboard (top 10)
- [ ] Total de jogadores conectados
- [ ] Efeitos visuais e sonoros
- [ ] Diferentes tipos de frutas com valores distintos
- [ ] Rota de admin
  - [ ] Define a quantidade de frutas geradas por milisegundo
  - [ ] Inicia ou interrompe a geração de frutas
  - [ ] Inicia ou interrompe o 'crazy mode' (modo louco)
  - [ ] Zera a pontuação de todos os jogadores
  - [ ] Define o limite de jogadores conectados
  - [ ] Adiciona ou remove obstáculos no mapa

## 👨‍💻 Autor

**Matheus** - [matheusfd3](https://github.com/matheusfd3)