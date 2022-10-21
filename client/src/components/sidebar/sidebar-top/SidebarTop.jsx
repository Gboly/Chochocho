import "./sidebar-top.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch } from "react-redux";
import { closeSidebarNav } from "../../../app/actions/layoutActions";
import HomeUserAvatar from "../../home-user-avatar/HomeUserAvatar";
import { useNavigate } from "react-router-dom";
import { iconStyle } from "../../../util/iconDescContent";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";
import { useContext } from "react";
import { GeneralContext } from "../../../routes/Router";

export default function SidebarTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Make sure to generate authUser properly after building backend
  const {
    authUser: { id, displayName, profileImage },
  } = useContext(GeneralContext);

  const handleRouting = () => {
    navigate(`/profile/${id}`);
    dispatch(closeSidebarNav());
  };

  return (
    <>
      <div className="sidebar-top">
        <button
          className="sidebar-close-button"
          onClick={() => closePopupOnOpaqueOverlay(closeSidebarNav)}
        >
          <CloseOutlinedIcon style={iconStyle} />
        </button>
        <div onClick={handleRouting}>
          <HomeUserAvatar
            userId={1}
            size={3.5}
            noLink={true}
            src={profileImage}
          />
        </div>
        <p className="sidebar-username" onClick={handleRouting}>
          {displayName}
        </p>
      </div>
      <hr className="sidebar-hr" />
    </>
  );
}
