/*
* This file difines different algorithms that can be used to update the
* game of life board to the next generation.
*/

'use strict';

var WORLD = WORLD || {};

(function (Game) {

    // Updates board to next frame
    // This is a pointer to a specific algorithm
    Game.prototype.tick = function () {
        this.algMap();
    };

    Game.prototype.algMap = function () {
        var currBoard = this.currentBoard,
            n, self, x, y;
        this.mapWholeBoard(function (val, i, j) {
            n = 0;
            self = currBoard[i][j];

            // Count living neighbors
            for (x = -1; x <= 1; ++x) {
                for (y = -1; y <= 1; ++y) {
                    n += this.getValueIfItExistsAt(i+x, j+y, currBoard);
                }
            }
            // Subtract self since we are not our own neighbor
            n -= self;

            // @NOTE: Don't need else statements here, but it helps to clarify
            // Birth
            if (!self && n === 3) { return 1; }
            // Stable population
            else if (self && (n === 2 || n === 3)) { return 1; }
            else { return 0; }
        });
    };

})(WORLD.Game);
