import * as GameBrain from 'game.js'
import * as UI from 'ui.js'
let title = document.createElement('h1')
title.textContent = 'Tic Tac Two'
title.className = 'title'
document.body.appendChild(title)    
let game = new GameBrain.GameBrain()
let board = UI.visualizeBoard(game)
document.body.appendChild(board)



