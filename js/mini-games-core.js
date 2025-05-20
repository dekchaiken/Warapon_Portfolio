/**
 * Mini-games Core Functionality
 * Handles the game modal, navigation, and common utilities
 */

document.addEventListener('DOMContentLoaded', () => {
    // Create the Easter Egg trigger button
    createEasterEggTrigger();
    
    // Create the game modal structure
    createGameModal();
    
    // Initialize games
    initializeGames();
    
    // Set up global keyboard event handler for games
    setupGameKeyboardControls();
});

/**
 * Sets up global keyboard event handlers for games
 */
function setupGameKeyboardControls() {
    // Add global keyboard event listener
    document.addEventListener('keydown', (e) => {
        // Only process if game modal is active
        if (!document.getElementById('gameModal').classList.contains('active')) {
            return;
        }
        
        // Get the currently focused game
        const focusedGame = window.currentFocusedGame;
        
        // Handle keyboard input based on focused game
        if (focusedGame === 'snake' && window.snakeGame) {
            handleSnakeKeyboard(e);
        } else if (focusedGame === 'tetris' && window.tetrisGame) {
            handleTetrisKeyboard(e);
        }
    });
}

/**
 * Handle keyboard input for Snake game
 */
function handleSnakeKeyboard(e) {
    if (!window.snakeGame.isRunning) {
        if (e.key === ' ') {
            window.snakeGame.start();
            e.preventDefault();
        }
        return;
    }
    
    switch (e.key) {
        case 'ArrowUp':
            if (window.snakeGame.direction !== 'down') {
                window.snakeGame.nextDirection = 'up';
            }
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (window.snakeGame.direction !== 'up') {
                window.snakeGame.nextDirection = 'down';
            }
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (window.snakeGame.direction !== 'right') {
                window.snakeGame.nextDirection = 'left';
            }
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (window.snakeGame.direction !== 'left') {
                window.snakeGame.nextDirection = 'right';
            }
            e.preventDefault();
            break;
        case ' ':
            window.snakeGame.start(); // Toggle pause/resume
            e.preventDefault();
            break;
    }
}

/**
 * Handle keyboard input for Tetris game
 */
function handleTetrisKeyboard(e) {
    if (!window.tetrisGame.isRunning) {
        if (e.key === ' ') {
            window.tetrisGame.start();
            e.preventDefault();
        }
        return;
    }
    
    switch (e.key) {
        case 'ArrowLeft':
            window.tetrisGame.moveLeft();
            e.preventDefault();
            break;
        case 'ArrowRight':
            window.tetrisGame.moveRight();
            e.preventDefault();
            break;
        case 'ArrowDown':
            window.tetrisGame.moveDown();
            e.preventDefault();
            break;
        case 'ArrowUp':
            window.tetrisGame.rotate();
            e.preventDefault();
            break;
        case ' ':
            window.tetrisGame.hardDrop();
            e.preventDefault();
            break;
    }
}

/**
 * Creates the hidden Easter Egg trigger button
 */
function createEasterEggTrigger() {
    const trigger = document.createElement('button');
    trigger.className = 'easter-egg-trigger';
    trigger.setAttribute('aria-label', 'Easter Egg');
    trigger.setAttribute('title', 'Secret Games');
    
    document.body.appendChild(trigger);
    
    // Add click event to open game modal
    trigger.addEventListener('click', () => {
        openGameModal();
    });
    
    // Add Konami code detection
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        // Check if the key matches the next key in the Konami code
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            // If the entire code is entered, open the game modal
            if (konamiIndex === konamiCode.length) {
                openGameModal();
                konamiIndex = 0;
            }
        } else {
            // Reset if wrong key is pressed
            konamiIndex = 0;
        }
    });
}

/**
 * Creates the game modal structure
 */
function createGameModal() {
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.id = 'gameModal';
    
    modal.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="game-title">game_center.sh</span>
                <button class="game-close" id="closeGameModal">&times;</button>
            </div>
            <div class="game-content">
                <div class="game-sidebar">
                    <ul class="game-list">
                        <li class="game-list-item active" data-game="snake">
                            <span class="game-icon">🐍</span>Snake
                        </li>
                        <li class="game-list-item" data-game="tetris">
                            <span class="game-icon">🧱</span>Tetris
                        </li>
                        <li class="game-list-item" data-game="memory">
                            <span class="game-icon">🧠</span>Memory
                        </li>
                        <li class="game-list-item" data-game="terminal">
                            <span class="game-icon">💻</span>Terminal
                        </li>
                    </ul>
                </div>
                <div class="game-main">
                    <div class="game-display">
                        <h3 class="game-display-title">Snake Game</h3>
                        <p class="game-display-description">
                            Use arrow keys to control the snake. Eat the food to grow longer.
                            Don't hit the walls or yourself!
                        </p>
                        
                        <!-- Snake Game -->
                        <div class="game-area active" id="snakeGame">
                            <div class="snake-game">
                                <div class="snake-board" id="snakeBoard"></div>
                                <div class="snake-controls">
                                    <div class="snake-score">Score: <span id="snakeScore">0</span></div>
                                    <div class="snake-buttons">
                                        <button class="snake-button" id="snakeStart">Start</button>
                                        <button class="snake-button" id="snakeReset">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tetris Game -->
                        <div class="game-area" id="tetrisGame">
                            <div class="tetris-game">
                                <div class="tetris-board" id="tetrisBoard"></div>
                                <div class="tetris-info">
                                    <div>
                                        <h4>Next:</h4>
                                        <div class="tetris-next" id="tetrisNext"></div>
                                    </div>
                                    <div class="tetris-score">
                                        <div>Score: <span id="tetrisScore">0</span></div>
                                        <div>Lines: <span id="tetrisLines">0</span></div>
                                        <div>Level: <span id="tetrisLevel">1</span></div>
                                    </div>
                                    <div>
                                        <button class="snake-button" id="tetrisStart">Start</button>
                                        <button class="snake-button" id="tetrisReset">Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Memory Game -->
                        <div class="game-area" id="memoryGame">
                            <div class="memory-game">
                                <div class="memory-board" id="memoryBoard"></div>
                                <div class="memory-controls">
                                    <div class="memory-moves">Moves: <span id="memoryMoves">0</span></div>
                                    <button class="snake-button" id="memoryReset">Reset</button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Terminal Game -->
                        <div class="game-area" id="terminalGame">
                            <div class="terminal-game" id="terminalOutput">
                                <div class="terminal-output" id="terminalOutputText"></div>
                                <div class="terminal-input-line">
                                    <span class="terminal-prompt">guest@portfolio:~$</span>
                                    <input type="text" class="terminal-input" id="terminalInput" autocomplete="off">
                                    <span class="terminal-cursor"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('closeGameModal').addEventListener('click', closeGameModal);
    
    // Game navigation
    const gameItems = document.querySelectorAll('.game-list-item');
    gameItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active class
            gameItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show the selected game
            const gameId = item.getAttribute('data-game');
            showGame(gameId);
        });
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGameModal();
        }
    });
    
    // Prevent keyboard events from propagating to the page
    modal.addEventListener('keydown', (e) => {
        e.stopPropagation();
    });
}

/**
 * Opens the game modal
 */
function openGameModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.add('active');
    
    // Pause any active games
    pauseAllGames();
}

/**
 * Closes the game modal
 */
function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
    
    // Pause any active games
    pauseAllGames();
}

/**
 * Shows a specific game and hides others
 */
function showGame(gameId) {
    // Update title and description
    const titleElement = document.querySelector('.game-display-title');
    const descriptionElement = document.querySelector('.game-display-description');
    
    // Hide all games
    const gameAreas = document.querySelectorAll('.game-area');
    gameAreas.forEach(area => area.classList.remove('active'));
    
    // Show the selected game
    const selectedGame = document.getElementById(`${gameId}Game`);
    if (selectedGame) {
        selectedGame.classList.add('active');
    }
    
    // Update title and description based on the selected game
    switch (gameId) {
        case 'snake':
            titleElement.textContent = 'Snake Game';
            descriptionElement.textContent = 'Use arrow keys to control the snake. Eat the food to grow longer. Don\'t hit the walls or yourself!';
            break;
        case 'tetris':
            titleElement.textContent = 'Tetris';
            descriptionElement.textContent = 'Use arrow keys to move and rotate pieces. Complete lines to score points. Game speeds up as you level up!';
            break;
        case 'memory':
            titleElement.textContent = 'Memory Game';
            descriptionElement.textContent = 'Find all matching pairs with the fewest moves. Click cards to flip them and try to remember their positions.';
            break;
        case 'terminal':
            titleElement.textContent = 'Terminal Adventure';
            descriptionElement.textContent = 'Type commands to explore a text-based adventure. Type "help" to see available commands.';
            // Focus the terminal input
            setTimeout(() => {
                document.getElementById('terminalInput').focus();
            }, 100);
            break;
    }
    
    // Pause all games and initialize the selected one
    pauseAllGames();
    initializeGame(gameId);
}

/**
 * Pauses all active games
 */
function pauseAllGames() {
    // Each game will implement its own pause method
    if (window.snakeGame && window.snakeGame.pause) {
        window.snakeGame.pause();
    }
    
    if (window.tetrisGame && window.tetrisGame.pause) {
        window.tetrisGame.pause();
    }
    
    if (window.memoryGame && window.memoryGame.pause) {
        window.memoryGame.pause();
    }
}

/**
 * Set game focus to make keyboard controls work immediately
 */
function setGameFocus(gameId) {
    // Set a global variable to track which game has focus
    window.currentFocusedGame = gameId;
    
    // Add a class to the game container to indicate focus
    const gameAreas = document.querySelectorAll('.game-area');
    gameAreas.forEach(area => area.classList.remove('game-focused'));
    
    const focusedGame = document.getElementById(`${gameId}Game`);
    if (focusedGame) {
        focusedGame.classList.add('game-focused');
    }
    
    // If it's the terminal game, focus the input
    if (gameId === 'terminal') {
        setTimeout(() => {
            const terminalInput = document.getElementById('terminalInput');
            if (terminalInput) terminalInput.focus();
        }, 50);
    }
}

/**
 * Initializes a specific game
 */
function initializeGame(gameId) {
    switch (gameId) {
        case 'snake':
            if (window.initSnakeGame) {
                window.initSnakeGame();
            }
            break;
        case 'tetris':
            if (window.initTetrisGame) {
                window.initTetrisGame();
            }
            break;
        case 'memory':
            if (window.initMemoryGame) {
                window.initMemoryGame();
            }
            break;
        case 'terminal':
            if (window.initTerminalGame) {
                window.initTerminalGame();
            }
            break;
    }
    
    // Set focus to the game after initialization
    setGameFocus(gameId);
}

/**
 * Initializes all games
 */
function initializeGames() {
    // Each game will be initialized when first shown
}
