/*
* This file is the entry point to the index page that actually runs
* and displays the game of life.
*/

'use strict';

var WORLD = WORLD || {};

(function () {
    var game = new WORLD.Game(50);
    var $display = $('#text-board-display');

    game.seedRandom();

    // @TODO: Look into swapping this with the requestAnimationFrame api
    setInterval(function () {
        game.tick();
        $display.html( game.stringify() );
    }, 50);
})();
