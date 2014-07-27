// @NOTE: jshint doesn't like chai's .be.undefined
// since it isn't an assignement or function call
// it thinks it is a typo
/* jshint expr: true */
'use strict';

describe('Dependencies', function () {

  it('should have WORLD defined', function () {
    expect(WORLD).to.not.be.undefined;
  });

  it('should have Game constuctor defined', function () {
    expect(WORLD.Game).to.not.be.undefined;
    expect(WORLD.Game).to.be.an.instanceof(Function);
  });

  describe('Game instance', function () {
    var game;

    beforeEach(function () {
      game = new WORLD.Game();
    });

    var gameMethods = [
      'updateBoard',
      'seedZero',
      'stringify',
      'tick'
    ];

    gameMethods.forEach(function(method) {
      it('should have game.' + method + ' method defined', function () {
        expect(game[method]).to.not.be.undefined;
      });
    });
  });

});
