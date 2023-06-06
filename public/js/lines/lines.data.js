const LINE_RADIUS = 6;
const LINE_WIDTH = 2;
const LINE_WIDTH_LG = 3;
const LINE_COLOR = "#00E5FF";
const LINE_SCALE = 1.5;

export const lines_right = [
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 0], // start position of svg element (x, y) in percentage of parent element
        "line": [[0, 60], [50, 10], [150, 10]] // points of line segments (x, y) in pixels
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 0],
        "line": [[0, 60], [10, 50], [100, 50], [120, 30], [180, 30], [190, 20]]
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
        "line": [[0, 60], [60, 60], [80, 40], [110, 40]]
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
        "line": [[0, 60], [20, 60], [60, 20], [200, 20]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 170],
        "line": [[0, 60], [30, 60], [80, 10], [220, 10]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 190],
        "line": [[0, 80], [50, 80], [110, 20], [160, 20]]
    },
    {
        "stroke_width": LINE_WIDTH_LG,
        "start": [0, 280],
        "line": [[0, 10], [200, 10]]
    },
    {
        "stroke_width": LINE_WIDTH,
        "start": [0, 230],
        "line": [[0, 60], [70, 60], [120, 10], [230, 10]]
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
        color: LINE_COLOR, 
        scale: LINE_SCALE
    }
})