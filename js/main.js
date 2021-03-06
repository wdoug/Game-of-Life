/*
* This file is the entry point to the index page that actually runs
* and displays the game of life.
*/

'use strict';

var WORLD = WORLD || {};

(function () {
    var game = new WORLD.Game(50),
        display = document.getElementById('text-board-display'),
        renderType = 'canvas',
        $canvas = $('#canvas-board');

    game.seedRandom();

    // @TODO: Look into swapping this with the requestAnimationFrame api
    setInterval(function () {
        game.tick();

        switch (renderType) {
            case 'text':
                display.innerHTML = game.stringify();
                break;
            case 'canvas':
                game.render();
                break;
            default:
                game.render();
        }

    }, 50);


    // User input form for new board
    $('#new-board-btn').on('click', function (event) {
        event.preventDefault();

        var height = parseInt( $('#new-height').val() ),
            width = parseInt( $('#new-width').val() );

        if (isNaN(height) || isNaN(width)) {
            // @TODO: replace alert with custom element
            alert('Please input valid height and width values');
            return;
        }
        else {
            try {
                game = new WORLD.Game(height, width);
                game.seedRandom();
            } catch (e) {
                // @TODO: Handle errors, and provide
                // feedback without an alert
                alert('there was an error');
            }
        }


        renderType = $('#render-mode').val().toLowerCase();

        switch (renderType) {
            case 'text':
                $(display).removeClass('hidden');
                $canvas.addClass('hidden');
                break;
            case 'canvas':
                $(display).addClass('hidden');
                $canvas.removeClass('hidden');
                break;
        }
    });
})();
