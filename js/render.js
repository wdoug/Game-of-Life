
'use strict';

var WORLD = WORLD || {};

(function (Game) {

    var canvas = document.getElementById('canvas-board'),
    ctx = canvas && canvas.getContext && canvas.getContext('2d'),
    backgroundColor = '#000000',
    lifeColor = '#0CD00C';

    Game.prototype.setCanvas = function (canvasObj) {
        if (!canvasObj) {
            return false;
        }
        // Technically this string check doesn't work in certain situations
        if (typeof canvasObj === 'string') {
            canvasObj = document.getElementById(canvasObj);
        }
        var context = canvasObj.getContext && canvasObj.getContext('2d');

        if (context) {
            canvas = canvasObj;
            ctx = context;
        }
        else {
            return false;
        }
    };

    Game.prototype.clearCanvas = function () {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    Game.prototype.render = function () {
        var squareWidth = canvas.width / this.getWidth(),
            squareHeight = canvas.height / this.getHeight();

        this.clearCanvas();
        ctx.fillStyle = lifeColor;

        this.mapWholeBoard(function (val, i, j) {
            if (val) {
                ctx.fillRect(squareWidth * j, squareHeight * i,
                             squareWidth, squareHeight);
            }
        }, this, true);
    };

})(WORLD.Game);
