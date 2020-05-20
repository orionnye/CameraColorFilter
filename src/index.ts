import Color from "./color";
import Vector from "./math";
import moveMouse from "./mouseControl.js"

//document access
let player = document.getElementById('player') as HTMLVideoElement;
let canvas = document.getElementById("display") as HTMLCanvasElement;
let red = document.getElementById('red') as HTMLInputElement;
let green = document.getElementById('green') as HTMLInputElement;
let blue = document.getElementById('blue') as HTMLInputElement;
let alpha = document.getElementById('alpha') as HTMLInputElement;
let colorDelta = document.getElementById('ColorDelta') as HTMLInputElement;
let fps = document.getElementById('fps') as HTMLInputElement;
let backgroundColor = document.getElementById('backgroundColor') as HTMLInputElement;

//world
navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then((stream) => {player.srcObject = stream});
let c = canvas.getContext('2d')!;
let results = c.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight / 2);
let searchColor = new Color(Number(red.value), Number(green.value), Number(blue.value), Number(alpha.value));
let dots : Vector[] = [];
let center = new Vector();

//world change
function update() {
    searchColor = new Color(Number(red.value), Number(green.value), Number(blue.value), Number(alpha.value));
    results = c.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight / 2);
    dots = [];
    for (let x = 0; x < results.width; x++) {
        for (let y = 0; y < results.height; y++) {
            let index = (y*results.width + x) * 4;
            let foundColor = new Color(
                results.data[index],
                results.data[index + 1],
                results.data[index + 2],
                results.data[index + 3]
            );
            let distance = foundColor.distanceTo(searchColor);
            if (distance <= Number(colorDelta.value)) {
                let dot = new Vector(x, y);
                dots.push(dot);
            }
        }
    }
    //center finder
    let cumulative = new Vector();
    dots.forEach(dot => {
        cumulative = cumulative.add(dot);
    })
    center = new Vector(cumulative.x / dots.length, cumulative.y / dots.length);
}
function render() {
    //clears canvas
    c.fillStyle = backgroundColor.value;
    c.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    let yOffset = canvas.clientHeight / 2;
    
    c.drawImage(player, 0, 0, player.videoWidth, player.videoHeight, 0, 0, player.width, player.height / 2);
    c.fillStyle = "black";
    c.font = "20px Arial";
    c.fillText(`${fps.value}fps`, 0, 30 + yOffset);
    dots.forEach(dot => {
        c.fillStyle = searchColor.toString();
        c.fillRect(dot.x, dot.y + yOffset, 1, 1);
    });
    //center
    // c.fillStyle = "red";
    // c.fillRect(center.x, center.y + yOffset, 30, 30);
}
function reload() {
    update();
    render();
    window.setTimeout(reload, 1000 / Number(fps.value));
}
reload();