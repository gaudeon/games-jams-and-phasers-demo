/* import boot state class */
import BootState from './states/boot';

/* import play state class */
import PlayState from './states/play';

/* pulling in env for other build information like if we are in electron or not */
require('dotenv');
if (!process.env.ELECTRON) {
    require('./index.html');
}

/* new Phaser game */
let game = new Phaser.Game(800, 600);

/* when our device is ready setup global data, added states and jump to first state */
Phaser.Device.whenReady(function () {
    /* setup global namespace under game for our global data */
    game.global = {};
    game.global.asset_path = process.env.ELECTRON ? '/' : '/assets/';

    /* add boot state to game */
    // game.state.add('Boot', BootState);

    /* add play state to game */
    // game.state.add('Play', PlayState);

    /* start boot state */
    // game.state.start('Boot');
});
