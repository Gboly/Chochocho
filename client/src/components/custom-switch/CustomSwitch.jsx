import "./custom-switch.css";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
import { capitalize } from "../../util/functions";
// import { playbackSpeedOptionsStyle } from "../../util/formRadioOptions";

export default function CustomSwitch({
  isChecked,
  handleChange,
  type,
  label,
  style,
}) {
  return (
    <div className="custom-switch-container" style={style}>
      <span>{label ? capitalize(label) : ""}</span>

      <label htmlFor={type}>
        <div
          className={`switch-track switch-track-${isChecked ? "on" : "off"}`}
        >
          <div
            className={`switch-thumb switch-thumb-${isChecked ? "on" : "off"}`}
          ></div>
        </div>
      </label>
      <input
        style={{ display: "none" }}
        checked={isChecked}
        type="checkbox"
        name={type}
        id={type}
        onChange={handleChange}
      />
    </div>
  );
}
