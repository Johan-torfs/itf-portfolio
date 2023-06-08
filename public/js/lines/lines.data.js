const LINE_RADIUS = 6;
const LINE_WIDTH = 2;
const LINE_WIDTH_LG = 3;
const LINE_WIDTH_XL = 5;
const GRADIENT_COLOR_DARK = "rgb(0,150,255)";
const GRADIENT_COLOR_LIGHT = "rgb(0,229,255)";
const GRADIENT_COLOR_LIGHT_TRANSPARENT = "rgba(0,229,255,0)";
const LINE_SCALE = 1.5;
const DEFS = `
    <defs>
        <linearGradient id="gradient-line" x1="0%" y1="100%" x2="0%" y2="0%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color=${GRADIENT_COLOR_LIGHT} />
            <stop offset="50%" stop-color=${GRADIENT_COLOR_DARK} />
            <stop offset="100%" stop-color=${GRADIENT_COLOR_LIGHT} />
        </linearGradient>
        <linearGradient id="gradient-circle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color=${GRADIENT_COLOR_LIGHT} />
            <stop offset="100%" stop-color=${GRADIENT_COLOR_DARK} />
        </linearGradient>
        <radialGradient id="gradient-blink">
            <stop offset="0%" stop-color=${GRADIENT_COLOR_LIGHT} />
            <stop offset="100%" stop-color=${GRADIENT_COLOR_LIGHT_TRANSPARENT} />
        </radialGradient>
    </defs>
` 
const LINE_SPEED = 1000;

const lines_right = [
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 0], // start position of svg element (x, y) in percentage of parent element
        "line": [[0, 60], [50, 10], [150, 10]], // points of line segments (x, y) in pixels
        "delay": 500 // delay in ms before drawing line
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 0],
        "line": [[0, 60], [10, 50], [100, 50], [120, 30], [180, 30], [190, 20]],
        "delay": 400
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [150, 60], [200, 10]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [20, 60], [70, 10], [150, 10]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [60, 60], [80, 40], [110, 40]],
        "delay": 200
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [20, 60], [50, 30], [20, 30],[10, 20]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 120],
        "line": [[0, 60], [35, 25], [150, 25]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 140],
        "line": [[0, 60], [20, 60], [60, 20], [200, 20]],
        "delay": 300
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 170],
        "line": [[0, 60], [30, 60], [80, 10], [220, 10]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 190],
        "line": [[0, 80], [50, 80], [110, 20], [160, 20]],
        "delay": 800
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 280],
        "line": [[0, 10], [200, 10]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 230],
        "line": [[0, 60], [70, 60], [120, 10], [230, 10]],
        "delay": 800
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 190],
        "line": [[0, 100], [70, 100], [120, 50], [180, 50], [210, 20], [250, 20]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 230],
        "line": [[0, 60], [120, 60], [150, 30], [280, 30]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 280],
        "line": [[0, 10], [170, 10], [200, 40], [260, 40]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 280],
        "line": [[0, 10], [70, 80], [180, 80]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 280],
        "line": [[0, 10], [30, 40], [120, 40], [140, 60]]
    },
].map(line => {
    return {
        ...line, 
        radius: LINE_RADIUS, 
        defs: DEFS,
        gradient: true,
        color: GRADIENT_COLOR_LIGHT, 
        scale: LINE_SCALE,
        speed: LINE_SPEED
    }
})

const lines_left = [
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 0], // start position of svg element (x, y) in percentage of parent element
        "line": [[0, 60], [50, 10], [150, 10]], // points of line segments (x, y) in pixels
        "delay": 500 // delay in ms before drawing line
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 0],
        "line": [[0, 60], [10, 50], [100, 50], [120, 30], [180, 30], [190, 20]],
        "delay": 400
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [150, 60], [200, 10]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [20, 60], [70, 10], [150, 10]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [60, 60], [80, 40], [110, 40]],
        "delay": 200
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 60],
        "line": [[0, 60], [20, 60], [50, 30], [20, 30],[10, 20]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 120],
        "line": [[0, 60], [35, 25], [150, 25]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 140],
        "line": [[0, 60], [20, 60], [60, 20], [200, 20]],
        "delay": 300
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 170],
        "line": [[0, 60], [30, 60], [80, 10], [220, 10]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 190],
        "line": [[0, 80], [50, 80], [110, 20], [160, 20]],
        "delay": 800
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 280],
        "line": [[0, 10], [200, 10]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 230],
        "line": [[0, 60], [70, 60], [120, 10], [230, 10]],
        "delay": 800
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 190],
        "line": [[0, 100], [70, 100], [120, 50], [180, 50], [210, 20], [250, 20]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 230],
        "line": [[0, 60], [120, 60], [150, 30], [280, 30]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 280],
        "line": [[0, 10], [170, 10], [200, 40], [260, 40]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 280],
        "line": [[0, 10], [70, 80], [180, 80]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 280],
        "line": [[0, 10], [30, 40], [120, 40], [140, 60]]
    },
].map(line => {
    return {
        ...line, 
        radius: LINE_RADIUS, 
        defs: DEFS,
        gradient: true,
        color: GRADIENT_COLOR_LIGHT, 
        scale: LINE_SCALE,
        speed: LINE_SPEED
    }
})

const lines_right_xsmall = [
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 10],
        "line": [[0, 10], [160, 10]],
        "delay": 300
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 50],
        "line": [[0, 30], [20, 10], [200, 10]]
    },
    {
        "stroke_width": LINE_WIDTH_XL,
        "start": [0, 80],
        "line": [[0, 10], [150, 10]],
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 80],
        "line": [[0, 10], [110, 10], [160, 60], [180, 60]],
        "delay": 800
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 130],
        "line": [[0, 10], [80, 10]],
    },
].map(line => {
    return {
        ...line, 
        radius: LINE_RADIUS, 
        defs: DEFS,
        gradient: true,
        color: GRADIENT_COLOR_LIGHT, 
        scale: LINE_SCALE,
        speed: LINE_SPEED
    }
})

const lines_left_xsmall = [
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 100],
        "line": [[0, 70], [120, 70], [180, 10]],
        "delay": 300
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 100],
        "line": [[0, 70], [20, 70], [50, 40], [100, 40]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 90],
        "line": [[0, 10], [140, 10]],
    },
    {
        "stroke_width": LINE_WIDTH_XL,
        "start": [0, 30],
        "line": [[0, 50], [40, 50], [70, 20], [140, 20], [150, 10]],
        "delay": 800
    },
    {
        "stroke_width": LINE_WIDTH_XL,
        "start": [0, 10],
        "line": [[0, 10], [80, 10]],
    },
].map(line => {
    return {
        ...line, 
        radius: LINE_RADIUS, 
        defs: DEFS,
        gradient: true,
        color: GRADIENT_COLOR_LIGHT, 
        scale: LINE_SCALE,
        speed: LINE_SPEED
    }
})

const lines_left_small = lines_left_xsmall;
const lines_right_small = lines_right_xsmall;

export const lines = {
    "lines-right": {
        "xsmall": lines_right_xsmall,
        "small": lines_right_small,
        "large": lines_right
    },
    "lines-left": {
        "xsmall": lines_left_xsmall,
        "small": lines_left_small,
        "large": lines_left
    }
}