/**
 * ======================================================================
 * NEWTONIX: A GUERRA DAS LEIS PERDIDAS
 * ARQUIVO DE INFRAESTRUTURA LOGICA E ENGINES INTEGRADAS
 * ======================================================================
 */

// ==========================================
// MÓDULO 1: GERENCIADOR DE SALVAMENTO (SAVE)
// ==========================================
const SaveManager = {
    key: 'newtonix_save_data',
    defaultData: {
        faseAtual: 1,
        xp: 0,
        moedas: 0,
        nivel: 1,
        atributos: { vidaMax: 100, energiaMax: 100, ataque: 10, velocidade: 200, resistencia: 0 },
        conquistas: [],
        tempoTotal: 0,
        quizAcertos: 0,
        inimigosDerrotados: 0
    },
    carregar() {
        const raw = localStorage.getItem(this.key);
        if (!raw) return JSON.parse(JSON.stringify(this.defaultData));
        return JSON.parse(raw);
    },
    salvar(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    },
    resetar() {
        localStorage.setItem(this.key, JSON.stringify(this.defaultData));
        return JSON.parse(JSON.stringify(this.defaultData));
    }
};

// ==========================================
// MÓDULO 2: BANCO DE DADOS EDUCACIONAL (QUIZ)
// ==========================================
const QuizDatabase = {
    fase1: [
        {
            pergunta: "Se um objeto está em repouso e nenhuma força líquida atua sobre ele, o que acontece de acordo com a Primeira Lei de Newton?",
            opcoes: [
                "Ele começa a acelerar lentamente devido ao vácuo.",
                "Ele permanece em repouso por causa da sua Inércia.",
                "Ele entra em colapso molecular imediato.",
                "Ele move-se espontaneamente para recuperar energia."
            ],
            correta: 1,
            explicacao: "A Primeira Lei (Inércia) dita que um corpo em repouso tende a permanecer em repouso a menos que uma força externa atue sobre ele."
        },
        {
            pergunta: "Um astronauta lança uma ferramenta no espaço sideral profundo, longe de qualquer gravidade ou atrito. A ferramenta irá:",
            opcoes: [
                "Parar imediatamente após perder o contato com a mão.",
                "Descrever uma trajetória parabólica até cair.",
                "Continuar em movimento retilíneo uniforme indefinidamente.",
                "Diminuir a velocidade gradativamente até parar."
            ],
            correta: 2,
            explicacao: "Sem forças externas dissipativas como atrito ou gravidade, o corpo em movimento mantém sua velocidade constante e linha reta."
        },
        {
            pergunta: "Qual propriedade física mede a resistência que um corpo oferece à alteração do seu estado de movimento?",
            opcoes: [
                "O volume volumétrico.",
                "A carga elétrica líquida.",
                "A Massa (medida quantitativa da Inércia).",
                "A densidade molecular."
            ],
            correta: 2,
            explicacao: "A massa é a medida direta da inércia de um corpo. Quanto maior a massa, mais difícil alterar seu estado de movimento."
        }
    ],
    fase2: [
        {
            pergunta: "De acordo com a Segunda Lei de Newton (Dinâmica), se triplicarmos a força líquida aplicada sobre uma mesma massa, a aceleração resultante:",
            opcoes: [
                "Permanecerá exatamente a mesma.",
                "Será dividida por três.",
                "Será triplicada, pois são diretamente proporcionais.",
                "Aumentará de forma exponencial quadrática."
            ],
            correta: 2,
            explicacao: "Como F = m * a, a aceleração é diretamente proporcional à força resultante aplicada."
        },
        {
            pergunta: "Se aplicarmos a mesma força horizontal em um bloco de 2kg e em um bloco de 10kg, qual deles sofrerá a maior aceleração?",
            opcoes: [
                "O bloco de 2kg, pois menor massa resulta in maior aceleração para a mesma força.",
                "O bloco de 10kg, devido à força gravitacional acumulada.",
                "Ambos terão exatamente a mesma aceleração linear.",
                "O bloco de 10kg, pois sua inércia atrai velocidade externa."
            ],
            correta: 0,
            explicacao: "A aceleração é inversamente proporcional à massa (a = F/m). Menos massa significa maior variação de velocidade."
        },
        {
            pergunta: "A unidade de medida de Força no Sistema Internacional (SI) é o Newton (N). O que representa 1 Newton de forma analítica?",
            opcoes: [
                "1 kg·m/s",
                "1 kg·m/s²",
                "1 g·cm/s²",
                "1 kg²/s"
            ],
            correta: 1,
            explicacao: "1 Newton é a força necessária para acelerar uma massa de 1 kg a uma taxa de 1 metro por segundo ao quadrado (1 kg·m/s²)."
        }
    ],
    fase3: [
        {
            pergunta: "Um canhão dispara uma bala pesada para a frente. O canhão recua violentamente para trás. Esse recuo é explicado por qual princípio?",
            opcoes: [
                "Lei da Inércia Universal.",
                "Conservação de Energia Térmica.",
                "Terceira Lei de Newton: Ação e Reação.",
                "Efeito de Atrito Cinemático Dinâmico."
            ],
            correta: 2,
            explicacao: "A força que empurra a bala para a frente (Ação) gera uma força de igual intensidade e direção oposta que empurra o canhão para trás (Reação)."
        },
        {
            pergunta: "Se as forças de Ação e Reação são sempre iguais em módulo e opostas em sentido, por que elas não se anulam mutuamente?",
            opcoes: [
                "Porque elas atuam em corpos diferentes.",
                "Porque a reação ocorre alguns milissegundos após a ação.",
                "Porque a força de ação é sempre ligeiramente maior.",
                "Porque a gravidade anula o vetor inverso."
            ],
            correta: 0,
            explicacao: "As forças de ação e reação nunca se anulam porque são aplicadas em corpos distintos. Para haver anulação, as forças precisariam atuar no mesmo corpo."
        },
        {
            pergunta: "Uma mosca colide contra o para-brisa de um caminhão em alta velocidade. Comparando os módulos das forças do impacto:",
            opcoes: [
                "O caminhão aplica uma força muito maior na mosca.",
                "A mosca aplica uma força maior no caminhão.",
                "Ambos aplicam forças de igual intensidade um no outro.",
                "Nenhuma força é gerada, apenas transferência de massa."
            ],
            correta: 2,
            explicacao: "Pela Terceira Lei, as forças são idênticas em módulo. O estrago na mosca é maior apenas porque sua massa é minúscula, sofrendo uma aceleração destrutiva."
        }
    ]
};

// ==========================================
// MÓDULO 3: GERENCIADOR DE ÁUDIO SINTETIZADO
// ==========================================
const AudioEngine = {
    ctx: null,
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playTone(freq, type, duration, volume = 0.1) {
        this.init();
        try {
            let osc = this.ctx.createOscillator();
            let gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(volume, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    },
    playSfx(type) {
        switch(type) {
            case 'pulo': this.playTone(150, 'triangle', 0.15, 0.2); this.playTone(300, 'sine', 0.1, 0.1); break;
            case 'ataque': this.playTone(600, 'sawtooth', 0.08, 0.15); break;
            case 'dano': this.playTone(90, 'sawtooth', 0.3, 0.3); break;
            case 'coleta': this.playTone(523.25, 'sine', 0.1, 0.2); this.playTone(659.25, 'sine', 0.15, 0.2); break;
            case 'vitoria': this.playTone(261, 'sine', 0.1, 0.2); this.playTone(329, 'sine', 0.1, 0.2); this.playTone(392, 'sine', 0.1, 0.2); this.playTone(523, 'sine', 0.3, 0.3); break;
        }
    }
};

// ==========================================
// MÓDULO 4: CLASSE DO JOGADOR (PLAYER)
// ==========================================
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, saveData) {
        super(scene, x, y, 'player_dummy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.saveData = saveData;
        this.setCollideWorldBounds(true);
        
        this.body.setGravityY(1000); 
        this.body.setDragX(800); 

        this.vidaMax = this.saveData.atributos.vidaMax;
        this.vida = this.vidaMax;
        this.energiaMax = this.saveData.atributos.energiaMax;
        this.energia = this.energiaMax;
        this.speedBase = this.saveData.atributos.velocidade;
        this.danoAtaque = this.saveData.atributos.ataque;

        this.pulosDisponiveis = 2;
        this.estaEscalando = false;
        this.tempoRecargaAtaque = 0;
        
        this.renderProcedural();
    }

    renderProcedural() {
        let graphic = this.scene.make.graphics({ x: 0, y: 0, add: false });
        graphic.fillStyle(0x00d2ff, 1);
        graphic.fillRect(0, 0, 32, 48);
        graphic.fillStyle(0xfbbf24, 1);
        graphic.fillRect(4, 4, 24, 12); 
        graphic.generateTexture('player_render', 32, 48);
        this.setTexture('player_render');
    }

    update(cursors, teclasAdicionais) {
        if (this.vida <= 0) return;

        if (this.tempoRecargaAtaque > 0) this.tempoRecargaAtaque--;
        if (this.energia < this.energiaMax) this.energia += 0.2;

        if (this.estaEscalando) {
            this.body.setAllowGravity(false);
            if (cursors.up.isDown) {
                this.body.setVelocityY(-150);
            } else if (cursors.down.isDown) {
                this.body.setVelocityY(150);
            } else {
                this.body.setVelocityY(0);
            }
        } else {
            this.body.setAllowGravity(true);
        }

        let multiplicadorCorrida = 1;
        if (teclasAdicionais.shift.isDown && this.energia > 1 && (cursors.left.isDown || cursors.right.isDown)) {
            multiplicadorCorrida = 1.6;
            this.energia -= 0.5;
            this.scene.emitirParticulas(this.x, this.y + 24, 0x00d2ff, 1);
        }

        if (cursors.left.isDown && !this.estaEscalando) {
            this.body.setAccelerationX(-800 * multiplicadorCorrida);
            this.setFlipX(true);
        } else if (cursors.right.isDown && !this.estaEscalando) {
            this.body.setAccelerationX(800 * multiplicadorCorrida);
            this.setFlipX(false);
        } else {
            this.body.setAccelerationX(0); 
        }

        if (Math.abs(this.body.velocity.x) > this.speedBase * multiplicadorCorrida) {
            this.body.setVelocityX(Phaser.Math.Clamp(this.body.velocity.x, -this.speedBase * multiplicadorCorrida, this.speedBase * multiplicadorCorrida));
        }

        if (this.body.blocked.down || this.body.touching.down) {
            this.pulosDisponiveis = 2;
        }

        if (cursors.down.isDown && (this.body.blocked.down || this.body.touching.down)) {
            this.body.setSize(32, 24);
            this.body.setOffset(0, 24);
            if (Math.abs(this.body.velocity.x) > 50) {
                this.body.setDragX(200); 
            }
        } else {
            this.body.setSize(32, 48);
            this.body.setOffset(0, 0);
            this.body.setDragX(800);
        }

        if (Phaser.Input.Keyboard.JustDown(teclasAdicionais.teclaAtaque) && this.tempoRecargaAtaque === 0) {
            this.executarAtaque();
        }
    }

    controlarPulo() {
        if (this.pulosDisponiveis > 0) {
            AudioEngine.playSfx('pulo');
            if (this.pulosDisponiveis === 2) {
                this.body.setVelocityY(-450);
            } else {
                this.body.setVelocityY(-400);
                this.scene.emitirParticulas(this.x, this.y + 20, 0xffbb00, 8);
            }
            this.pulosDisponiveis--;
            this.estaEscalando = false;
        }
    }

    executarAtaque() {
        this.tempoRecargaAtaque = 25; 
        AudioEngine.playSfx('ataque');

        let direcao = this.flipX ? -1 : 1;
        
        let projetil = this.scene.physics.add.sprite(this.x + (20 * direcao), this.y, 'projetil');
        let graphic = this.scene.make.graphics({ x: 0, y: 0, add: false });
        graphic.fillStyle(0x00ffff, 1);
        graphic.fillRect(0, 0, 12, 6);
        graphic.generateTexture('projetil_art', 12, 6);
        projetil.setTexture('projetil_art');

        this.scene.grupoProjeteis.add(projetil);
        projetil.body.setAllowGravity(false);
        projetil.body.setVelocityX(500 * direcao);
        
        projetil.dano = this.danoAtaque;

        this.scene.time.delayedCall(2000, () => { if(projetil.active) projetil.destroy(); });
    }

    receberDano(quantidade) {
        if (this.vida <= 0) return;
        
        let danoFinal = quantidade - this.saveData.atributos.resistencia;
        if (danoFinal < 1) danoFinal = 1;

        this.vida -= danoFinal;
        AudioEngine.playSfx('dano');
        this.scene.cameras.main.shake(150, 0.01);
        this.setTint(0xff0000);
        this.scene.time.delayedCall(200, () => { this.clearTint(); });

        if (this.vida <= 0) {
            this.morrer();
        }
    }

    morrer() {
        this.body.setVelocity(0, -300);
        this.setAngularVelocity(180);
        this.scene.cameras.main.fade(1000, 0, 0, 0);
        this.scene.time.delayedCall(1000, () => {
            this.scene.scene.restart();
        });
    }
}

// ==========================================
// MÓDULO 5: INTELIGÊNCIA ARTIFICIAL DE INIMIGOS
// ==========================================
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipo, configuracao) {
        super(scene, x, y, 'enemy_dummy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.tipo = tipo;
        this.vida = configuracao.vida;
        this.ataque = configuracao.ataque;
        this.velocidadePatrulha = configuracao.velocidade || 80;
        this.direcao = 1;

        this.setCollideWorldBounds(true);
        this.body.setGravityY(800);
        
        this.renderProcedural();
    }

    renderProcedural() {
        let graphic = this.scene.make.graphics({ x: 0, y: 0, add: false });
        let cor = 0xff3333;
        if (this.tipo === 'Esfera Descontrolada') cor = 0xff8800;
        if (this.tipo === 'Drone') cor = 0xcc00ff;
        
        graphic.fillStyle(cor, 1);
        graphic.fillRect(0, 0, 32, 32);
        graphic.generateTexture('enemy_' + this.tipo, 32, 32);
        this.setTexture('enemy_' + this.tipo);
    }

    update(player) {
        if (!this.active || !this.body) return;

        let distancia = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distancia < 250) {
            let direcaoParaPlayer = player.x > this.x ? 1 : -1;
            this.body.setVelocityX(this.velocidadePatrulha * 1.5 * direcaoParaPlayer);
            this.setFlipX(direcaoParaPlayer < 0);
        } else {
            this.body.setVelocityX(this.velocidadePatrulha * this.direcao);
            this.setFlipX(this.direcao < 0);

            if (this.body.blocked.left || this.body.blocked.right) {
                this.direcao *= -1;
            }
        }
    }

    receberDano(dano) {
        this.vida -= dano;
        this.setTint(0xffffff);
        this.scene.time.delayedCall(100, () => { if (this.active) this.clearTint(); });

        if (this.vida <= 0) {
            this.scene.emitirParticulas(this.x, this.y, 0xff3333, 12);
            this.scene.saveData.moedas += 10;
            this.scene.saveData.xp += 15;
            this.scene.saveData.inimigosDerrotados += 1;
            this.destroy();
        }
    }
}

// ==========================================
// MÓDULO 6: CONTROLADOR DE ARQUETIPOS DE CHEFES
// ==========================================
class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, nome, faseID) {
        super(scene, x, y, 'boss_dummy');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.nome = nome;
        this.faseID = faseID;
        this.vidaMax = 200 * faseID;
        this.vida = this.vidaMax;
        
        this.setCollideWorldBounds(true);
        this.body.setGravityY(1000);
        this.body.setSize(64, 96);
        
        this.cooldownAcao = 120;
        this.faseLuta = 1;

        this.renderProcedural();
    }

    renderProcedural() {
        let graphic = this.scene.make.graphics({ x: 0, y: 0, add: false });
        graphic.fillStyle(0x450a0a, 1);
        graphic.fillRect(0, 0, 64, 96);
        graphic.fillStyle(0xef4444, 1);
        graphic.fillRect(16, 20, 32, 16); 
        graphic.generateTexture('boss_texture_' + this.faseID, 64, 96);
        this.setTexture('boss_texture_' + this.faseID);
    }

    update(player) {
        if (this.vida <= 0) return;

        this.cooldownAcao--;

        let fatorVel = 1;
        if (this.faseID === 2) {
            fatorVel = 1 + (1 - (this.vida / this.vidaMax)) * 2; 
        }

        if (this.nome === "Lord Inércia") {
            if (this.vida < this.vidaMax * 0.33) this.faseLuta = 3;
            else if (this.vida < this.vidaMax * 0.66) this.faseLuta = 2;
        }

        if (this.cooldownAcao <= 0) {
            this.executarAtaqueEspecial(player, fatorVel);
            this.cooldownAcao = 150 / this.faseLuta;
        }
    }

    executarAtaqueEspecial(player, fatorVel) {
        let direcao = player.x > this.x ? 1 : -1;

        if (this.faseID === 1 || this.faseLuta === 1) {
            this.body.setVelocityX(350 * direcao * fatorVel);
            this.scene.cameras.main.shake(300, 0.005);
        } 
        else if (this.faseID === 2 || this.faseLuta === 2) {
            for(let i=0; i < 3; i++) {
                this.scene.time.delayedCall(i * 200, () => {
                    if(!this.active) return;
                    let p = this.scene.physics.add.sprite(this.x, this.y - 20, 'projetil_boss');
                    let g = this.scene.make.graphics({ x: 0, y: 0, add: false });
                    g.fillStyle(0xff0055, 1); g.fillRect(0,0,16,16); g.generateTexture('pb_art',16,16);
                    p.setTexture('pb_art');
                    this.scene.grupoProjeteisInimigos.add(p);
                    p.body.setAllowGravity(false);
                    this.scene.physics.moveToObject(p, player, 300 * fatorVel);
                });
            }
        } 
        else if (this.faseID === 3 || this.faseLuta === 3) {
            for (let i = 0; i < 5; i++) {
                let rx = Phaser.Math.Between(100, 1500);
                let meteoro = this.scene.physics.add.sprite(rx, 0, 'meteoro');
                let g = this.scene.make.graphics({ x: 0, y: 0, add: false });
                g.fillStyle(0xff3300, 1); g.fillCircle(12,12,12); g.generateTexture('met_art',24,24);
                meteoro.setTexture('met_art');
                this.scene.grupoProjeteisInimigos.add(meteoro);
                meteoro.body.setVelocityY(400);
            }
        }
    }

    receberDano(dano) {
        this.vida -= dano;
        this.setTint(0xff0000);
        this.scene.time.delayedCall(150, () => { if (this.active) this.clearTint(); });

        if (this.vida <= 0) {
            this.scene.emitirParticulas(this.x, this.y, 0xff0000, 40);
            this.scene.concluirConfrontoChefe();
            this.destroy();
        }
    }
}

// ==========================================
// MÓDULO 7: ORQUESTRADOR DOS COMPONENTES VISUAIS DE UI
// ==========================================
class HUD {
    constructor(scene) {
        this.scene = scene;
        this.txtVida = scene.add.text(20, 20, '', { font: 'bold 16px Courier New', fill: '#ff4444' }).setScrollFactor(0);
        this.txtEnergia = scene.add.text(20, 45, '', { font: 'bold 16px Courier New', fill: '#00d2ff' }).setScrollFactor(0);
        this.txtStatus = scene.add.text(20, 70, '', { font: '14px Courier New', fill: '#fbbf24' }).setScrollFactor(0);
        this.txtObjetivo = scene.add.text(780, 20, '', { font: 'italic 16px Courier New', fill: '#ffffff', align: 'right' }).setScrollFactor(0).setOrigin(1, 0);
    }

    atualizar(player, moedas, xp, nivel, objetivo) {
        this.txtVida.setText(`VIDA: ${Math.ceil(player.vida)} / ${player.vidaMax}`);
        this.txtEnergia.setText(`ENERGIA: ${Math.ceil(player.energia)} / ${player.energiaMax}`);
        this.txtStatus.setText(`NÍVEL: ${nivel} | XP: ${xp} | MOEDAS: ${moedas}`);
        this.txtObjetivo.setText(`MISSÃO: ${objetivo}`);
    }
}

// ==========================================
// CENAS DO PHASER
// ==========================================
class SceneMenu extends Phaser.Scene {
    constructor() { super({ key: 'SceneMenu' }); }
    
    create() {
        this.saveData = SaveManager.carregar();
        
        let ag = this.make.graphics({ x: 0, y: 0, add: false });
        ag.fillStyle(0xffffff, 1); ag.fillCircle(2,2,2); ag.generateTexture('star',4,4);
        
        this.add.particles(0, 0, 'star', {
            x: { min: 0, max: 800 },
            y: { min: 0, max: 600 },
            lifespan: 3000,
            speedY: { min: 10, max: 50 },
            scale: { start: 0.5, end: 1.5 },
            quantity: 1,
            blendMode: 'ADD'
        });

        this.add.text(400, 120, 'NEWTONIX', { font: 'bold 54px Courier New', fill: '#00d2ff' }).setOrigin(0.5);
        this.add.text(400, 180, 'A GUERRA DAS LEIS PERDIDAS', { font: '22px Courier New', fill: '#fbbf24' }).setOrigin(0.5);

        this.criarBotao(400, 280, 'INICIAR NOVO JOGO', () => {
            this.saveData = SaveManager.resetar();
            this.scene.start('SceneCutsceneIntro');
        });

        this.criarBotao(400, 340, 'CONTINUAR JORNADA', () => {
            this.carregarFaseAdequada();
        });

        this.criarBotao(400, 400, 'INSTRUÇÕES DE FÍSICA', () => {
            alert("COMANDOS:\nSetas Direcionais: Mover e Agachar\nTecla UP/Seta Cima: Escalar Cordas\nBarra de Espaço: Pular (Aperte 2x para Pulo Duplo)\nShift: Correr (Consome Energia Cinética)\nX: Disparar Projétil de Energia");
        });
        
        this.criarBotao(400, 460, 'CRÉDITOS DA EQUIPE', () => {
            alert("Desenvolvido pela Equipe Multidisciplinar:\n- Game Designer & Roteirista\n- Programador Sênior\n- Artista 2D & Designer UI/UX\n- Especialista em Física & Sound Designer");
        });
    }

    criarBotao(x, y, texto, acao) {
        let btn = this.add.text(x, y, texto, { font: 'bold 18px Courier New', fill: '#ffffff', backgroundColor: '#1e293b', padding: 10 })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        btn.on('pointerover', () => { btn.setStyle({ fill: '#00d2ff', backgroundColor: '#334155' }); });
        btn.on('pointerout', () => { btn.setStyle({ fill: '#ffffff', backgroundColor: '#1e293b' }); });
        btn.on('pointerdown', () => { AudioEngine.playSfx('coleta'); acao(); });
    }

    carregarFaseAdequada() {
        let f = this.saveData.faseAtual;
        if (f === 1) this.scene.start('SceneFase1');
        else if (f === 2) this.scene.start('SceneFase2');
        else if (f === 3) this.scene.start('SceneFase3');
        else this.scene.start('SceneFase1');
    }
}

class SceneCutsceneIntro extends Phaser.Scene {
    constructor() { super({ key: 'SceneCutsceneIntro' }); }
    create() {
        this.cameras.main.setBackgroundColor('#020205');
        
        let textosNarracao = [
            "As leis fundamentais que governavam o equilíbrio mecânico do universo desapareceram...",
            "A entidade maligna LORD INÉRCIA roubou os Cristais de Newton.",
            "Sem eles, a Inércia sumiu: objetos flutuam sem controle e o caos impera.",
            "A Academia Universal enviou você, NEWTONIX, para restaurar a Ordem da Física!",
            "Fase 1: Direcione-se ao Vale da Inércia..."
        ];

        let index = 0;
        let txtExibicao = this.add.text(400, 300, '', { font: '20px Courier New', fill: '#ffffff', align: 'center', wordWrap: { width: 600 } }).setOrigin(0.5);

        let exibirTextoProgresivo = () => {
            if(index >= textosNarracao.length) {
                this.scene.start('SceneFase1');
                return;
            }
            
            let textoCompleto = textosNarracao[index];
            let charIndex = 0;
            txtExibicao.setText('');
            
            this.time.addEvent({
                delay: 40,
                callback: () => {
                    txtExibicao.setText(txtExibicao.text + textoCompleto[charIndex]);
                    charIndex++;
                    if(charIndex >= textoCompleto.length) {
                        index++;
                        this.time.delayedCall(2500, exibirTextoProgresivo);
                    }
                },
                repeat: textoCompleto.length - 1
            });
        };

        exibirTextoProgresivo();
    }
}

class BaseFase extends Phaser.Scene {
    constructor(key, nomeFase, idFase, objetivo) {
        super({ key: key });
        this.nomeFase = nomeFase;
        this.idFase = idFase;
        this.textoObjetivo = objetivo;
    }

    init() {
        this.saveData = SaveManager.carregar();
        this.bossSpawnado = false;
        this.quizFinalizado = false;
    }

    create() {
        this.physics.world.setBounds(0, 0, 3200, 600);
        this.cameras.main.setBounds(0, 0, 3200, 600);

        this.criarFundoParalaxe();

        this.grupoPlataformas = this.physics.add.staticGroup();
        this.grupoPlataformasMoveis = this.physics.add.group();
        this.grupoObjetosEmpurráveis = this.physics.add.group();
        this.grupoInimigos = this.physics.add.group();
        this.grupoProjeteis = this.physics.add.group();
        this.grupoProjeteisInimigos = this.physics.add.group();
        this.grupoColetaveis = this.physics.add.staticGroup();
        this.grupoCordas = this.physics.add.staticGroup();

        this.construirCenarioCorporal();

        this.player = new Player(this, 100, 400, this.saveData);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        this.hud = new HUD(this);

        this.physics.add.collider(this.player, this.grupoPlataformas);
        this.physics.add.collider(this.player, this.grupoPlataformasMoveis, this.tratarPlataformaMovel, null, this);
        this.physics.add.collider(this.grupoInimigos, this.grupoPlataformas);
        this.physics.add.collider(this.grupoObjetosEmpurráveis, this.grupoPlataformas);
        this.physics.add.collider(this.player, this.grupoObjetosEmpurráveis);

        this.physics.add.overlap(this.player, this.grupoColetaveis, this.coletarMoeda, null, this);
        this.physics.add.overlap(this.player, this.grupoCordas, () => { this.player.estaEscalando = true; }, null, this);

        this.physics.add.overlap(this.grupoProjeteis, this.grupoInimigos, this.danoInimigo, null, this);
        this.physics.add.collider(this.grupoProjeteis, this.grupoPlataformas, (proj) => { proj.destroy(); });
        this.physics.add.overlap(this.grupoProjeteisInimigos, this.player, (p, proj) => { this.player.receberDano(proj.dano || 10); proj.destroy(); }, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.teclasAdicionais = {
            shift: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            teclaAtaque: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
        };

        this.input.keyboard.on('keydown-SPACE', () => {
            this.player.controlarPulo();
        });

        this.inserirNpcEducacional();
    }

    update() {
        this.player.update(this.cursors, this.teclasAdicionais);
        
        if (this.player.estaEscalando && !this.physics.overlap(this.player, this.grupoCordas)) {
            this.player.estaEscalando = false;
        }

        this.grupoInimigos.getChildren().forEach(inimigo => {
            if(inimigo.update) inimigo.update(this.player);
        });

        if (this.boss && this.boss.active) {
            this.boss.update(this.player);
        }

        this.grupoPlataformasMoveis.getChildren().forEach(plat => {
            if(plat.body.x > plat.limiteDireito) plat.body.setVelocityX(-100);
            else if(plat.body.x < plat.limiteEsquerdo) plat.body.setVelocityX(100);
        });

        if (this.player.x > 2600 && !this.bossSpawnado) {
            this.invocarChefeDeFase();
        }

        this.hud.atualizar(this.player, this.saveData.moedas, this.saveData.xp, this.saveData.nivel, this.textoObjetivo);
    }

    emitirParticulas(x, y, cor, quant) {
        this.add.particles(x, y, 'star', {
            speed: { min: -100, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 400,
            gravityY: 200,
            maxParticles: quant
        });
    }

    criarFundoParalaxe() {
        let f1 = this.make.graphics({ x: 0, y: 0, add: false });
        f1.fillStyle(0x0a0a16, 1); f1.fillRect(0,0,800,600); f1.generateTexture('bg_camada1',800,600);
        this.add.tileSprite(0, 0, 3200, 600, 'bg_camada1').setOrigin(0,0).setScrollFactor(0.1);

        let f2 = this.make.graphics({ x: 0, y: 0, add: false });
        f2.fillStyle(0x13132c, 1); 
        for(let i=0; i<10; i++) { f2.fillRect(i*300, 300 + (i%3)*40, 120, 300); }
        f2.generateTexture('bg_camada2',800,600);
        this.add.tileSprite(0, 0, 3200, 600, 'bg_camada2').setOrigin(0,0).setScrollFactor(0.4);
    }

    construirCenarioCorporal() {
        let g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x1e293b, 1); g.fillRect(0,0,40,40);
        g.lineStyle(2, 0x00d2ff, 1); g.strokeRect(0,0,40,40);
        g.generateTexture('bloco_chao',40,40);

        for (let x = 0; x < 3200; x += 40) {
            if (x > 800 && x < 960) continue;  
            if (x > 1800 && x < 2000) continue; 
            this.grupoPlataformas.create(x + 20, 580, 'bloco_chao');
        }

        let layoutsPlataformas = [
            {x: 300, y: 450}, {x: 340, y: 450}, {x: 500, y: 350},
            {x: 1100, y: 450}, {x: 1200, y: 380}, {x: 1300, y: 300},
            {x: 2100, y: 450}, {x: 2300, y: 350}
        ];
        layoutsPlataformas.forEach(p => {
            this.grupoPlataformas.create(p.x, p.y, 'bloco_chao');
        });

        let platMovel = this.grupoPlataformasMoveis.create(1500, 400, 'bloco_chao');
        platMovel.body.setAllowGravity(false);
        platMovel.body.setImmovable(true);
        platMovel.body.setVelocityX(100);
        platMovel.limiteEsquerdo = 1350;
        platMovel.limiteDireito = 1700;

        let cxG = this.make.graphics({ x: 0, y: 0, add: false });
        cxG.fillStyle(0xd97706, 1); cxG.fillRect(0,0,32,32); cxG.generateTexture('caixa',32,32);
        
        let caixa = this.grupoObjetosEmpurráveis.create(650, 500, 'caixa');
        caixa.setCollideWorldBounds(true);
        caixa.body.setDragX(400); 

        let mG = this.make.graphics({ x: 0, y: 0, add: false });
        mG.fillStyle(0xfbbf24, 1); mG.fillCircle(8,8,8); mG.generateTexture('moeda',16,16);
        
        for (let i = 0; i < 15; i++) {
            this.grupoColetaveis.create(200 + (i * 180), 350, 'moeda');
        }

        let cdG = this.make.graphics({ x: 0, y: 0, add: false });
        cdG.fillStyle(0x00ff88, 1); cdG.fillRect(0,0,6,120); cdG.generateTexture('corda',6,120);
        this.grupoCordas.create(1200, 260, 'corda');
    }

    tratarPlataformaMovel(player, plataforma) {
        if (player.body.touching.down && plataforma.body.velocity.x !== 0) {
            player.body.setX(player.x + (plataforma.body.velocity.x * this.sys.game.loop.delta / 1000));
        }
    }

    coletarMoeda(player, moeda) {
        moeda.destroy();
        this.saveData.moedas += 1;
        this.saveData.xp += 2;
        AudioEngine.playSfx('coleta');
        this.verificarUpgradeNivel();
    }

    verificarUpgradeNivel() {
        let xpNecessario = this.saveData.nivel * 50;
        if (this.saveData.xp >= xpNecessario) {
            this.saveData.nivel += 1;
            this.saveData.atributos.vidaMax += 15;
            this.saveData.atributos.ataque += 4;
            this.saveData.atributos.velocidade += 15;
            this.player.vidaMax = this.saveData.atributos.vidaMax;
            this.player.vida = this.player.vidaMax; 
            alert(`EVOLUÇÃO CIENTÍFICA! Você alcançou o Nível ${this.saveData.nivel}! Atributos de Física Ampliados.`);
            SaveManager.salvar(this.saveData);
        }
    }

    danoInimigo(projetil, inimigo) {
        projetil.destroy();
        inimigo.receberDano(projetil.dano);
    }

    inserirNpcEducacional() {
        let npcG = this.make.graphics({ x: 0, y: 0, add: false });
        npcG.fillStyle(0xa78bfa, 1); npcG.fillRect(0,0,32,48); npcG.generateTexture('npc_txt',32,48);
        
        this.npcCientista = this.physics.add.staticSprite(1000, 520, 'npc_txt');
        
        this.physics.add.overlap(this.player, this.npcCientista, () => {
            if(!this.npcCientista.conversado) {
                this.npcCientista.conversado = true;
                this.exibirDialogoEducacional();
            }
        }, null, this);
    }

    exibirDialogoEducacional() {
        this.physics.world.pause(); 
        
        let explicacoes = {
            1: "Olá Newtonix! Eu sou o PROFESSOR VECTOR. Lembre-se da PRIMEIRA LEI DE NEWTON (INÉRCIA): Todo corpo permanece em seu estado de repouso ou de movimento retilíneo uniforme, a menos que seja compelido a mudar aquele estado por forças impressas sobre ele!",
            2: "Saudações, Explorador! Sou a DRA. MOMENTUM. Preste atenção na SEGUNDA LEI DE NEWTON (DINÂMICA): A alteração do movimento é proporcional à força motriz impressa, ocorrendo na direção da linha reta em que aquela força é aplicada (F = m*a)!",
            3: "Atenção Aluno! Sou o GENERAL VETOR. Guarde bem a TERCEIRA LEI DE NEWTON (AÇÃO E REAÇÃO): A toda ação há sempre uma reação oposta e igual. As ações mútuas de dois corpos um sobre o outro são sempre iguais e dirigidas a partes opostas!"
        };

        alert(`[TRANSMISSÃO CIENTÍFICA]\n\n${explicacoes[this.idFase]}`);
        this.physics.world.resume();
    }

    invocarChefeDeFase() {
        this.bossSpawnado = true;
        
        let parede = this.physics.add.staticRect(2500, 300, 20, 600);
        this.physics.add.collider(this.player, parede);

        let nomesChefes = { 1: "Guardião da Inércia", 2: "Mestre da Aceleração", 3: "Lord Inércia" };
        this.boss = new Boss(this, 3000, 450, nomesChefes[this.idFase], this.idFase);

        this.physics.add.collider(this.boss, this.grupoPlataformas);
        this.physics.add.collider(this.boss, this.player, (b, p) => { p.receberDano(this.idFase * 15); }, null, this);
        this.physics.add.overlap(this.grupoProjeteis, this.boss, (b, proj) => { b.receberDano(proj.dano); proj.destroy(); }, null, this);
        
        alert(`ALERTA DE ANOMALIA MECÂNICA: O ${nomesChefes[this.idFase]} Bloqueia Seu Caminho!`);
    }

    concluirConfrontoChefe() {
        AudioEngine.playSfx('vitoria');
        if (!this.quizFinalizado) {
            this.quizFinalizado = true;
            this.dispararSistemaQuiz();
        }
    }

    dispararSistemaQuiz() {
        this.physics.world.pause();
        
        let container = document.getElementById('quiz-container');
        let txtPergunta = document.getElementById('quiz-question');
        let divOpcoes = document.getElementById('quiz-options');
        let divFeedback = document.getElementById('quiz-feedback');
        let txtFeedback = document.getElementById('feedback-text');
        let btnAvancar = document.getElementById('btn-next-quiz');

        container.classList.remove('hidden');

        let listaPerguntas = QuizDatabase[`fase${this.idFase}`];
        let perguntaIndex = 0;

        let carregarQuestao = () => {
            divFeedback.classList.add('hidden');
            divOpcoes.innerHTML = '';
            
            let dadosQuestao = listaPerguntas[perguntaIndex];
            txtPergunta.innerText = dadosQuestao.pergunta;

            dadosQuestao.opcoes.forEach((opcao, id) => {
                let btn = document.createElement('button');
                btn.className = 'quiz-btn';
                btn.innerText = opcao;
                btn.onclick = () => {
                    document.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
                    
                    divFeedback.classList.remove('hidden');
                    if (id === dadosQuestao.correta) {
                        txtFeedback.innerHTML = `<span class="correct-style">RESPOSTA CORRETA!</span><br>${dadosQuestao.explicacao}`;
                        this.saveData.quizAcertos++;
                    } else {
                        txtFeedback.innerHTML = `<span class="incorrect-style">RESPOSTA INCORRETA!</span><br>${dadosQuestao.explicacao}`;
                    }
                };
                divOpcoes.appendChild(btn);
            });
        };

        btnAvancar.onclick = () => {
            perguntaIndex++;
            if (perguntaIndex < listaPerguntas.length) {
                carregarQuestao();
            } else {
                container.classList.add('hidden');
                this.physics.world.resume();
                this.avancarEstruturaFases();
            }
        };

        carregarQuestao();
    }

    avancarEstruturaFases() {
        if (this.idFase === 1) {
            this.saveData.faseAtual = 2;
            SaveManager.salvar(this.saveData);
            this.scene.start('SceneFase2');
        } else if (this.idFase === 2) {
            this.saveData.faseAtual = 3;
            SaveManager.salvar(this.saveData);
            this.scene.start('SceneFase3');
        } else {
            this.scene.start('SceneParabens');
        }
    }
}

class SceneFase1 extends BaseFase {
    constructor() { super('SceneFase1', 'Vale da Inércia', 1, 'Recuperar o Cristal da Primeira Lei'); }
    construirCenarioCorporal() {
        super.construirCenarioCorporal();
        this.grupoInimigos.add(new Enemy(this, 400, 500, 'Robô Enferrujado', { vida: 30, ataque: 5 }));
        this.grupoInimigos.add(new Enemy(this, 1400, 500, 'Esfera Descontrolada', { vida: 20, ataque: 3 }));
        this.grupoInimigos.add(new Enemy(this, 2200, 500, 'Robô Enferrujado', { vida: 30, ataque: 5 }));
    }
}

class SceneFase2 extends BaseFase {
    constructor() { super('SceneFase2', 'Cidade da Aceleração', 2, 'Recuperar o Cristal da Segunda Lei'); }
    construirCenarioCorporal() {
        super.construirCenarioCorporal();
        this.grupoInimigos.add(new Enemy(this, 500, 500, 'Drone', { vida: 40, ataque: 10, velocidad: 120 }));
        this.grupoInimigos.add(new Enemy(this, 1200, 500, 'Drone', { vida: 40, ataque: 10, velocidad: 120 }));
        this.grupoInimigos.add(new Enemy(this, 2400, 500, 'Sentinela Turbo', { vida: 50, ataque: 12, velocidad: 140 }));
    }
}

class SceneFase3 extends BaseFase {
    constructor() { super('SceneFase3', 'Fortaleza da Ação e Reação', 3, 'Derrotar Lord Inércia e Salvar o Universo'); }
    construirCenarioCorporal() {
        super.construirCenarioCorporal();
        this.grupoInimigos.add(new Enemy(this, 600, 500, 'Soldado Mecânico', { vida: 60, ataque: 15 }));
        this.grupoInimigos.add(new Enemy(this, 1600, 500, 'Drones Pesados', { vida: 70, ataque: 20 }));
        this.grupoInimigos.add(new Enemy(this, 2300, 500, 'Soldado Mecânico', { vida: 60, ataque: 15 }));
    }
}

class SceneParabens extends Phaser.Scene {
    constructor() { super({ key: 'SceneParabens' }); }
    create() {
        this.cameras.main.setBackgroundColor('#020617');
        let data = SaveManager.carregar();

        this.add.text(400, 80, 'UNIVERSO RESTAURADO!', { font: 'bold 36px Courier New', fill: '#4ade80' }).setOrigin(0.5);
        
        let relatorioHTML = `
            DESEMPENHO DO CIENTISTA SUPREMO:
            - Moedas Tecnológicas: ${data.moedas}
            - Inimigos Neutralizados: ${data.inimigosDerrotados}
            - Acertos Acadêmicos (Quiz): ${data.quizAcertos} / 9
            - Nível de Conhecimento Atingido: Nvl ${data.nivel}
        `;

        this.add.text(400, 240, relatorioHTML, { font: '18px Courier New', fill: '#ffffff', align: 'center' }).setOrigin(0.5);

        let ranking = "Aspirante a Físico";
        if (data.quizAcertos >= 8) ranking = "Mestre de Newton de Nível Quântico!";
        else if (data.quizAcertos >= 5) ranking = "Bacharel em Dinâmica de Movimento";

        this.add.text(400, 400, `RANKING: ${ranking}`, { font: 'bold 20px Courier New', fill: '#fbbf24' }).setOrigin(0.5);

        let btnReiniciar = this.add.text(400, 500, 'RETORNAR AO MENU', { font: 'bold 18px Courier New', fill: '#000', backgroundColor: '#fbbf24', padding: 12 })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        btnReiniciar.on('pointerdown', () => {
            SaveManager.resetar();
            window.location.reload();
        });
    }
}

// ==========================================
// CONFIGURAÇÃO CENTRAL DO ENGINE PHASER
// ==========================================
const PhaserConfig = {
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
    scene: [SceneMenu, SceneCutsceneIntro, SceneFase1, SceneFase2, SceneFase3, SceneParabens]
};

const JogoNewtonix = new Phaser.Game(PhaserConfig);
