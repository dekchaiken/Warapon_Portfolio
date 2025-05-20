/**
 * Console Popup for Download CV
 * Creates a terminal-like popup that simulates decrypting and downloading a file
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create popup elements
    createConsolePopup();
    
    // Get download button
    const downloadBtn = document.getElementById('download-cv-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', showDownloadConsole);
    }
});

/**
 * Creates the console popup elements and adds them to the DOM
 */
function createConsolePopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'console-popup-overlay';
    overlay.id = 'console-overlay';
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = 'console-popup';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'console-header';
    
    const title = document.createElement('div');
    title.className = 'console-title';
    
    // Add dots
    const redDot = document.createElement('span');
    redDot.className = 'dot red';
    
    const yellowDot = document.createElement('span');
    yellowDot.className = 'dot yellow';
    
    const greenDot = document.createElement('span');
    greenDot.className = 'dot green';
    
    const titleText = document.createElement('span');
    titleText.className = 'console-title-text';
    titleText.textContent = 'warapon@portfolio: ~/downloads';
    
    title.appendChild(redDot);
    title.appendChild(yellowDot);
    title.appendChild(greenDot);
    title.appendChild(titleText);
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'console-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', hideConsolePopup);
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    
    // Create body
    const body = document.createElement('div');
    body.className = 'console-body';
    body.id = 'console-body';
    
    // Create footer
    const footer = document.createElement('div');
    footer.className = 'console-footer';
    
    const openBtn = document.createElement('button');
    openBtn.className = 'console-button';
    openBtn.id = 'open-cv-btn';
    openBtn.textContent = 'Open File';
    openBtn.disabled = true;
    openBtn.addEventListener('click', openResumeFile);
    
    footer.appendChild(openBtn);
    
    // Assemble popup
    popup.appendChild(header);
    popup.appendChild(body);
    popup.appendChild(footer);
    
    overlay.appendChild(popup);
    
    // Add to DOM
    document.body.appendChild(overlay);
}

/**
 * Shows the download console and starts the animation
 */
function showDownloadConsole() {
    // Get overlay and body
    const overlay = document.getElementById('console-overlay');
    const consoleBody = document.getElementById('console-body');
    
    // Clear previous logs
    consoleBody.innerHTML = '';
    
    // Show overlay
    overlay.classList.add('active');
    
    // Disable open button
    const openBtn = document.getElementById('open-cv-btn');
    openBtn.disabled = true;
    
    // Start download simulation
    simulateDownload();
}

/**
 * Hides the console popup
 */
function hideConsolePopup() {
    const overlay = document.getElementById('console-overlay');
    overlay.classList.remove('active');
}

/**
 * Simulates the download process with console logs
 */
function simulateDownload() {
    const consoleBody = document.getElementById('console-body');
    
    // Initial log - more dramatic
    addConsoleLog('warning', 'INITIATING SECURE ENCRYPTED CONNECTION...');
    
    setTimeout(() => {
        // Add some hacking-style logs
        addConsoleLog('info', 'Attempting to bypass security protocols...');
        
        setTimeout(() => {
            addConsoleLog('error', 'ACCESS DENIED: Security level ALPHA detected');
            
            setTimeout(() => {
                addConsoleLog('info', 'Deploying advanced authentication bypass...');
                
                setTimeout(() => {
                    addConsoleLog('success', 'SECURITY BREACH SUCCESSFUL! Connection established.');
                    
                    setTimeout(() => {
                        addConsoleLog('warning', 'Searching classified database for: CV_Warapon_Leadlum.enc');
                        
                        setTimeout(() => {
                            addConsoleLog('info', 'TARGET FILE LOCATED. Classified security level: CONFIDENTIAL');
                            
                            setTimeout(() => {
                                addConsoleLog('warning', 'CAUTION: File access requires LEVEL 5 clearance');
                                
                                setTimeout(() => {
                                    addConsoleLog('info', 'Attempting security clearance forgery...');
                                    
                                    setTimeout(() => {
                                        addConsoleLog('success', 'CLEARANCE FORGED. Access granted to classified file.');
                                        
                                        // Add progress bar with glitchy style
                                        const progressContainer = document.createElement('div');
                                        progressContainer.className = 'log-progress glitch-effect';
                                        
                                        const progressBar = document.createElement('div');
                                        progressBar.className = 'progress-bar';
                                        
                                        progressContainer.appendChild(progressBar);
                                        consoleBody.appendChild(progressContainer);
                                        
                                        // Simulate decryption with more drama
                                        simulateDecryption(progressBar);
                                        
                                    }, 800);
                                }, 700);
                            }, 600);
                        }, 700);
                    }, 600);
                }, 800);
            }, 700);
        }, 600);
    }, 500);
}

/**
 * Simulates the decryption process with a progress bar
 * @param {HTMLElement} progressBar - The progress bar element
 */
function simulateDecryption(progressBar) {
    const consoleBody = document.getElementById('console-body');
    
    // Add dramatic warning
    addConsoleLog('warning', 'INITIATING MILITARY-GRADE DECRYPTION SEQUENCE');
    
    setTimeout(() => {
        // Add encryption details
        addConsoleLog('info', 'File encrypted with AES-256 + Quantum Resistant Algorithm');
        
        setTimeout(() => {
            // Create decryption text with more drama
            const decryptionLog = document.createElement('div');
            decryptionLog.className = 'console-log';
            
            const timeSpan = document.createElement('span');
            timeSpan.className = 'log-time';
            timeSpan.textContent = getCurrentTime();
            
            const typeSpan = document.createElement('span');
            typeSpan.className = 'log-type warning';
            typeSpan.textContent = 'DECRYPT';
            
            const messageSpan = document.createElement('span');
            messageSpan.className = 'log-message';
            messageSpan.innerHTML = 'DECRYPTING CLASSIFIED FILE: <span class="decrypting-text binary-text" id="decryption-text">01001100 01101111 01100001 01100100 01101001 01101110 01100111</span>';
            
            decryptionLog.appendChild(timeSpan);
            decryptionLog.appendChild(typeSpan);
            decryptionLog.appendChild(messageSpan);
            
            consoleBody.appendChild(decryptionLog);
            
            // Add some hacking details
            setTimeout(() => {
                addConsoleLog('info', 'Brute-forcing encryption key...');
                
                // Start decryption animation with more complexity
                let progress = 0;
                const decryptionText = document.getElementById('decryption-text');
                let decryptionSpeed = 100; // Start slow
                let failedAttempts = 0;
                
                const decryptInterval = setInterval(() => {
                    // Simulate occasional decryption challenges
                    if (progress > 30 && progress < 40 && Math.random() > 0.7) {
                        addConsoleLog('error', 'DECRYPTION BLOCKED: Security countermeasure detected');
                        progress -= 5;
                        failedAttempts++;
                        
                        if (failedAttempts === 1) {
                            setTimeout(() => {
                                addConsoleLog('info', 'Deploying advanced cryptographic bypass...');
                            }, 300);
                        }
                    }
                    
                    // Speed up decryption over time
                    if (progress > 50 && decryptionSpeed > 50) {
                        decryptionSpeed = 50;
                        addConsoleLog('success', 'KEY FRAGMENT FOUND! Decryption accelerated.');
                    }
                    
                    // Add dramatic pause near completion
                    if (progress > 90 && progress < 95) {
                        progress = 95;
                        clearInterval(decryptInterval);
                        
                        addConsoleLog('warning', 'FINAL ENCRYPTION LAYER DETECTED');
                        
                        setTimeout(() => {
                            addConsoleLog('info', 'Applying quantum decryption algorithm...');
                            
                            setTimeout(() => {
                                // Resume with final burst
                                progress = 100;
                                progressBar.style.width = `${progress}%`;
                                
                                // Flash effect on completion
                                progressBar.style.backgroundColor = '#f7768e';
                                setTimeout(() => {
                                    progressBar.style.backgroundColor = '#7aa2f7';
                                    setTimeout(() => {
                                        progressBar.style.backgroundColor = '#9ece6a';
                                        
                                        // Update decryption text
                                        decryptionText.textContent = 'CV_Warapon_Leadlum_DECRYPTED.pdf';
                                        decryptionText.style.color = '#9ece6a';
                                        
                                        // Complete download
                                        completeDownload();
                                    }, 200);
                                }, 200);
                            }, 1000);
                        }, 800);
                        return;
                    }
                    
                    // Normal progress
                    progress += Math.random() * 3 + 1;
                    
                    // Update progress bar
                    progressBar.style.width = `${progress}%`;
                    
                    // Update binary text with more complex patterns
                    if (progress < 100) {
                        // Occasionally show partial decryption
                        if (Math.random() > 0.8) {
                            decryptionText.innerHTML = generatePartialDecryption();
                        } else {
                            decryptionText.textContent = generateRandomBinary();
                        }
                    }
                    
                    // Scroll to bottom
                    consoleBody.scrollTop = consoleBody.scrollHeight;
                }, decryptionSpeed);
            }, 800);
        }, 600);
    }, 500);
}

/**
 * Generates partially decrypted text that reveals parts of the filename
 * @returns {string} Partially decrypted text
 */
function generatePartialDecryption() {
    const filename = 'CV_Warapon_Leadlum.pdf';
    let result = '';
    
    for (let i = 0; i < filename.length; i++) {
        if (Math.random() > 0.7) {
            // Show the actual character
            result += `<span style="color: #9ece6a">${filename[i]}</span>`;
        } else {
            // Show binary
            result += `<span style="color: #7aa2f7">${'01'[Math.floor(Math.random() * 2)]}</span>`;
        }
    }
    
    return result;
}

/**
 * Completes the download process with dramatic flair
 */
function completeDownload() {
    setTimeout(() => {
        addConsoleLog('success', 'DECRYPTION SUCCESSFUL! Classified file unlocked.');
        
        setTimeout(() => {
            // Add warning about security
            addConsoleLog('warning', 'SECURITY ALERT: System administrators may detect this breach');
            
            setTimeout(() => {
                // Add countdown to download
                addConsoleLog('info', 'Initiating secure download protocol in 3...');
                
                setTimeout(() => {
                    addConsoleLog('info', 'Secure download protocol: 2...');
                    
                    setTimeout(() => {
                        addConsoleLog('info', 'Secure download protocol: 1...');
                        
                        setTimeout(() => {
                            // Add dramatic download message
                            addConsoleLog('success', 'DOWNLOADING CLASSIFIED FILE: CV_Warapon_Leadlum_DECRYPTED.pdf');
                            
                            // Add a second progress bar for download
                            const downloadProgressContainer = document.createElement('div');
                            downloadProgressContainer.className = 'log-progress';
                            
                            const downloadProgressBar = document.createElement('div');
                            downloadProgressBar.className = 'progress-bar download-bar';
                            
                            downloadProgressContainer.appendChild(downloadProgressBar);
                            document.getElementById('console-body').appendChild(downloadProgressContainer);
                            
                            // Animate download progress faster than decryption
                            let downloadProgress = 0;
                            const downloadInterval = setInterval(() => {
                                downloadProgress += Math.random() * 10 + 5;
                                
                                if (downloadProgress >= 100) {
                                    downloadProgress = 100;
                                    clearInterval(downloadInterval);
                                    
                                    // Complete with dramatic message
                                    setTimeout(() => {
                                        addConsoleLog('success', 'DOWNLOAD COMPLETE! Classified file secured.');
                                        
                                        setTimeout(() => {
                                            // Add warning about traces
                                            addConsoleLog('warning', 'Removing digital footprints and access logs...');
                                            
                                            setTimeout(() => {
                                                addConsoleLog('success', 'OPERATION COMPLETE. No trace of access remains.');
                                                
                                                // Enable open button with dramatic name
                                                const openBtn = document.getElementById('open-cv-btn');
                                                openBtn.textContent = 'VIEW CLASSIFIED FILE';
                                                openBtn.disabled = false;
                                                openBtn.classList.add('glowing-button');
                                                
                                                // Scroll to bottom
                                                const consoleBody = document.getElementById('console-body');
                                                consoleBody.scrollTop = consoleBody.scrollHeight;
                                            }, 800);
                                        }, 1000);
                                    }, 500);
                                }
                                
                                // Update download progress bar
                                downloadProgressBar.style.width = `${downloadProgress}%`;
                            }, 100);
                        }, 500);
                    }, 500);
                }, 500);
            }, 800);
        }, 1000);
    }, 500);
}

/**
 * Opens the resume file in a new tab
 */
function openResumeFile() {
    // Hide console
    hideConsolePopup();
    
    // Open resume in new tab
    window.open('assets/file/Warapon-resume.pdf', '_blank');
}

/**
 * Adds a console log to the console body
 * @param {string} type - The type of log (info, success, warning, error)
 * @param {string} message - The log message
 */
function addConsoleLog(type, message) {
    const consoleBody = document.getElementById('console-body');
    
    const log = document.createElement('div');
    log.className = 'console-log';
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'log-time';
    timeSpan.textContent = getCurrentTime();
    
    const typeSpan = document.createElement('span');
    typeSpan.className = `log-type ${type}`;
    typeSpan.textContent = type.toUpperCase();
    
    const messageSpan = document.createElement('span');
    messageSpan.className = 'log-message';
    messageSpan.textContent = message;
    
    log.appendChild(timeSpan);
    log.appendChild(typeSpan);
    log.appendChild(messageSpan);
    
    consoleBody.appendChild(log);
    
    // Scroll to bottom
    consoleBody.scrollTop = consoleBody.scrollHeight;
}

/**
 * Gets the current time in HH:MM:SS format
 * @returns {string} The current time
 */
function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    return `[${hours}:${minutes}:${seconds}]`;
}

/**
 * Generates a random binary string
 * @returns {string} A random binary string
 */
function generateRandomBinary() {
    let result = '';
    const length = 30 + Math.floor(Math.random() * 20);
    
    for (let i = 0; i < length; i++) {
        result += Math.random() > 0.5 ? '1' : '0';
        
        // Add space every 8 bits
        if ((i + 1) % 8 === 0 && i < length - 1) {
            result += ' ';
        }
    }
    
    return result;
}
