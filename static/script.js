const board = document.getElementById("board");
const size = 20;
let snake_x, snake_y, direction, snake_body;

function resetGame() {
    snake_x = 10;
    snake_y = 10;
    direction = "right";
    snake_body = [{ x: snake_x, y: snake_y }];
}

function createBoard() {
    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

function updateSnake() {
    document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("snake"));
    
    snake_body.forEach(part => {
        const index = part.y * size + part.x;
        document.querySelectorAll(".cell")[index].classList.add("snake");
    });
}

function moveSnake() {
    let new_x = snake_x;
    let new_y = snake_y;

    if (direction === "right") new_x++;
    if (direction === "left") new_x--;
    if (direction === "up") new_y--;
    if (direction === "down") new_y++;

    if (new_x < 0 || new_x >= size || new_y < 0 || new_y >= size) {
        resetGame();
        return;
    }

    if (snake_body.some(part => part.x === new_x && part.y === new_y)) {
        resetGame();
        return;
    }

    snake_x = new_x;
    snake_y = new_y;
    snake_body.unshift({ x: snake_x, y: snake_y });
    snake_body.pop();

    updateSnake();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});

resetGame();
createBoard();
updateSnake();
setInterval(moveSnake, 200);
