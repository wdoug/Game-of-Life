'use strict';

var WORLD = WORLD || {};

(function () {
    // This function is needed so that the inner arrays are defined
    function initializeBoard(board, height) {
        var i;
        for (i = 0; i < height; ++i) {
            board[i] = [];
        }
    }

    function checkIfValidBoardSize(val) {
        var num = parseInt(val);
        if (!isNaN(num) && isFinite(num) && num > 0) {
            return num;
        }
        return false;
    }

    WORLD.Game = function (width, height) {
        var defaultBoardSize = WORLD.config.defaults.boardSize,
            _width = checkIfValidBoardSize(width) || defaultBoardSize,
            _height = checkIfValidBoardSize(height) || _width;

        // Since there presumably won't be many instances of Game it was worth
        // it to have these functions defined in each instance.
        this.getWidth = function () { return _width; };
        this.getHeight = function () { return _height; };

        this._board = [];
        initializeBoard(this._board, _height);

        // Board will still need to be seeded at this point
    };

    WORLD.Game.prototype.mapWholeBoard = function (fnEach, done, thisArg) {
        var i, j, w, h, val, returnedVal;
        thisArg = thisArg || this;
        for (i = 0, w = this.getWidth(); i < w; ++i) {
            for (j = 0, h = this.getHeight(); j < h; ++j) {
                val = this._board[i][j];
                returnedVal = fnEach.call(thisArg, val, i, j);

                // We assume that if the user passes a value back that is not
                // false, it will an acceptable value.
                // This is a sacrifice of some robustness for better performance.
                if (returnedVal !== undefined && returnedVal !== false) {
                    this._board[i][j] = returnedVal;
                }
            }
        }
        if (done) {
            done.call(thisArg);
        }
    };

    // Makes board entirely zero
    // Not particularly interesting, but good for testing
    WORLD.Game.prototype.seedZero = function () {
        this.mapWholeBoard(function () {
            return 0;
        });
    };

    WORLD.Game.prototype.seedRandom = function () {
        this.mapWholeBoard(function () {
            return Math.floor(2*Math.random());
        });
    };

})();
