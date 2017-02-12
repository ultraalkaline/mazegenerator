function Cell(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function() {
        var neighbors = [];

        // Top neighbor.
        var top     = grid[index(rows    , cols - 1)];
        // Right neighbor.
        var right   = grid[index(rows + 1, cols    )];
        // Bottom neighbor.
        var bottom  = grid[index(rows    , cols + 1)];
        // Left neighbor.
        var left    = grid[index(rows - 1, cols    )];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            // STEP 2.1.1
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.show = function() {
        var x = this.cols * scl;
        var y = this.rows * scl;
        stroke(229, 144, 0, 255);
        strokeWeight(2);

        if (this.walls[0]) {
            // Top Left -> Top Right
            beginShape();
            vertex(x      , y);
            vertex(x + scl, y);
            endShape();

            // line(x      , y      , x + scl, y);
        }
        if (this.walls[1]) {
            // Top Right -> Bottom Right
            beginShape(LINES);
            vertex(x + scl, y      );
            vertex(x + scl, y + scl);
            endShape();
            // line(x + scl, y      , x + scl, y + scl);
        }
        if (this.walls[2]) {
            // Bottom Right -> Bottom Left
            beginShape(LINES);
            vertex(x + scl, y + scl);
            vertex(x      , y + scl);
            endShape();
            // line(x + scl, y + scl, x      , y + scl);
        }
        if (this.walls[3]) {
            // Bottom Left -> Top Left
            beginShape(LINES);
            vertex(x      , y + scl);
            vertex(x      , y      );
            endShape();
            // line(x      , y + scl, x      , y);
        }

        if (this.visited) {
            stroke(255, 0);
            noFill();
            rect(x, y, scl, scl);
        }
    }

    this.highlight = function() {
        var x = this.cols * scl;
        var y = this.rows * scl;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, scl, scl);
    }
}
