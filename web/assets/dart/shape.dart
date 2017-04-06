part of dartris;

class ShapeManager {
    List<Shape> _shapes = new List<Shape>();

    ShapeManager() {
        shapes.add(new Shape([0x0F00, 0x2222, 0x00F0, 0x4444]));
        shapes.add(new Shape([0x44C0, 0x8E00, 0x6440, 0x0E20]));
        shapes.add(new Shape([0x4460, 0x0E80, 0xC440, 0x2E00]));
        shapes.add(new Shape([0xCC00, 0xCC00, 0xCC00, 0xCC00]));
        shapes.add(new Shape([0x06C0, 0x8C40, 0x6C00, 0x4620]));
        shapes.add(new Shape([0x0E40, 0x4C40, 0x4E00, 0x4640]));
        shapes.add(new Shape([0x0C60, 0x4C80, 0xC600, 0x2640]));
    }

    Shape fromIndex(int index) {
        if (index < 0 || index >= _shapes.length) return null;
        return _shapes[index];
    }

    Shape randomShape() {
        return fromIndex(Grid.random.nextInt(_shapes.length));
    }

    List<Shape> get shapes => _shapes;
}

class Shape {

    static const width = 4, height = 4;

    static final List<Object> masks = [0xF000, 0x0F00, 0x00F0, 0x000F];
    static final List<int> shift = [12, 8, 4, 0];

    List<Object> _bits;

    Shape(this._bits);

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
