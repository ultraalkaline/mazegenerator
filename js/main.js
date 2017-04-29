/*
 *  A maze generator based on the recursive backtracking algorithm
 *  (https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker)
 *  with the ability to change the framerate by holding up arrow
 *  (increase up to 120 fps) or holding down arrow (decreasing down to 0
 *  fps).
 */

var canvas;
var fr = 10;

var scl = 40;
var cols, rows;

var grid = [];
var stack = [];

var current;
var textBox;

var mazeWidth, mazeHeight;
var strokeweight = 4;

var mazeColor = new Array(3);

function setup() {
   mazeHeight = (Math.ceil((windowHeight - 100)  / scl) * scl) + strokeweight;
   mazeWidth = mazeHeight;
   canvas = createCanvas(mazeWidth, mazeHeight);
   canvas.id('canvas');

   frameRate(fr);

   cols = floor(mazeWidth / scl);
   rows = floor(mazeHeight / scl);

   initMaze();

   $("#regen-button").click(function() {
       initMaze();
   });

   setTimeout(function() {
       $("#tip").fadeToggle();
   }, 5000);

}

function draw() {
    background(0);

    mazeColor[0] = parseInt($("[name='colorR']").val());
    mazeColor[1] = parseInt($("[name='colorG']").val());
    mazeColor[2] = parseInt($("[name='colorB']").val());

    translate(strokeweight/2, strokeweight/2);

    if (keyIsDown(UP_ARROW))
        frameRate(updateFrameRate("up"));
    else if (keyIsDown(DOWN_ARROW))
        frameRate(updateFrameRate("down"));

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    // STEP 1 PART 2
    current.visited = true;
    current.highlight();
    // STEP 2.1
    var next = current.checkNeighbors();
    if (next) {
        // STEP 2.1.4 PART 1
        next.visited = true;
        // STEP 2.1.2
        stack.push(current);
        // STEP 2.1.3
        removeWalls(current, next);
        // STEP 2.1.4 PART 2
        current = next;
    } else if (stack.length > 0) {
        var cell = stack.pop();
        current = cell;
    }
}

function initMaze() {
    grid = [];

    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
            var cell = new Cell(r, c);
            grid.push(cell);
        }
    }
    // STEP 1 PART 1
    current = grid[0];
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function removeWalls(a, b) {
    // Right or left neighbor(s)
    var x = a.cols - b.cols;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    // Top or bottom neighbor(s)
    var y = a.rows - b.rows;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

    // Starting cell
    if (a.cols == 0 && a.rows == 0) {
        a.walls[3] = false;
    }
    // Ending cell
    if (b.cols == cols - 1 && b.rows == rows - 1) {
        b.walls[1] = false;
    }
}

function updateFrameRate(key) {
    if (fr < 120 && key == "up") {
        var upFrameRate = fr++;
        return upFrameRate;
    } else if (fr > 0 && key == "down") {
        var downFrameRate = fr--;
        return downFrameRate;
    } else {
        return fr;
    }
}
