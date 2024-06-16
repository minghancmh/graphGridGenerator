import { useMemo } from "react";
import { evaluate, parse } from "mathjs";

const useGraph = (
  equation: string,
  width: number,
  height: number,
  xRange: [number, number],
  yRange: [number, number],
  originX: number,
  originY: number,
  scaleX: number,
  scaleY: number
) => {
  return useMemo(() => {
    try {
      // Validate the equation by parsing it
      parse(equation);

      const [xMin, xMax] = xRange;
      const [yMin, yMax] = yRange;

      // Calculate scales
      const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
      const yScale = (y: number) =>
        height - ((y - yMin) / (yMax - yMin)) * height;

      // Calculate step based on width for smooth graph
      const step = (xMax - xMin) / width;
      const points = [];

      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluate(equation, { x });
        points.push(
          `${xScale(x) - width / 2 + originX},${
            yScale(y) - height / 2 + originY
          }`
        );
      }

      return points.join(" ");
    } catch (error) {
      console.error("Invalid equation:", error);
      return "";
    }
  }, [equation, width, height, xRange, yRange, originX, originY]);
};

export default useGraph;
