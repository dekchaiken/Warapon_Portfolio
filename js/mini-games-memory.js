/**
 * Memory Game Implementation
 */

// Memory game state
window.memoryGame = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    totalPairs: 8,
    moves: 0,
    isLocked: false,
    symbols: ['🚀', '🔥', '💻', '🎮', '🎯', '🎲', '🎨', '🎭', '🚀', '🔥', '💻', '🎮', '🎯', '🎲', '🎨', '🎭'],
    
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
        const board = document.getElementById('memoryBoard');
        board.innerHTML = '';
        
        // Create 16 cards (8 pairs)
        this.cards = [];
        for (let i = 0; i < 16; i++) {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.index = i;
            
            // Create front and back of card
            const front = document.createElement('div');
            front.className = 'memory-card-front';
            
            const back = document.createElement('div');
            back.className = 'memory-card-back';
            back.textContent = '?';
            
            card.appendChild(front);
            card.appendChild(back);
            
            board.appendChild(card);
            this.cards.push(card);
        }
    },
    
    // Reset the game state
    reset: function() {
        // Reset game state
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.isLocked = false;
        
        // Update moves display
        document.getElementById('memoryMoves').textContent = this.moves;
        
        // Shuffle symbols
        this.shuffleSymbols();
        
        // Reset all cards
        this.cards.forEach(card => {
            card.classList.remove('flipped');
            card.classList.remove('matched');
        });
    },
    
    // Shuffle the symbols
    shuffleSymbols: function() {
        // Create a copy of the symbols array
        const symbols = [...this.symbols];
        
        // Shuffle the array
        for (let i = symbols.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
        }
        
        // Assign symbols to cards
        this.cards.forEach((card, index) => {
            const front = card.querySelector('.memory-card-front');
            front.textContent = symbols[index];
        });
    },
    
    // Flip a card
    flipCard: function(card) {
        // Ignore if game is locked or card is already flipped
        if (this.isLocked || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        // Flip the card
        card.classList.add('flipped');
        
        // Add to flipped cards
        this.flippedCards.push(card);
        
        // Check if two cards are flipped
        if (this.flippedCards.length === 2) {
            // Increment moves
            this.moves++;
            document.getElementById('memoryMoves').textContent = this.moves;
            
            // Lock the game temporarily
            this.isLocked = true;
            
            // Check for a match
            this.checkForMatch();
        }
    },
    
    // Check if the two flipped cards match
    checkForMatch: function() {
        const [card1, card2] = this.flippedCards;
        const symbol1 = card1.querySelector('.memory-card-front').textContent;
        const symbol2 = card2.querySelector('.memory-card-front').textContent;
        
        if (symbol1 === symbol2) {
            // Match found
            this.handleMatch();
        } else {
            // No match
            this.handleMismatch();
        }
    },
    
    // Handle matching cards
    handleMatch: function() {
        // Mark cards as matched
        this.flippedCards.forEach(card => {
            card.classList.add('matched');
        });
        
        // Increment matched pairs
        this.matchedPairs++;
        
        // Clear flipped cards
        this.flippedCards = [];
        
        // Unlock the game
        this.isLocked = false;
        
        // Check if all pairs are matched
        if (this.matchedPairs === this.totalPairs) {
            this.gameComplete();
        }
    },
    
    // Handle mismatched cards
    handleMismatch: function() {
        // Flip cards back after a delay
        setTimeout(() => {
            this.flippedCards.forEach(card => {
                card.classList.remove('flipped');
            });
            
            // Clear flipped cards
            this.flippedCards = [];
            
            // Unlock the game
            this.isLocked = false;
        }, 1000);
    },
    
    // Game complete
    gameComplete: function() {
        // Show completion message
        setTimeout(() => {
            alert(`Congratulations! You completed the game in ${this.moves} moves.`);
            this.reset();
        }, 500);
    },
    
    // Pause the game (for API consistency)
    pause: function() {
        // Memory game doesn't need active pausing
    },
    
    // Add event listeners
    addEventListeners: function() {
        // Card click events
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                this.flipCard(card);
            });
        });
        
        // Reset button
        document.getElementById('memoryReset').addEventListener('click', () => {
            this.reset();
        });
    }
};

// Initialize the Memory game
window.initMemoryGame = function() {
    window.memoryGame.init();
};
