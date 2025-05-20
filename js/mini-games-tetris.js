/**
 * Tetris Game Implementation
 */

// Tetris game state
window.tetrisGame = {
    board: [],
    piece: null,
    nextPiece: null,
    score: 0,
    lines: 0,
    level: 1,
    gameInterval: null,
    isRunning: false,
    speed: 800,
    boardWidth: 10,
    boardHeight: 20,
    
    // Tetromino shapes
    shapes: [
        // I
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        // J
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        // L
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        // O
        [
            [1, 1],
            [1, 1]
        ],
        // S
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        // T
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        // Z
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ]
    ],
    
    // Colors for each tetromino
    colors: [
        '#00f0f0', // I - Cyan
        '#0000f0', // J - Blue
        '#f0a000', // L - Orange
        '#f0f000', // O - Yellow
        '#00f000', // S - Green
        '#a000f0', // T - Purple
        '#f00000'  // Z - Red
    ],
    
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
        const board = document.getElementById('tetrisBoard');
        board.innerHTML = '';
        
        // Create a 10x20 grid
        this.board = [];
        for (let y = 0; y < this.boardHeight; y++) {
            const row = [];
            for (let x = 0; x < this.boardWidth; x++) {
                const cell = document.createElement('div');
                cell.className = 'tetris-cell';
                board.appendChild(cell);
                row.push({
                    element: cell,
                    filled: false,
                    color: ''
                });
            }
            this.board.push(row);
        }
        
        // Create next piece preview
        const nextPieceBoard = document.getElementById('tetrisNext');
        nextPieceBoard.innerHTML = '';
        
        // Create a 4x4 grid for next piece
        this.nextPieceBoard = [];
        for (let y = 0; y < 4; y++) {
            const row = [];
            for (let x = 0; x < 4; x++) {
                const cell = document.createElement('div');
                cell.className = 'tetris-cell';
                nextPieceBoard.appendChild(cell);
                row.push({
                    element: cell,
                    filled: false,
                    color: ''
                });
            }
            this.nextPieceBoard.push(row);
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
        this.lines = 0;
        this.level = 1;
        this.speed = 800;
        
        // Update displays
        document.getElementById('tetrisScore').textContent = this.score;
        document.getElementById('tetrisLines').textContent = this.lines;
        document.getElementById('tetrisLevel').textContent = this.level;
        
        // Clear the board
        for (let y = 0; y < this.boardHeight; y++) {
            for (let x = 0; x < this.boardWidth; x++) {
                this.board[y][x].filled = false;
                this.board[y][x].color = '';
                this.board[y][x].element.style.backgroundColor = '';
            }
        }
        
        // Create initial pieces
        this.createNewPiece();
        this.createNewPiece();
        
        // Update button states
        document.getElementById('tetrisStart').textContent = 'Start';
        document.getElementById('tetrisStart').disabled = false;
    },
    
    // Start the game
    start: function() {
        if (this.isRunning) {
            this.pause();
            return;
        }
        
        this.isRunning = true;
        document.getElementById('tetrisStart').textContent = 'Pause';
        
        // Set focus to this game
        window.currentFocusedGame = 'tetris';
        
        // Start the game loop
        this.gameInterval = setInterval(() => {
            this.moveDown();
        }, this.speed);
    },
    
    // Pause the game
    pause: function() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        document.getElementById('tetrisStart').textContent = 'Resume';
        
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    },
    
    // Create a new tetromino
    createNewPiece: function() {
        if (this.nextPiece) {
            this.piece = this.nextPiece;
        } else {
            const shapeIndex = Math.floor(Math.random() * this.shapes.length);
            this.piece = {
                shape: this.shapes[shapeIndex],
                color: this.colors[shapeIndex],
                x: Math.floor((this.boardWidth - this.shapes[shapeIndex][0].length) / 2),
                y: 0
            };
        }
        
        // Create next piece
        const shapeIndex = Math.floor(Math.random() * this.shapes.length);
        this.nextPiece = {
            shape: this.shapes[shapeIndex],
            color: this.colors[shapeIndex],
            x: Math.floor((this.boardWidth - this.shapes[shapeIndex][0].length) / 2),
            y: 0
        };
        
        // Draw the pieces
        this.drawPiece();
        this.drawNextPiece();
        
        // Check if the new piece can be placed
        if (!this.isValidMove(0, 0)) {
            this.gameOver();
        }
    },
    
    // Draw the current piece on the board
    drawPiece: function() {
        // Clear the board (only the non-filled cells)
        for (let y = 0; y < this.boardHeight; y++) {
            for (let x = 0; x < this.boardWidth; x++) {
                if (!this.board[y][x].filled) {
                    this.board[y][x].element.style.backgroundColor = '';
                }
            }
        }
        
        // Draw the current piece
        const shape = this.piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const boardX = this.piece.x + x;
                    const boardY = this.piece.y + y;
                    
                    if (boardY >= 0 && boardY < this.boardHeight && boardX >= 0 && boardX < this.boardWidth) {
                        this.board[boardY][boardX].element.style.backgroundColor = this.piece.color;
                    }
                }
            }
        }
    },
    
    // Draw the next piece in the preview
    drawNextPiece: function() {
        // Clear the next piece board
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                this.nextPieceBoard[y][x].element.style.backgroundColor = '';
            }
        }
        
        // Draw the next piece
        const shape = this.nextPiece.shape;
        const offsetX = Math.floor((4 - shape[0].length) / 2);
        const offsetY = Math.floor((4 - shape.length) / 2);
        
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const boardX = offsetX + x;
                    const boardY = offsetY + y;
                    
                    this.nextPieceBoard[boardY][boardX].element.style.backgroundColor = this.nextPiece.color;
                }
            }
        }
    },
    
    // Check if a move is valid
    isValidMove: function(offsetX, offsetY) {
        const shape = this.piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const boardX = this.piece.x + x + offsetX;
                    const boardY = this.piece.y + y + offsetY;
                    
                    // Check if out of bounds
                    if (boardX < 0 || boardX >= this.boardWidth || boardY >= this.boardHeight) {
                        return false;
                    }
                    
                    // Check if overlapping with filled cell
                    if (boardY >= 0 && this.board[boardY][boardX].filled) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    },
    
    // Move the piece down
    moveDown: function() {
        if (this.isValidMove(0, 1)) {
            this.piece.y++;
            this.drawPiece();
        } else {
            // Lock the piece in place
            this.lockPiece();
            
            // Check for completed lines
            this.checkLines();
            
            // Create a new piece
            this.createNewPiece();
        }
    },
    
    // Move the piece left
    moveLeft: function() {
        if (this.isValidMove(-1, 0)) {
            this.piece.x--;
            this.drawPiece();
        }
    },
    
    // Move the piece right
    moveRight: function() {
        if (this.isValidMove(1, 0)) {
            this.piece.x++;
            this.drawPiece();
        }
    },
    
    // Rotate the piece
    rotate: function() {
        // Create a rotated copy of the shape
        const shape = this.piece.shape;
        const newShape = [];
        
        for (let x = 0; x < shape[0].length; x++) {
            const newRow = [];
            for (let y = shape.length - 1; y >= 0; y--) {
                newRow.push(shape[y][x]);
            }
            newShape.push(newRow);
        }
        
        // Save the original shape
        const originalShape = this.piece.shape;
        
        // Try the rotation
        this.piece.shape = newShape;
        
        // Check if the rotation is valid
        if (!this.isValidMove(0, 0)) {
            // If not valid, try wall kicks
            let validKick = false;
            
            // Try moving left
            for (let i = 1; i <= 2; i++) {
                if (this.isValidMove(-i, 0)) {
                    this.piece.x -= i;
                    validKick = true;
                    break;
                }
            }
            
            // Try moving right
            if (!validKick) {
                for (let i = 1; i <= 2; i++) {
                    if (this.isValidMove(i, 0)) {
                        this.piece.x += i;
                        validKick = true;
                        break;
                    }
                }
            }
            
            // If still not valid, revert the rotation
            if (!validKick) {
                this.piece.shape = originalShape;
            }
        }
        
        this.drawPiece();
    },
    
    // Drop the piece all the way down
    hardDrop: function() {
        let dropDistance = 0;
        
        // Find how far the piece can drop
        while (this.isValidMove(0, dropDistance + 1)) {
            dropDistance++;
        }
        
        // Move the piece down
        this.piece.y += dropDistance;
        
        // Lock the piece and create a new one
        this.lockPiece();
        this.checkLines();
        this.createNewPiece();
    },
    
    // Lock the current piece in place
    lockPiece: function() {
        const shape = this.piece.shape;
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[y].length; x++) {
                if (shape[y][x]) {
                    const boardX = this.piece.x + x;
                    const boardY = this.piece.y + y;
                    
                    if (boardY >= 0 && boardY < this.boardHeight && boardX >= 0 && boardX < this.boardWidth) {
                        this.board[boardY][boardX].filled = true;
                        this.board[boardY][boardX].color = this.piece.color;
                    }
                }
            }
        }
    },
    
    // Check for completed lines
    checkLines: function() {
        let linesCleared = 0;
        
        for (let y = this.boardHeight - 1; y >= 0; y--) {
            let lineFilled = true;
            
            // Check if the line is filled
            for (let x = 0; x < this.boardWidth; x++) {
                if (!this.board[y][x].filled) {
                    lineFilled = false;
                    break;
                }
            }
            
            if (lineFilled) {
                // Clear the line
                for (let x = 0; x < this.boardWidth; x++) {
                    this.board[y][x].filled = false;
                    this.board[y][x].color = '';
                    this.board[y][x].element.style.backgroundColor = '';
                }
                
                // Move all lines above down
                for (let y2 = y; y2 > 0; y2--) {
                    for (let x = 0; x < this.boardWidth; x++) {
                        this.board[y2][x].filled = this.board[y2 - 1][x].filled;
                        this.board[y2][x].color = this.board[y2 - 1][x].color;
                        this.board[y2][x].element.style.backgroundColor = this.board[y2 - 1][x].color;
                    }
                }
                
                // Clear the top line
                for (let x = 0; x < this.boardWidth; x++) {
                    this.board[0][x].filled = false;
                    this.board[0][x].color = '';
                    this.board[0][x].element.style.backgroundColor = '';
                }
                
                // Increment lines cleared
                linesCleared++;
                
                // Check the same line again (since we moved everything down)
                y++;
            }
        }
        
        // Update score and level
        if (linesCleared > 0) {
            // Score based on number of lines cleared
            const points = [0, 40, 100, 300, 1200];
            this.score += points[linesCleared] * this.level;
            
            // Update lines and level
            this.lines += linesCleared;
            this.level = Math.floor(this.lines / 10) + 1;
            
            // Update speed
            this.speed = Math.max(100, 800 - (this.level - 1) * 70);
            
            // Update displays
            document.getElementById('tetrisScore').textContent = this.score;
            document.getElementById('tetrisLines').textContent = this.lines;
            document.getElementById('tetrisLevel').textContent = this.level;
            
            // Update game interval if running
            if (this.isRunning && this.gameInterval) {
                clearInterval(this.gameInterval);
                this.gameInterval = setInterval(() => {
                    this.moveDown();
                }, this.speed);
            }
        }
    },
    
    // Game over
    gameOver: function() {
        this.pause();
        document.getElementById('tetrisStart').textContent = 'Start';
        document.getElementById('tetrisStart').disabled = true;
        
        // Flash the board
        const board = document.getElementById('tetrisBoard');
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
            
            // Only handle keys if the tetris game is visible
            if (!document.getElementById('tetrisGame').classList.contains('active')) {
                return;
            }
            
            // Only handle keys if the game is running
            if (!this.isRunning) {
                if (e.key === ' ') {
                    this.start();
                    e.preventDefault();
                }
                return;
            }
            
            switch (e.key) {
                case 'ArrowLeft':
                    this.moveLeft();
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    this.moveRight();
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    this.moveDown();
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                    this.rotate();
                    e.preventDefault();
                    break;
                case ' ':
                    this.hardDrop();
                    e.preventDefault();
                    break;
            }
        });
        
        // Button controls
        document.getElementById('tetrisStart').addEventListener('click', () => {
            this.start();
        });
        
        document.getElementById('tetrisReset').addEventListener('click', () => {
            this.reset();
        });
    }
};

// Initialize the Tetris game
window.initTetrisGame = function() {
    window.tetrisGame.init();
};
