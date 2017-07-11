import PlayState from '../../../src/states/play';

describe('PlayState', () => {
    let playState;

    describe('constructor()', () => {
        it('generates an object', () => {
            playState = new PlayState(game);

            assert.isObject(playState);
        });
    });
});
