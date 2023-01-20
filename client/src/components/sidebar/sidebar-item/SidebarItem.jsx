import "./sidebar-item.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  closeSidebarNav,
  openLogOut,
} from "../../../app/actions/layoutActions";
import { logOutType, profileBasePathType } from "../../../util/types";
import {
  closePopupOnOpaqueOverlay,
  getBasePath,
  showPopupOnOpaqueOverlay,
  updateScrollCache,
} from "../../../util/functions";
import NavigateWithScrollCache from "../../../feaures/scroll-cache/NavigateWithScrollCache";
import { GeneralContext } from "../../../routes/Router";
import { getOpaqueOverlayState } from "../../../layout/layoutSlice";

export default function SidebarItem({ name, icon, id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { type: overlayType } = useSelector(getOpaqueOverlayState);

  const [pathName, setPathName] = useState("");
  const [route, setRoute] = useState(false);

  const {
    setPageRefresh,
    authUser: { _id: authUserId },
  } = useContext(GeneralContext);

  useEffect(() => {
    setPathName(getBasePath(location.pathname));
  }, [location]);

  // #3
  const link = useMemo(
    () => `/${id}${id === profileBasePathType ? `/${authUserId}` : ""}`,
    [id, authUserId]
  );

  const refresh = () => {
    updateScrollCache(location.pathname, 0);
    setPageRefresh(true);
  };

  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    id === logOutType
      ? showPopupOnOpaqueOverlay(openLogOut, logOutType)
      : location.pathname === link
      ? refresh()
      : setRoute(true);
  };

  const [handleRouting, cleanUp] = useMemo(() => {
    const handleRouting = () => {
      navigate(link);
      closePopupOnOpaqueOverlay(closeSidebarNav);
    };
    const cleanUp = () => setRoute(false);
    return [handleRouting, cleanUp];
  }, [navigate, link]);

  const currentPage = () => {
    const match =
      overlayType === logOutType
        ? id === logOutType
        : id === profileBasePathType
        ? location.pathname === link
        : pathName === id;
    if (!match) {
      return "";
    }
    return "current-page";
  };

  return (
    <>
      <NavigateWithScrollCache
        clicked={route}
        handleRouting={handleRouting}
        cleanUp={cleanUp}
      />
      <div
        id={id}
        className={`sidebar-item ${currentPage()}`}
        onClick={(e) => handleClick(e)}
      >
        <i>{icon}</i>
        <span>{name}</span>
        {name === "Notification" && (
          <div className="sidebar-notification-count" />
        )}
      </div>
    </>
  );
}
