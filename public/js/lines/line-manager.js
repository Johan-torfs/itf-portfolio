import { lines as linesObject } from "./lines.data";
import { setupLines, startBlinkingAnimation } from "./lines.js";
import { delay } from "../common.js";

const BREAKPOINTS = {
    'small': 768,
    'large': 1400,
}

var animationStopFunctions = [];
var resizeQueueTrigger = true;
var initializing = false;
var currentBreakpoint = 'small';
var running = true;

export function startLinesManager(elementIdList) {
    updateBreakpoint();
    setupAllLines(elementIdList);

    window.addEventListener('resize', () => {
        let prevBreakpoint = currentBreakpoint;
        updateBreakpoint();
        if (prevBreakpoint !== currentBreakpoint && resizeQueueTrigger) {
            setupAllLines(elementIdList);
        }
    });
}

function updateBreakpoint() {
    let screenWidth = window.innerWidth;
    Object.keys(BREAKPOINTS).forEach(breakpoint => {
        if (screenWidth >= BREAKPOINTS[breakpoint]) {
            currentBreakpoint = breakpoint;
        }
    });
}

function setupAllLines(elementIdList) {
    animationStopFunctions.forEach(stopFunction => {
        stopFunction();
    });
    animationStopFunctions = [];

    elementIdList.forEach(id => {
        const lines = linesObject[id][currentBreakpoint]
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