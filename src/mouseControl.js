var robot = require("robotjs");

export function moveMouse(x, y) {
    robot.setMouseDelay(2);
    robot.moveMouse(x, y);
} 