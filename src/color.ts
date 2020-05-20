export default class Color {
    red : number;
    green : number;
    blue : number;
    alpha : number;
    constructor(r : number = 0, g : number = 0, b : number = 0, a : number = 255) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    distanceTo(that : Color) {
        //compare distance between colors
       let distance = new Color(
           Math.abs(this.red - that.red),
           Math.abs(this.green - that.green),
           Math.abs(this.blue - that.blue),
           Math.abs(this.alpha - that.alpha)
        )
        let cumulative = distance.red + distance.green + distance.blue + distance.alpha
        return cumulative
    }
    toString() {
        return(`rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`)
    }
    render(c : CanvasRenderingContext2D, x, y) {
        c.fillStyle = this.toString()
        c.fillRect(x, y, 1, 1)
    }
}