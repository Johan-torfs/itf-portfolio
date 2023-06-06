import { delay } from "../common";

const INTERVALS_LINE = 100;
const INTERVALS_CIRCLE = 5;

export function setupLines(element, lines) {
    lines.forEach((line, index) => {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", element.offsetWidth);

        line.defs ? svg.innerHTML = line.defs : svg.innerHTML = "";

        let svgScale = (line.scale || 1);

        let lineSegments = line.line;

        let length = lineSegments.length;

        if (length < 2) return;

        let i = 1;
        let dAttribute = "M" + lineSegments[0][0] * svgScale + " " + lineSegments[0][1] * svgScale;
        while (i < length) {
            dAttribute += " L" + lineSegments[i][0] * svgScale + " " + lineSegments[i][1] * svgScale;
            i++;
        }

        const lineElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
        lineElement.setAttribute("d", dAttribute);
        lineElement.setAttribute("stroke", line.gradient ? "url(#gradient-line)" : line.color);
        lineElement.setAttribute("fill", "none");
        lineElement.setAttribute("stroke-width", line.stroke_width);

        lineElement.style.strokeDasharray = lineElement.getTotalLength();
        lineElement.style.strokeDashoffset = lineElement.getTotalLength();
        svg.appendChild(lineElement);

        const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleElement.setAttribute("cx", lineSegments[length - 1][0] * svgScale);
        circleElement.setAttribute("cy", lineSegments[length - 1][1] * svgScale);
        circleElement.setAttribute("r", line.radius * svgScale);
        circleElement.setAttribute("fill", line.gradient ? "url(#gradient-circle)" : line.color);
        
        circleElement.style.opacity = 0;
        svg.appendChild(circleElement);

        svg.setAttribute("id", element.id + "_line_" + index);
        svg.style.position = "absolute";
        svg.style.left = line.start[0] * svgScale + "px";
        svg.style.top = line.start[1] * svgScale + "px";

        element.appendChild(svg);
        drawLine(lineElement, line.speed, line.delay || 0).then(() => {
            drawCircle(circleElement, 10);
        });
    });
}

function drawLine(lineElement, time, delayTime) {
    var promise = new Promise(async (resolve, reject) => {
        await delay(delayTime);

        for (let index = 0; index < INTERVALS_LINE; index++) {
            await delay(time/INTERVALS_LINE);
            lineElement.style.strokeDashoffset -= lineElement.getTotalLength() / INTERVALS_LINE * (0.5 + index/INTERVALS_LINE);
        }
        lineElement.style.strokeDashoffset = 0;
        resolve();
    });

    return promise;
}

async function drawCircle(circleElement, time) {
    for (let index = 0; index < INTERVALS_CIRCLE; index++) {
        await delay(time/INTERVALS_CIRCLE);
        circleElement.style.opacity = 1 / INTERVALS_CIRCLE * index;
    }
    circleElement.style.opacity = 1;
}

export function blinkLine(element, index) {

}