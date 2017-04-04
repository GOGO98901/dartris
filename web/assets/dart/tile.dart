part of dartris;

class Grid {
    int _width = 10, _height = 20;

    Array2d _grid;

    Grid() {
        _grid = new Array2d(width, height);
        Random rand = new Random();
        for (int x = 0; x < width;x++) {
            for (int y = 0; y <height;y++) {
                grid[x][y] = rand.nextInt(10);
            }
        }
        for (int i = 0;i < 5;i++) {
            log.info(grid);
            drop();
        }
    }

    void drop() {
        for (int x = 0; x < width; x++) {
            grid[x][height - 1] = null;
        }
        for (int x = 0; x > width; x++) {
            for (int y = height; y > height; y--) {
                if (y + 1 < grid.height) grid[x][y + 1] = grid[x][y];
                grid[x][y] = null;
            }
        }
    }

    Array2d get grid => _grid;

    int get width => _width;
    int get height => _height;
}

class Tile {

    Tile();
}
