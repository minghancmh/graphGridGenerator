import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
interface AdvancedOptionsPaneProps {
  showAdvancedOptions: boolean;
  styles: any;
  fontFamily: string;
  handleFont: any;
  open: boolean;
  axisLabelFont: any;
  handleAxisLabelFont: any;
  axisTicksFont: any;
  handleAxisTicksFont: any;
  axisThickness: any;
  handleAxisThickness: any;
  separatorThickness: any;
  handleSeparatorThickness: any;
  axisArrowThickness: any;
  handleAxisArrowThickness: any;
  handleClose: any;
  handleOpen: any;
  gridlineColor: any;
  handleChange: any;
  MenuProps: any;
}

export function AdvancedOptionsPane(props: AdvancedOptionsPaneProps) {
  return (
    <div
      className={`transition-all ease-in-out duration-300 block p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
        props.showAdvancedOptions ? "opacity-100" : "opacity-0"
      }`}
      style={props.styles.containerTwo}
    >
      <p className="text-left">Advanced Settings </p>

      <div className="p-1 font-normal">
        <div>
          <label htmlFor="dropdown">Font: </label>
          <select
            id="dropdown"
            className="border border-gray-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800"
            value={props.fontFamily}
            onChange={props.handleFont}
          >
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
        <div className="font-normal p-1">
          Axis Label Size: {props.axisLabelFont} pt
        </div>

        <Slider
          aria-label="Axis Font Size"
          defaultValue={Number(props.axisLabelFont)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={2}
          max={10}
          onChange={props.handleAxisLabelFont}
          size="medium"
        />
      </div>

      <div className="p-1 font-normal rounded-lg shadow">
        <div className="font-normal p-1">
          Axis Ticks Size: {props.axisTicksFont} pt
        </div>

        <Slider
          aria-label="Axis Ticks Size"
          defaultValue={Number(props.axisTicksFont)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={2}
          max={10}
          onChange={props.handleAxisTicksFont}
          size="medium"
        />
      </div>

      <div className="p-1 font-normal rounded-lg shadow">
        <div className="font-normal p-1">
          Axis Thickness: {props.axisThickness} pt
        </div>

        <Slider
          aria-label="Axis Thickness"
          defaultValue={Number(props.axisThickness)}
          valueLabelDisplay="auto"
          step={0.05}
          marks
          min={0.5}
          max={1.5}
          onChange={props.handleAxisThickness}
          size="medium"
        />
      </div>

      <div className="p-1 font-normal rounded-lg shadow">
        <div className="font-normal p-1">
          Separator Thickness: {props.separatorThickness} pt
        </div>

        <Slider
          aria-label="Separator Thickness"
          defaultValue={Number(props.separatorThickness)}
          valueLabelDisplay="auto"
          step={0.01}
          marks={[]}
          min={0.5}
          max={1.5}
          onChange={props.handleSeparatorThickness}
          size="medium"
        />
      </div>

      <div className="p-1 font-normal rounded-lg shadow">
        <div className="font-normal p-1">
          Axis Arrow Thickness: {props.axisArrowThickness} pt
        </div>

        <Slider
          aria-label="Axis Arrow Thickness"
          defaultValue={Number(props.axisArrowThickness)}
          valueLabelDisplay="auto"
          step={1}
          marks={[]}
          min={1}
          max={10}
          onChange={props.handleAxisArrowThickness}
          size="medium"
        />
      </div>

      <div className="p-1 font-normal rounded-lg shadow flex-row">
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-controlled-open-select-label">
            {" "}
            Gridline Color{" "}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={props.open}
            onClose={props.handleClose}
            onOpen={props.handleOpen}
            value={props.gridlineColor}
            label="gridLineColor"
            onChange={props.handleChange}
            fullWidth
            MenuProps={props.MenuProps}
          >
            <MenuItem value="grey">Grey</MenuItem>
            <MenuItem value={"black"}>Black</MenuItem>
            <MenuItem value={"green"}>Green</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
