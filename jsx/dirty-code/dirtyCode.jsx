import circle from './circle.jsx'

let rand  = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default (canvas) => {
    const context = canvas.getContext('2d');
    const width = 800;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    let hero = circle({
        canvas,
        x: centerX,
        y: centerY,
        radius: 25,
        fillStyle: '#fff',
        xSpeed: rand(2, 3),
        ySpeed: rand(2, 3),
    });

    let devs = [
        hero,
        // circle({
        //     canvas,
        //     x: centerX,
        //     y: centerY,
        //     radius: 20,
        //     fillStyle: '#000',
        //     xSpeed: rand(2, 3),
        //     ySpeed: rand(2, 3),
        // })
    ];

    let clearCanvas = () => {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, width, height);
    };

    let loop = () => {
        // update actors
        devs.forEach(dev => {
            dev.updatePosition();
        });

        clearCanvas();

        // save canvas state

        // draw
        devs.forEach(dev => {
            dev.draw();
        });

        // restore canvas state

        window.requestAnimationFrame(loop);
    };

    loop();
};
