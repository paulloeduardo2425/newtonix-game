/**
 * =========================================================
 * NEWTONIX: A GUERRA DAS LEIS PERDIDAS
 * VERSÃO COMPLETA FUNCIONAL (PHASER 3 - GITHUB PAGES)
 * =========================================================
 */

const SaveManager = {
    key: "newtonix_save",
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
        let d = localStorage.getItem(this.key);
        return d ? JSON.parse(d) : structuredClone(this.defaultData);
    },

    salvar(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    },

    resetar() {
        localStorage.removeItem(this.key);
        return structuredClone(this.defaultData);
    }
};

// ================= AUDIO =================
const AudioEngine = {
    ctx: null,
    init() {
        if (!this.ctx)
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },

    play(freq, type = "sine", t = 0.1, v = 0.1) {
        this.init();
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        o.type = type;
        o.frequency.value = freq;

        g.gain.value = v;

        o.connect(g);
        g.connect(this.ctx.destination);

        o.start();
        o.stop(this.ctx.currentTime + t);
    },

    sfx(name) {
        switch (name) {
            case "jump": this.play(300); break;
            case "hit": this.play(120, "sawtooth", 0.2, 0.2); break;
            case "coin": this.play(600); break;
            case "win": this.play(400); this.play(600); this.play(800); break;
        }
    }
};

// ================= PLAYER =================
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, save) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setDisplaySize(32, 48);
        this.setTint(0x00d2ff);

        this.body.setGravityY(800);

        this.save = save;

        this.vida = save.atributos.vidaMax;
        this.speed = save.atributos.velocidade;
    }

    update(cursors) {
        if (!this.body) return;

        if (cursors.left.isDown) this.setVelocityX(-this.speed);
        else if (cursors.right.isDown) this.setVelocityX(this.speed);
        else this.setVelocityX(0);

        if (cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-420);
            AudioEngine.sfx("jump");
        }
    }
}

// ================= INIMIGO =================
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setTint(0xff3333);
        this.setCollideWorldBounds(true);

        this.vida = 30;
        this.speed = 80;
        this.dir = 1;
    }

    update() {
        this.setVelocityX(this.speed * this.dir);

        if (this.body.blocked.left || this.body.blocked.right)
            this.dir *= -1;
    }

    receberDano(d) {
        this.vida -= d;
        this.setTint(0xffffff);
        setTimeout(() => this.clearTint(), 100);

        if (this.vida <= 0) this.destroy();
    }
}

// ================= HUD =================
class HUD {
    constructor(scene) {
        this.vida = scene.add.text(10, 10, "", { font: "16px Arial", fill: "#fff" }).setScrollFactor(0);
        this.moedas = scene.add.text(10, 30, "", { font: "16px Arial", fill: "#fff" }).setScrollFactor(0);
    }

    update(player, save) {
        this.vida.setText("Vida: " + Math.floor(player.vida));
        this.moedas.setText("Moedas: " + save.moedas);
    }
}

// ================= SCENE =================
class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.save = SaveManager.carregar();

        this.player = new Player(this, 100, 300, this.save);
        this.enemy = new Enemy(this, 400, 300);

        this.physics.add.collider(this.player, this.enemy, (p, e) => {
            p.vida -= 10;
            AudioEngine.sfx("hit");
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

// ================= CONFIG =================
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene]
};

new Phaser.Game(config);
