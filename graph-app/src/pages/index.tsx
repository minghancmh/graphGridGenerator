import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import CartesianGrid from "../components/CartesianGrid";
import InputField from "../components/InputField";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import { AdvancedOptionsPane } from "graphapp/components/AdvancedOptionsPane";
import { GraphEquationsPane } from "graphapp/components/GraphEquationsPane";

const MyPage = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [gridLineColor, setGridLineColor] = React.useState<string | number>(
    "grey"
  );
  const [open, setOpen] = React.useState(false);

  const [graphEquations, setGraphEquations] = useState([
    "x^2",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Function to update a specific graph equation by index
  const setInputGraphEquation = (index: number, newValue: string) => {
    const updatedGraphEquations = [...graphEquations]; // Copy the existing array
    updatedGraphEquations[index] = newValue; // Update the specific equation
    setGraphEquations(updatedGraphEquations); // Set the new array
  };

  const handleChange = (event: SelectChangeEvent<typeof gridLineColor>) => {
    setGridLineColor(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const [axisThickness, setAxisThickness] = useState("1");

  const handleAxisThickness = (e: any) => {
    setAxisThickness(e.target.value);
  };

  const [axisTicksFont, setAxisTicksFont] = useState("5");

  const handleAxisTicksFont = (e: any) => {
    setAxisTicksFont(e.target.value);
  };

  const [axisLabelFont, setAxisLabelFront] = useState("6");

  const handleAxisLabelFont = (e: any) => {
    setAxisLabelFront(e.target.value);
  };

  const [separatorThickness, setSeparatorThickness] = useState("1");

  const handleSeparatorThickness = (e: any) => {
    setSeparatorThickness(e.target.value);
  };

  const [axisArrowThickness, setAxisArrowThickness] = useState("3");

  const handleAxisArrowThickness = (e: any) => {
    setAxisArrowThickness(e.target.value);
  };

  const [fontFamily, setFont] = useState("Times New Roman");

  const handleFont = (e: ChangeEvent<HTMLSelectElement>) => {
    setFont(e.target.value);
  };

  const [isSvgLoaded, setIsSvgLoaded] = useState(false);

  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      setIsSvgLoaded(true);
    }
  }, [svgRef]);

  const handleDownload = () => {
    if (!svgRef.current) {
      return;
    }
    const svg = svgRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = Number(inputWidth) * 10;
    canvas.height = Number(inputHeight) * 10;
    const ctx = canvas.getContext("2d");
    ctx!.fillStyle = "white";
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = "cartesian-grid.png";
      downloadLink.click();
    };
    img.src =
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(data)));
  };

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions);
  };

  const [xStep, setXStep] = useState("5");

  const handleXStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setXStep(event.target.value);
  };
  const [yStep, setYStep] = useState("5");

  const handleYStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYStep(event.target.value);
  };

  const [showXaxis, setShowXaxis] = useState(true);

  const handleXaxis = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowXaxis(event.target.checked);
  };

  const [showGraph, setShowGraph] = useState(true);
  const handleGraph = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowGraph(event.target.checked);
  };

  const [showYaxis, setShowYaxis] = useState(true);

  const handleYaxis = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowYaxis(event.target.checked);
  };

  const [scaleX, setScaleX] = useState("1");
  const handleScaleX = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (Number(e.target.value) <= Number(inputHeight) / 20 - 1 &&
        Number(e.target.value) >= 1) ||
      e.target.value == ""
    ) {
      setScaleX(e.target.value);
    }
  };

  const [scaleY, setScaleY] = useState("1");
  const handleScaleY = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      (Number(e.target.value) <= Number(inputWidth) / 20 - 1 &&
        Number(e.target.value) >= 1) ||
      e.target.value == ""
    ) {
      setScaleY(e.target.value);
    }
  };

  const [inputHeight, setHeight] = useState("240");

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };
  const [inputWidth, setWidth] = useState("200");

  const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };
  return (
    <div>
      <div className="flex flex-row">
        <div
          className="block align-center p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          style={styles.container}
        >
          <div className="flex-auto p-1 font-normal">
            <div className="p-1">Height (mm):</div>

            <InputField
              type="text"
              name="exampleInput"
              placeholder="Enter some text"
              value={inputHeight}
              onChange={handleHeight}
            />
          </div>

          <div className="flex-auto p-1 font-normal">
            <div className="font-normal p-1">Width (mm):</div>

            <InputField
              type="text"
              name="exampleInput"
              placeholder="Enter some text"
              value={inputWidth}
              onChange={handleWidth}
            />
          </div>
          <div className="flex-auto p-1 font-normal">
            <div className="font-normal p-1">Set X Axis:</div>

            <InputField
              type="text"
              name="exampleInput"
              placeholder={"1 - " + (Number(inputHeight) / 20 - 1).toString()}
              value={scaleX}
              onChange={handleScaleX}
            />
          </div>
          <div className="flex-auto p-1 font-normal">
            <div className="font-normal p-1">Set Y Axis:</div>

            <InputField
              type="text"
              name="exampleInput"
              placeholder={"1 - " + (Number(inputWidth) / 20 - 1).toString()}
              value={scaleY}
              onChange={handleScaleY}
            />
          </div>

          <div className="flex-auto p-1 font-normal ">
            <div className="font-normal p-1">
              2 cm on the x-axis represents:{" "}
            </div>

            <InputField
              type="text"
              name="exampleInput"
              placeholder=""
              value={xStep}
              onChange={handleXStep}
            />
          </div>

          <div className="flex-auto p-1 font-normal">
            <div className="font-normal p-1">
              2 cm on the y-axis represents:{" "}
            </div>

            <InputField
              type="text"
              name="exampleInput"
              placeholder=""
              value={yStep}
              onChange={handleYStep}
            />
          </div>

          <div className="pt-1 flex-auto">
            <Switch
              checked={showXaxis}
              onChange={handleXaxis}
              inputProps={{ "aria-label": "controlled" }}
            />

            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Show x-axis
            </label>
          </div>
          <div className="flex-auto mb-2">
            <Switch
              checked={showYaxis}
              onChange={handleYaxis}
              inputProps={{ "aria-label": "controlled" }}
            />

            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Show y-axis
            </label>
          </div>
          <button
            className="bg-indigo-300 rounded-full text-sm p-1 font-medium"
            onClick={handleDownload}
          >
            Download
          </button>

          <p
            className="text-blue-600 underline font-normal pt-3"
            onClick={handleAdvancedOptions}
          >
            Advanced Settings
          </p>
        </div>

        <AdvancedOptionsPane
          showAdvancedOptions={showAdvancedOptions}
          styles={styles}
          fontFamily={fontFamily}
          handleFont={handleFont}
          open={open}
          axisLabelFont={axisLabelFont}
          handleAxisLabelFont={handleAxisLabelFont}
          axisTicksFont={axisTicksFont}
          handleAxisTicksFont={handleAxisTicksFont}
          axisThickness={axisThickness}
          handleAxisThickness={handleAxisThickness}
          separatorThickness={separatorThickness}
          handleSeparatorThickness={handleSeparatorThickness}
          axisArrowThickness={axisArrowThickness}
          handleAxisArrowThickness={handleAxisArrowThickness}
          handleClose={handleClose}
          handleOpen={handleOpen}
          gridlineColor={gridLineColor}
          handleChange={handleChange}
          MenuProps={MenuProps}
        />

        <div style={styles.containerGraph}>
          <p className="pb-5">Output Graph Grid:</p>
          <svg
            fontFamily={fontFamily}
            fontWeight={900}
            ref={svgRef}
            viewBox={`0 0 ${inputWidth} ${inputHeight}`}
          >
            <CartesianGrid
              graphEquations={graphEquations}
              width={inputWidth}
              height={inputHeight}
              separatorThickness={separatorThickness}
              axisThickness={axisThickness}
              gridLineColor={gridLineColor}
              axisTicksFont={axisTicksFont}
              axisLabelFont={axisLabelFont}
              fontFamily={fontFamily}
              xStep={xStep}
              yStep={yStep}
              showXaxis={showXaxis}
              showYaxis={showYaxis}
              scaleX={scaleX}
              scaleY={scaleY}
              axisArrowThickness={axisArrowThickness}
            />
          </svg>
        </div>
        <GraphEquationsPane
          styles={styles}
          graphEquations={graphEquations}
          setInputGraphEquation={setInputGraphEquation}
          showGraph={showGraph}
          handleGraph={handleGraph}
        />
      </div>
    </div>
  );
};

export default MyPage;

const styles = {
  containerGraph: {
    width: "50vw",
    height: "80vh",
    margin: "100px auto",
    display: "flex",
    // background: "orange",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  } as React.CSSProperties,

  container: {
    width: "200px",
    height: "85vh",
    margin: "100px auto",
    display: "flex",
    background: "light-grey",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  } as React.CSSProperties,

  containerTwo: {
    width: "300px",
    height: "85vh",
    margin: "100px auto",
    display: "flex",
    background: "light-grey",
    flexDirection: "column",
    alignItems: "top",
    fontWeight: "bold",
  } as React.CSSProperties,
};
