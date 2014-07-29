/*
* This file defines deferent methods for setting the initial state of the
* game of life board.
*/

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

    Game.prototype.seedSpecific = function (board) {
        var i, j,
            height = this.getHeight(),
            width = this.getWidth();

        // Validate the input
        if (!Array.isArray(board) || !Array.isArray(board[0])) {
            throw new Error('The input needs to be an array of arrays');
        }
        if (board.length !== height) {
            throw new Error('The input outer array length didn\'t match the game height');
        }

        for (i = 0; i < height; ++i) {
            if (board[i].length !== width) {
                throw new Error('The input inner arrays all need to have length equal to the game width');
            }
            for (j = 0; j < width; ++j) {
                if (board[i][j] !== 0 && board[i][j] !== 1) {
                    throw new Error('The input values can only be 1s and 0s');
                }
            }
        }

        this.currentBoard = board;
    };

})(WORLD.Game);
