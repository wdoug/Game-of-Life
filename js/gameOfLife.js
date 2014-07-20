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

})();
