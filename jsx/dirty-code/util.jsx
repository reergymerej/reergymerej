export function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function range(arr) {
    return {
        min: Math.min.apply(this, arr),
        max: Math.max.apply(this, arr),
    };
};

export function distance(point1, point2) {
    let xDist = point1.x - point2.x;
    let yDist = point1.y - point2.y;

    return Math.sqrt(xDist * xDist + yDist * yDist);
};
