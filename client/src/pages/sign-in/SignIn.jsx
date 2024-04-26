import "./sign-in.css";
import { iconStyle } from "../../util/iconDescContent";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import illustration3 from "../../assets/illustration3.jpg";
import illustration4 from "../../assets/illustration4.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  CustomInput,
} from "../../components/standard-input/StandardInput";

import { useState } from "react";
import { useUserSigninMutation } from "../../app/api-slices/usersApiSlice";
import { useEffect } from "react";

const sx = {
  "&.Mui-checked": {
    color: "#c32aa3",
  },
};

const signUpInputData = [
  {
    type: "email",
    placeholder: "Your Email",
    name: "email",
    icon: <AlternateEmailOutlinedIcon style={iconStyle} />,
  },
  {
    type: "password",
    placeholder: "Your password",
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

export default function SignIn() {
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, data, isError, error }] =
    useUserSigninMutation();

  const [signInDetails, setSignInDetails] = useState(initialState);

  const [incorrectDetail, setIncorrectDetail] = useState(false);

  const handleChange = (e) => {
    incorrectDetail && setIncorrectDetail(false);
    setSignInDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(signInDetails);
  };

  useEffect(() => {
    isSuccess && data && (window.location.href = "/");
    error &&
      (error.status === 401 || error.originalStatus === 401) &&
      setIncorrectDetail(true);
  }, [isSuccess, data, navigate, error]);

  const inputContent = signUpInputData.reduce((accum, current, index) => {
    const { type, placeholder, name, icon } = current;
    type === "password"
      ? accum.push(
          <PasswordInput
            key={index}
            {...{
              placeholder,
              name,
              value: signInDetails[name],
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
              value: signInDetails[name],
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

  return (
    <main className="signup-container">
      <img className="illustration1" src={illustration3} alt="" />
      <img className="illustration2" src={illustration4} alt="" />
      <section>
        <div>
          <h2>Sign In</h2>
          <span>
            Welcome back to Chochocho. Please enter your details to continue
            having fun.
          </span>
          <div className="oauth-container">{oAuthButtons}</div>
          <div className="signup-or">
            <span>OR</span>
          </div>
          <form action="" onSubmit={handleSubmit} className="signup-form">
            {incorrectDetail && <span>Email or password is incorrect</span>}
            {inputContent}
            <section>
              <Link to="/auth/reset-password">Forgot password?</Link>
            </section>
            <button>{isLoading ? "Signing in..." : "Sign in"}</button>
          </form>
          <p>
            <span>You don't have an account?</span>
            <Link to="/auth">Sign Up</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
