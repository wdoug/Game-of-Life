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
        this.algEdgesSeparate();
    };

    function nextGenerationState(selfState, neighborsCount) {
        // @NOTE: Don't need else statements here, but it helps to clarify
        // Birth
        if (!selfState && neighborsCount === 3) { return 1; }
        // Stable population
        else if (selfState && (neighborsCount === 2 || neighborsCount === 3)) { return 1; }
        else { return 0; }
    }

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

            return nextGenerationState(self, n);
        });
    };

    // Takes boolean values for range accepted
    function countNeighborsInBounds(i, j, currBoard, left, right, top, bottom) {
        var n = 0,
            x, y;
        // Count living neighbors
        for (x = -top; x <= +bottom; ++x) {
            for (y = -left; y <= +right; ++y) {
                n += currBoard[i+x][j+y];
            }
        }
        // Subtract self since we are not our own neighbor
        return n -= currBoard[i][j];
    }

    function handleCorners(height, width, currBoard, nextBoard) {
        var bottom = height - 1,
            right = width - 1,
            self,
            n;

        // Cell 0,0
        self = currBoard[0][0];
        n = countNeighborsInBounds(0, 0, currBoard, false, true, false, true);
        nextBoard[0][0] = nextGenerationState(self, n);

        // Cell bottom,0
        self = currBoard[bottom][0];
        n = countNeighborsInBounds(bottom, 0, currBoard, false, true, true, false);
        nextBoard[bottom][0] = nextGenerationState(self, n);

        // Cell bottom,right
        self = currBoard[bottom][right];
        n = countNeighborsInBounds(bottom, right, currBoard, true, false, true, false);
        nextBoard[bottom][right] = nextGenerationState(self, n);

        // Cell 0,right
        self = currBoard[0][right];
        n = countNeighborsInBounds(0, right, currBoard, true, false, false, true);
        nextBoard[0][right] = nextGenerationState(self, n);
    }

    // Ignore corners
    function handleEdges(height, width, currBoard, nextBoard) {
        var i, n, self;

        for (i = 1; i < width - 1; ++i) {
            // Top
            self = currBoard[0][i];
            n = countNeighborsInBounds(0, i, currBoard, true, true, false, true);
            nextBoard[0][i] = nextGenerationState(self, n);

            // Bottom
            self = currBoard[height-1][i];
            n = countNeighborsInBounds(height-1, i, currBoard, true, true, true, false);
            nextBoard[height-1][i] = nextGenerationState(self, n);
        }

        for (i = 1; i < height - 1; ++i) {
            // Left
            self = currBoard[i][0];
            n = countNeighborsInBounds(i, 0, currBoard, false, true, true, true);
            nextBoard[i][0] = nextGenerationState(self, n);

            // Right
            self = currBoard[i][width-1];
            n = countNeighborsInBounds(i, width-1, currBoard, true, false, true, true);
            nextBoard[i][width-1] = nextGenerationState(self, n);
        }
    }

    // Handling the edges seperately eliminates the need to check if a
    // cell exists for all the inner cells.
    // In order to not have complicated logic dealing with cases when width
    // or height is 1, in these cases this algorithm delegates to algMap.
    Game.prototype.algEdgesSeparate = function () {
        var currBoard = this.currentBoard,
            nextBoard = this.nextBoard,
            height = this.getHeight(),
            width = this.getWidth(),
            n, self, i, j,
            x, y;

        // Assumptions for this algorithm would break if this is the case.
        if (height === 1 || width === 1) {
            // So we will just delegate to the algMap algorithm instead.
            return this.algMap();
        }

        // Corners and edges
        handleCorners(height, width, currBoard, nextBoard);
        handleEdges(height, width, currBoard, nextBoard);

        // Inner cells
        for (i = 1; i < height-1; ++i) {
            for (j = 1; j < width-1; ++j) {
                self = currBoard[i][j];

                // Interestingly, I was initially using
                // n = countNeighborsInBounds(i, j, currBoard, true, true, true, true);
                // here instead of the following, and the extra function calls were making
                // it super slow.
                n = 0;
                for (x = -1; x <= 1; ++x) {
                    for (y = -1; y <= 1; ++y) {
                        n += currBoard[i+x][j+y];
                    }
                }
                n -= self;

                nextBoard[i][j] = nextGenerationState(self, n);
            }
        }

        this.updateBoard();
    };

})(WORLD.Game);
