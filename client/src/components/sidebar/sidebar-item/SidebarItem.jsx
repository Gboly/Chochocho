import "./sidebar-item.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeSidebarNav } from "../../../app/actions/layoutActions";

const getBasePath = (pathName) => {
  return pathName.split("/")[1] || "";
};

export default function SidebarItem({ name, icon, id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { userId } = useParams();

  const [pathName, setPathName] = useState("");

  useEffect(() => {
    setPathName(getBasePath(location.pathname));
  }, [location]);

  const handleRouting = () => {
    navigate(`/${id}`);
    dispatch(closeSidebarNav());
  };

  return (
    <div
      id={id}
      className={`sidebar-item ${
        pathName + (userId ? "/" + userId : "") === id ? "current-page" : ""
      }`}
      onClick={handleRouting}
    >
      <i>{icon}</i>
      <span>{name}</span>
      {name === "Notification" && (
        <div className="sidebar-notification-count" />
      )}
    </div>
  );
}
