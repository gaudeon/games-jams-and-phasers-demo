export default class Cat extends Phaser.Sprite {
    constructor (game, x, y, type) {
        super(game, x, y, 'spriteAtlas');

        /* choose a random cat type, if one is not selected */
        if (type && this.typeList.indexOf(type) >= 0) {
            this.catType = type;
        } else {
            this.catType = this.typeList[this.game.rnd.between(0, this.typeList.length - 1)];
        }

        /* set cat default frame based on type */
        this.frame = `cat_${this.catType}_0`;

        /* setup cat flailing animation */
        this.animations.add('flail', [`cat_${this.catType}_1`, `cat_${this.catType}_0`, `cat_${this.catType}_2`, `cat_${this.catType}_0`], 10, true, false);

        /* start the cat flailing */
        this.animations.play('flail');

        /* increase scale of cats */
        this.scale.x = this.scale.y = 2;

        /* choose a random cat sound for this cat */
        this.catSoundKey = this.soundList[this.game.rnd.between(0, this.soundList.length - 1)];

        /* load our decoded sound data into an AudioSprite class */
        this.catSounds = new Phaser.AudioSprite(this.game, 'audioSprite');

        /* cats start dead */
        this.kill();

        /* add signal handling for when game revives this cat */
        this.events.onRevived.add(this.dropKitteh, this);

        /* enable physics on cat */
        this.game.physics.arcade.enableBody(this);

        /* set rate at which cat will fall */
        this.body.gravity.y = 100;
    }

    get typeList () {
        return ['black', 'white', 'brown', 'yellow'];
    }

    get soundList () {
        return ['Cat 1', 'Cat 2', 'Cat 3', 'Cat 4', 'Cat 5', 'Cat 6', 'Cat 7', 'Cat 8'];
    }

    dropKitteh () {
        /* place cat an a random position at top */
        this.reset(this.game.rnd.between(0, this.game.width - this.width), 0);

        /* play the random sound associated with the cat */
        this.catSounds.play(this.catSoundKey);
    }

    update () {
        /* kill the kitty if out of bounds */
        if (this.y > this.game.height) {
            this.kill();
        }
    }
}
