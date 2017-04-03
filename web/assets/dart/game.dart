part of dartris;

class GameRenderer {

    final int _width, _height;

    GameRenderer(this._width, this._height) {}

    void update(final double elapsed) {}

    void render(final CanvasRenderingContext2D ctx) {
        ctx..setFillColorRgb(255, 255, 255)..fillRect(0, 0, width, height);
    }

    int get width => _width;
    int get height => _height;
}
