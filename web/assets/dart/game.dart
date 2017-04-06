part of dartris;

class GameRenderer {

    final int _width, _height;

    List<StateBase> _states;
    StateBase _currentState;

    ShapeManager _shapeManager;

    GameRenderer(this._width, this._height) {
        _shapeManager = new ShapeManager();

        _states = new List<StateBase>();
        _states.add(new StateMenu(this));
        _states.add(new StateGame(this));

        setState(0);
        setState(1); // TEMP
    }

    void update(final double elapsed) => _currentState.update(elapsed);

    void render(final CanvasRenderingContext2D ctx) {
        ctx.clearRect(0, 0, width, height);
        _currentState.render(ctx);
    }

    void setState(int id) {
        if (_states != null && id >= 0) {
            if (_states.length > 0 && id < _states.length) {
                if (_currentState != null) _currentState.onStateLeave();
                _currentState = _states[id];
                _currentState.onStateEnter();
                log.info('Changed state to $_currentState');
            }
        }
    }

    ShapeManager get shapeManager => _shapeManager;

    int get width => _width;
    int get height => _height;
}

abstract class StateBase {
    final GameRenderer _renderer;

    List<StreamSubscription> _listeners;

    StateBase(this._renderer) {
        _listeners = new List<StreamSubscription>();
    }

    void update(final double elapsed);
    void render(final CanvasRenderingContext2D ctx);

    void onStateLeave() {
        listeners.forEach((l) => l.cancel());
        listeners.clear();
    }

    void onStateEnter() {}

    GameRenderer get renderer => _renderer;
    List<StreamSubscription> get listeners => _listeners;
}

class StateMenu extends StateBase {
    StateMenu(final GameRenderer renderer) : super(renderer) {}

    void onStateEnter() {
        super.onStateEnter();
        listeners.add(window.onKeyDown.listen((e) {
            if (e.keyCode == KeyCode.SPACE) {
                renderer.setState(1);
            }
        }));
    }

    void update(final double elapsed) {}

    void render(final CanvasRenderingContext2D ctx) {}
}

class StateGame extends StateBase {
    Grid _grid;

    int _gW, _gH;

    bool _running = false;

    double _time = 0.0;

    StateGame(final GameRenderer renderer) : super(renderer) {
        _grid = new Grid();
        _gW = renderer.width ~/ Grid.width;
        _gH = renderer.height ~/ Grid.height;
    }

    void update(final double elapsed) {
        if (running) {
            _time += elapsed;
            if (time > 1) {
                _time = 0.0;
                MoveStage result = grid.moveCurrentShape(0, 1);
                log.info(result);
                if (result == MoveStage.SPAWN) {
                    grid.checkForRow();
                    newShape();
                }
            }
        }
    }

    void render(final CanvasRenderingContext2D ctx) {
        ctx.setFillColorRgb(0, 0, 0);
        for (int x = 0; x < Grid.width; x ++) {
            for (int y = 0; y < Grid.height; y ++) {
                int index = grid.array[x][y];
                Rectangle drawBounds = rectFromCords(x, y);
                if (index == null) {
                    ctx..setFillColorRgb(220, 220, 220)
                    ..fillRect(drawBounds.left, drawBounds.top, drawBounds.width, drawBounds.height);
                } else {
                    Tile tile = Tile.fromIndex(index);
                    RgbColor color = tile.color.toRgbColor();
                    ctx..setFillColorRgb(color.r, color.g, color.b)
                    ..fillRect(drawBounds.left, drawBounds.top, drawBounds.width, drawBounds.height);
                }
            }
        }
    }

    void newShape() {
        MoveStage result = grid.newShape(renderer.shapeManager);
        if (result == MoveStage.FAILED) {
            running = false;
            log.info("GAME ENDED");
        }
    }

    Rectangle rectFromCords(int x, int y) {
        int offset = 2;
        return new  Rectangle(offset + (x * _gW), offset + (y * _gH), _gW - (offset * 2), _gH - (offset * 2));
    }

    void onStateEnter() {
        super.onStateEnter();
        listeners.add(window.onKeyDown.listen((e) {
            MoveStage result = MoveStage.FAILED;
            if (e.keyCode == KeyCode.A || e.keyCode == KeyCode.LEFT) result = grid.moveCurrentShape(-1, 0);
            if (e.keyCode == KeyCode.D || e.keyCode == KeyCode.RIGHT) result = grid.moveCurrentShape(1, 0);
            if (e.keyCode == KeyCode.S || e.keyCode == KeyCode.DOWN) result = grid.moveCurrentShape(0, 1);
            if (e.keyCode == KeyCode.W || e.keyCode == KeyCode.UP) result = grid.rotateShape();

            if (result != MoveStage.FAILED) {
                if (result == MoveStage.MOVED) {
                    if (time < 0.5) _time = 0.8;
                    else _time += 0.25;
                }
            }
        }));
        running = true;
        newShape();
    }

    bool get running => _running;
    void set running(bool var1) {
        this._running = var1;
    }

    double get time => _time;

    Grid get grid => _grid;
}
