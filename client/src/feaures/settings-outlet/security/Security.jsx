import "./security.css";
import { SettingsHeader } from "../../../pages/settings/Settings";
import { Link } from "react-router-dom";
import CustomSwitch from "../../../components/custom-switch/CustomSwitch";
import React, { useState } from "react";
import { convertToCamelCasing } from "../../../util/functions";

const changePasswordDetails = [
  "Current Password",
  "New Password",
  "Confirm new Password",
];

const twoFactorAuthOptions = [
  {
    type: "text",
    heading: "Text Message (SMS)",
    label:
      "Use your mobile phone to recieve a text message with an authentication code to enter when you login to Chochocho.",
  },
  {
    type: "email",
    heading: "E-mail",
    label:
      "Use your email address to recieve an authentication code to enter when you login to Chochocho.",
  },
  {
    type: "app",
    heading: "Authenticator app",
    label:
      "Use an app to get an authentication code to enter when you login to Chochocho. (google authenticator, DUO etc...)",
  },
];

//THis initialState should be fetched from the backend. So the saved setting would appear as initialState
const twoFactorAuthInitialState = twoFactorAuthOptions.reduce(
  (accum, current) => {
    accum = { ...accum, [current.type]: false };
    return accum;
  },
  {}
);

const passwordInitialState = changePasswordDetails.reduce((accum, current) => {
  accum = { ...accum, [convertToCamelCasing(current.toLowerCase())]: "" };
  return accum;
}, {});

export default function Security() {
  const [isChecked, setIsChecked] = useState(twoFactorAuthInitialState);
  const [password, setPassword] = useState(passwordInitialState);

  const handleSwitchChange = (e) => {
    setIsChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };
  const handleChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="settings-security">
      <SettingsHeader text={"Security"} />
      <form action="">
        <legend>Change Password</legend>
        {changePasswordDetails.map((detail, index) => {
          const name = convertToCamelCasing(detail.toLowerCase());
          return (
            <React.Fragment key={index}>
              <label htmlFor={detail}>{detail}</label>
              <input
                type="password"
                name={name}
                id={detail}
                value={password[name]}
                onChange={handleChange}
              />
            </React.Fragment>
          );
        })}
        <Link to="/auth/settings/reset-password">Forgot Password?</Link>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
      <section>
        <header>Two-factor authentication</header>
        {twoFactorAuthOptions.map((option, index) => {
          const { type, label, heading } = option;
          return (
            <article key={index}>
              <p>{heading}</p>
              <CustomSwitch
                {...{
                  style: { width: "100%", gap: "25%" },
                  label,
                  type,
                  isChecked: isChecked[type],
                  handleChange: handleSwitchChange,
                }}
              />
            </article>
          );
        })}
      </section>
    </main>
  );
}
