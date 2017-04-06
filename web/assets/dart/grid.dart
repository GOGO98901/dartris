part of dartris;

enum ShapeResult {
    FAILED, SPAWN, ROTATED, MOVED, ROW
}

class Grid {
    static const int width = 10, height = 16;

    static final Random random = new Random();

    Array2d<int> _grid;

    ShapePosition _shapePos;
    Shape _currentShape;
    int _currentShapeRot = 0;

    Grid() {
        _grid = new Array2d<int>(width, height);

        Tile.newFromRGB(255, 0, 0);
        Tile.newFromRGB(255, 255, 0);
        Tile.newFromRGB(0, 255, 0);
        Tile.newFromRGB(0, 0, 255);
        Tile.newFromRGB(255, 0, 255);
    }

    ShapeResult newShape(ShapeManager manager) {
        _shapePos = null;
        Shape shape = _currentShape = manager.randomShape();
        int tile = Tile.indexOf(Tile.randomTile());

        int startX = (Shape.width ~/ 2) + random.nextInt(width - Shape.width);
        int startY = 0;

        _currentShapeRot = random.nextInt(4);
        Array2d<int> data = shape.getAsRotation(_currentShapeRot);

        List<Point> positions = new List<Point>();
        bool failed = false;
        positions.forEach((p) {
            if (array[p.x][p.y] != null) failed = true;
        });
        if (failed) return ShapeResult.FAILED;
        for (int x = 0; x < Shape.width; x++) {
            for (int y = 0; y < Shape.height; y++) {
                if (data[x][y] > 0) {
                    array[startX + x][startY + y] = tile;
                    positions.add(new Point(startX + x, startY + y));
                }
            }
        }
        _shapePos = new ShapePosition(new Point(startX, startY), positions);
        return ShapeResult.SPAWN;
    }

    ShapeResult checkForRow() {
        for (int y = 0; y < height; y++) {
            bool row = true;
            for (int x = 0; x < width; x++) {
                if (array[x][y] == null) row = false;
            }
            if (row) {
                drop(row: y);
                return ShapeResult.ROW;
            }
        }
        return null;
    }

    ShapeResult rotateShape() {
        int rotation = _currentShapeRot + 1;
        if (rotation >= 4) rotation = 0;
        Array2d<int> newData = _currentShape.getAsRotation(rotation);
        List<Point> oldData = _shapePos.positions;
        Point c = _shapePos.corner;
        bool failed = false;
        for (int x = 0; x < newData.width; x++) {
            for (int y = 0; y < newData.height; y++) {
                if (c.y + y >= height) failed = true;
                if (c.x + x < 0 || c.x + x >= width) failed = true;
                if (!failed) {
                    if (array[c.x + x][c.y + y] != null) {
                        bool same = false;
                        oldData.forEach((p) {
                            if (p.x == c.x + x && p.y == c.y + y) same = true;
                        });
                        if (same) continue;
                        failed = true;
                    }
                }
            }
        }
        if (failed) return ShapeResult.FAILED;

        _currentShapeRot = rotation;
        Point first = _shapePos.positions.first;
        int tile = array[first.x][first.y];
        _shapePos.positions.forEach((p) => array[p.x][p.y] = null);
        int index = 0;
        for (int x = 0; x < newData.width; x++) {
            for (int y = 0; y < newData.height; y++) {
                if (newData[x][y] > 0) {
                    array[c.x + x][c.y + y] = tile;
                    _shapePos.positions[index++] = new Point(c.x + x, c.y + y);
                }
            }
        }
        return ShapeResult.ROTATED;
    }

    ShapeResult moveCurrentShape(int xOffset, int yOffset) {
        bool failed = false;
        bool spawn = false;
        List<Point> currentShape = _shapePos.positions;
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

        if (failed) {
            if (spawn) return ShapeResult.SPAWN;
            return ShapeResult.FAILED;
        }

        Point first = currentShape.first;
        int tile = array[first.x][first.y];
        currentShape.forEach((p) => array[p.x][p.y] = null);
        for (int i = 0; i < currentShape.length; i++) {
            Point p = currentShape[i];
            Point n = new Point(p.x + xOffset, p.y + yOffset);
            array[n.x][n.y] = tile;
            currentShape[i] = n;
        }
        _shapePos.positions = currentShape;
        Point c = _shapePos.corner;
        _shapePos.corner = new Point(c.x + xOffset, c.y + yOffset);

        if (spawn) return ShapeResult.SPAWN;
        else return ShapeResult.MOVED;

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

    Array2d<int> get array => _grid;
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
