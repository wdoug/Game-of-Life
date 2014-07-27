'use strict';

var perf = perf || {};

(function () {

  var $status = $('#status');

  function noop() {}

  function setStatus(text) {
    $status.html(text);
  }


  var handlers = {};

  handlers.benchmark = {
    cycle: function () {
      var bench = this,
          size = bench.stats.sample.length;

      if (!bench.aborted) {
        setStatus(bench.name + ' &times; ' + Benchmark.formatNumber(bench.count) + ' (' +
          size + ' sample' + (size === 1 ? '' : 's') + ')');
      }
    }
  };

  handlers.suite = {
    cycle: function (event) {
      var bench = event.target,
          opsPerSec = Benchmark.formatNumber(bench.hz.toFixed(0)),
          $benchStatus = $('#'+bench.id);

      $benchStatus.html( opsPerSec );
    },
    complete: function (suiteId) {
      console.log(suiteId);
      console.log(this.filter('fastest').pluck('name') + ' is the fastest');

      var $suiteDiv = $('#'+suiteId);
      $suiteDiv.find('.result').html('Fastest is ' + this.filter('fastest').pluck('name'));
    }
  };


  perf.suites = [];

  perf.addSuite = function (suiteName, benchmarksObj, options) {
    options = options || {};

    var suite = new Benchmark.Suite(suiteName);

    // Define an id for the suite
    suite.id = 'suite_' + perf.suites.length;

    // Suite event handlers
    suite.on('add', function (event) {
      var bench = event.target;
      bench.id = suite.id + '_' + suite.length;
    })
    .on('cycle', function(event) {
      console.log(String(event.target));
      handlers.suite.cycle(event);
    })
    .on('complete', function () {
      handlers.suite.complete.call(this, suite.id);
    });

    // Add benchmarks to suite with event handlers
    Benchmark.each(benchmarksObj, function (bench, name) {
      suite.add(name, bench, {
        setup: options.setup || noop,

        teardown: options.teardown || noop,

        onError: function (err) {
          console.log('err');
          console.dir(err);
        },
        'onComplete': function () {
          console.log('done');
        },

        onCycle: handlers.benchmark.cycle
      });
    });

    perf.suites.push(suite);

    return suite;
  };


  // @TODO: This is getting pretty messy.
  // Consider refactoring this into some sort of templating handler.
  perf.renderSuites = function () {
    var i, j,
        fragment = document.createDocumentFragment(),
        $container = $('#suites'),
        $suiteDiv,
        tests;


    for (i = 0; i < perf.suites.length; ++i) {
      // Closure so referenced suite remains constant for on click handler
      (function (suite) {

        // Define formatted suite title and 'run' button
        $suiteDiv = $('<div><h1>' + suite.name + '</h1></div>');
        $suiteDiv.attr('id', suite.id);
        $suiteDiv.append('<button>Run Benchmarks</button>').click(function () {
          suite.run({ 'async': true });
        });

        // List individual tests
        tests = $('<table>' +
                    '<tr>' +
                      '<th> Test method </th>' +
                      '<th> Ops/sec </th>' +
                    '</tr>' +
                  '</table>');

        for (j = 0; j < suite.length; ++j) {
          tests.append('<tr>' +
                          '<td>' + suite[j].name + '</td>' +
                          '<td id="' + suite[j].id + '"> Pending... </td>' +
                        '</tr>');
        }
        tests.appendTo($suiteDiv);

        // Define result placeholder
        $('<div class="result"></div>').appendTo($suiteDiv);

        $suiteDiv.appendTo(fragment);

      // @NOTE: jshint doesn't like functions in loops even though this one is immediately invoked)
      })(perf.suites[i]); // jshint ignore:line
    }

    $container.append(fragment);
  };

})();
