/**
 * Terminal Adventure Game
 * A text-based adventure game played in a terminal interface
 */

// Terminal game state
window.terminalGame = {
    currentRoom: 'start',
    inventory: [],
    gameMap: {
        'start': {
            description: 'You are in a dark room. There is a door to the north and a window to the east.',
            exits: {
                'north': 'hallway',
                'east': 'window'
            }
        },
        'hallway': {
            description: 'You are in a long hallway. There are doors to the north, east, and south.',
            exits: {
                'north': 'laboratory',
                'east': 'office',
                'south': 'start'
            }
        },
        'window': {
            description: 'You look out the window and see a garden below. It\'s too high to jump. There\'s a strange device on the windowsill.',
            exits: {
                'west': 'start'
            },
            items: ['device']
        },
        'office': {
            description: 'You are in an office. There\'s a desk with a computer and a filing cabinet. There\'s a door to the west.',
            exits: {
                'west': 'hallway'
            },
            items: ['key', 'note']
        },
        'laboratory': {
            description: 'You are in a laboratory. There are strange machines and equipment everywhere. There\'s a door to the south and a locked door to the east.',
            exits: {
                'south': 'hallway',
                'east': 'locked'
            }
        },
        'locked': {
            description: 'This is a secret room with a terminal. There\'s a strange code on the wall and a USB port on the terminal.',
            exits: {
                'west': 'laboratory'
            },
            locked: true,
            key: 'key'
        }
    },
    items: {
        'device': {
            name: 'Strange Device',
            description: 'A small electronic device with a USB connector. It looks like it might store data.',
            canTake: true
        },
        'key': {
            name: 'Security Key',
            description: 'A security key card with "LABORATORY" printed on it.',
            canTake: true
        },
        'note': {
            name: 'Crumpled Note',
            description: 'A note that reads: "The code is: WARAPON"',
            canTake: true
        }
    },
    commandHistory: [],
    historyIndex: -1,
    
    // Initialize the game
    init: function() {
        // Clear the terminal
        this.clearTerminal();
        
        // Show welcome message
        this.printWelcome();
        
        // Show the current room
        this.lookAround();
        
        // Add event listeners
        this.addEventListeners();
    },
    
    // Clear the terminal
    clearTerminal: function() {
        const output = document.getElementById('terminalOutputText');
        output.innerHTML = '';
    },
    
    // Print welcome message
    printWelcome: function() {
        this.print('===================================', 'terminal-response');
        this.print('WELCOME TO TERMINAL ADVENTURE', 'terminal-response');
        this.print('===================================', 'terminal-response');
        this.print('Type "help" for a list of commands.', 'terminal-response');
        this.print('', 'terminal-response');
    },
    
    // Print text to the terminal
    print: function(text, className = 'terminal-response') {
        const output = document.getElementById('terminalOutputText');
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        output.appendChild(line);
        
        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    },
    
    // Print command to the terminal
    printCommand: function(command) {
        const output = document.getElementById('terminalOutputText');
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = 'guest@portfolio:~$ ';
        
        const cmd = document.createElement('span');
        cmd.className = 'terminal-command';
        cmd.textContent = command;
        
        line.appendChild(prompt);
        line.appendChild(cmd);
        output.appendChild(line);
        
        // Scroll to bottom
        output.scrollTop = output.scrollHeight;
    },
    
    // Process a command
    processCommand: function(command) {
        // Add to history
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        
        // Print the command
        this.printCommand(command);
        
        // Process the command
        const parts = command.toLowerCase().trim().split(' ');
        const action = parts[0];
        const target = parts.slice(1).join(' ');
        
        switch (action) {
            case 'help':
                this.showHelp();
                break;
            case 'look':
                this.lookAround();
                break;
            case 'go':
            case 'move':
                this.move(target);
                break;
            case 'take':
            case 'get':
                this.takeItem(target);
                break;
            case 'drop':
                this.dropItem(target);
                break;
            case 'inventory':
            case 'inv':
                this.showInventory();
                break;
            case 'examine':
            case 'inspect':
                this.examineItem(target);
                break;
            case 'use':
                this.useItem(target);
                break;
            case 'clear':
                this.clearTerminal();
                break;
            case '':
                // Empty command, do nothing
                break;
            default:
                this.print(`I don't understand "${action}".`, 'terminal-error');
        }
    },
    
    // Show help
    showHelp: function() {
        this.print('Available commands:', 'terminal-success');
        this.print('- help: Show this help message', 'terminal-response');
        this.print('- look: Look around the current room', 'terminal-response');
        this.print('- go [direction]: Move in a direction (north, south, east, west)', 'terminal-response');
        this.print('- take [item]: Take an item', 'terminal-response');
        this.print('- drop [item]: Drop an item', 'terminal-response');
        this.print('- inventory: Show your inventory', 'terminal-response');
        this.print('- examine [item]: Examine an item', 'terminal-response');
        this.print('- use [item]: Use an item', 'terminal-response');
        this.print('- clear: Clear the terminal', 'terminal-response');
    },
    
    // Look around the current room
    lookAround: function() {
        const room = this.gameMap[this.currentRoom];
        this.print(room.description, 'terminal-response');
        
        // List exits
        let exits = Object.keys(room.exits);
        if (exits.length > 0) {
            this.print(`Exits: ${exits.join(', ')}`, 'terminal-response');
        } else {
            this.print('There are no exits.', 'terminal-response');
        }
        
        // List items
        if (room.items && room.items.length > 0) {
            this.print('You see:', 'terminal-response');
            room.items.forEach(item => {
                this.print(`- ${this.items[item].name}`, 'terminal-response');
            });
        }
    },
    
    // Move in a direction
    move: function(direction) {
        const room = this.gameMap[this.currentRoom];
        
        if (!direction) {
            this.print('Go where?', 'terminal-error');
            return;
        }
        
        if (room.exits[direction]) {
            const nextRoom = room.exits[direction];
            const targetRoom = this.gameMap[nextRoom];
            
            // Check if the room is locked
            if (targetRoom.locked) {
                // Check if the player has the key
                if (this.inventory.includes(targetRoom.key)) {
                    this.print(`You use the ${this.items[targetRoom.key].name} to unlock the door.`, 'terminal-success');
                } else {
                    this.print('The door is locked. You need a key.', 'terminal-error');
                    return;
                }
            }
            
            this.currentRoom = nextRoom;
            this.print(`You go ${direction}.`, 'terminal-success');
            this.lookAround();
        } else {
            this.print(`You can't go ${direction}.`, 'terminal-error');
        }
    },
    
    // Take an item
    takeItem: function(itemName) {
        if (!itemName) {
            this.print('Take what?', 'terminal-error');
            return;
        }
        
        const room = this.gameMap[this.currentRoom];
        
        // Check if the room has items
        if (!room.items || room.items.length === 0) {
            this.print('There\'s nothing to take here.', 'terminal-error');
            return;
        }
        
        // Find the item
        const itemKey = this.findItemKey(itemName, room.items);
        
        if (itemKey) {
            const item = this.items[itemKey];
            
            // Check if the item can be taken
            if (item.canTake) {
                // Add to inventory
                this.inventory.push(itemKey);
                
                // Remove from room
                room.items = room.items.filter(i => i !== itemKey);
                
                this.print(`You take the ${item.name}.`, 'terminal-success');
            } else {
                this.print(`You can't take the ${item.name}.`, 'terminal-error');
            }
        } else {
            this.print(`There's no ${itemName} here.`, 'terminal-error');
        }
    },
    
    // Drop an item
    dropItem: function(itemName) {
        if (!itemName) {
            this.print('Drop what?', 'terminal-error');
            return;
        }
        
        // Find the item in inventory
        const itemKey = this.findItemKey(itemName, this.inventory);
        
        if (itemKey) {
            const item = this.items[itemKey];
            
            // Remove from inventory
            this.inventory = this.inventory.filter(i => i !== itemKey);
            
            // Add to room
            const room = this.gameMap[this.currentRoom];
            if (!room.items) {
                room.items = [];
            }
            room.items.push(itemKey);
            
            this.print(`You drop the ${item.name}.`, 'terminal-success');
        } else {
            this.print(`You don't have a ${itemName}.`, 'terminal-error');
        }
    },
    
    // Show inventory
    showInventory: function() {
        if (this.inventory.length === 0) {
            this.print('Your inventory is empty.', 'terminal-response');
        } else {
            this.print('Inventory:', 'terminal-success');
            this.inventory.forEach(itemKey => {
                this.print(`- ${this.items[itemKey].name}`, 'terminal-response');
            });
        }
    },
    
    // Examine an item
    examineItem: function(itemName) {
        if (!itemName) {
            this.print('Examine what?', 'terminal-error');
            return;
        }
        
        // Check inventory first
        let itemKey = this.findItemKey(itemName, this.inventory);
        
        // If not in inventory, check the room
        if (!itemKey) {
            const room = this.gameMap[this.currentRoom];
            if (room.items) {
                itemKey = this.findItemKey(itemName, room.items);
            }
        }
        
        if (itemKey) {
            const item = this.items[itemKey];
            this.print(`${item.name}: ${item.description}`, 'terminal-response');
        } else {
            this.print(`You don't see a ${itemName} here.`, 'terminal-error');
        }
    },
    
    // Use an item
    useItem: function(itemName) {
        if (!itemName) {
            this.print('Use what?', 'terminal-error');
            return;
        }
        
        // Check if the item is in inventory
        const itemKey = this.findItemKey(itemName, this.inventory);
        
        if (!itemKey) {
            this.print(`You don't have a ${itemName}.`, 'terminal-error');
            return;
        }
        
        // Special item uses
        if (itemKey === 'device' && this.currentRoom === 'locked') {
            this.print('You connect the device to the terminal.', 'terminal-success');
            this.print('The screen lights up and displays:', 'terminal-response');
            this.print('', 'terminal-response');
            this.print('CONGRATULATIONS!', 'terminal-success');
            this.print('You have completed the Terminal Adventure!', 'terminal-success');
            this.print('', 'terminal-response');
            this.print('A secret message appears:', 'terminal-response');
            this.print('"Thank you for exploring my portfolio! - Warapon"', 'terminal-success');
        } else {
            this.print(`You can't use the ${this.items[itemKey].name} here.`, 'terminal-error');
        }
    },
    
    // Find an item key by name
    findItemKey: function(itemName, itemList) {
        itemName = itemName.toLowerCase();
        
        // Exact match
        let itemKey = itemList.find(key => key.toLowerCase() === itemName);
        
        // Partial match
        if (!itemKey) {
            itemKey = itemList.find(key => {
                const itemObj = this.items[key];
                return itemObj.name.toLowerCase().includes(itemName);
            });
        }
        
        return itemKey;
    },
    
    // Pause the game (for API consistency)
    pause: function() {
        // Terminal game doesn't need active pausing
    },
    
    // Add event listeners
    addEventListeners: function() {
        const input = document.getElementById('terminalInput');
        
        // Process command on Enter
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = input.value;
                input.value = '';
                this.processCommand(command);
            } else if (e.key === 'ArrowUp') {
                // Navigate command history (up)
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    input.value = this.commandHistory[this.historyIndex];
                    // Move cursor to end
                    setTimeout(() => {
                        input.selectionStart = input.selectionEnd = input.value.length;
                    }, 0);
                }
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                // Navigate command history (down)
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    input.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    input.value = '';
                }
                e.preventDefault();
            }
        });
        
        // Focus input when terminal is clicked
        document.getElementById('terminalGame').addEventListener('click', () => {
            input.focus();
        });
    }
};

// Initialize the Terminal game
window.initTerminalGame = function() {
    window.terminalGame.init();
};
