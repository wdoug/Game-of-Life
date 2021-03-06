'use strict';

describe('life Algorithms', function () {
  var listOfAlgorithms = [
    'algMap',
    'algEdgesSeparate'
  ];

  var deathInit  = [[0,1],
                    [1,0]],

      deathResult =[[0,0],
                    [0,0]],

      birthInit  = [[0,1],
                    [1,1]],

      birthResult =[[1,1],
                    [1,1]];

  var overpopInit  = [[1,1,1],
                      [1,1,1]],

      overpopResult =[[1,0,1],
                      [1,0,1]];

  var initBoard5by5 =  [[0, 1, 0, 0, 0],
                        [1, 0, 0, 1, 1],
                        [1, 1, 0, 0, 1],
                        [0, 1, 0, 0, 0],
                        [1, 0, 0, 0, 1]],

      boardResult5by5 =[[0, 0, 0, 0, 0],
                        [1, 0, 1, 1, 1],
                        [1, 1, 1, 1, 1],
                        [0, 1, 0, 0, 0],
                        [0, 0, 0, 0, 0]];

  var zeroD       = [[1]],
      zeroDResult = [[0]];

  var vertical       = [[1],[1],[1]],
      verticalResult = [[0],[1],[0]];

  var horz       = [[1, 1, 1]],
      horzResult = [[0, 1, 0]];

  listOfAlgorithms.forEach(function (algorithm) {

    describe('.' + algorithm, function () {
      it('should have death for those with less than 2 neighbors', function () {
        var game2 = new WORLD.Game(2);

        game2.currentBoard = deathInit;
        game2[algorithm]();

        expect(game2.currentBoard).to.eql(deathResult);
      });

      it('should have birth for those with 3 neighbors', function () {
        var game2 = new WORLD.Game(2);

        game2.currentBoard = birthInit;
        game2[algorithm]();

        expect(game2.currentBoard).to.eql(birthResult);
      });

      it('should have death for those with more than 3 neighbors', function () {
        var game2by3 = new WORLD.Game(2,3);
        game2by3.currentBoard = overpopInit;
        game2by3[algorithm]();

        expect(game2by3.currentBoard).to.eql(overpopResult);
      });

      it('should correctly handle full 5 by 5 board', function () {
        var game5 = new WORLD.Game(5);
        game5.currentBoard = initBoard5by5;
        game5[algorithm]();

        expect(game5.currentBoard).to.eql(boardResult5by5);
      });

      it('should correctly handle a single cell', function () {
        var game = new WORLD.Game(1);
        game.currentBoard = zeroD;
        game[algorithm]();

        expect(game.currentBoard).to.eql(zeroDResult);
      });

      it('should correctly handle a 1D vertical board', function () {
        var game = new WORLD.Game(3,1);
        game.currentBoard = vertical;
        game[algorithm]();

        expect(game.currentBoard).to.eql(verticalResult);
      });

      it('should correctly handle a 1D horizontal board', function () {
        var game = new WORLD.Game(1,3);
        game.currentBoard = horz;
        game[algorithm]();

        expect(game.currentBoard).to.eql(horzResult);
      });
    });

  });

});
