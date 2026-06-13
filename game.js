/**
 * NEWTONIX - VERSÃO AJUSTADA PARA RODAR NO PHASER 3
 * (COLAR INTEIRO NO game.js)
 */

// ========================
// SAVE SYSTEM
// ========================
const SaveManager = {
    key: 'newtonix_save_data',
    defaultData: {
        faseAtual: 1,
        xp: 0,
        moedas: 0,
        nivel: 1,
        atributos: {
            vidaMax: 100,
            energiaMax: 100,
            ataque: 10,
            velocidade: 200,
            resistencia: 0
        },
        quizAcertos: 0,
        inimigosDerrotados: 0
    },

    carregar() {
        let data = localStorage.getItem(this.key);
        if (!data) return structuredClone(this.defaultData);
        return JSON.parse(data);
    },

    salvar(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    },

    resetar() {
        localStorage.removeItem(this.key);
        return structuredClone(this.defaultData);
    }
};

// ========================
// AUDIO ENGINE
// ========================
const AudioEngine = {
    ctx: null,

    init() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },

    play(freq, type = 'sine', time = 0.1, vol = 0.1) {
        this.init();
        let o = this.ctx.createOscillator();
        let g = this.ctx.createGain();

        o.type = type;
        o.frequency.value = freq;

        g.gain.value = vol;

        o.connect(g);
        g.connect(this.ctx.destination);

        o.start();
        o.stop(this.ctx.currentTime + time);
    },

    sfx(type) {
        switch (type) {
            case 'jump': this.play(300); break;
            case 'hit': this.play(120, 'sawtooth', 0.2, 0.2); break;
            case 'coin': this.play(600); break;
            case 'win': this.play(500); this.play(700); this.play(900); break;
        }
    }
};

// ========================
// PLAYER
// ========================
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, null);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.vida = 100;
        this.speed = 200;
        this.jumpPower = -400;

        this.body.setGravityY(800);

        // simples placeholder visual
        this.setDisplaySize(32, 48);
        this.setTint(0x00ffff);
    }

    update(cursors) {
        if (!this.body) return;

        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
        } else {
            this.setVelocityX(0);
        }

        if (cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(this.jumpPower);
            AudioEngine.sfx('jump');
        }
    }
}

// ========================
// ENEMY
// ========================
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setTint(0xff0000);
        this.setCollideWorldBounds(true);

        this.vida = 30;
        this.speed = 80;

        this.direcao = 1;
    }

    update() {
        this.setVelocityX(this.speed * this.direcao);

        if (this.body.blocked.left || this.body.blocked.right) {
            this.direcao *= -1;
        }
    }

    receberDano(d) {
        this.vida -= d;
        this.setTint(0xffffff);

        setTimeout(() => this.clearTint(), 100);

        if (this.vida <= 0) {
            this.destroy();
        }
    }
}

// ========================
// HUD
// ========================
class HUD {
    constructor(scene) {
        this.vida = scene.add.text(10, 10, '', { font: '16px Arial', fill: '#fff' }).setScrollFactor(0);
        this.moedas = scene.add.text(10, 30, '', { font: '16px Arial', fill: '#fff' }).setScrollFactor(0);
    }

    update(player, data) {
        this.vida.setText('Vida: ' + player.vida);
        this.moedas.setText('Moedas: ' + data.moedas);
    }
}

// ========================
// SCENE
// ========================
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.save = SaveManager.carregar();

        this.player = new Player(this, 100, 300);

        this.enemy = new Enemy(this, 300, 300);

        this.physics.add.collider(this.player, this.enemy, () => {
            this.player.vida -= 10;
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.hud = new HUD(this);
    }

    update() {
        this.player.update(this.cursors);
        this.enemy.update();

        this.hud.update(this.player, this.save);
    }
}

// ========================
// CONFIG PHASER
// ========================
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene]
};

new Phaser.Game(config);
