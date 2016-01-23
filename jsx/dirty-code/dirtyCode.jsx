let rand  = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let circle = (canvas, x, y, radius, fillStyle) => {
    let _x = x;
    let _y = y;
    let _radius = radius;
    let _xSpeed = 0;
    let _ySpeed = 0;
    let context = canvas.getContext('2d');
    let {width: canvasWidth, height: canvasHeight} = canvas;

    let me = {
        draw: () => {
            context.beginPath();
            context.arc(_x, _y, _radius, 0, 2 * Math.PI, false);
            context.fillStyle = fillStyle;
            context.fill();
            context.lineWidth = 5;
            context.strokeStyle = '#000';
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
            }

            if (_y > canvasHeight) {
                let pastY = _y - canvasHeight;
                _y -= pastY;
                _ySpeed *= -1;
            }
        },
    };

    return me;
};

export default (canvas) => {
    const context = canvas.getContext('2d');
    const width = 800;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    let hero = circle(canvas, centerX, centerY, 25, '#fff');
    hero.setSpeed(rand(1, 3), rand(1, 3));

    let clearCanvas = () => {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, width, height);
    };

    let loop = () => {
        // update actors
        hero.updatePosition();

        clearCanvas();

        // save canvas state

        // draw
        hero.draw();

        // restore canvas state

        window.requestAnimationFrame(loop);
    };

    loop();
};
