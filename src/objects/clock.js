export default class Clock extends Phaser.Text {
    constructor (game, x, y, style) {
        super(game, x, y, '', style);

        /* center clock */
        this.anchor.x = 0.5;

        /* time left on the clock */
        this.timeRemaining = 0;

        /* an event that can be subscribed to by code external to this */
        this.events.onTick = new Phaser.Signal();

        this.updateTime();
    }

    start (seconds) {
        if (this.timeRemaining > 0) { // timer already going
            return;
        }

        /* set the remaining time */
        this.timeRemaining = seconds;

        /* update our clock */
        this.updateTime();

        /* start a timer */
        this.game.time.events.repeat(Phaser.Timer.SECOND, this.timeRemaining, this.tick, this);
    }

    updateTime () {
        /* calculate minutes and seconds values from time remaining */
        let minutes = Math.floor(this.timeRemaining / 60);
        let seconds = this.timeRemaining - minutes * 60;

        /* prefix the minutes and seconds wit zeroes if needed */
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        /* set the text */
        this.setText(`${minutes}:${seconds}`.toString());
    }

    tick () {
        this.timeRemaining--;

        /* update our clock */
        this.updateTime();

        /* signal anything subscribed to our clock */
        this.events.onTick.dispatch(this.timeRemaining);
    }
}
