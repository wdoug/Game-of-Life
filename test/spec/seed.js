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

});
