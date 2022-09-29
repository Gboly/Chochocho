import "./simple-header.css";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { iconStyle } from "../../util/iconDescContent";
import { useDispatch } from "react-redux";
import { closePopupOnOpaqueOverlay } from "../../util/functions";

export default function SimpleHeader({ desc, closeAction, overlay, fontSize }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    return closeAction
      ? overlay
        ? closeAction()
        : dispatch(closeAction())
      : "";
  };

  return (
    <>
      <div className="simple-header-container">
        <h4 style={{ fontSize: fontSize || "1rem" }}>{desc}</h4>
        <i onClick={handleClick}>
          <HighlightOffOutlinedIcon style={iconStyle} />
        </i>
      </div>
      <hr className="simple-header-hr" />
    </>
  );
}
