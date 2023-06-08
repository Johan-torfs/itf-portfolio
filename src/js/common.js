import { BREAKPOINTS } from './constants.js';

var currentBreakpoint = 'xsmall';

export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function cubicbezier(t , initial , p1, p2, final) {
    return (1 - t) * (1 - t) * (1 - t) * initial
        +
        3 * (1 - t) * (1 - t) * t * p1
        +
        3 * (1 - t) * t * t * p2
        +
        t * t * t * final;
}

export function updateBreakpoint() {
    let screenWidth = window.innerWidth;
    Object.keys(BREAKPOINTS).forEach(breakpoint => {
        if (screenWidth >= BREAKPOINTS[breakpoint]) {
            currentBreakpoint = breakpoint;
        }
    });
}

export function getCurrentBreakpoint() {
    return currentBreakpoint;
}

export function determineGestureType(deltaX, deltaY) {
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            return 'swipe-left';
        } else {
            return 'swipe-right';
        }
    } else {
        if (deltaY > 0) {
            return 'swipe-up';
        } else {
            return 'swipe-down';
        }
    }
}