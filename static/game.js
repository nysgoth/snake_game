const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");

const GRID_SIZE = 40;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;

let snake = [{ x: 5, y: 5 }]; // Initial position of the snake
let food = { x: 10, y: 10 }; // Initial position of the food
let direction = "right"; // Initial direction
let score = 0; // Initialize the score to zero

function createGrid() {
    for (let y = 0; y < GRID_HEIGHT; y++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let x = 0; x < GRID_WIDTH; x++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            row.appendChild(cell);
        }
        gameContainer.appendChild(row);
    }
}

function updateGrid() {
    const cells = gameContainer.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.classList.remove("snake", "food");
    });

    snake.forEach((segment) => {
        const cell = gameContainer
            .querySelector(`.row:nth-child(${segment.y + 1}) .cell:nth-child(${segment.x + 1})`);
        cell.classList.add("snake");
    });

    const foodCell = gameContainer
        .querySelector(`.row:nth-child(${food.y + 1}) .cell:nth-child(${food.x + 1})`);
    foodCell.classList.add("food");
}

function moveSnake() {
    const head = { ...snake[0] };

    // Determine the new head position based on the current direction
    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    // Check for collisions with walls (game boundaries)
    if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
        // Game over condition (snake hits the wall)
        restartGame();
        return;
    }

    // Check for collisions with itself
    if (isSnakeCollision(head)) {
        // Game over condition (snake hits itself)
        restartGame();
        return;
    }

    // Add the new head to the front of the snake
    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
        // Increment the score and update the display
        score += 10;
        scoreElement.textContent = `Score: ${score}`;

        // Generate new food
        food.x = Math.floor(Math.random() * GRID_WIDTH);
        food.y = Math.floor(Math.random() * GRID_HEIGHT);
    } else {
        // Remove the tail to keep the snake's length constant
        snake.pop();
    }
}

function isSnakeCollision(head) {
    // Check if the new head position collides with any part of the snake's body
    return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
});

function isGameOver() {
    const head = snake[0];

    // Check for collisions with walls (game boundaries)
    return head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT;
}

function restartGame() {
    snake = [{ x: 5, y: 5 }];
    food = { x: 10, y: 10 };
    direction = "right";
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
}

function gameLoop() {
    updateGrid();
    if (isGameOver()) {
        // Handle game over logic
        alert("Game Over! Press OK to restart");
        restartGame();
    }
    moveSnake();
}

createGrid();
setInterval(gameLoop, 100);
