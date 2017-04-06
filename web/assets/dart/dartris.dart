library dartris;

import 'dart:html';
import 'dart:async';
import 'dart:math';

import 'package:logging/logging.dart';
import 'package:color/color.dart';

part 'game.dart';
part 'grid.dart';
part 'shape.dart';
part 'util.dart';

final Logger log = new Logger("Dartris");

void main() {
    Logger.root.level = Level.ALL;
	Logger.root.onRecord.listen((LogRecord rec) {
		print('[${rec.time}][${rec.loggerName}] ${rec.level.name}: ${rec.message}');
	});

    final CanvasElement canvas = querySelector('#tetris');
    if (canvas != null) {
        canvas.focus();
        scheduleMicrotask(new GameHost(canvas, canvas.getContext('2d')).run);
    }
}

class GameHost {
    final CanvasElement _canvas;
    CanvasElement get canvas => _canvas;
    final CanvasRenderingContext2D _context;
    CanvasRenderingContext2D get ctx => _context;

    int _lastTimestamp = 0;

    GameRenderer _renderer;

    GameHost(this._canvas, this._context) {
        canvas.focus();
        _renderer = new GameRenderer(width, height);
    }

    void run() {
        window.requestAnimationFrame(_gameLoop);
    }

    void _gameLoop(double _) {
        _update(_getElapsed());
        _render(ctx);
        window.requestAnimationFrame(_gameLoop);
    }

    double _getElapsed() {
        final int time = new DateTime.now().millisecondsSinceEpoch;
        double elapsed = 0.0;
        if (_lastTimestamp != 0) elapsed = (time - _lastTimestamp) / 1000.0;
        _lastTimestamp = time;
        return elapsed;
    }

    void _update(final double elapsed) => _renderer.update(elapsed);

    void _render(final CanvasRenderingContext2D ctx) => _renderer.render(ctx);

    int get width => canvas.width;
    int get height => canvas.height;
}
