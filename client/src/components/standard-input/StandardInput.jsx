import "./standard-input.css";
import { iconStyle } from "../../util/iconDescContent";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";

const CustomInput = ({
  type,
  placeholder,
  name,
  value,
  handleChange,
  icon,
  style,
  minLength,
  maxLength,
}) => {
  return (
    <div className="standard-input-container">
      <input
        className="standard-input"
        style={style || {}}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        required
      />
      <i className="placeholder-icon">{icon}</i>
    </div>
  );
};

const PasswordInput = ({
  name,
  placeholder,
  value,
  handleChange,
  style,
  minLength,
  maxLength,
}) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <div className="standard-input-container">
      <input
        className="standard-input"
        style={style || {}}
        type={isHidden ? "password" : "text"}
        placeholder={placeholder || "Create Password"}
        name={name || "password"}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        required
      />
      <i className="placeholder-icon">
        <LockOutlinedIcon style={iconStyle} />
      </i>
      <i
        className="password-visibility-toggle"
        onClick={() => setIsHidden((prev) => !prev)}
      >
        {isHidden ? (
          <VisibilityOffOutlinedIcon style={iconStyle} />
        ) : (
          <VisibilityOutlinedIcon style={iconStyle} />
        )}
      </i>
    </div>
  );
};

//placeholder-icon style can be found in sign-up.css

export { CustomInput, PasswordInput };
