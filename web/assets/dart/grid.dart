part of dartris;

class Grid {
    static const int width = 10, height = 16;

    Array2d _grid;

    Grid() {
        _grid = new Array2d(width, height);
        Tile.newFromRGB(255, 0, 0);
        Tile.newFromRGB(0, 255, 0);
        Tile.newFromRGB(0, 0, 255);
        Random rand = new Random();
        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                if (rand.nextInt(2) == 0) array[x][y] = rand.nextInt(3);
            }
        }
    }

    void drop({int row : (height - 1)}) {
        for (int x = 0; x < width; x++) {
            array[x][row] = null;
        }
        for (int x = 0; x < width; x++) {
            for (int y = row - 1; y >= 0; y--) {
                array[x][y + 1] = array[x][y];
                array[x][y] = null;
            }
        }
    }

    Array2d get array => _grid;
}

class Tile {

    static List<Tile> tiles = new List<Tile>();

    static Tile fromIndex(int index) {
        if (index < 0 || index >= Tile.tiles.length) return null;
        return tiles[index];
    }

    static void newFromColor(Color color) {
        new Tile(color);
    }

    static void newFromRGB(int red, int green, int blue) {
        newFromColor(new RgbColor(red, green, blue));
    }

    Color _color;

    Tile(this._color) {
        Tile.tiles.add(this);
    }

    Color get color => _color;
}
