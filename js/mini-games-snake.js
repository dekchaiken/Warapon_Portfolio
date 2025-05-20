/**
 * Snake Game Implementation
 */

// Snake game state
window.snakeGame = {
    board: [],
    snake: [],
    direction: 'right',
    nextDirection: 'right',
    food: null,
    score: 0,
    gameInterval: null,
    speed: 150,
    isRunning: false,
    
    // Initialize the game
    init: function() {
        // Create the board
        this.createBoard();
        
        // Reset the game state
        this.reset();
        
        // Add event listeners
        this.addEventListeners();
    },
    
    // Create the game board
    createBoard: function() {
        const board = document.getElementById('snakeBoard');
        board.innerHTML = '';
        
        // Create a 20x20 grid
        this.board = [];
        for (let y = 0; y < 20; y++) {
            const row = [];
            for (let x = 0; x < 20; x++) {
                const cell = document.createElement('div');
                cell.className = 'snake-cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                board.appendChild(cell);
                row.push(cell);
            }
            this.board.push(row);
        }
    },
    
    // Reset the game state
    reset: function() {
        // Clear any existing interval
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        // Reset game state
        this.isRunning = false;
        this.score = 0;
        this.direction = 'right';
        this.nextDirection = 'right';
        this.speed = 150;
        
        // Update score display
        document.getElementById('snakeScore').textContent = this.score;
        
        // Clear the board
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                this.board[y][x].className = 'snake-cell';
            }
        }
        
        // Create initial snake (3 cells in the middle)
        this.snake = [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ];
        
        // Draw the snake
        this.drawSnake();
        
        // Create initial food
        this.createFood();
        
        // Update button states
        document.getElementById('snakeStart').textContent = 'Start';
        document.getElementById('snakeStart').disabled = false;
    },
    
    // Start the game
    start: function() {
        if (this.isRunning) {
            this.pause();
            return;
        }
        
        this.isRunning = true;
        document.getElementById('snakeStart').textContent = 'Pause';
        
        // Set focus to this game
        window.currentFocusedGame = 'snake';
        
        // Start the game loop
        this.gameInterval = setInterval(() => {
            this.update();
        }, this.speed);
    },
    
    // Pause the game
    pause: function() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        document.getElementById('snakeStart').textContent = 'Resume';
        
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    },
    
    // Update the game state
    update: function() {
        // Update direction
        this.direction = this.nextDirection;
        
        // Calculate new head position
        const head = {...this.snake[0]};
        
        switch (this.direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        
        // Check for collision with walls
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
            this.gameOver();
            return;
        }
        
        // Check for collision with self
        for (const segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }
        
        // Add new head
        this.snake.unshift(head);
        
        // Check if food is eaten
        if (head.x === this.food.x && head.y === this.food.y) {
            // Increase score
            this.score += 10;
            document.getElementById('snakeScore').textContent = this.score;
            
            // Create new food
            this.createFood();
            
            // Increase speed every 50 points
            if (this.score % 50 === 0) {
                this.increaseSpeed();
            }
        } else {
            // Remove tail if no food is eaten
            this.snake.pop();
        }
        
        // Draw the snake
        this.drawSnake();
    },
    
    // Draw the snake on the board
    drawSnake: function() {
        // Clear the board
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                this.board[y][x].className = 'snake-cell';
            }
        }
        
        // Draw the snake
        for (const segment of this.snake) {
            this.board[segment.y][segment.x].classList.add('snake');
        }
        
        // Draw the food
        if (this.food) {
            this.board[this.food.y][this.food.x].classList.add('food');
        }
    },
    
    // Create food at a random position
    createFood: function() {
        // Find all empty cells
        const emptyCells = [];
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                let isEmpty = true;
                for (const segment of this.snake) {
                    if (segment.x === x && segment.y === y) {
                        isEmpty = false;
                        break;
                    }
                }
                if (isEmpty) {
                    emptyCells.push({x, y});
                }
            }
        }
        
        // Pick a random empty cell
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            this.food = emptyCells[randomIndex];
        }
    },
    
    // Increase the game speed
    increaseSpeed: function() {
        this.speed = Math.max(50, this.speed - 10);
        
        // Restart the interval with the new speed
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = setInterval(() => {
                this.update();
            }, this.speed);
        }
    },
    
    // Game over
    gameOver: function() {
        this.pause();
        document.getElementById('snakeStart').textContent = 'Start';
        document.getElementById('snakeStart').disabled = true;
        
        // Flash the board
        const board = document.getElementById('snakeBoard');
        board.classList.add('game-over');
        
        setTimeout(() => {
            board.classList.remove('game-over');
            this.reset();
        }, 1000);
    },
    
    // Add event listeners
    addEventListeners: function() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            // Only handle keys if the game modal is active
            if (!document.getElementById('gameModal').classList.contains('active')) {
                return;
            }
            
            // Only handle keys if the snake game is visible
            if (!document.getElementById('snakeGame').classList.contains('active')) {
                return;
            }
            
            switch (e.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') {
                        this.nextDirection = 'up';
                    }
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    if (this.direction !== 'up') {
                        this.nextDirection = 'down';
                    }
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') {
                        this.nextDirection = 'left';
                    }
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') {
                        this.nextDirection = 'right';
                    }
                    e.preventDefault();
                    break;
                case ' ':
                    // Space to start/pause
                    this.start();
                    e.preventDefault();
                    break;
            }
        });
        
        // Button controls
        document.getElementById('snakeStart').addEventListener('click', () => {
            this.start();
        });
        
        document.getElementById('snakeReset').addEventListener('click', () => {
            this.reset();
        });
    }
};

// Initialize the Snake game
window.initSnakeGame = function() {
    window.snakeGame.init();
};
