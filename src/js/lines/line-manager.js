import { lines as linesObject } from "./lines.data";
import { setupLines, startBlinkingAnimation } from "./lines.js";
import { getCurrentBreakpoint } from "../common.js";

const LINE_ELEMENTS = ['lines-left', 'lines-right']

var animationStopFunctions = [];
var resizeQueueTrigger = true;
var initializing = false;
var prevBreakpoint = "xsmall";

export function startLinesManager() {
    prevBreakpoint = getCurrentBreakpoint();
    setupAllLines(LINE_ELEMENTS);
}

export function onResize() {
    if (prevBreakpoint != getCurrentBreakpoint() && resizeQueueTrigger) {
        setupAllLines(LINE_ELEMENTS);
        prevBreakpoint = getCurrentBreakpoint();
    }
}

function setupAllLines(elementIdList) {
    animationStopFunctions.forEach(stopFunction => {
        stopFunction();
    });
    animationStopFunctions = [];

    elementIdList.forEach(id => {
        const lines = linesObject[id][getCurrentBreakpoint()]
        setupLines(
            document.querySelector('#' + id), 
            lines
        ).then(() => {
            animationStopFunctions.push(startBlinkingAnimation(document.querySelector('#' + id)));
            initializing = false;
        },
        () => {
            console.log('error setting up lines right');
            initializing = false;
        });
    });
}