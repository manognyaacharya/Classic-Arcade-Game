var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 70;
    this.speed = 100;
    this.lives = 3;
    this.score = 0;
    this.sprite = 'images/char-horn-girl.png';
};

Player.prototype.update = function(dt) {

        if (this.x < 0 || this.x > 400) {
        if(this.x < 0){
            this.x = 0;
        }
        else{
            this.x = 400;
        }
    }
    if (this.y < 0 || this.y > 400) {
        if(this.y < 0){
            this.lives--;
            this.reset();
        }
        else{
            this.y = 400;
        }
    }
    this.checkCollisions();

};

Player.prototype.reset = function() {
        this.y = 400;
        this.x = 0;
        console.log(this.lives);
        if (this.lives == 0) {
            setTimeout (function() {
            alert('YOU LOSE!');
            },100);
        }
};



Player.prototype.checkCollisions = function() {

    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x < allEnemies[i].x + allEnemies[i].width) && (this.x + this.width > allEnemies[i].x) && (this.y < allEnemies[i].y + allEnemies[i].height) && (this.height + this.y > allEnemies[i].y)) {

        //if (allEnemies[i].x < player.x + 171 && allEnemies[i].x +171 > player.x && allEnemies[i].y < player.y + 101 && 101 + allEnemies[i].y > player.y) {
            console.log("Collision!");
            this.lives--;
            this.reset();
        }
        else if ((this.x < heart.x + heart.width) && (this.x + this.width > heart.x) && (this.y < heart.y + heart.height) && (this.height + this.y > heart.y)) {

        //if (allEnemies[i].x < player.x + 171 && allEnemies[i].x +171 > player.x && allEnemies[i].y < player.y + 101 && 101 + allEnemies[i].y > player.y) {
            setTimeout (function() {
            alert('YOU WIN!');
            }, 100);
            this.reset();
        }
    }
};

Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        this.x -= 100;
    }

    if (direction == 'right') {
        this.x += 100;
    }

    if (direction == 'up') {
        this.y -= 83;
    }

    if (direction == 'down') {
        this.y += 83;
    }
};

    function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};

Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        drawBox(this.x + 5, this.y + 60, 85, 80, "blue");
 };

var player = new Player(0,400);

var Heart = function(x,y) {
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.sprite = 'images/Heart.png';
};

Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        drawBox(this.x + 5, this.y + 50, 95, 90, "blue");
};

//setTimeout (function() {
  //  alert('YOU WIN!');
//},
//5000);


var heart = new Heart(150,150);

// Enemies our player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.height = 67;
    this.width = 100;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
            this.x = 0;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawBox(this.x, this.y + 77, 100, 67, "yellow");
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(10,10);
var enemy2 = new Enemy(155,200);

var allEnemies = [enemy1,enemy2];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
