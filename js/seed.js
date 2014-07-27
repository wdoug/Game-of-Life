'use strict';

var WORLD = WORLD || {};

(function (Game) {

    // Makes previous board entirely zero
    // Not particularly interesting, but good for testing
    Game.prototype.seedZero = function () {
        this.mapWholeBoard(function () {
            return 0;
        });
    };

    Game.prototype.seedRandom = function () {
        this.mapWholeBoard(function () {
            return Math.floor(2*Math.random());
        });
    };

})(WORLD.Game);
