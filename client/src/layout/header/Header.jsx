import "./header.css";
import avi2 from "../../assets/avatar-square.png";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import { useDispatch } from "react-redux";
import { openSidebarNav } from "../../app/actions/layoutActions";
import { showPopupOnOpaqueOverlay } from "../../util/functions";
import { sidebarType } from "../../util/types";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left">
          <img
            src={avi2}
            alt="avatar"
            className="avi"
            onClick={() =>
              showPopupOnOpaqueOverlay(openSidebarNav, sidebarType)
            }
          />
        </div>
        <div className="nav-center">
          <span className="app-name" onClick={() => navigate("/")}>
            Chochocho
          </span>
        </div>
        <div className="nav-right">
          <LocalPostOfficeOutlinedIcon />
        </div>
      </div>
    </nav>
  );
}
