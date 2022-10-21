import "./sidebar-item.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeSidebarNav } from "../../../app/actions/layoutActions";
import { profileBasePathType } from "../../../util/types";
import { getBasePath, updateScrollCache } from "../../../util/functions";
import NavigateWithScrollCache from "../../../feaures/scroll-cache/NavigateWithScrollCache";
import { GeneralContext } from "../../../routes/Router";

export default function SidebarItem({ name, icon, id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [pathName, setPathName] = useState("");
  const [route, setRoute] = useState(false);

  const { setPageRefresh } = useContext(GeneralContext);

  useEffect(() => {
    setPathName(getBasePath(location.pathname));
  }, [location]);

  // #3
  const link = `/${id}${id === profileBasePathType ? "/1" : ""}`;

  const refresh = () => {
    updateScrollCache(location.pathname, 0);
    setPageRefresh(true);
  };

  const handleClick = () => {
    location.pathname === link ? refresh() : setRoute(true);
  };
  const handleRouting = () => {
    navigate(link);
    dispatch(closeSidebarNav());
  };
  const cleanUp = () => setRoute(false);

  const currentPage = () => {
    const match =
      id === profileBasePathType ? location.pathname === link : pathName === id;
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
        onClick={handleClick}
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
