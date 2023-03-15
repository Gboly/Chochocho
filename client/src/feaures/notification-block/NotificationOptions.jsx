import "./notification-options.css";
import { useNavigate } from "react-router-dom";
import { closeNotificationOptions } from "../../app/actions/notificationActions";
import { notificationOptions } from "../../util/iconDescContent";
import { useState } from "react";
import { closePopupOnTransparentOverlay } from "../../util/functions";
import NavigateWithScrollCache from "../scroll-cache/NavigateWithScrollCache";

export default function NotificationOptions() {
  const navigate = useNavigate();

  const [route, setRoute] = useState(false);

  // Ensure the scroll height is cached when leaving page just so it is maintained on return.
  const handleRouting = () => {
    navigate("/settings/notification");
    closePopupOnTransparentOverlay(closeNotificationOptions);
  };

  const cleanUp = () => setRoute(false);

  const filter = () => setRoute(true);
  const readAll = () => {};

  const action = { filter, readAll };

  const performAction = (id) => {
    action[id]();
    id !== "filter" && closePopupOnTransparentOverlay(closeNotificationOptions);
  };

  return (
    <>
      <NavigateWithScrollCache
        clicked={route}
        handleRouting={handleRouting}
        cleanUp={cleanUp}
      />
      <div className="post-options-container">
        <div className="post-options-wrapper notification-options-wrapper">
          {notificationOptions.map(({ id, desc, icon }) => (
            <div
              key={id}
              className="post-option notification-option"
              onClick={() => performAction(id)}
            >
              <span className="post-option-desc">{desc}</span>
              <i className="post-option-icon notification-options-icon">
                {icon}
              </i>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
