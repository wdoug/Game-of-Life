'use strict';

describe('game (seed)', function () {

  describe('.seedZero', function () {
    it('should set all the current board values to 0', function () {
      var game = new WORLD.Game(2),
          currBoard,
          width = game.getWidth(),
          height = game.getHeight(),
          i, j;

      game.seedZero();

      currBoard = game.currentBoard;

      for (i = 0; i < height; ++i) {
        for (j = 0; j < width; ++j) {
          expect(currBoard[i][j]).to.equal(0);
        }
      }
    });
  });

  describe('.seedSpecific', function () {
    var game,
        width = 2,
        height = 3;

    beforeEach(function () {
      game = new WORLD.Game(height, width);
    });

    it('should validate input as array of arrays', function () {
      var unacceptedInput = [
        'not an array',
        ['not nested array'],
        [0],
        null,
        undefined,
        {}
      ];

      unacceptedInput.forEach(function (value) {
        expect(function () {
          game.seedSpecific(value);
        }).to.throw(/array of arrays/);
      });
    });

    it('should validate that the outer array length is the same as the game height', function () {
      var input = [[0],[0]];
      expect(function () {
        game.seedSpecific(input);
      }).to.throw(/height/);
    });

    it('should validate that the inner array lengths equal the game width', function () {
      var input = [[0],[0],[0]];
      expect(function () {
        game.seedSpecific(input);
      }).to.throw(/width/);
    });

    it('should validate that the arrays only contain 1s and 0s', function () {
      var input = [['',0],[true,false],['0', '1']];

      expect(function () {
        game.seedSpecific(input);
      }).to.throw(/(zeros|0)/);

      var validInput = [[0,0],[1,0],[0, 1]];

      expect(function () {
        game.seedSpecific(validInput);
      }).to.not.throw(Error);

      expect(game.currentBoard).to.eql(validInput);
    });
  });

});
