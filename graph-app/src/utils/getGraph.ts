import { evaluate, parse } from "mathjs";

const getGraph = (
  equation: string,
  width: number,
  height: number,
  xRange: [number, number],
  yRange: [number, number],
  originX: number,
  originY: number
) => {
  try {
    // Validate the equation by parsing it
    parse(equation);

    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;

    // Calculate scaling factors (pixels per unit)
    const scaleX = width / (xMax - xMin);
    const scaleY = height / (yMax - yMin);

    // Calculate step based on width for smooth graph
    const step = (xMax - xMin) / width;

    const points = [];

    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluate(equation, { x });

      // Convert x and y to pixel coordinates
      const pixelX = originX + (x * scaleX);
      const pixelY = originY - (y * scaleY); // Subtract because SVG y-axis is inverted

      points.push(`${pixelX},${pixelY}`);
    }

    return points.join(" ");
  } catch (error) {
    console.error("Invalid equation:", error);
    return "";
  }
};

export default getGraph;
