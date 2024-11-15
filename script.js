document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        board.appendChild(cell);
    }

    
    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.dataset.index;

        if (gameState[cellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add("taken");

        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) {
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `Player ${currentPlayer} wins!`; 
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            status.textContent = "It's a draw!";
            gameActive = false;
            return;
        }
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = ["", "", "", "", "", "", "", "", ""];
        status.textContent = `Player ${currentPlayer}'s turn`;

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
    }
    document.addEventListener("mousemove", function (event) {
        const glitter = document.createElement("div");
        glitter.classList.add("glitter");
    
        
        glitter.style.left = `${event.pageX - 5}px`;
        glitter.style.top = `${event.pageY - 5}px`;
    
        
        document.body.appendChild(glitter);
    
        
        setTimeout(() => {
            glitter.remove();
        }, 1000);
    });
    

    
    document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);

    
    status.textContent = `Player ${currentPlayer}'s turn`;
});
