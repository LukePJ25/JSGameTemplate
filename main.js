/**
 * Simple canvas render/gameloop engine for use as a template in other projects.
 *
 * main.js
 * Luke Jones - Aug. 2025
 */

import "./common.js";

/**
 *  Config - Feel free to change these.
 */
let debug = false; // Draws extra debugging information to canvas. User can press "U" to enable debugging.
const DEBUG_KEY = "U"; // Key the user can press to enable/disable debug mode. Set to "" to disable this control.
const FRAME_RATE_TARGET = 60;
const DEBUG_MENU_TEXT_SIZE = 12;
const DEBUGGER_WIDTH = 300;

/**
 * These variables are part of the engine/interface controller. Ideally these should not be changed.
 */
// Engine Values
let frameInterval, frameNow, frameThen, elapsed;
let mainRunning = false;
let gameInitialised = false;
let graphics = document.getElementById("gfx");
// Controls/User Input
let left_down = false, right_down = false, down_down = false, up_down = false, click_down = false;
let mousepos = [0, 0];
// Stores whether the keys are held down for 1 frame.
let left_tapped = false, right_tapped = false, space_tapped = false;
// GameStates. Use to store different states of the game, e.g. in Menu, Paused, Loading, Animations, etc..
const GameStates = {PLAYING: 'PLAYING'};
let currentState = GameStates.PLAYING;
// DOM/Canvas Initialisation
const g_box = document.getElementById("gamebox");
const ctx = g_box.getContext("2d");
ctx.imageSmoothingEnabled = false;
let CANVAS_WIDTH = g_box.width;
let CANVAS_HEIGHT = g_box.height;

/**
 * Draw debug menu with given details
 * @param context canvas context to draw to
 * @param items key-value pairs of items to display with the relevant variables.
 * @example
 * drawDebugMenu(
 *      ctx,
 *      {
 *          "FPS": Math.trunc(1000 / elapsed),
 *          "Mouse Position": mousepos
 *      });
 */
function drawDebugMenu(context, items) {
    const keys = Object.keys(items); // turn object keys into array
    context.save();
    context.shadowBlur = 0;
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(0, 0, DEBUGGER_WIDTH, DEBUG_MENU_TEXT_SIZE * (1 + keys.length));
    context.fillStyle = '#fff';
    context.font = `${DEBUG_MENU_TEXT_SIZE}px Consolas`;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = items[key];
        context.fillText(`${key}: ${value}`, 0, DEBUG_MENU_TEXT_SIZE * (i + 1), 300);
    }
    context.restore();
}


/**
 * Draw elements to screen.
 *
 * This needs to be populated with drawing logic.
 */
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // If debugging enabled, draw debug menu with given items
    if (debug) {
        console.log("debugging...");
        drawDebugMenu(ctx, {
            "FPS": Math.trunc(1000 / elapsed),
            "Mouse Position": mousepos
        });
    }
}

/**
 * Update game logic by one tick. Called per-frame in main().
 */
function tick() {
    // Game Tick
}

/**
 * Request to start the game runtime handler.
 */
export function requestStart() {
    if (!mainRunning) {
        frameInterval = 1000 / FRAME_RATE_TARGET;
        frameThen = performance.now();
        frameNow = performance.now();
        elapsed = frameNow - frameThen;
        gameRuntimeHandler();
    }
    mainRunning = true;
}

/**
 * Game runtime handler, main function driving the gameloop.
 */
function gameRuntimeHandler() {
    frameNow = performance.now();
    elapsed = frameNow - frameThen;
    if (elapsed >= frameInterval) {
        frameThen = frameNow - (elapsed % frameInterval);
        main();
    }
    requestAnimationFrame(gameRuntimeHandler);
}

/**
 * Main game logic loop. This is the function called by gameloop. Calls to drawing and game logic events should all
 * be called from within this function.
 */
function main() {
    if (currentState === GameStates.PLAYING) { // If the current state is "PLAYING". These can be added to ensure
        tick();
        draw();
    }

    left_tapped = false;
    right_tapped = false;
    space_tapped = false;
}

/**
 * User keyboard input handler
 * @param input_event
 * @param press
 */
function handleKeys(input_event, press) {
    let inp_key;
    if (input_event != null) {
        inp_key = input_event.key;
        // In the event that the user is currently focused on a text field, prioritise that over game control.
        if (document.activeElement.tagName.toLowerCase() === "input") {
            return;
        }
        input_event.preventDefault();
        switch (inp_key) {
            case "ArrowLeft":
            case "A":
            case "a":
                left_down = press;
                left_tapped = press;
                break;
            case "ArrowRight":
            case "D":
            case "d":
                right_down = press;
                right_tapped = press;
                break;
            case "ArrowUp":
            case "W":
            case "w":
                up_down = press;
                break;
            case "ArrowDown":
            case "S":
            case "s":
                down_down = press;
                break;
            case " ":
                space_tapped = press;
                break;
            case DEBUG_KEY:
            case DEBUG_KEY.toLowerCase():
                if (press) {
                    debug = !debug;
                }
                break;
            default:
                break;
        }
    }
}

document.onkeydown = function (event) {
    handleKeys(event, true);
};
document.onkeyup = function (event) {
    handleKeys(event, false);
};

/**
 * Mouse event handling logic
 */
document.onmousemove = function (event) {
    let canvasBounds = g_box.getBoundingClientRect();
    mousepos = [Math.trunc(event.clientX - canvasBounds.left), Math.trunc(event.clientY - canvasBounds.top)];
};
document.onmousedown = function () {
    click_down = true;
};
document.onmouseup = function () {
    click_down = false;
};

/**
 * Update window details on resize
 */
window.onresize = function () {
    CANVAS_WIDTH = g_box.width;
    CANVAS_HEIGHT = g_box.height;
}

window.requestStart = requestStart;