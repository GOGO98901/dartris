part of dartris;

class GameRenderer {

    final int _width, _height;

    List<StateBase> _states;
    StateBase _currentState;

    GameRenderer(this._width, this._height) {
        _states = new List<StateBase>();
        _states.add(new StateMenu(this));
        _states.add(new StateGame(this));

        setState(0);
    }

    void update(final double elapsed) => _currentState.update(elapsed);

    void render(final CanvasRenderingContext2D ctx) {
        ctx..clearRect(0, 0, width, height)..setFillColorRgb(255, 255, 255)..fillRect(0, 0, width, height);
        _currentState.render(ctx);
    }

    void setState(int id) {
        if (_states != null && id >= 0) {
            if (_states.length > 0 && id < _states.length) {
                _currentState = _states[id];
                log.info('Changed state to $_currentState');
            }
        }
    }

    int get width => _width;
    int get height => _height;
}

abstract class StateBase {
    final GameRenderer _renderer;

    StateBase(this._renderer);

    void update(final double elapsed);
    void render(final CanvasRenderingContext2D ctx);

    GameRenderer get renderer => _renderer;
}

class StateMenu extends StateBase {
    StateMenu(final GameRenderer renderer) : super(renderer) {}

    void update(final double elapsed) {}

    void render(final CanvasRenderingContext2D ctx) {}
}

class StateGame extends StateBase {
    StateGame(final GameRenderer renderer) : super(renderer) {}

    void update(final double elapsed) {}

    void render(final CanvasRenderingContext2D ctx) {}
}
