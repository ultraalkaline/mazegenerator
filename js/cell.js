function Cell(col, row) {
    this.col = col;
    this.row = row;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function() {
        var neighbors = [];

        // Top neighbor.
        var top     = grid[index(row    , col - 1)];
        // Right neighbor.
        var right   = grid[index(row + 1, col    )];
        // Bottom neighbor.
        var bottom  = grid[index(row    , col + 1)];
        // Left neighbor.
        var left    = grid[index(row - 1, col    )];

        // If the top neighbor exists and isn't visited,
        // push it to the array of neighbors.
        if (top && !top.visited) {
            neighbors.push(top);
        }
        // If the right neighbor exists and isn't visited,
        // push it to the array of neighbors.
        if (right && !right.visited) {
            neighbors.push(right);
        }
        // If the bottom neighbor exists and isn't visited,
        // push it to the array of neighbors.
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        // If the left neighbor exists and isn't visited,
        // push it to the array of neighbors.
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

        console.log("Neighbors: " + neighbors);
    }

    this.show = function() {
        var x = this.col * scl;
        var y = this.row * scl;
        stroke(mazeColor[0], mazeColor[1], mazeColor[2], 255);
        strokeWeight(strokeweight);

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
            textSize(10);
            var tx = x + strokeweight;
            var ty = y + strokeweight;
            point(tx + scl / 2, ty + scl / 2);
        }
    }

    this.highlight = function() {
        var x = this.col * scl;
        var y = this.row * scl;
        stroke(0, 0, 255, 100);
        noFill();
        rect(x, y, scl, scl);

        started = true;

        if (!(this.col == 0 && this.row == 0)) {
          path.push({x, y});
        }

    }
}
