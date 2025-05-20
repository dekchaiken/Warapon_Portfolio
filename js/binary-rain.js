/**
 * Binary Rain Effect
 * Creates a matrix-like binary rain effect in the background
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create the binary rain container
    const container = document.createElement('div');
    container.className = 'binary-rain-container';
    
    // Add the container to the hero section
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.appendChild(container);
        
        // Set the hero section to have relative positioning
        heroSection.style.position = 'relative';
        
        // Create binary columns
        createBinaryColumns(container);
        
        // Add floating binary elements
        addFloatingBinaryElements(heroSection);
    }
});

/**
 * Creates binary columns that rain down the screen
 * @param {HTMLElement} container - The container element
 */
function createBinaryColumns(container) {
    const columnCount = Math.floor(window.innerWidth / 30); // Adjust density here
    
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'binary-column';
        
        // Random position
        column.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 10-20 seconds
        const duration = 10 + Math.random() * 10;
        column.style.animationDuration = `${duration}s`;
        
        // Random delay
        const delay = Math.random() * 10;
        column.style.animationDelay = `${delay}s`;
        
        // Generate binary content
        column.textContent = generateBinaryString(20 + Math.floor(Math.random() * 30));
        
        container.appendChild(column);
    }
}

/**
 * Generates a random binary string
 * @param {number} length - The length of the binary string
 * @returns {string} - A string of 0s and 1s
 */
function generateBinaryString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.random() > 0.5 ? '1' : '0';
    }
    return result;
}

/**
 * Adds floating binary elements to the hero section
 * @param {HTMLElement} container - The container element
 */
function addFloatingBinaryElements(container) {
    const elementCount = 15; // Number of floating elements
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-binary';
        
        // Random position
        element.style.top = `${Math.random() * 100}%`;
        element.style.left = `${Math.random() * 100}%`;
        
        // Random size
        const size = 0.8 + Math.random() * 1.5;
        element.style.fontSize = `${size}rem`;
        
        // Random animation duration and delay
        const duration = 15 + Math.random() * 15;
        element.style.animationDuration = `${duration}s`;
        
        const delay = Math.random() * 10;
        element.style.animationDelay = `${delay}s`;
        
        // Generate binary content (shorter)
        element.textContent = generateBinaryString(4 + Math.floor(Math.random() * 4));
        
        container.appendChild(element);
    }
}

/**
 * Terminal typing effect
 */
document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalCursor = document.getElementById('terminal-cursor');
    
    if (terminalInput && terminalCursor) {
        // Commands to type
        const commands = [
            'npm install portfolio',
            'git clone https://github.com/dekchaiken/portfolio.git',
            'cd portfolio && npm start',
            'python analyze_skills.py',
            'ssh warapon@portfolio'
        ];
        
        let currentCommandIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // Base typing speed in ms
        
        function typeTerminal() {
            const currentCommand = commands[currentCommandIndex];
            
            if (isDeleting) {
                // Deleting text
                terminalInput.textContent = currentCommand.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
                
                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentCommandIndex = (currentCommandIndex + 1) % commands.length;
                    typingSpeed = 500; // Pause before typing next command
                }
            } else {
                // Typing text
                terminalInput.textContent = currentCommand.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100 + Math.random() * 100; // Random typing speed
                
                if (currentCharIndex === currentCommand.length) {
                    isDeleting = true;
                    typingSpeed = 2000; // Pause before deleting
                }
            }
            
            setTimeout(typeTerminal, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(typeTerminal, 1000);
    }
});
