const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0 };

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    
    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        let winInd = -1;
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        updateScore();
        gameActive = false;

        for(let i=0; i<winningPatterns.length; i++){
            let pattern = winningPatterns[i];
            let win = true;

            for(let ind of pattern){
                if(board[ind] != currentPlayer)
                    win = false;
            }
            if(win){
                winInd = i;
                break;
            }
        }

        console.log(winInd);

        // Delay color update to allow DOM to render the win message first
        if (winInd !== -1) {
            setTimeout(() => {
                for (let index of winningPatterns[winInd]) {
                    cells[index].style.backgroundColor = 'lightgreen'; // Change the color of the winning cells
                }
            }, 100); // Delay of 100ms
        }

        console.log(board);
    } else if (board.every(cell => cell !== '')) {
        statusMessage.textContent = `It's a draw!`;
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a win
function checkWin() {
    return winningPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

// Function to update score
function updateScore() {
    scores[currentPlayer]++;
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

// Function to restart game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = 'white';
    });
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial message
statusMessage.textContent = `Player ${currentPlayer}'s turn`;
