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

    WORLD.Game = function (height, width) {
        var defaultBoardSize = WORLD.config.defaults.boardSize,
            _height = checkIfValidBoardSize(height) || defaultBoardSize,
            _width = checkIfValidBoardSize(width) || _height;

        // Since there presumably won't be many instances of Game it was worth
        // it to have these functions defined in each instance.
        this.getWidth = function () { return _width; };
        this.getHeight = function () { return _height; };

        // Define two boards:
        // A current board that represents the working state,
        // and a next Board that represents the in progress state
        this._boards = [[],[]];

        this.currentBoard = this._boards[0];
        this.nextBoard = this._boards[1];
        this._boardState = 0;

        initializeBoard(this._boards[0], _height);
        initializeBoard(this._boards[1], _height);

        // Board will still need to be seeded at this point
    };

    // Swap board state references
    // After calling this function, any external references to
    // the .currentBoard or .nextBoard of a game will need to be updated
    WORLD.Game.prototype.updateBoard = function () {
        if (this._boardState === 0) {
            this.currentBoard = this._boards[1];
            this.nextBoard = this._boards[0];
            this._boardState = 1;
        }
        else {
            this.currentBoard = this._boards[0];
            this.nextBoard = this._boards[1];
            this._boardState = 0;
        }
    };

    WORLD.Game.prototype.mapWholeBoard = function (fnEach, done, thisArg) {
        var i, j, w, h, val, returnedVal;
        thisArg = thisArg || this;

        for (i = 0, h = this.getHeight(); i < h; ++i) {
            for (j = 0, w = this.getWidth(); j < w; ++j) {
                val = this.currentBoard[i][j];
                returnedVal = fnEach.call(thisArg, val, i, j);

                // We assume that if the user passes a value back that is not
                // false, it will an acceptable value.
                // This is a sacrifice of some robustness for better performance.
                if (returnedVal !== undefined && returnedVal !== false) {
                    this.nextBoard[i][j] = returnedVal;
                }
            }
        }
        this.updateBoard();

        if (done) {
            done.call(thisArg);
        }
    };

    // Makes previous board entirely zero
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

    WORLD.Game.prototype.HTMLify = function () {
        var i, j, w, h, HTMLstring = '';

        for (i = 0, h = this.getHeight(); i < h; ++i) {
            for (j = 0, w = this.getWidth(); j < w; ++j) {
                HTMLstring += this.currentBoard[i][j] + ' ';
            }
            HTMLstring += '<br>';
        }
        return HTMLstring;
    };

})();
