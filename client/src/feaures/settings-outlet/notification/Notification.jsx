import "./notification.css";
import CustomSwitch from "../../../components/custom-switch/CustomSwitch";
import IconGradient from "../../../components/icon-gradient/IconGradient";
import { description } from "../../../util/notificationTypes";
import { useContext, useState } from "react";
import { SettingsHeader } from "../../../pages/settings/Settings";
import { GeneralContext } from "../../../routes/Router";
import { useFilterNotificationsMutation } from "../../../app/api-slices/notificationsApiSlice";

//THis initialState should be fetched from the backend. So the saved setting would appear as initialState
const initialState = description.reduce((accum, current) => {
  accum = { ...accum, [current.type]: false };
  return accum;
}, {});

export default function Notification() {
  const {
    authUser: { allowedNotificationTypes },
  } = useContext(GeneralContext);

  const [filterNotifications] = useFilterNotificationsMutation();

  const handleChange = (e) => {
    filterNotifications(e.target.name);
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
                  isChecked: allowedNotificationTypes[type],
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
