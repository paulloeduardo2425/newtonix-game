let game;
let player;
let cursors;
let attackKey;

let mobile = {
    left: false,
    right: false,
    jump: false,
    attack: false
};

// ==========================
// MENU
// ==========================
function startGame() {
    document.getElementById("menu").style.display = "none";
    initGame();
}

function resetGame() {
    localStorage.clear();
    location.reload();
}

// ==========================
// PHASER CONFIG
// ==========================
function initGame() {

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

game = new Phaser.Game(config);
}

// ==========================
// PRELOAD
// ==========================
function preload() {
    this.load.image("ground", "https://labs.phaser.io/assets/sprites/platform.png");
    this.load.image("player", "https://labs.phaser.io/assets/sprites/phaser-dude.png");
}

// ==========================
// CREATE
// ==========================
function create() {

this.player = this.physics.add.sprite(100, 300, "player");
this.player.setCollideWorldBounds(true);

let ground = this.physics.add.staticGroup();
ground.create(400, 580, "ground").setScale(2).refreshBody();

this.physics.add.collider(this.player, ground);

cursors = this.input.keyboard.createCursorKeys();
attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

// ==========================
// MOBILE BUTTONS
// ==========================
document.getElementById("left").ontouchstart = () => mobile.left = true;
document.getElementById("left").ontouchend = () => mobile.left = false;

document.getElementById("right").ontouchstart = () => mobile.right = true;
document.getElementById("right").ontouchend = () => mobile.right = false;

document.getElementById("jump").ontouchstart = () => mobile.jump = true;
document.getElementById("jump").ontouchend = () => mobile.jump = false;

document.getElementById("attack").ontouchstart = () => mobile.attack = true;
document.getElementById("attack").ontouchend = () => mobile.attack = false;

}

// ==========================
// UPDATE
// ==========================
function update() {

let speed = 200;

// MOVIMENTO PC + MOBILE
if (cursors.left.isDown || mobile.left) {
    this.player.setVelocityX(-speed);
}
else if (cursors.right.isDown || mobile.right) {
    this.player.setVelocityX(speed);
}
else {
    this.player.setVelocityX(0);
}

// PULO
if ((cursors.up.isDown || mobile.jump) && this.player.body.blocked.down) {
    this.player.setVelocityY(-400);
}

// ATAQUE (placeholder)
if (Phaser.Input.Keyboard.JustDown(attackKey) || mobile.attack) {
    console.log("ATAQUE!");
    mobile.attack = false;
}

}
