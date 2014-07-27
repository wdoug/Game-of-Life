describe('life Algorithms', function () {
  var listOfAlgorithms = [
    'tick',
    'algMap'
  ];

  listOfAlgorithms.forEach(function (algorithm) {
    var game,
        initBoard5by5 =  [[0, 1, 0, 0, 0],
                          [1, 0, 0, 1, 1],
                          [1, 1, 0, 0, 1],
                          [0, 1, 0, 0, 0],
                          [1, 0, 0, 0, 1]],

        boardResult5by5 =[[0, 0, 0, 0, 0],
                          [1, 0, 1, 1, 1],
                          [1, 1, 1, 1, 1],
                          [0, 1, 0, 0, 0],
                          [0, 0, 0, 0, 0]];

    describe('.' + algorithm, function () {
      it('should update the state of the board based on the \'rules of life\'',
              function () {
        var game = new WORLD.Game(5);

        game.currentBoard = initBoard5by5;
        game[algorithm]();

        expect(game.currentBoard).to.eql(boardResult5by5);
      });
    });
  });

});
