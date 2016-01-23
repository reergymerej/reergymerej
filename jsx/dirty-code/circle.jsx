let circle = (options) => {
    let {
        canvas,
        x, y,
        radius,
        fillStyle,
        xSpeed = 0,
        ySpeed = 0,
        influence = -3,
    } = options;

    let _x = x;
    let _y = y;
    let _radius = radius;
    let _xSpeed = xSpeed;
    let _ySpeed = ySpeed;
    let context = canvas.getContext('2d');
    let {width: canvasWidth, height: canvasHeight} = canvas;

    let me = {
        draw: () => {
            context.beginPath();
            context.arc(_x, _y, _radius, 0, 2 * Math.PI, false);
            context.fillStyle = fillStyle;
            context.fill();
            // context.lineWidth = 5;
            // context.strokeStyle = fillStyle;
            context.stroke();
        },

        move: (x, y) => {
            _x += x;
            _y += y;
        },

        setSpeed: (x, y) => {
            // TODO: use vecotrs instead
            _xSpeed = isNaN(x) ? _xSpeed : x;
            _ySpeed = isNaN(y) ? _ySpeed : y;
        },

        updatePosition: () => {
            me.move(_xSpeed, _ySpeed);
            me.handleBounce();
        },

        handleBounce: () => {
            if (_x > canvasWidth) {
                let pastX = _x - canvasWidth;
                _x -= pastX;
                _xSpeed *= -1;
            } else if (_x < 0) {
                _x = -_x;
                _xSpeed *= -1;
            }

            if (_y > canvasHeight) {
                let pastY = _y - canvasHeight;
                _y -= pastY;
                _ySpeed *= -1;
            } else if (_y < 0) {
                _y = -_y;
                _ySpeed *= -1;
            }
        },

        getPosition: () => {
            return {
                x: _x,
                y: _y,
            };
        },

        getInfluence: () => {
            return influence;
        },

        influence: (change) => {
            influence += change;
        },
    };

    return me;
};

export default circle;
