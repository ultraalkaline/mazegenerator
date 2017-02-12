/*
 *  A maze generator based on the recursive backtracking algorithm
 *  (https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker)
 *  with the ability to change the framerate by holding up arrow
 *  (increase up to 120 fps) or holding down arrow (decreasing down to 0
 *  fps).
 */

var canvas;
var framerate = 120;

var scl = 20;
var cols, rows;

var grid = [];
var stack = [];

var current;
var textBox;

function setup() {
    createCanvas(windowWidth, windowHeight);
   canvas = createCanvas(601, 601);

   fixCanvas();
   frameRate(framerate);

   cols = floor(width / scl);
   rows = floor(height / scl);

   for (var r = 0; r < rows; r++) {
       for (var c = 0; c < cols; c++) {
           var cell = new Cell(r, c);
           grid.push(cell);
       }
   }
   // STEP 1 PART 1
   current = grid[0];
}

function draw() {
    background(51);
    background(0);

    if (keyIsDown(UP_ARROW))
        frameRate(updateFrameRate("up"));
    else if (keyIsDown(DOWN_ARROW))
        frameRate(updateFrameRate("down"));
    frameRateTextBox(framerate);

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

function windowResized() {
    fixCanvas();
}

function fixCanvas() {
    canvas.position(windowWidth/2 - 601/2, 0);
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
    if (framerate < 120 && key == "up") {
        var upFrameRate = framerate++;
        return upFrameRate;
    } else if (framerate > 0 && key == "down") {
        var downFrameRate = framerate--;
        return downFrameRate;
    } else {
        return framerate;
    }
}

function frameRateTextBox(framerate) {
    fill(255);
    textSize(64);
    textBox = text("Framerate: " + framerate, windowWidth - 500 , windowHeight/2, 500, 100);
}
