import InputField from "../components/InputField";
import Switch from "@mui/material/Switch";

interface GraphEquationPaneProps {
  styles: any;
  graphEquations: any;
  setInputGraphEquation: any;
  showGraph: any;
  handleGraph: any;
}

export function GraphEquationsPane(props: GraphEquationPaneProps) {
//   console.log("graphEquations:", props.graphEquations);
  return (
    <div
      className={`transition-all ease-in-out duration-300 block p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
      style={props.styles.containerTwo}
    >
      <p className="text-left">Graph Equations</p>
      {props.graphEquations.map((graphEquation: any, index: number) => (
        <div key={index} className="pt-4 flex flex-row items-center">
          <div className="pr-4">{index + 1}:</div>
          <InputField
            type="text"
            name={`exampleInput-${index}`} // Unique name for each input
            placeholder="Enter Graph Equation"
            value={graphEquation}
            onChange={(e) => props.setInputGraphEquation(index, e.target.value)} // Update specific equation by index
          />
          {/* <div> color </div> */}
        </div>
      ))}
    </div>
  );
}
