/* import cat class */
import Cat from '../objects/cat';
import Clock from '../objects/clock';

export default class Play extends Phaser.State {
    init () {
        this.isRunning = false; // when true player input is allowed
        this.countdown = 4; // 3 seconds plus ready
        this.timeLimit = 90; // 1 minute
        this.numCats = 10; // 10 cats max
        this.scoreThreshold = 7; // amount of cats save to up the difficulty
        this.allowedActiveCats = 1; // max cats that can be in play at once
        this.activeCats = 0;
        this.score = 0;
    }

    createBasket () {
        /* add our basket to the game */
        this.basket = this.game.add.sprite(this.game.width / 2, this.game.height - 100, 'spriteAtlas', 'basket');
        this.basket.anchor.x = 0.5;

        /* enable arcade physics on the basket */
        this.game.physics.arcade.enableBody(this.basket);

        /* make sure the basket collides with world boundaries */
        this.basket.body.collideWorldBounds = true;
        this.basket.body.immovable = true;
    }

    createClouds () {
        /* create some random clouds */
        const cloudMin = 6;
        const cloudMax = 10;
        const numClouds = this.game.rnd.between(cloudMin, cloudMax);
        for (let i = 0; i < numClouds; i++) {
            let x = this.game.rnd.between(10, this.game.width - 100);
            let y = this.game.rnd.between(100, 300);
            this.game.add.image(x, y, 'spriteAtlas', 'Cloud');
        }
    }

    createCats () {
        this.cats = this.game.add.group();
        const numCats = 10;
        for (let i = 0; i < numCats; i++) {
            this.cats.add(new Cat(this.game));
        }
    }

    createClock () {
        this.clock = new Clock(this.game, this.game.width / 2, 50, {
            font: '28pt Arial',
            fill: 'white',
            stroke: 'black',
            strokeThickness: 4
        });

        /* since we didn't use a GameFactory method to add the clock we just add existing */
        this.game.add.existing(this.clock);

        /* end the game when the clock runs out */
        this.clock.events.onTick.add((remaining) => {
            if (remaining <= 0) {
                this.isRunning = false;
                this.basket.body.velocity.x = 0;
                this.basket.reset(this.game.width / 2, this.basket.y);
                this.screenText.setText(`Game Over...\n\n${this.score} cats saved!`);
                this.screenOverlay.visible = true;
                this.screenText.visible = true;
            }
        });
    }

    createScoreBoard () {
        this.scoreBoard = this.game.add.text(this.game.width - 100, 50, this.score, {
            font: '28pt Arial',
            fill: 'white',
            stroke: 'black',
            strokeThickness: 4
        });
    }

    create () {
        /* set background to sky blue */
        this.game.stage.backgroundColor = '#7ec0ee';

        /* create the basket */
        // this.createBasket();

        /* create the clouds */
        // this.createClouds();

        /* create group of cats */
        // this.createCats();

        /* create the clock */
        // this.createClock();

        /* create the scoreBoard */
        // this.createScoreBoard();

        /* setup simple keyboard input handling */
        // this.moveKeys = this.game.input.keyboard.createCursorKeys();

        /* start countdown */
        // this.startCountdown();
    }

    startCountdown () {
        this.screenOverlay = this.game.add.graphics(0, 0);
        this.screenOverlay.beginFill(0x000000, 0.75);
        this.screenOverlay.lineTo(0, this.game.height);
        this.screenOverlay.lineTo(this.game.width, this.game.height);
        this.screenOverlay.lineTo(this.game.width, 0);
        this.screenOverlay.endFill();

        this.screenText = this.game.add.text(0, 0, 'Ready!', {
            font: '48pt Arial',
            fontWeight: 'bold',
            fill: 'white',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
            align: 'center'
        });

        this.screenText.setTextBounds(0, 0, this.game.width, this.game.height);

        this.game.time.events.repeat(Phaser.Timer.SECOND, 4, this.handleCountDown, this);
    }

    handleCountDown () {
        this.countdown--;

        if (this.countdown <= 0) {
            this.screenOverlay.visible = false;
            this.screentText = '';
            this.screenText.visible = false;
            this.isRunning = true;
            this.clock.start(this.timeLimit);
        } else {
            this.screenText.text = this.countdown;
        }
    }

    dropKitteh () {
        let deadCats = this.cats.getAll('alive', false);
        let randomDeadCat = deadCats[this.game.rnd.between(0, deadCats.length - 1)];
        randomDeadCat.revive();
    }

    catchKitteh (basket, cat) {
        this.score++;

        cat.kill();

        this.updateScore();

        /* make things harder */
        if (this.allowedActiveCats < this.numCats && this.score > this.scoreThreshold) {
            this.allowedActiveCats = Math.ceil(this.score / this.scoreThreshold);
        }
    }

    updateScore () {
        this.scoreBoard.setText(this.score);
    }

    update () {
        if (this.isRunning) {
            /* move basket left and right */
            if (this.moveKeys.left.isDown && this.moveKeys.right.isDown) {
                this.basket.body.velocity.x = 0;
            } else if (this.moveKeys.left.isDown) {
                this.basket.body.velocity.x -= 10;
            } else if (this.moveKeys.right.isDown) {
                this.basket.body.velocity.x += 10;
            } else {
                this.basket.body.velocity.x = 0;
            }

            /* see if we should drop another cat */
            /* this.activeCats = this.cats.countLiving();

            if (this.activeCats < this.allowedActiveCats) {
                this.dropKitteh();
            } */

            /* check for collisions */
            // this.game.physics.arcade.collide(this.basket, this.cats, this.catchKitteh, null, this);
        }
    }
};
