/* json imports */
import spriteAtlasJSON from '../../assets/json/sprite-atlas.json';
import audioSpriteJSON from '../../assets/json/audio-sprite.json';

/* require in other assets to be included by webpack */
require('../../assets/icons/favicon.ico');
require('../../assets/images/sprite-atlas.png');
require('../../assets/sounds/audio-sprite.mp3');

export default class LoadingState extends Phaser.State {
    preload () {
        /* preload sprite atlas */
        this.game.load.atlas('spriteAtlas', `${this.game.global.asset_path}sprite-atlas.png`, null, spriteAtlasJSON, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

        /* preload audio sprite */
        this.game.load.audioSprite('audioSprite', `${this.game.global.asset_path}audio-sprite.mp3`, null, audioSpriteJSON, true);
    }

    create () {
        /* setup arcade physics (technically this is setup by default already) */
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    update () {
        if (this.game.cache.isSoundDecoded('audioSprite') && this.game.cache.isSoundReady('audioSprite')) {
            /* change to play state */
            this.state.start('Play');
        }
    }
};
