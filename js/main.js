var WORLD = WORLD || {};

(function () {
    var game = new WORLD.Game(50);
    var $display = $('#board-display');

    game.seedRandom();

    setInterval(function () {
        game.tick();
        $display.html( game.HTMLify() );
    }, 50);
})();
