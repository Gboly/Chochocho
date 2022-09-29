import "./sidebar-top.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebarNav } from "../../../app/actions/layoutActions";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../home-user-avatar/HomeUserAvatar";
import { useNavigate } from "react-router-dom";
import { iconStyle } from "../../../util/iconDescContent";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";

export default function SidebarTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Make sure to generate authUser properly after building backend
  const authUser = useSelector((state) => selectUserById(state, 1));

  const handleRouting = () => {
    navigate(`/profile/${1}`);
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
          <HomeUserAvatar userId={1} size={3.5} noLink={true} />
        </div>
        <p className="sidebar-username" onClick={handleRouting}>
          {authUser?.displayName}
        </p>
      </div>
      <hr className="sidebar-hr" />
    </>
  );
}
