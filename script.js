class TerribleClickSpeedTest {
    constructor() {
        this.clickCount = 0;
        this.startTime = 0;
        this.gameRunning = false;
        this.moveInterval = null;
        this.currentMoveClass = '';
        this.clickTimes = []; // Array to store click timestamps
        this.annoyingMessages = [
            "Can't catch me! 😈",
            "Too slow! 🐌",
            "Missed again! 😅",
            "You'll never get me! 🚀",
            "Try harder! 💪",
            "Not fast enough! ⚡",
            "I'm too quick! 🏃‍♂️",
            "Better luck next time! 🍀",
            "You're getting warmer! 🔥",
            "Almost there... not! 😂"
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.setupButtonMovement();
    }
    
    initializeElements() {
        this.clickButton = document.getElementById('clickButton');
        this.gameArea = document.getElementById('gameArea');
        this.clickCountElement = document.getElementById('clickCount');
        this.cpsElement = document.getElementById('cps');
        this.timerElement = document.getElementById('timer');
        this.annoyingMessageElement = document.getElementById('annoyingMessage');
        this.restartBtn = document.getElementById('restartBtn');
    }
    
    bindEvents() {
        this.clickButton.addEventListener('click', () => this.handleClick());
        
        // Double click to reset game
        this.clickButton.addEventListener('dblclick', () => this.resetGame());
        
        // Restart button
        this.restartBtn.addEventListener('click', () => this.resetGame());
        
        // Add some terrible mouse tracking
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    handleClick() {
        // Start game on first click if not running
        if (!this.gameRunning) {
            this.startGame();
        }
        
        // Only process clicks if game is actually running
        if (!this.gameRunning) return;
        
        this.clickCount++;
        this.clickCountElement.textContent = this.clickCount;
        
        // Add some terrible effects
        this.addClickEffect();
        

        
        // Change button position randomly
        this.moveButtonRandomly();
        
        // Change annoying message
        this.changeAnnoyingMessage();
        
        // Make button smaller temporarily
        this.clickButton.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.clickButton.style.transform = '';
        }, 100);
    }
    
    handleMouseMove(e) {
        // Double-check game state to prevent interference
        if (!this.gameRunning || this.startTime === 0) return;
        
        // Sometimes make the button run away from the mouse
        if (Math.random() < 0.1) {
            const rect = this.gameArea.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const buttonRect = this.clickButton.getBoundingClientRect();
            const buttonX = buttonRect.left - rect.left;
            const buttonY = buttonRect.top - rect.top;
            
            // Move button away from mouse
            const deltaX = buttonX - mouseX;
            const deltaY = buttonY - mouseY;
            
            const newX = Math.max(0, Math.min(rect.width - 150, buttonX + deltaX * 0.1));
            const newY = Math.max(0, Math.min(rect.height - 80, buttonY + deltaY * 0.1));
            
            this.clickButton.style.left = newX + 'px';
            this.clickButton.style.top = newY + 'px';
        }
    }
    
    startGame() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.startTime = Date.now();
        
        // Start the terrible button movement
        this.startButtonMovement();
        
        // Start timer update
        this.timerInterval = setInterval(() => {
            this.updateTimer();
        }, 100);
        
        // Start CPS update (more frequent for live updates)
        this.cpsInterval = setInterval(() => {
            this.updateCPS();
        }, 50); // Update CPS every 50ms for smooth real-time display
        
        // End game after 5 seconds
        this.gameEndTimer = setTimeout(() => {
            if (this.gameRunning) { // Double-check game is still running
                this.endGame();
            }
        }, 5000);
        
        // Add some terrible sound effects (if supported)
        this.playTerribleSound();
    }
    
    endGame() {
        this.gameRunning = false;
        
        // Stop button movement
        this.stopButtonMovement();
        
        // Clear intervals
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        if (this.cpsInterval) {
            clearInterval(this.cpsInterval);
        }
        
        if (this.gameEndTimer) {
            clearTimeout(this.gameEndTimer);
        }
        
        // Reset button position to center
        const rect = this.gameArea.getBoundingClientRect();
        const buttonRect = this.clickButton.getBoundingClientRect();
        
        const centerX = (rect.width - buttonRect.width) / 2;
        const centerY = (rect.height - buttonRect.height) / 2;
        
        this.clickButton.style.left = centerX + 'px';
        this.clickButton.style.top = centerY + 'px';
        this.clickButton.style.transform = '';
        
        // Show final results
        this.annoyingMessageElement.textContent = `Game Over! Final CPS: ${this.cpsElement.textContent}`;
        
        // Disable clicking
        this.clickButton.style.pointerEvents = 'none';
        this.clickButton.style.opacity = '0.5';
    }
    
    resetGame() {
        this.gameRunning = false;
        this.clickCount = 0;
        this.startTime = 0;

        this.clickCountElement.textContent = '0';
        this.cpsElement.textContent = '0.00';
        this.timerElement.textContent = '0.00s';
        
        // Stop button movement
        this.stopButtonMovement();
        
        // Reset button position
        const rect = this.gameArea.getBoundingClientRect();
        const buttonRect = this.clickButton.getBoundingClientRect();
        
        const centerX = (rect.width - buttonRect.width) / 2;
        const centerY = (rect.height - buttonRect.height) / 2;
        
        this.clickButton.style.left = centerX + 'px';
        this.clickButton.style.top = centerY + 'px';
        this.clickButton.style.transform = '';
        
        // Clear intervals
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        if (this.cpsInterval) {
            clearInterval(this.cpsInterval);
        }
        
        if (this.gameEndTimer) {
            clearTimeout(this.gameEndTimer);
        }
        
        // Reset annoying message
        this.annoyingMessageElement.textContent = "Can't catch me! 😈";
        
        // Re-enable clicking
        this.clickButton.style.pointerEvents = 'auto';
        this.clickButton.style.opacity = '1';
    }
    
    startButtonMovement() {
        // Move button continuously every 100ms for smooth movement
        this.moveInterval = setInterval(() => {
            this.moveButtonRandomly();
        }, 100);
    }
    
    stopButtonMovement() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }
    
    moveButtonRandomly() {
        // Double-check game state to prevent interference
        if (!this.gameRunning || this.startTime === 0) return;
        
        try {
            const rect = this.gameArea.getBoundingClientRect();
            const buttonRect = this.clickButton.getBoundingClientRect();
            
            // Get current position - handle both CSS transforms and direct positioning
            let currentX, currentY;
            
            if (this.clickButton.style.left && this.clickButton.style.left !== '50%') {
                currentX = parseFloat(this.clickButton.style.left);
                currentY = parseFloat(this.clickButton.style.top);
            } else {
                // Use the actual computed position from getBoundingClientRect
                currentX = buttonRect.left - rect.left;
                currentY = buttonRect.top - rect.top;
            }
            
            // Validate current position
            if (isNaN(currentX) || isNaN(currentY)) {
                // Fallback to center if position is invalid
                currentX = rect.width / 2;
                currentY = rect.height / 2;
            }
            
            // Calculate new position
            const maxX = rect.width - buttonRect.width;
            const maxY = rect.height - buttonRect.height;
            
            let newX, newY;
            
            // 30% chance to teleport, 70% chance for movement
            if (Math.random() < 0.3) {
                // Teleport to random position
                newX = Math.random() * maxX;
                newY = Math.random() * maxY;
            } else {
                // Normal movement with variable speed
                const movementType = Math.random();
                
                if (movementType < 0.4) {
                    // Slow movement (small steps)
                    const stepX = (Math.random() - 0.5) * 15; // Random step between -7.5 and 7.5
                    const stepY = (Math.random() - 0.5) * 15;
                    newX = currentX + stepX;
                    newY = currentY + stepY;
                } else if (movementType < 0.7) {
                    // Medium movement (normal steps)
                    const stepX = (Math.random() - 0.5) * 25; // Random step between -12.5 and 12.5
                    const stepY = (Math.random() - 0.5) * 25;
                    newX = currentX + stepX;
                    newY = currentY + stepY;
                } else {
                    // Fast movement (large steps)
                    const stepX = (Math.random() - 0.5) * 40; // Random step between -20 and 20
                    const stepY = (Math.random() - 0.5) * 40;
                    newX = currentX + stepX;
                    newY = currentY + stepY;
                }
            }
            
            // Keep button within bounds
            newX = Math.max(0, Math.min(maxX, newX));
            newY = Math.max(0, Math.min(maxY, newY));
            
            // Set new position
            this.clickButton.style.left = newX + 'px';
            this.clickButton.style.top = newY + 'px';
            this.clickButton.style.transform = ''; // Clear any transforms
            
            // Sometimes change size for extra challenge
            if (Math.random() < 0.1) { // Reduced frequency since movement is more frequent
                const scale = 0.8 + Math.random() * 0.4; // Between 0.8 and 1.2
                this.clickButton.style.transform = `scale(${scale})`;
            }
        } catch (error) {
            // If there's an error, reset button to center and stop movement
            console.warn('Button movement error, resetting to center:', error);
            this.clickButton.style.left = '50%';
            this.clickButton.style.top = '50%';
            this.clickButton.style.transform = 'translate(-50%, -50%)';
            this.stopButtonMovement();
        }
    }
    
    updateCPS() {
        if (this.startTime === 0) return;
        
        const elapsed = (Date.now() - this.startTime) / 1000;
        if (elapsed > 0) {
            const cps = this.clickCount / elapsed;
            this.cpsElement.textContent = cps.toFixed(2);
        }
    }
    
    updateTimer() {
        if (this.startTime === 0) return;
        
        const elapsed = (Date.now() - this.startTime) / 1000;
        this.timerElement.textContent = elapsed.toFixed(2) + 's';
    }
    
    addClickEffect() {
        // Create a subtle click effect
        const effect = document.createElement('div');
        effect.style.position = 'absolute';
        effect.style.left = this.clickButton.offsetLeft + 'px';
        effect.style.top = this.clickButton.offsetTop + 'px';
        effect.style.width = '20px';
        effect.style.height = '20px';
        effect.style.borderRadius = '50%';
        effect.style.backgroundColor = '#4ecdc4';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '1000';
        effect.style.animation = 'clickEffect 0.3s ease-out forwards';
        
        this.gameArea.appendChild(effect);
        
        // Remove effect after animation
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 300);
    }
    
    changeAnnoyingMessage() {
        const randomMessage = this.annoyingMessages[Math.floor(Math.random() * this.annoyingMessages.length)];
        this.annoyingMessageElement.textContent = randomMessage;
        
        // Add some terrible animation
        this.annoyingMessageElement.style.animation = 'none';
        setTimeout(() => {
            this.annoyingMessageElement.style.animation = 'messageFloat 0.5s ease-in-out';
        }, 10);
    }
    
    playTerribleSound() {
        // Silent - no sound effects in minimalist version
    }
    
    setupButtonMovement() {
        // Initial button position - use absolute positioning instead of transforms
        const rect = this.gameArea.getBoundingClientRect();
        const buttonRect = this.clickButton.getBoundingClientRect();
        
        const centerX = (rect.width - buttonRect.width) / 2;
        const centerY = (rect.height - buttonRect.height) / 2;
        
        this.clickButton.style.left = centerX + 'px';
        this.clickButton.style.top = centerY + 'px';
        this.clickButton.style.transform = '';
    }
    

}

// Add CSS for click effect
const style = document.createElement('style');
style.textContent = `
    @keyframes clickEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new TerribleClickSpeedTest();
});
