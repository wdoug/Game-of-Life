/*
* This file defines the constructor for WORLD.Game. This Game constructor
* creates a game object that stores and updates the game of life board.
*/

'use strict';

var WORLD = WORLD || {};

(function () {
    // Since javascript doesn't have multidimensional array structures,
    // the game board is implemented as an array of arrays.
    // This function is needed so that the inner arrays are defined
    function initializeBoard(board, height) {
        var i;
        for (i = 0; i < height; ++i) {
            // Since javascript arrays are hashs that support
            // sparse arrays, the inner arrays can be defined with either
            // [] or Array(width)
            board[i] = [];
        }
    }

    // Make sure the input size for the board is a positive number
    // between 1 and infinity
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

    // Option to pass in argument for this so that the loop can still
    // reference the Game instance's width and height, while having
    // the fnEach callback called in a seperate context
    WORLD.Game.prototype.mapWholeBoard = function (fnEach, thisArg, disableUpdate) {
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
        if (!disableUpdate) {
            this.updateBoard();
        }
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

    WORLD.Game.prototype.stringify = function () {
        var i, j, w, h, string = '';

        for (i = 0, h = this.getHeight(); i < h; ++i) {
            for (j = 0, w = this.getWidth(); j < w; ++j) {
                string += this.currentBoard[i][j] + ' ';
            }
            string += '\n';
        }
        return string;
    };

    WORLD.Game.prototype.getValueIfItExistsAt = function (i, j, board) {
        return (board[i] && board[i][j]) || 0;
    };

})();
