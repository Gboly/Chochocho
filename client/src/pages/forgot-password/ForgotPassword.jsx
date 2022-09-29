import "./forgot-password.css";
import { iconStyle } from "../../util/iconDescContent";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CustomInput } from "../../components/standard-input/StandardInput";

const emailData = {
  type: "email",
  placeholder: "Your Email",
  name: "email",
  icon: <AlternateEmailOutlinedIcon style={iconStyle} />,
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const location = useLocation();
  const isDefaultPage = !location.pathname.includes("settings");

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="signup-container forgot-password-container">
      <div>
        <h1>Forgot Password?</h1>
        <p>Enter your details to recieve a reset link</p>
        <form
          action=""
          onSubmit={handleSubmit}
          className="signup-form forgot-password-form"
        >
          <CustomInput {...{ ...emailData, value: email, handleChange }} />
          <button>Send</button>
        </form>
        <Link to={`${isDefaultPage ? "/auth/sign-in" : "/settings/security"}`}>
          <ArrowBackIosOutlinedIcon style={iconStyle} />
          <span>Back to {isDefaultPage ? "Sign In" : "Settings"}</span>
        </Link>
      </div>
    </main>
  );
}
