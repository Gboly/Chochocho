import "./profile-details.css";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import { iconStyle } from "../../../util/iconDescContent";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";

const profileDetailStyle = { ...iconStyle };
profileDetailStyle.fontSize = "1.3rem";

export default function ProfileDetails() {
  const { userId: id } = useParams();
  const userId = Number(id);

  const user = useSelector((state) => selectUserById(state, userId));

  const getUsernameFromLink = (link) => {
    const linkArray = link.split("/");
    const username = linkArray[linkArray.length - 1];
    return username ? username : linkArray[linkArray.length - 2];
  };

  const profileDetails = [
    {
      type: "birthday",
      icon: <CakeOutlinedIcon style={profileDetailStyle} />,
      desc: "Born 13 March",
    },
    {
      type: "joined",
      icon: <CalendarMonthOutlinedIcon style={profileDetailStyle} />,
      desc: "Joined July 2022",
    },
    {
      type: "location",
      icon: <LocationOnOutlinedIcon style={profileDetailStyle} />,
      desc: "Silicon valley",
    },
    {
      type: "email",
      icon: <AlternateEmailOutlinedIcon style={profileDetailStyle} />,
      desc: "Gbolahanahmed1@gmail.com",
    },
    {
      type: "facebook",
      icon: <FontAwesomeIcon icon={faFacebook} />,
      desc: user?.facebook || "",
    },
    {
      type: "twitter",
      icon: <FontAwesomeIcon icon={faTwitter} />,
      desc: user?.twitter || "",
    },
    {
      type: "instagram",
      icon: <FontAwesomeIcon icon={faInstagram} />,
      desc: user?.instagram || "",
    },
    {
      type: "linkedin",
      icon: <FontAwesomeIcon icon={faLinkedinIn} />,
      desc: user?.linkedIn || "",
    },
    {
      type: "website",
      icon: <FontAwesomeIcon icon={faGlobe} />,
      desc: user?.website || "",
    },
  ];

  const content = profileDetails.reduce((accum, current, index) => {
    const { type, icon, desc } = current;
    if (desc) {
      accum.push(
        <div key={index} className="ptd-item">
          <i className="ptdi-icon">{icon}</i>
          <div className="ptdi-desc">
            {type === "website" ? desc : getUsernameFromLink(desc)}
          </div>
        </div>
      );
    }

    return accum;
  }, []);

  return (
    <>
      <div className="profile-top-details">
        <h3>INTRO</h3>
        {content}
      </div>
    </>
  );
}
