import { delay } from "../common";

const INTERVALS_LINE = 100;
const INTERVALS_CIRCLE = 5;

export function setupLines(element, lines) {
    var promise = new Promise(async (resolve, reject) => {
        if (!element) {
            reject();
            return;
        }

        let lineSegmentCount = 0;
        let lineSegmentCompleted = 0;

        lines.forEach((line, index) => {
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", element.offsetWidth);

            line.defs ? svg.innerHTML = line.defs : svg.innerHTML = "";

            let svgScale = (line.scale || 1);

            let lineSegments = line.line;

            let length = lineSegments.length;

            if (length < 2) {
                reject();
                return;
            }

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
            lineSegmentCount++;

            drawLine(lineElement, line.speed, line.delay || 0).then(() => {
                drawCircle(circleElement, 10).then(() => {
                    lineSegmentCompleted++;
                });
            });
        });

        let i = 0
        while (lineSegmentCompleted < lineSegmentCount) {
            await delay(100);

            if (i > 100) {
                reject();
                return;
            }

            i++;
        }
        
        resolve();
    });

    return promise;
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

function drawCircle(circleElement, time) {
    var promise = new Promise(async (resolve, reject) => {
        for (let index = 0; index < INTERVALS_CIRCLE; index++) {
            await delay(time/INTERVALS_CIRCLE);
            circleElement.style.opacity = 1 / INTERVALS_CIRCLE * index;
        }
        circleElement.style.opacity = 1;
        resolve();
    });

    return promise;
}

export async function startBlinkingAnimation(element) {
    let running = true;

    while (running) {
        await delay(Math.random() * 1500 + 1000);
        blinkLine(element, Math.floor(Math.random() * element.querySelectorAll("svg").length));
    } 

    return () => {
        running = false;
    }
}

export function blinkLine(element, index) {
    var promise = new Promise(async (resolve, reject) => {
        if (!element) {
            reject();
            return;
        }

        let svg = document.getElementById(element.id + "_line_" + index);
        if (!svg) {
            reject();
            return;
        }

        let circleElement = svg.getElementsByTagName("circle")[0];

        let pathElement = svg.getElementsByTagName("path")[0];
        let startX = pathElement.getAttribute("d").split("M")[1].split(" ")[0];
        let startY = pathElement.getAttribute("d").split("M")[1].split(" ")[1];
        let stroke_width = pathElement.getAttribute("stroke-width");

        let blinkElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        blinkElement.setAttribute("cx", startX);
        blinkElement.setAttribute("cy", startY);
        blinkElement.setAttribute("r", stroke_width * 2);
        blinkElement.setAttribute("fill", "url(#gradient-blink)");
        svg.appendChild(blinkElement);

        moveBlinkElement(blinkElement, pathElement).then(() => {
            blinkCircle(blinkElement, circleElement).then(() => {
                resolve();
            }).finally(() => {
                svg.removeChild(blinkElement);
            });
        });

        resolve();
    });

    return promise;
}

function moveBlinkElement(blinkElement, pathElement) {
    var promise = new Promise(async (resolve, reject) => {
        let time = 200;
        let startCoordinates = pathElement.getAttribute("d").split("M")[1];
        let nextCoordinatesList = pathElement.getAttribute("d").split("L");

        let startX = parseFloat(startCoordinates.split(" ")[0]);
        let startY = parseFloat(startCoordinates.split(" ")[1]);
        for (let index = 1; index < nextCoordinatesList.length; index++) {
            let completed = false;
            let x = parseFloat(nextCoordinatesList[index].split(" ")[0]);
            let y = parseFloat(nextCoordinatesList[index].split(" ")[1]);

            lerpBlinkElement(blinkElement, startX, startY, x, y, time).then(() => {
                completed = true;
            });


            let i = 0
            while (!completed) {
                await delay(1);

                if (i > time + 100) {
                    reject();
                    return;
                }

                i++;
            }

            startX = x;
            startY = y;
        }

        resolve();
    });

    return promise;
}

function lerpBlinkElement(blinkElement, startX, startY, x, y, time) {
    var promise = new Promise(async (resolve, reject) => {
        let i = 0;
        while (i < 20) {
            await delay(time/20);
            blinkElement.setAttribute("cx", startX + (x - startX) / 20 * i);
            blinkElement.setAttribute("cy", startY + (y - startY) / 20 * i);
            i++;
        }

        blinkElement.setAttribute("cx", x);
        blinkElement.setAttribute("cy", y);

        resolve();
    });

    return promise;
}

function blinkCircle(blinkElement, circleElement) {
    var promise = new Promise(async (resolve, reject) => {
        let time = 200;
        let startR = parseFloat(blinkElement.getAttribute("r"))
        let r = parseFloat(circleElement.getAttribute("r")) * 2;

        for (let index = 0; index < 2; index++) {
            let completed = false;

            lerpBlinkElementRadius(
                blinkElement, 
                startR, 
                r, 
                time
            ).then(() => {
                completed = true;
            });

            let i = 0
            while (!completed) {
                await delay(1);

                if (i > time + 100) {
                    reject();
                    return;
                }

                i++;
            }

            let tempR = startR;
            startR = r;
            r = tempR;
        }

        resolve();
    });
    
    return promise;
}

function lerpBlinkElementRadius(blinkElement, startR, r, time) {
    var promise = new Promise(async (resolve, reject) => {
        let i = 0;
        while (i < 20) {
            await delay(time/20);
            blinkElement.setAttribute("r", startR + (r - startR) / 20 * i);
            i++;
        }

        blinkElement.setAttribute("r", r);

        resolve();
    });

    return promise;
}