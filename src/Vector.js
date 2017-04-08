/**
 * Created by Krzysiek on 2017-03-18.
 */
export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    mod(size) {
        return new Vector((this.x + size.x) % size.x, (this.y + size.y) % size.y);
    }

    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    static random(size) {
        return new Vector(Math.floor(Math.random() * size.x), Math.floor(Math.random() * size.y))
    }

    static rotateLeft(vector) {
        return new Vector(vector.y, -vector.x)
    }

    static rotateRight(vector) {
        return new Vector(-vector.y, vector.x)
    }

}