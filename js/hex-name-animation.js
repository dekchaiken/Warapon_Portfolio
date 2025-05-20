/**
 * Hex Name Animation
 * Shows the name as hex code initially, and reveals the actual name on hover
 */

document.addEventListener('DOMContentLoaded', () => {
    // Target the hero name element
    const heroNameElement = document.querySelector('.hero-name');
    if (!heroNameElement) return;
    
    // Get the original text from data attribute
    const originalText = heroNameElement.getAttribute('data-original') || 'Warapon Leadlum.';
    const hexText = textToHex(originalText).toUpperCase();
    
    // Create a tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'hex-tooltip';
    tooltip.innerHTML = '<span class="tooltip-icon">?</span> <span class="tooltip-text">Hover to decrypt</span>';
    
    // Add tooltip to hero content section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.insertBefore(tooltip, heroNameElement.nextSibling);
    }
    
    // Set initial state to hex
    heroNameElement.textContent = hexText;
    heroNameElement.setAttribute('data-original', originalText);
    heroNameElement.setAttribute('data-hex', hexText);
    heroNameElement.classList.add('encoded');
    
    // Function to convert text to hex
    function textToHex(text) {
        return Array.from(text)
            .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('');
    }
    
    // Function to generate random hex string of specific length
    function randomHex(length) {
        const hexChars = '0123456789ABCDEF';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
        }
        return result;
    }
    
    // Animation variables
    let isDecoding = false;
    let isDecoded = false;
    let decodingInterval = null;
    const animationDuration = 1500; // 1.5 seconds
    const fps = 30;
    const totalFrames = (animationDuration / 1000) * fps;
    
    // Function to create a partially decoded string
    function partialDecode(hexText, originalText, progress) {
        const result = [];
        let hexIndex = 0;
        const originalLength = originalText.length;
        
        // Calculate how many characters should be decoded
        const decodedCount = Math.floor(originalLength * progress);
        
        for (let i = 0; i < originalLength; i++) {
            if (i < decodedCount) {
                // This character is decoded
                result.push(originalText[i]);
            } else {
                // This character is still encoded or random
                if (Math.random() > 0.3) {
                    // Show part of the hex
                    result.push(hexText[hexIndex % hexText.length]);
                    hexIndex++;
                } else {
                    // Show random hex
                    result.push(randomHex(1));
                }
            }
        }
        
        return result.join('');
    }
    
    // Add hover effect to trigger decoding animation
    heroNameElement.addEventListener('mouseenter', () => {
        if (isDecoding || isDecoded) return;
        
        // Start decoding animation
        isDecoding = true;
        heroNameElement.classList.add('decoding');
        heroNameElement.classList.remove('encoded');
        
        // Hide tooltip
        tooltip.style.opacity = '0';
        
        let frame = 0;
        decodingInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            
            if (progress >= 1) {
                // Animation complete
                clearInterval(decodingInterval);
                heroNameElement.textContent = originalText;
                heroNameElement.classList.remove('decoding');
                heroNameElement.classList.add('decoded');
                isDecoding = false;
                isDecoded = true;
                return;
            }
            
            // Update text with partial decode
            heroNameElement.textContent = partialDecode(hexText, originalText, progress);
        }, 1000 / fps);
    });
    
    // Add mouseleave effect to revert to hex
    heroNameElement.addEventListener('mouseleave', () => {
        // Clear any ongoing animation
        if (decodingInterval) {
            clearInterval(decodingInterval);
            decodingInterval = null;
        }
        
        // If we were in the middle of decoding or already decoded
        if (isDecoding || isDecoded) {
            // Revert to hex with a glitch effect
            heroNameElement.classList.remove('decoded');
            heroNameElement.classList.add('encoding');
            
            // Show tooltip again
            tooltip.style.opacity = '1';
            
            // Quick encoding animation
            let frame = totalFrames;
            const encodingInterval = setInterval(() => {
                frame -= 3; // Faster encoding than decoding
                const progress = frame / totalFrames;
                
                if (progress <= 0) {
                    // Animation complete
                    clearInterval(encodingInterval);
                    heroNameElement.textContent = hexText;
                    heroNameElement.classList.remove('encoding');
                    heroNameElement.classList.add('encoded');
                    isDecoding = false;
                    isDecoded = false;
                    return;
                }
                
                // Update text with partial decode (in reverse)
                heroNameElement.textContent = partialDecode(hexText, originalText, progress);
            }, 1000 / fps);
        }
    });
});
