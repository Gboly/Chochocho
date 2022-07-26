import "./notification-options.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeNotificationOptions } from "../../app/actions/notificationActions";
import { notificationOptions } from "../../util/iconDescContent";

export default function NotificationOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const performAction = (index) => {
    index === 1 && navigate("/settings/notification");
    dispatch(closeNotificationOptions());
  };

  return (
    <div className="post-options-container">
      <div className="post-options-wrapper notification-options-wrapper">
        {notificationOptions.map(({ desc, icon }, index) => (
          <div
            key={index}
            className="post-option notification-option"
            onClick={() => performAction(index)}
          >
            <span className="post-option-desc">{desc}</span>
            <i className="post-option-icon notification-options-icon">{icon}</i>
          </div>
        ))}
      </div>
    </div>
  );
}
