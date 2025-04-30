class DoodleJump {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 600;
        
        // Game state
        this.gameRunning = false;
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
        document.getElementById('high-score').textContent = `High Score: ${this.highScore}`;
        
        // Player properties
        this.playerName = '';
        this.ninjaSprite = new Image();
        this.ninjaSprite.src = 'assets/ninja.svg';
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 100,
            width: 40,
            height: 40,
            velocityY: 0,
            velocityX: 0,
            jumpForce: -15,
            gravity: 0.5,
            speed: 7,
            direction: 'right'
        };
        
        // Platforms
        this.platforms = [];
        this.platformWidth = 85;
        this.platformHeight = 15;
        this.platformCount = 7;
        
        // Event listeners
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        document.getElementById('start-button').addEventListener('click', () => this.startGame());
        document.getElementById('restart-button').addEventListener('click', () => this.restartGame());
        
        // Initial setup
        this.initGame();
    }
    
    initGame() {
        this.platforms = [];
        this.score = 0;
        this.updateScore();
        
        // Create initial platforms
        // Add a starting platform right under the player
        this.platforms.push({
            x: this.canvas.width / 2 - this.platformWidth / 2,
            y: this.canvas.height - 50
        });
        
        // Create remaining platforms
        for (let i = 1; i < this.platformCount; i++) {
            this.platforms.push({
                x: Math.random() * (this.canvas.width - this.platformWidth),
                y: this.canvas.height - (i * (this.canvas.height / this.platformCount))
            });
        }
    }
    
    restartGame() {
        this.gameRunning = true;
        document.querySelector('.menu').style.display = 'none';
        document.getElementById('restart-button').style.display = 'none';
        this.initGame();
        this.player.velocityY = this.player.jumpForce;
        this.gameLoop();
    }

    startGame() {
        if (!this.gameRunning) {
            const nameInput = document.getElementById('player-name');
            if (!nameInput.value.trim()) {
                alert('Please enter your name!');
                return;
            }
            this.playerName = nameInput.value.trim();
            this.gameRunning = true;
            this.initGame();
            document.querySelector('.menu').style.display = 'none';
            // Give initial jump to start the game
            this.player.velocityY = this.player.jumpForce;
            this.gameLoop();
        }
    }
    
    handleKeyDown(e) {
        if (this.gameRunning) {
            if (e.key === 'ArrowLeft') {
                this.player.velocityX = -this.player.speed;
                this.player.direction = 'left';
            }
            if (e.key === 'ArrowRight') {
                this.player.velocityX = this.player.speed;
                this.player.direction = 'right';
            }
        }
    }
    
    handleKeyUp(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            this.player.velocityX = 0;
        }
    }
    
    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore);
            document.getElementById('high-score').textContent = `High Score: ${this.highScore}`;
        }
    }
    
    checkCollision(platform) {
        return this.player.x < platform.x + this.platformWidth &&
               this.player.x + this.player.width > platform.x &&
               this.player.y + this.player.height > platform.y &&
               this.player.y + this.player.height < platform.y + this.platformHeight + 10 &&
               this.player.velocityY > 0;
    }
    
    update() {
        // Update player position
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;
        this.player.velocityY += this.player.gravity;
        
        // Screen wrapping
        if (this.player.x > this.canvas.width) {
            this.player.x = 0;
        } else if (this.player.x < 0) {
            this.player.x = this.canvas.width;
        }
        
        // Check platform collisions
        for (let platform of this.platforms) {
            if (this.checkCollision(platform)) {
                this.player.velocityY = this.player.jumpForce;
                this.score += 10;
                this.updateScore();
            }
        }
        
        // Move platforms down when player reaches upper half
        if (this.player.y < this.canvas.height / 2) {
            this.player.y = this.canvas.height / 2;
            for (let platform of this.platforms) {
                platform.y += -this.player.velocityY;
                if (platform.y > this.canvas.height) {
                    platform.y = 0;
                    platform.x = Math.random() * (this.canvas.width - this.platformWidth);
                    this.score += 20;
                    this.updateScore();
                }
            }
        }
        
        // Game over condition
        if (this.player.y > this.canvas.height) {
            this.gameOver();
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw player (ninja sprite)
        if (this.ninjaSprite.complete) {
            this.ctx.save();
            if (this.player.direction === 'left') {
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(this.ninjaSprite, -this.player.x - this.player.width, this.player.y, this.player.width, this.player.height);
            } else {
                this.ctx.drawImage(this.ninjaSprite, this.player.x, this.player.y, this.player.width, this.player.height);
            }
            this.ctx.restore();
        }
        
        // Draw platforms
        this.ctx.fillStyle = '#795548';
        for (let platform of this.platforms) {
            this.ctx.fillRect(platform.x, platform.y, this.platformWidth, this.platformHeight);
        }
    }
    
    async gameOver() {
        this.gameRunning = false;
        document.querySelector('.menu').style.display = 'block';
        document.getElementById('start-button').textContent = 'Play Again';
        document.getElementById('restart-button').style.display = 'block';
        
        // Save score to leaderboard
        try {
            await fetch('/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    score: this.score,
                    playerName: this.playerName
                })
            });
            
            // Update leaderboard display
            const response = await fetch('/api/scores');
            const scores = await response.json();
            const leaderboardElement = document.getElementById('leaderboard');
            leaderboardElement.innerHTML = '<h3>Leaderboard</h3>' +
                scores.map(score => `<div>${score.playerName}: ${score.score}</div>`).join('');
        } catch (error) {
            console.error('Error saving score:', error);
        }
    }
    
    gameLoop() {
        if (this.gameRunning) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}

// Initialize game when window loads
let game;
window.onload = () => {
    game = new DoodleJump();
    // Draw initial state
    game.draw();
};
