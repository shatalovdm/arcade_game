
// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Initial coordinates for our enemies 
    this.y = y;
    this.x = x;

    // Enemy speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    this.x = this.x + this.speed;

    // Handle collision with the Player
    if ((player.y - 20) === this.y) {
        if (player.x < (this.x + 40) && player.x > (this.x - 40)) {
            player.reset();
            player.collision = player.collision + 1;
            allLives[player.collision].visible = false;
            if (player.collision === 2) {
                player.collision = -1;
                sc.reset();
                allLives.forEach(function(live) {
                    live.reset();
                });
            }    
        }
    }

    // Move the enemies to the beginning of the next line when they reach the border
    if (this.x > 500) {
        this.x = -100;
        this.y = this.y + 80;
        if (this.y === 300) {
            this.y = 60;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.reset();
    this.collision = -1;
    this.sprite = 'images/char-boy.png';
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {

    this.y = 80 * this.yMove;
    this.x = 101 * this.xMove;

    // Handle the case when the player reaches the river
    if (this.yMove === 0) {
        // Update the score
        sc.update();
        // Reset the position of the player
        this.reset();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Receive user input, allowedKeys (the key which was pressed), as the parameter and move the player according to that input
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'right':
            if (this.xMove < 4) this.xMove += 1;
            break;
        case 'down':
            if (this.yMove < 5) this.yMove += 1;
            break;
        case 'left':
            if (this.xMove > 0) this.xMove -= 1;
            break;
        case 'up':
            if (this.yMove > 0) this.yMove -= 1;
    }
};

// Reset the postion of the player
Player.prototype.reset = function() {
    this.xMove = 2;
    this.yMove = 5;
};

// Live our player has
var Live = function(number) {
    this.sprite = 'images/Heart.png';
    this.visible = true;
    this.number = number;
}

// Draw hearts on the screen, required method for game
Live.prototype.render = function() {
    if (this.visible) {
        ctx.drawImage(Resources.get(this.sprite), (350 + this.number * 50), 50, 50, 70);
    }
}

// Reset live visibility on the screen
Live.prototype.reset = function() {
    this.visible = true;
}

// Score the player gets when reaches the river
var Score = function() {
    this.score = 0;
}

// Draw score on the screen, required method for game
Score.prototype.render = function() {
    ctx.font = '22pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText('YOUR SCORE: '+ this.score, 10, 95);
}

// Update the score 
Score.prototype.update = function() {
    this.score = this.score + 1;
}

// Reset the score 
Score.prototype.reset = function() {
    this.score = 0;
}

// Instantiate objects for the game
var allEnemies = [
    new Enemy(-100, 60, Math.random() * (10 - 2) + 2),  
    new Enemy(-100, 140, Math.random() * (10 - 2) + 2),  
    new Enemy(-100, 220, Math.random() * (10 - 2) + 2)
];
var player = new Player(200, 400);

var allLives = [
    new Live(0), new Live(1), new Live(2)
];

var sc = new Score();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
