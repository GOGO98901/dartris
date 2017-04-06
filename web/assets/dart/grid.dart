part of dartris;

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

        new Shape([0x0F00, 0x2222, 0x00F0, 0x4444]);
        new Shape([0x44C0, 0x8E00, 0x6440, 0x0E20]);
        new Shape([0x4460, 0x0E80, 0xC440, 0x2E00]);
        new Shape([0xCC00, 0xCC00, 0xCC00, 0xCC00]);
        new Shape([0x06C0, 0x8C40, 0x6C00, 0x4620]);
        new Shape([0x0E40, 0x4C40, 0x4E00, 0x4640]);
        new Shape([0x0C60, 0x4C80, 0xC600, 0x2640]);
    }

    void newShape() {
        _shapePos = null;
        Shape shape = _currentShape = Shape.randomShape();
        int tile = Tile.indexOf(Tile.randomTile());

        int startX = (Shape.width ~/ 2) + random.nextInt(width - Shape.width);
        int startY = 0;

        _currentShapeRot = random.nextInt(4);
        Array2d<int> data = shape.getAsRotation(_currentShapeRot);

        List<Point> positions = new List<Point>();
        for (int x = 0; x < Shape.width; x++) {
            for (int y = 0; y < Shape.height; y++) {
                if (data[x][y] > 0) {
                    array[startX + x][startY + y] = tile;
                    positions.add(new Point(startX + x, startY + y));
                }
            }
        }
        _shapePos = new ShapePosition(new Point(startX, startY), positions);
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

    void rotateShape() {
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
                    if (array[c.x + x][c.x + y] != null) {
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
        if (!failed) {
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
        }
    }

    bool moveCurrentShape(int xOffset, int yOffset) {
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
            _shapePos.positions = currentShape;
            Point c = _shapePos.corner;
            _shapePos.corner = new Point(c.x + xOffset, c.y + yOffset);
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

class Shape {

    static List<Shape> shapes = new List<Shape>();

    static Shape fromIndex(int index) {
        if (index < 0 || index >= Shape.shapes.length) return null;
        return Shape.shapes[index];
    }

    static Shape randomShape() {
        return Shape.fromIndex(Grid.random.nextInt(Shape.shapes.length));
    }

    static const width = 4, height = 4;

    static final List<Object> masks = [0xF000, 0x0F00, 0x00F0, 0x000F];
    static final List<int> shift = [12, 8, 4, 0];

    List<Object> _bits;

    Shape(this._bits) {
        Shape.shapes.add(this);
    }

    Array2d<int> getAsRotation(int rotation) {
        Array2d<int> data = new Array2d<int>(width, height, defaultValue: 0);
        for (int y = 0; y < height; y++) {
            List<int> row = Util.codeToList(_bits[rotation], masks[y], shift[y]);
            for (int x = 0; x < width; x++) {
                data[x][y] = row[x];
            }
        }
        return data;
    }

    List<Object> get bits => _bits;
}

class ShapePosition {
    Point _cornerPos;
    List<Point> _currentShapePos;

    ShapePosition(this._cornerPos, this._currentShapePos);

    List<Point> get positions => _currentShapePos;

    void set positions(List<Point> position) {
        _currentShapePos = position;
    }

    Point get corner => _cornerPos;

    void set corner(Point corner) {
        _cornerPos = corner;
    }
}
