import "./notification.css";
import CustomSwitch from "../../../components/custom-switch/CustomSwitch";
import IconGradient from "../../../components/icon-gradient/IconGradient";
import { description } from "../../../util/notificationTypes";
import { useState } from "react";
import { SettingsHeader } from "../../../pages/settings/Settings";

//THis initialState should be fetched from the backend. So the saved setting would appear as initialState
const initialState = description.reduce((accum, current) => {
  accum = { ...accum, [current.type]: false };
  return accum;
}, {});

export default function Notification() {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleChange = (e) => {
    setIsChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  return (
    <main className="settings-notification">
      <SettingsHeader text={"Notification"} />
      <p>What Notifications You Recieve</p>
      <div>
        {description.map((item, index) => {
          const { type } = item;
          return (
            <div key={index} className="notification-switch">
              <IconGradient type={type} />
              <CustomSwitch
                {...{
                  label: type,
                  style: { width: "11.5rem" },
                  type,
                  isChecked: isChecked[type],
                  handleChange,
                }}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
