import circle from './circle.jsx'
import code from './code.jsx'
import { rand, range, distance } from './util.jsx'
import $ from '../../bower_components/jquery/dist/jquery.min'

export default (canvas) => {
    const context = canvas.getContext('2d');
    const { width, height } = canvas;
    // const centerX = width / 2;
    // const centerY = height / 2;

    let codeLayer = code({
        canvas,
        blockWidth: 25,
        blockHeight: 25,
    });



    let hero = circle({
        canvas,
        // x: 110,
        // y: 110,
        x: rand(0, width),
        y: rand(0, height),
        radius: 20,
        fillStyle: '#fff',
        // xSpeed: 3,
        // ySpeed: rand(1, 5),
        influence: 100,
        isHero: true,
    });

    $('canvas').on('click', (event) => {
        let { offsetX: x, offsetY: y} = event;
        hero.setPosition(x, y);
    });

    let makeAnotherDev = () => {
        return circle({
            canvas,
            x: rand(0, width),
            y: rand(0, height),
            // x: 100,
            // y: 100,
            radius: 25,
            xSpeed: rand(-5, 5),
            ySpeed: rand(-5, 5),
            influence: rand(-12, 0),
            // ySpeed: 0,
        });
    };

    let juniorDevs = [
        makeAnotherDev(),
        // makeAnotherDev(),
        // makeAnotherDev(),
        // makeAnotherDev(),
        // makeAnotherDev(),
    ];

    setInterval(() => {
        devs.unshift(makeAnotherDev());
    }, 20000);

    let devs = juniorDevs.concat(hero);

    let clearCanvas = () => {
        context.clearRect(0, 0, width, height);
    };

    let touchOtherDevs = (thisDev) => {
        let influence = thisDev.getNormalizedInfluence();

        let otherDevs = devs.filter(dev => {
            let radius = dev.getRadius();
            if (dev !== thisDev && thisDev.canInfluence(dev)) {
                let distance = thisDev.getDistanceFrom(dev.getPosition());
                return distance <= radius;
            }
        });

        otherDevs.forEach(otherDev => {
            otherDev.influence(influence);
        });
    };

    let loop = () => {
        // update actors
        devs.forEach(dev => {
            dev.updatePosition();
            codeLayer.touch(dev);
            touchOtherDevs(dev);
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
