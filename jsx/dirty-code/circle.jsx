import { distance } from './util.jsx'

let circle = (options) => {
    let {
        canvas,
        x, y,
        radius,
        fillStyle,
        xSpeed = 0,
        ySpeed = 0,
        influence = -3,
        isHero = false,
    } = options;

    let _x = x;
    let _y = y;
    let _radius = radius;
    let _xSpeed = xSpeed;
    let _ySpeed = ySpeed;
    let context = canvas.getContext('2d');
    let {width: canvasWidth, height: canvasHeight} = canvas;

    let getFillStyle = () => {

        if (!fillStyle) {
            let value = (influence * 10) + 128
            if (value < 0) {
                value = 0;
            } else if (value > 256) {
                value = 256;
            }

            return `rgb(${value}, ${value}, ${value})`;
        } else {
            return fillStyle;
        }
    };

    let me = {
        draw: () => {
            context.beginPath();
            context.arc(_x, _y, _radius, 0, 2 * Math.PI, false);
            context.fillStyle = getFillStyle();
            context.fill();
            // context.lineWidth = 5;
            // context.strokeStyle = fillStyle;
            context.stroke();
        },

        move: (x, y) => {
            _x += x;
            _y += y;
        },

        setPosition: (x, y) => {
            _x = x;
            _y = y;
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

        getNormalizedInfluence: () => {
            let influence = me.getInfluence();
            return (influence < 0
                            ? -1
                            : 1) / 2;
        },

        influence: (change) => {
            influence += change;
            if (influence > 12) {
                influence = 12;
            } else if (influence < -12) {
                influence = -12;
            }
            console.log('influence:', influence);
        },

        getRadius: () => {
            return _radius;
        },

        getDistanceFrom: (point) => {
            return distance(point, me.getPosition());
        },

        canInfluence: (otherDev) => {
            return me.isHero() || !otherDev.isHero();
        },

        isHero: () => {
            return !!isHero;
        },
    };

    return me;
};

export default circle;
