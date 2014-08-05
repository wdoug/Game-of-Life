/*
* This file defines benchmark suites to compare the performance of different
* functions used by the game of life.
*/

/* global WORLD */

// @NOTE: Since Benchmark 'compiles' code so that setup function code runs before
// specific benchmark code, variables are defined in one function scope,
// and used in another. Because of this, I have disabled the jshint warnings
// for these issues on this file.
/* jshint undef: false, unused: false */
/* jshint -W117 */
'use strict';

var perf = perf || {};

(function () {

/*
* Algorithms
*/
  var algorithmOptions = {
    setup: function () {
      var game = new WORLD.Game(5);
      game.currentBoard =  [[0, 1, 0, 0, 0],
                            [1, 0, 0, 1, 1],
                            [1, 1, 0, 0, 1],
                            [0, 1, 0, 0, 0],
                            [1, 0, 0, 0, 1]];
    }
  };

  perf.addSuite('Game Algorithm 5x5', {
    map: function () {
      game.algMap();
    },
    edgesSeparate: function () {
      game.algEdgesSeparate();
    }
  }, algorithmOptions);


  var largerBoardOptions = {
    setup: function () {
      var game = new WORLD.Game(20);
      game.seedRandom();
    }
  };

  perf.addSuite('Game Algorithm 20x20 random seed', {
    map: function () {
      game.algMap();
    },
    edgesSeparate: function () {
      game.algEdgesSeparate();
    }
  }, largerBoardOptions);


/*
* Rendering
*/
  var rendering5x5Options = {
    setup: function () {
      var game = new WORLD.Game(5);
      game.currentBoard =  [[0, 1, 0, 0, 0],
                            [1, 0, 0, 1, 1],
                            [1, 1, 0, 0, 1],
                            [0, 1, 0, 0, 0],
                            [1, 0, 0, 0, 1]];

      var pre = document.createElement('pre');

      var canvas = document.createElement('canvas');
      canvas.setAttribute('width',20);
      canvas.setAttribute('height',20);
      game.setCanvas(canvas);
    }
  };

  perf.addSuite('Game rendering 5x5', {
    'text': function () {
      pre.innerHTML = game.stringify();
    },
    'canvas (20x20 pixel size)': function () {
      game.render();
    }
  }, rendering5x5Options);


  perf.renderSuites();

})();
