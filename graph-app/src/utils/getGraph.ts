import { evaluate, parse } from "mathjs";

const getGraph = (
  equation: string,
  width: number,
  height: number,
  xRange: [number, number],
  yRange: [number, number],
  originX: number,
  originY: number,
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

    console.log("xMin:", xMin, "xMax:", xMax, "step:", step);
    console.log("yMin:", yMin, "yMax:", yMax);

    for (let px = 0; px <= width; px++) {
      // Convert pixel -> math x (inverse of your transform)
      const x = (px - originX) / scaleX;

      // Only evaluate inside your math range
      if (x < xMin || x > xMax) continue;

      const y = evaluate(equation, { x });
      if (!Number.isFinite(y)) continue;

      const pixelX = px;
      const pixelY = originY - y * scaleY;

      points.push(`${pixelX},${pixelY}`);
    }

    return points.join(" ");
  } catch (error) {
    console.error("Invalid equation:", error);
    return "";
  }
};

export default getGraph;
