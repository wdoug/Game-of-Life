'use strict';

describe('Game', function () {

  describe('Constructor', function () {
    it('should use the default board size if passed an invalid parameter',
          function () {

      var defaultSize = WORLD.config.defaults.boardSize,
        invalidParams = ['string', -1, Number.POSITIVE_INFINITY, 0,
                null, undefined];

      $.each(invalidParams, function (index, value) {
        expect(new WORLD.Game(value).getWidth()).to.equal(defaultSize);
      });
    });

    it('should create a square board if passed an invalid height', function () {
      expect(new WORLD.Game(3).getHeight()).to.equal(3);
      expect(new WORLD.Game(3, 'hi').getHeight()).to.equal(3);
    });

    it('should define an array of two boards (current and next)', function () {
      var game = new WORLD.Game(3);

      expect(game._boards.length).to.equal(2);
    });

    it('should provide access to current and next board', function () {
      var game = new WORLD.Game(2);

      expect(game.currentBoard).to.be.an('array');
      expect(game.nextBoard).to.be.an('array');
    });

    it('should make any point on the boards accessible through a pair of indices',
          function () {

      var game = new WORLD.Game(5);
      // If the outer array index returns an array, then we know
      // that the inner index can access a point in that array
      // without throwing an error.
      // Reminder: Zero based array index (4 is largest in board size 5).
      expect(game.currentBoard[4]).to.be.an('array');
      expect(game.nextBoard[4]).to.be.an('array');
    });
  });

  describe('.updateBoard', function () {
    it('should swap the context of current and next boards', function () {
      var game = new WORLD.Game(2);

      game.currentBoard[0][0] = 0;
      game.nextBoard[0][0] = 1;

      game.updateBoard();
      expect(game.currentBoard[0][0]).to.equal(1);
      expect(game.nextBoard[0][0]).to.equal(0);

      game.updateBoard();
      expect(game.currentBoard[0][0]).to.equal(0);
      expect(game.nextBoard[0][0]).to.equal(1);
    });

    it('should change the board state', function () {
      var game = new WORLD.Game(0),
          initialBoardState = game._boardState;

      game.updateBoard();
      expect(game._boardState).to.not.equal(initialBoardState);
    });
  });

  describe('.mapWholeBoard', function () {
    var game,
        boardWidth = 2,
        boardHeight = 3;
    beforeEach(function () {
      game = new WORLD.Game(boardWidth, boardHeight);
    });

    it('should iterate through each point in the current board', function () {
      var count = 0;

      game.currentBoard[0][1] = 1;

      game.mapWholeBoard(function (val, i, j) {
        count += 1;
        if (i === 0 && j === 1) {
          expect(val).to.equal(1);
        }
      });

      expect(count).to.equal(boardWidth*boardHeight);
    });

    it('should be able to set board values', function () {
      game.mapWholeBoard(function () {
        return 0;
      });

      var currBoard = game.currentBoard;
      expect(currBoard[0][0]).to.equal(0);
      expect(currBoard[0][1]).to.equal(0);
      expect(currBoard[1][0]).to.equal(0);
      expect(currBoard[boardWidth-1][boardHeight-1]).to.equal(0);
    });

    it('should be able to pass \'this\' context', function () {
      var doneReturnValue = 0;

      this.testContext = function () {
        return 1;
      };

      game.mapWholeBoard(function () {
        return this.testContext();
      }, this);

      expect(game.currentBoard[0][0]).to.equal(1);
    });
  });

  describe('.HTMLify', function () {
    it('should return a string of values with \'<br>\'s', function () {
      var boardWidth = 2,
          game = new WORLD.Game(boardWidth);
      game.seedZero();

      var html = game.HTMLify();
      expect(html).to.be.a('string');
      expect(html.match(/(<br>)/g).length).to.equal(boardWidth);
    });
  });

  describe('.getValueIfItExistsAt', function () {
    var game, currBoard;
    beforeEach(function() {
      game = new WORLD.Game(2,1);
      currBoard = game.currentBoard;
    });

    it('should return 0 if out of bounds', function () {
      var outOfBoundsPairs = [[-1,0], [1,-1], [2,0]];

      $.each(outOfBoundsPairs, function (index, value) {
        expect(game.getValueIfItExistsAt(value[0], value[1], currBoard)).to.equal(0);
      });
    });

    it('should return the value if it exists', function () {
      game.currentBoard[1][0] = 1;

      expect(game.getValueIfItExistsAt(1, 0,currBoard)).to.equal(1);
    });
  });

});
