export function setupLines(element, lines) {
    lines.forEach((line, index) => {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", element.offsetWidth);

        let svgScale = (line.scale || 1);

        let lineSegments = line.line;

        let length = lineSegments.length;
        let i = 0;

        if (length < 2)
            return;

        while (i < length - 1) {
            const lineElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
            lineElement.setAttribute("x1", lineSegments[i][0] * svgScale);
            lineElement.setAttribute("y1", lineSegments[i][1] * svgScale);
            lineElement.setAttribute("x2", lineSegments[i + 1][0] * svgScale);
            lineElement.setAttribute("y2", lineSegments[i + 1][1] * svgScale);
            lineElement.setAttribute("stroke", line.color);
            lineElement.setAttribute("stroke-width", line.stroke_width);
            svg.appendChild(lineElement);

            i++;
        }

        const circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circleElement.setAttribute("cx", lineSegments[length - 1][0] * svgScale);
        circleElement.setAttribute("cy", lineSegments[length - 1][1] * svgScale);
        circleElement.setAttribute("r", line.radius * svgScale);
        circleElement.setAttribute("fill", line.color);
        svg.appendChild(circleElement);

        svg.setAttribute("id", element.id + "_line_" + index);
        svg.style.position = "absolute";
        svg.style.left = line.start[0] * svgScale + "px";
        svg.style.top = line.start[1] * svgScale + "px";

        element.appendChild(svg);
    });
}

export function blinkLine(element, index) {

}