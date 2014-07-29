#Game-of-Life

[![Stories in Ready](https://badge.waffle.io/wdoug/Game-of-Life.png?label=ready&title=Ready)](http://waffle.io/wdoug/Game-of-Life)

A simple javascript implementation of [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life).

##Game of Life rules
The Game of Life plays out on a board grid with cells that are either living (1), or dead (0). With each new generation cells will live or die based on the following rules:

1. Any live cell with fewer than two live neighbours dies (under-population)
2. Any live cell with two or three live neighbours lives on to the next generation (survival)
3. Any live cell with more than three live neighbours dies (overcrowding)
4. Any dead cell with exactly three live neighbours becomes a live cell (reproduction)



##Pages online
* [Main page](http://wdoug.github.io/Game-of-Life/)
* [Unit tests](http://wdoug.github.io/Game-of-Life/test.html)
* [Performance benchmarks](http://wdoug.github.io/Game-of-Life/performance.html)

##Notes and Conventions
* `WORLD` is the primary app namespace
* `perf` is currently a second namespace for the performance benchmarks
* The game board is an array of arrays, where the inner arrays are represented horizontally
* The rendering and references to the board start from the top left and go right then down on a line by line basis (like english)
* For loops in the program tend to follow the convention of using `i` as the iterator for outer loops, and `j` as the iterator for inner loops. This ends up making `i` typically map to the vertical index, and `j` map to the horizontal.


This project is still very much a work in progress, and has some rough edges
