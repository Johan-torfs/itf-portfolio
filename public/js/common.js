import { BREAKPOINTS } from './constants.js';

var currentBreakpoint = 'small';

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