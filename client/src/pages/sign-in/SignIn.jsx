import "./sign-in.css";
import { iconStyle } from "../../util/iconDescContent";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import illustration3 from "../../assets/illustration3.jpg";
import illustration4 from "../../assets/illustration4.jpg";
import illustration1 from "../../assets/illustration1.jpg";
import illustration2 from "../../assets/illustration2.jpg";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Typography } from "@mui/material";
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

const getIsChecked = () => localStorage.getItem("rememberMeIsActivated");
const getLoginDetails = () => localStorage.getItem("loginDetails");

export default function SignIn() {
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, data, isError, error }] =
    useUserSigninMutation();

  const [signInDetails, setSignUpDetails] = useState(
    !getLoginDetails() ? initialState : JSON.parse(getLoginDetails())
  );
  const [isChecked, setIsChecked] = useState(
    !getIsChecked() ? false : JSON.parse(getIsChecked())
  );

  const handleChange = (e) => {
    setSignUpDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheck = (e) => {
    setIsChecked(!isChecked);
    localStorage.setItem("rememberMeIsActivated", !isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //This should be done after authentication just so you confirm the details before saving.
    //Also, you cannot store the raw password in localStorage. You would have to hash and salt it first
    JSON.parse(getIsChecked())
      ? localStorage.setItem(
          "loginDetails",
          JSON.stringify({
            email: signInDetails.email,
            password: signInDetails.password,
          })
        )
      : localStorage.removeItem("loginDetails");

    login(signInDetails);

    // This is handling a successfull login
    isSuccess && data && navigate("/");
    // Handle the unsuccessful one beneath
  };
  useEffect(() => {
    isSuccess && data && navigate("/");
  }, [isSuccess, data, navigate]);

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
            {inputContent}
            <section>
              <FormControlLabel
                label={
                  <Typography style={{ fontWeight: "700" }}>
                    Remember me
                  </Typography>
                }
                control={
                  <Checkbox
                    sx={sx}
                    size="small"
                    checked={isChecked}
                    onChange={handleCheck}
                  />
                }
              />
              <Link to="/auth/reset-password">Forgot password?</Link>
            </section>
            <button>Sign In</button>
          </form>
          <p>
            <span>You don't have an account?</span>
            <Link to="/auth">{isLoading ? "Signing up" : "Sign Up"}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
