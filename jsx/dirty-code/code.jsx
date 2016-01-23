let code = (options) => {
    let { canvas, blockWidth, blockHeight } = options;

    let context = canvas.getContext('2d');
    let {width, height} = canvas;
    let columns = Math.ceil(width / blockWidth);
    let rows = Math.ceil(height / blockHeight);

    // divide area into a bunch of squares
    let blocks = [];

    let getColorFromValue = (value) => {
        value = Math.max(value, 0);
        return `rgb(${value}, ${value}, ${value})`;
    };

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            blocks.push({
                x: column * blockWidth,
                y: row * blockHeight,
                value: 256,
                color: '#fff',
            });
        }
    }

    let getBlock = (x, y) => {
        let column = Math.floor(x / blockWidth);
        let row = Math.floor(y / blockHeight);
        return blocks[row * columns + column];
    };

    let me = {
        draw: () => {
            blocks.forEach(block => {
                context.fillStyle = block.color;
                context.fillRect(block.x, block.y, blockWidth, blockHeight);
            });
        },

        touch: (dev) => {
            let {x, y} = dev.getPosition();
            let block = getBlock(x, y);
            if (block) {
                block.value += dev.getInfluence();
                if (block.value < 0) {
                    block.value = 0;
                } else if (block.value > 256) {
                    block.value = 256;
                }
                block.color = getColorFromValue(block.value);
            }
        },
    };

    return me;
};

export default code;
