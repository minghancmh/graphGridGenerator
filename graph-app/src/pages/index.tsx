import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import CartesianGrid from '../components/Grid';
import InputField from "../components/InputField";
import Slider from '@mui/material/Slider';
import Select , { SelectChangeEvent }from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';









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

  const [gridLineColor, setGridLineColor] = React.useState<string | number>('grey');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof gridLineColor>) => {
    setGridLineColor(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const [axisTicksFont, setAxisTicksFont] = useState("5");

  const handleAxisTicksFont = (e:any) => {
    setAxisTicksFont(e.target.value);
  };

  const [axisLabelFont, setAxisLabelFront] = useState("6");

  const handleAxisLabelFont = (e:any) => {
    setAxisLabelFront(e.target.value);
  };


  const [fontFamily, setFont] = useState("Times New Roman");

  const handleFont = (e:ChangeEvent<HTMLSelectElement>) => {
    setFont(e.target.value);
  };

  const [isSvgLoaded, setIsSvgLoaded] = useState(false);

  const svgRef = useRef(null)


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
    canvas.width = Number(inputWidth)*10;
    canvas.height = Number(inputHeight)*10;
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
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(data)));
  };

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const handleAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions)
  }


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

  const [showYaxis, setShowYaxis] = useState(true);

  const handleYaxis = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowYaxis(event.target.checked);
  };

  const [scaleX, setScaleX] = useState("1");
  const handleScaleX = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= Number(inputHeight)/20 -1 && Number(e.target.value) >= 1 || e.target.value==""){

    setScaleX(e.target.value);
    }
  }

  const [scaleY, setScaleY] = useState("1");
  const handleScaleY = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= Number(inputWidth)/20 - 1 && Number(e.target.value) >= 1 || e.target.value==""){
      setScaleY(e.target.value);
    }

  }

  const [inputHeight, setHeight] = useState("240");

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHeight(e.target.value);
  
  }
    const [inputWidth, setWidth] = useState("200");

  const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {

    setWidth(e.target.value);
  };
  return (

    <div className="flex flex-row ...">


  <div className="block align-center p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" style = {styles.container}>
   

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
        placeholder={"1 - " + (Number(inputHeight)/20 - 1).toString()}
        value={scaleX}
        onChange={handleScaleX}
      />

  </div>
  <div className="flex-auto p-1 font-normal"> 
    <div className="font-normal p-1">Set Y Axis:</div> 

    <InputField 
        type="text"
        name="exampleInput"
        placeholder={"1 - " + (Number(inputWidth)/20 - 1).toString()}
        value={scaleY}
        onChange={handleScaleY}
      />

  </div>

  <div className="flex-auto p-1 font-normal "> 
    <div className="font-normal p-1">2 cm on the x-axis represents: </div> 

    <InputField 
        type="text"
        name="exampleInput"
        placeholder=""
        value={xStep}
        onChange={handleXStep}
      />

  </div>

  <div className="flex-auto p-1 font-normal"> 
    <div className="font-normal p-1">2 cm on the y-axis represents: </div> 

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
      inputProps={{ 'aria-label': 'controlled' }}
    />

    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show x-axis</label>
</div>
<div className="flex-auto mb-2">
<Switch
      checked={showYaxis}
      onChange={handleYaxis}
      inputProps={{ 'aria-label': 'controlled' }}
    />

    <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show y-axis</label>
</div>
<button className="bg-indigo-300 rounded-full text-sm p-1 font-medium" onClick={handleDownload}>
  Download
</button>

<p className="text-blue-600 underline font-normal pt-3" onClick={handleAdvancedOptions}> Advanced Settings </p>


  </div>



<div className={`transition-all ease-in-out duration-300 block p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${showAdvancedOptions? 'opacity-100' : 'opacity-0'}`} style={styles.containerTwo}>
      <p className="text-left">Advanced Settings </p>

      <div className="p-1 font-normal"> 
      <div>
      <label htmlFor="dropdown">Font:   </label>
      <select id="dropdown" className="border border-gray-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800" value={fontFamily} onChange={handleFont}>
        <option value="Times New Roman">Times New Roman</option>
        <option value="ui-sans-serif">ui-sans-serif</option>
        <option value="Georgia">Georgia</option>
        <option value="Cambria">Cambria</option>
        <option value="Times">Times</option>
        <option value="serif">serif</option>
        <option value="SFMono-Regular">SFMono-Regular</option>
      </select>
    </div>
  </div>


  <div className="p-1 font-normal rounded-lg shadow"> 
    <div className="font-normal p-1">Axis Label Size: {axisLabelFont} pt</div> 

    <Slider
  aria-label="Axis Font Size"
  defaultValue={Number(axisLabelFont)}
  valueLabelDisplay="auto"
  step={1}
  marks
  min={2}
  max={10}
  onChange={handleAxisLabelFont}
  size="medium"
/>

  </div>

  <div className="p-1 font-normal rounded-lg shadow"> 
    <div className="font-normal p-1">Axis Ticks Size: {axisTicksFont} pt</div> 

    <Slider
  aria-label="Axis Ticks Size"
  defaultValue={Number(axisTicksFont)}
  valueLabelDisplay="auto"
  step={1}
  marks
  min={2}
  max={10}
  onChange={handleAxisTicksFont}
  size="medium"
/>

  </div>


  <div className="p-1 font-normal rounded-lg shadow flex-row">  
    <FormControl sx={{ m: 1, width: 250 }}>
    <InputLabel id="demo-controlled-open-select-label"> Gridline Color </InputLabel>
    <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={gridLineColor}
          label="gridLineColor"
          onChange={handleChange}
          fullWidth
          MenuProps={MenuProps}
          // input={<OutlinedInput id="demo-controlled-open-select-label" label="Chip" />}

        >
          <MenuItem value="grey">Grey</MenuItem>
          <MenuItem value={"black"}>Black</MenuItem>
          <MenuItem value={"green"}>Green</MenuItem>

        </Select>
        </FormControl>




  </div>










      </div>




  <div style = {styles.containerGraph}>
    <p className="pb-5">
      Output Graph Grid:
    </p>
    <svg ref={svgRef} viewBox={`0 0 ${inputWidth} ${inputHeight}`}>

<CartesianGrid width={inputWidth} height={inputHeight} gridLineColor={gridLineColor} axisTicksFont={axisTicksFont} axisLabelFont={axisLabelFont} fontFamily = {fontFamily} xStep={xStep} yStep={yStep} showXaxis={showXaxis} showYaxis={showYaxis} scaleX={scaleX} scaleY={scaleY}/>

</svg>
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

  container:{
    width: "200px",
    height: "80vh",
    margin: "100px auto",
    display: "flex",
    background: "light-grey",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  } as React.CSSProperties,

  containerTwo:{
    width: "300px",
    height: "80vh",
    margin: "100px auto",
    display: "flex",
    background: "light-grey",
    flexDirection: "column",
    alignItems: "top",
    fontWeight: "bold",
  } as React.CSSProperties,
};



