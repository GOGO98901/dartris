part of dartris;

class Grid {
    static const int width = 10, height = 16;

    static final Random random = new Random();

    Array2d _grid;

    List<Point> _currentShape;

    Grid() {
        _grid = new Array2d(width, height);
        _currentShape = new List<Point>();

        Tile.newFromRGB(255, 0, 0);
        Tile.newFromRGB(0, 255, 0);
        Tile.newFromRGB(0, 0, 255);

        new Shape(() {
            Array2d data = new Array2d(4, 1, defaultValue: 0);
            data[0][0] = 1;
            data[1][0] = 1;
            data[2][0] = 1;
            data[3][0] = 1;
            return data;
        });
        new Shape(() {
            Array2d data = new Array2d(3, 2, defaultValue: 0);
            data[0][0] = 1;
            data[1][0] = 1;
            data[2][0] = 1;
            data[2][1] = 1;
            return data;
        });
        new Shape(() {
            Array2d data = new Array2d(3, 2, defaultValue: 0);
            data[0][0] = 1;
            data[0][1] = 1;
            data[1][0] = 1;
            data[2][0] = 1;
            return data;
        });
        new Shape(() {
            Array2d data = new Array2d(2, 2, defaultValue: 1);
            return data;
        });
        new Shape(() {
            Array2d data = new Array2d(3, 2, defaultValue: 0);
            data[0][1] = 1;
            data[1][1] = 1;
            data[1][0] = 1;
            data[2][0] = 1;
            return data;
        });
        new Shape(() {
            Array2d data = new Array2d(3, 2, defaultValue: 0);
            data[0][0] = 1;
            data[1][0] = 1;
            data[2][0] = 1;
            data[1][1] = 1;
            return data;
        });
        new Shape(() {
            Array2d data = new Array2d(3, 2, defaultValue: 0);
            data[0][0] = 1;
            data[1][1] = 1;
            data[1][0] = 1;
            data[2][1] = 1;
            return data;
        });
    }

    void newShape() {
        currentShape.clear();
        Shape shape = Shape.randomShape();
        int tile = Tile.indexOf(Tile.randomTile());

        int startX = shape.width * random.nextInt(width ~/ shape.width);
        int startY = 0;

        for (int x = 0; x < shape.width; x++) {
            for (int y = 0; y < shape.height; y++) {
                if (shape.data[x][y] > 0) {
                    array[startX + x][startY + y] = tile;
                    currentShape.add(new Point(startX + x, startY + y));
                }
            }
        }
    }

    void checkForRow() {
        for (int y = 0; y < height; y++) {
            bool row = true;
            for (int x = 0; x < width; x++) {
                if (array[x][y] == null) row = false;
            }
            if (row) drop(row: y);
        }
    }

    bool moveCurrentShape(int xOffset, int yOffset) {
        bool failed = false;
        bool spawn = false;
        for (int i = 0; i < currentShape.length; i++) {
            Point p = currentShape[i];
            Point n = new Point(p.x + xOffset, p.y + yOffset);
            if (n.y >= height) spawn = failed = true;
            if (n.x < 0 || n.x >= width) failed = true;
            if (!failed) {
                if (array[n.x][n.y] != null) {
                    bool same = false;
                    currentShape.forEach((p) {
                        if (p.x == n.x && p.y == n.y) same = true;
                    });
                    if (same) continue;
                    spawn = failed = true;
                }
            }
            if (failed) break;
        }
        if (!failed) {
            Point first = currentShape.first;
            int tile = array[first.x][first.y];
            currentShape.forEach((p) => array[p.x][p.y] = null);
            for (int i = 0; i < currentShape.length; i++) {
                Point p = currentShape[i];
                Point n = new Point(p.x + xOffset, p.y + yOffset);
                array[n.x][n.y] = tile;
                currentShape[i] = n;
            }
        }
        return spawn;
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

    List<Point> get currentShape => _currentShape;
    Array2d get array => _grid;
}

class Tile {

    static List<Tile> tiles = new List<Tile>();

    static Tile fromIndex(int index) {
        if (index < 0 || index >= Tile.tiles.length) return null;
        return Tile.tiles[index];
    }

    static Tile randomTile() {
        return Tile.fromIndex(Grid.random.nextInt(Tile.tiles.length));
    }

    static int indexOf(Tile tile) {
        return Tile.tiles.indexOf(tile);
    }

    static Tile newFromColor(Color color) {
        return new Tile(color);
    }

    static Tile newFromRGB(int red, int green, int blue) {
        return newFromColor(new RgbColor(red, green, blue));
    }

    Color _color;

    Tile(this._color) {
        Tile.tiles.add(this);
    }

    Color get color => _color;
}

typedef Array2d ShapeData();

class Shape {

    static List<Shape> shapes = new List<Shape>();

    static Shape fromIndex(int index) {
        if (index < 0 || index >= Shape.shapes.length) return null;
        return Shape.shapes[index];
    }

    static Shape randomShape() {
        return Shape.fromIndex(Grid.random.nextInt(Shape.shapes.length));
    }

    Array2d _data;

    Shape(ShapeData data) {
        _data = data();
        Shape.shapes.add(this);
    }

    int get width => _data.width;
    int get height => _data.height;

    Array2d get data => _data;
}
