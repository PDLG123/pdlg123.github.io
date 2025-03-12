export function visualizeBoard(game) {
    if (game.gameOver) {
        let winner = document.createElement('div')
        winner.className = 'winner'
        winner.textContent = `${game.winner} wins!`
        let reloadButton = document.createElement('button');
        reloadButton.textContent = 'Re-Play';
        reloadButton.className = 'reload-button';
        reloadButton.addEventListener('click', () => {
        location.reload();
        });

        winner.appendChild(reloadButton);
        return winner
    }
    createButtons(game);
    let boardElement = document.createElement('div');
    boardElement.className = 'board';
    for (let row = 0; row < 5; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = game.board[row][col];

            let clickTimeout;
            cell.addEventListener('click', () => {
                    game.makeMove(row, col);
                    resetBoard(game);
            });

            cell.addEventListener('auxclick', (event) => {
                if (event.button === 1) {
                    game.moveGrid(row - 1, col - 1);
                    resetBoard(game);
                }
            });

            rowElement.appendChild(cell);

            // Highlight the inner-grid
            if ((game.gridStartx <= row && row < game.gridStartx + 3) && (game.gridStarty <= col && col < game.gridStarty + 3)) {
                cell.classList.add('win-cell');
            }
        }
        boardElement.appendChild(rowElement);
    }
    return boardElement;
}

function createButtons(game) {
    let buttons = document.createElement('div');
    buttons.className = 'buttons';
    let resetBtn = resetButton(game);
    buttons.appendChild(resetButton(game));
    let AIButton = AIMakeMove(game);
    buttons.appendChild(AIButton);
    document.body.appendChild(buttons);
}

function resetButton(game) { 
    let resetButton = document.createElement('button')
    resetButton.textContent = 'Reset Game'
    resetButton.className = 'reset-button'
    resetButton.addEventListener('click', () => {
        game.resetGame()
        resetBoard(game)
    })
    return resetButton
} 

function AIMakeMove(game) {
    let AIButton = document.createElement('button')
    AIButton.textContent = 'AI Move'
    AIButton.className = 'AI-button'
    AIButton.addEventListener('click', () => {
        game.AIMakeMove()
        resetBoard(game)
    })
    return AIButton
}

function resetBoard(game) {
    let board = document.querySelector('.board')
    let winner = document.querySelector('.winner')
    let buttons = document.querySelector('.buttons')
    if (board) {
        document.body.removeChild(board)
        if (winner) {
            document.body.removeChild(winner)
        }
        if (buttons) {
            document.body.removeChild(buttons)
        }
            
        board = visualizeBoard(game)
        document.body.appendChild(board)
    }
}