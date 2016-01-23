import circle from './circle.jsx'
import code from './code.jsx'

let rand  = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default (canvas) => {
    const context = canvas.getContext('2d');
    const width = 800;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    let codeLayer = code({
        canvas,
        blockWidth: 25,
        blockHeight: 25,
    });

    let hero = circle({
        canvas,
        x: rand(0, width),
        y: rand(0, height),
        radius: 12,
        fillStyle: '#fff',
        xSpeed: 8,
        ySpeed: rand(1, 5),
        influence: 10,
    });

    let makeAnotherDev = () => {
        return circle({
            canvas,
            x: rand(0, width),
            y: rand(0, height),
            radius: 8,
            fillStyle: '#666',
            xSpeed: rand(-5, 5),
            ySpeed: rand(-5, 5),
        });
    };

    let devs = [
        makeAnotherDev(),
        makeAnotherDev(),
        makeAnotherDev(),
        hero,
    ];

    let clearCanvas = () => {
        context.clearRect(0, 0, width, height);
    };

    let loop = () => {
        // update actors
        devs.forEach(dev => {
            dev.updatePosition();
            codeLayer.touch(dev);
        });

        clearCanvas();

        // save canvas state

        // draw
        codeLayer.draw();

        devs.forEach(dev => {
            dev.draw();
        });

        // restore canvas state

        window.requestAnimationFrame(loop);
    };

    loop();
};
