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
import { Link } from "react-router-dom";

import { useState } from "react";
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
    name: "name",
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
  const [signUpDetails, setSignUpDetails] = useState(initialState);

  const isFilled = Object.values(signUpDetails).every(
    (detail) => detail.length > 2
  );

  const [register, { isLoading: isRegistering, data }] =
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
    if (isFilled) {
      register(signUpDetails);
      //Depending on the data recieved from the backend, you should redirect to home page or not.
      console.log(data);
      setSignUpDetails(initialState);
    }
  };

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
