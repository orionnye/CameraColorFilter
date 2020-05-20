export default class Vector {
    x: number;
    y: number;
    constructor(x : number = 0, y : number = 0) {
        this.x = x;
        this.y = y;
    }
    subtract(that: Vector) {
        return new Vector(this.x - that.x, this.y - that.y);
    }
    add(that: Vector) {
        return new Vector(this.x + that.x, this.y + that.y);
    }
    multiply(that: number | Vector) {
        if (typeof that === "number") {
            return new Vector(this.x * that, this.y * that);
        }
        return new Vector(this.x * that.x, this.y * that.y);
    }
    get normalize() {
        //simplifies the distances to a simple fraction
        let normal = new Vector(this.x / this.length, this.y / this.length);
        return normal;
    }
    get length() {
        let dist = Math.sqrt(this.x**2 + this.y**2);
        return dist;
    }
}

export class Line {
    a: Vector;
    b: Vector;
    constructor(a: Vector = new Vector(), b: Vector = new Vector) {
        this.a = a;
        this.b = b;
    }
}

export class Grid {
    size : Vector;
    pos : Vector;
    dim : Vector;
    constructor(pos : Vector = new Vector(0, 0), size : Vector = new Vector(1, 1), dimensions : Vector = new Vector(10, 10)) {
        this.pos = pos;
        this.size = size;
        this.dim = dimensions;
    }
    render(ctx : CanvasRenderingContext2D, color : string = "black") {
        let {size, pos, dim} = this
        ctx.strokeStyle = color
        ctx.fillStyle = color
        for (let y = 0; y < size.y; y++) {
            for (let x = 0; x < size.x; x++) {
                let cellSize = new Vector(dim.x / size.x, dim.y / size.y)
                let cellPos = new Vector(pos.x + x*cellSize.x, pos.y + y*cellSize.y)
                ctx.strokeRect(cellPos.x, cellPos.y, cellSize.x, cellSize.y)
                ctx.font = (cellSize.y / 2).toString() + "px times new roman"
                //x-axis labels
                ctx.fillText((cellPos.x - pos.x).toString(), cellPos.x, pos.y)
                //y-axis labels
                ctx.fillText((cellPos.y - pos.y).toString(), pos.x - cellSize.x / 2, cellPos.y)
            }
        }

    }
}