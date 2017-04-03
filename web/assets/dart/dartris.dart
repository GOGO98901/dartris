library dartris;

import 'dart:html';
import 'dart:async';

void main() {
   final CanvasElement canvas = querySelector('#tetris');
   canvas.focus();
   scheduleMicrotask(new GameHost(canvas, canvas.getContext('2d')).run);
}

class GameHost {
    final CanvasElement _canvas;
    CanvasElement get canvas => _canvas;
    final CanvasRenderingContext2D _context;
    CanvasRenderingContext2D get ctx => _context;

    int _lastTimestamp = 0;

    GameHost(this._canvas, this._context) {
        canvas.focus();
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

   void _update(final double elapsed) {}

   void _render(final CanvasRenderingContext2D ctxx) {}
}
