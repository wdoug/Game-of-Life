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
    });

    it('should make any point on the board accessible through a pair of indices',
          function () {

      var game = new WORLD.Game(5);
      // If the outer array index returns an array, then we know
      // that the inner index can access a point in that array
      // without throwing an error.
      // Reminder: Zero based array index (4 is largest in board size 5).
      expect(game._board[4]).to.be.an('array');
    });
  });

  describe('.mapWholeBoard', function () {
    var game, boardSize = 2;
    beforeEach(function () {
      game = new WORLD.Game(boardSize);
    });

    it('should iterate through each point in the board', function (done) {
      var count = 0;
      game.mapWholeBoard(function () {
        count += 1;
      }, function () {
        expect(count).to.equal(boardSize*boardSize);
        done();
      });
    });

    it('should be able to set board values', function (done) {
      game.mapWholeBoard(function () {
        return 0;
      }, function () {
        expect(game._board[0][0]).to.equal(0);
        expect(game._board[0][1]).to.equal(0);
        expect(game._board[1][0]).to.equal(0);
        expect(game._board[boardSize-1][boardSize-1]).to.equal(0);
        done();
      });
    });

    it('should be able to pass \'this\' context', function () {
        var doneReturnValue = 0;

        this.testContext = function () {
          return 1;
        };

        game.mapWholeBoard(function () {
          return this.testContext();
        }, function () {
          doneReturnValue = this.testContext();
        }, this);

        expect(game._board[0][0]).to.equal(1);
        expect(doneReturnValue).to.equal(1);
    });
  });

});
