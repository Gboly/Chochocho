import "./sign-up.css";
import { iconStyle } from "../../util/iconDescContent";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import illustration3 from "../../assets/illustration3.jpg";
import illustration4 from "../../assets/illustration4.jpg";
import illustration1 from "../../assets/illustration1.jpg";
import illustration2 from "../../assets/illustration2.jpg";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  PasswordInput,
  CustomInput,
} from "../../components/standard-input/StandardInput";
import { useUserSignUpMutation } from "../../app/api-slices/usersApiSlice";

const signUpInputData = [
  {
    type: "email",
    placeholder: "Your Email",
    name: "email",
    icon: <AlternateEmailOutlinedIcon style={iconStyle} />,
  },
  {
    type: "text",
    placeholder: "Your Name",
    name: "username",
    icon: <PersonOutlineOutlinedIcon style={iconStyle} />,
  },
  {
    type: "password",
    placeholder: "Create your password",
    name: "password",
  },
];

const oAuthData = [
  {
    type: "Google",
    src: "https://freepngimg.com/thumb/logo/66924-logo-google-png-image-high-quality.png",
  },
  {
    type: "Facebook",
    src: "https://www.facebook.com/images/fb_icon_325x325.png",
  },
];

const initialState = signUpInputData.reduce((accum, current) => {
  accum = { ...accum, [current.name]: "" };
  return accum;
}, {});

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpDetails, setSignUpDetails] = useState(initialState);

  const [register, { isLoading: isRegistering, isSuccess, error, data }] =
    useUserSignUpMutation();

  const handleChange = (e) => {
    setSignUpDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputContent = signUpInputData.reduce((accum, current, index) => {
    const { type, placeholder, name, icon } = current;
    type === "password"
      ? accum.push(
          <PasswordInput
            key={index}
            {...{
              placeholder,
              name,
              minLength: "6",
              value: signUpDetails[name],
              handleChange,
            }}
          />
        )
      : accum.push(
          <CustomInput
            key={index}
            {...{
              type,
              placeholder,
              name,
              minLength: "3",
              value: signUpDetails[name],
              handleChange,
              icon,
            }}
          />
        );
    return accum;
  }, []);

  const oAuthButtons = oAuthData.map((item, index) => (
    <button key={index}>
      <img src={item.src} alt="" />
      <span>Login with {item.type}</span>
    </button>
  ));

  const registerUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    register(signUpDetails);
    setSignUpDetails(initialState);
  };

  useEffect(() => {
    isSuccess && data && (window.location.href = "/settings/profile");
  }, [isSuccess, data, navigate]);

  return (
    <main className="signup-container">
      <img className="illustration1" src={illustration3} alt="" />
      <img className="illustration2" src={illustration1} alt="" />
      <section>
        <div>
          <h2>Getting Started</h2>
          <span>
            Create an account to continue and connect with both old and new
            friends
          </span>
          <div className="oauth-container">{oAuthButtons}</div>
          <div className="signup-or">
            <span>OR</span>
          </div>
          <form action="" className="signup-form" onSubmit={registerUser}>
            {inputContent}
            <button type="submit">
              {isRegistering ? "Signing up ..." : "Sign up"}
            </button>
          </form>
          <p>
            <span>Already have an account?</span>
            <Link to="sign-in">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
