var WORLD = WORLD || {};

(function () {
    var game = new WORLD.Game();
    var $display = $('#board-display');

    game.seedRandom();

    setInterval(function () {
        game.tick();
        $display.html( game.HTMLify() );
    }, 500);
})();
