export class GameBrain {
    board = Array.from({ length: 5 }, () => Array(5).fill(''))
    currentPlayer = 'X'
    gridStartx = 1
    gridStarty = 1
    movesMade = {'X': 0, 'O': 0}
    removedButton = false
    gameOver = false
    winner = ''
    makeMove(row, col) {
        if (this.gameOver) {
            return
        }
        if (this.board[row][col] === '' && this.movesMade[this.currentPlayer] < 5) {      
            this.movesMade[this.currentPlayer]++  
            this.board[row][col] = this.currentPlayer
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
            this.removedButton = false
        } else if (this.board[row][col] === this.currentPlayer && this.removedButton === false) {
            this.board[row][col] = ''
            this.movesMade[this.currentPlayer]--
            this.removedButton = true
        }
        this.checkWin()
    }

    AIMakeMove() {
        if (this.gameOver) {
            return
        }
        if (this.movesMade[this.currentPlayer] >= 5) { // if no free buttons
            let choice = Math.floor(Math.random() * 2) 
            if (choice === 1) { //move button to another place
                let buttonFound = false
                while (!buttonFound) {
                    let row = Math.floor(Math.random() * 5)
                    let col = Math.floor(Math.random() * 5)
                    if (this.board[row][col] === this.currentPlayer) {
                        buttonFound = true
                        this.makeMove(row, col)
                        row = Math.floor(Math.random() * 5)
                        col = Math.floor(Math.random() * 5)
                        while (this.board[row][col] !== '') {
                            row = Math.floor(Math.random() * 5)
                            col = Math.floor(Math.random() * 5)
                        }
                        this.makeMove(row, col)
                    }
                }
            } else { //move grid
                let row = Math.floor(Math.random() * 3)
                let col = Math.floor(Math.random() * 3)
                this.moveGrid(row, col)
            }
        }else{ //if free buttons
            let choice = Math.floor(Math.random() * 10)
            if (choice <= 5) {
                let row = Math.floor(Math.random() * 5)
                let col = Math.floor(Math.random() * 5)
                while (this.board[row][col] !== '') {
                    row = Math.floor(Math.random() * 5)
                    col = Math.floor(Math.random() * 5)
                }
                this.makeMove(row, col)
            } else if (choice > 5 && choice <= 7) {
                let buttonFound = false
                while (!buttonFound) {
                    let row = Math.floor(Math.random() * 5)
                    let col = Math.floor(Math.random() * 5)
                    if (this.board[row][col] === this.currentPlayer) {
                        buttonFound = true
                        this.makeMove(row, col)
                        row = Math.floor(Math.random() * 5)
                        col = Math.floor(Math.random() * 5)
                        while (this.board[row][col] !== '') {
                            row = Math.floor(Math.random() * 5)
                            col = Math.floor(Math.random() * 5)
                        }
                        this.makeMove(row, col)
                    }
                }
            } else {
                let row = Math.floor(Math.random() * 3)
                let col = Math.floor(Math.random() * 3)
                this.moveGrid(row, col)
            }
        }
        this.checkWin()
    }
    

    moveGrid(row, col) {
        if (this.gameOver) {
            return
        }
        if  (row < 0 || row > 2 || col < 0 || col > 2) {
            return
        }else {
            this.gridStartx = row
            this.gridStarty = col
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        }
        this.checkWin()
    }

    resetGame() {
        this.board = Array.from({ length: 5 }, () => Array(5).fill(''))
        this.currentPlayer = 'X'
        this.gridStartx = 1
        this.gridStarty = 1
        this.movesMade = {'X': 0, 'O': 0}
        this.removedButton = false
        this.gameOver = false
        this.winner = ''
    }

    checkWin() {
        let colChecks = [[0,0], [0, 1], [0, 2]];
        let rowChecks = [[0,0], [1, 0], [2, 0]];
    
        colChecks.forEach((col) => {
            let x = col[0] + this.gridStartx;
            let y = col[1] + this.gridStarty;
            if (this.board[x][y] && this.board[x][y] === this.board[x + 1][y] && this.board[x][y] === this.board[x + 2][y]) {
                this.gameOver = true;
                this.winner = this.board[x][y];
            }
        });
    
        rowChecks.forEach((row) => {
            let x = row[0] + this.gridStartx;
            let y = row[1] + this.gridStarty;
            if (this.board[x][y] && this.board[x][y] === this.board[x][y + 1] && this.board[x][y] === this.board[x][y + 2]) {
                this.gameOver = true;
                this.winner = this.board[x][y];
            }
        });
    
        let x = this.gridStartx;
        let y = this.gridStarty;
        if (this.board[x][y] && this.board[x][y] === this.board[x + 1][y + 1] && this.board[x][y] === this.board[x + 2][y + 2]) {
            this.gameOver = true;
            this.winner = this.board[x][y];
        }
        if (this.board[x][y + 2] && this.board[x][y + 2] === this.board[x + 1][y + 1] && this.board[x][y + 2] === this.board[x + 2][y]) {
            this.gameOver = true;
            this.winner = this.board[x][y + 2];
        }
    }
}