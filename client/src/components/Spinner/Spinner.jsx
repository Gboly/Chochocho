import "./spinner.css";
import { CircularProgress } from "@mui/material";
import { iconStyle } from "../../util/iconDescContent";

export default function Spinner({ sxx }) {
  return (
    <div className={`spinner ${sxx}`}>
      <CircularProgress style={iconStyle} />
    </div>
  );
}
