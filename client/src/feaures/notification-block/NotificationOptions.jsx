import "./notification-options.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeNotificationOptions } from "../../app/actions/notificationActions";
import { notificationOptions } from "../../util/iconDescContent";
import { useCallback, useMemo } from "react";
import { closePopupOnTransparentOverlay } from "../../util/functions";

export default function NotificationOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filter = () => navigate("/settings/notification");
  const readAll = () => {};

  const action = { filter, readAll };

  const performAction = (id) => {
    action[id]();
    closePopupOnTransparentOverlay(closeNotificationOptions);
  };

  return (
    <div className="post-options-container">
      <div className="post-options-wrapper notification-options-wrapper">
        {notificationOptions.map(({ id, desc, icon }) => (
          <div
            key={id}
            className="post-option notification-option"
            onClick={() => performAction(id)}
          >
            <span className="post-option-desc">{desc}</span>
            <i className="post-option-icon notification-options-icon">{icon}</i>
          </div>
        ))}
      </div>
    </div>
  );
}
