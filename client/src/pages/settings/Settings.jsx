import "./settings.css";
import { settingsContent } from "../../util/iconDescContent";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { iconStyle } from "../../util/iconDescContent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPathName, setCurrentPathName] = useState("");

  useEffect(() => {
    const locationPath = location.pathname.split("/");
    setCurrentPathName(locationPath[locationPath.length - 1]);
  }, [location]);

  const iconContent = settingsContent.map((setting, index) => {
    const { icon, desc, pathName } = setting;
    return (
      <div
        key={index}
        className="responsive-settings-desc"
        onClick={() => navigate(`/settings/${pathName}`)}
      >
        <div>
          <i>{icon}</i>
          <span
            className={
              pathName === currentPathName ||
              (currentPathName === "settings" && index === 0)
                ? "current-setting"
                : ""
            }
          >
            {desc}
          </span>
        </div>
        <i
          className={
            pathName === currentPathName ||
            (currentPathName === "settings" && index === 0)
              ? "current-setting-indicator"
              : "not-current-setting-indicator"
          }
        >
          <ArrowForwardIosOutlinedIcon style={iconStyle} />
        </i>
      </div>
    );
  });

  return (
    <>
      <div className="settings-container">
        <div className="settings-wrapper">
          <aside
            className={
              currentPathName === "settings" ? "" : "responsive-settings-outlet"
            }
          >
            {iconContent}
          </aside>
          <main
            className={
              currentPathName === "settings" ? "responsive-settings-outlet" : ""
            }
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export const SettingsHeader = ({ text, closePopup, overlay, viewPost }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => {
    return closePopup
      ? overlay
        ? closePopup()
        : dispatch(closePopup())
      : navigate(-1);
  };

  return (
    <header className={viewPost ? "view-post-header" : "settings-header"}>
      <i onClick={goBack}>
        <ArrowBackIosOutlinedIcon style={iconStyle} />
      </i>
      <h3>{text}</h3>
    </header>
  );
};
