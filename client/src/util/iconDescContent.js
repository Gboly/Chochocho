import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
//Notifications
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
//visibilityOff

import {
  hidePost,
  openReportPost,
  openFollowPoster,
  openBlockPoster,
  openDeletePost,
  openEditPost,
} from "../app/actions/homeActions";

import {
  editPostType,
  blockPosterType,
  unfollowPosterType,
  reportPostType,
  deletePostType,
  hidePostType,
  postNotifcationType,
  pinPostType,
} from "./types";

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

export const iconStyle = {
  fontSize: "inherit",
  color: "inherit",
  fontWeight: "inherit",
};

export const iconDescContent = [
  {
    desc: "Media",
    icon: <PermMediaOutlinedIcon style={iconStyle} />,
  },
  {
    desc: "Tag",
    icon: <LocalOfferOutlinedIcon style={iconStyle} />,
  },
  {
    desc: "Feeling",
    icon: <SentimentSatisfiedOutlinedIcon style={iconStyle} />,
  },
];

export const othersPostOptions = [
  {
    desc: hidePostType,
    icon: <VisibilityOffOutlinedIcon style={iconStyle} />,
    action: hidePost,
    dispatch: true,
  },
  {
    desc: postNotifcationType,
    icon: <NotificationsOutlinedIcon style={iconStyle} />,
    action: "",
  },
  {
    desc: reportPostType,
    icon: <ReportOutlinedIcon style={iconStyle} />,
    action: openReportPost,
  },
  {
    desc: unfollowPosterType,
    icon: <PersonRemoveOutlinedIcon style={iconStyle} />,
    action: openFollowPoster,
  },
  {
    desc: blockPosterType,
    icon: <BlockOutlinedIcon style={iconStyle} />,
    action: openBlockPoster,
  },
];

export const userPostOptions = [
  {
    desc: deletePostType,
    icon: <DeleteOutlineIcon style={iconStyle} />,
    action: openDeletePost,
  },
  {
    desc: editPostType,
    icon: <ModeEditOutlineOutlinedIcon style={iconStyle} />,
    action: openEditPost,
  },
  {
    desc: pinPostType,
    icon: <PushPinOutlinedIcon style={iconStyle} />,
    action: "",
  },
  {
    desc: postNotifcationType,
    icon: <NotificationsOutlinedIcon style={iconStyle} />,
    action: "",
  },
];

export const notificationOptions = [
  {
    desc: "Mark all as read",
    icon: <DoneAllIcon style={iconStyle} />,
  },
  {
    desc: "Filter notifications",
    icon: <FilterAltOutlinedIcon style={iconStyle} />,
  },
];

export const editProfileData = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeholder: "Ben Joe",
    autoComplete: "on",
  },
  {
    label: "Date of birth",
    type: "text",
    name: "birthday",
    placeholder: "22 June 2002",
    autoComplete: "off",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "ben@cho.com",
    autoComplete: "on",
  },
  {
    label: "Phone number",
    type: "text",
    name: "phone",
    placeholder: "01234567890",
    autoComplete: "off",
  },
  {
    label: "Bio",
    type: "textarea",
    name: "bio",
    placeholder: "Fullstack developer...",
    autoComplete: "off",
  },
  {
    label: "Location",
    type: "text",
    name: "location",
    placeholder: "Ikoyi, Lagos",
    autoComplete: "off",
  },
  {
    label: "Website",
    type: "url",
    name: "website",
    placeholder: "www.chochocho.com",
    autoComplete: "on",
  },
];

export const settingsContent = [
  {
    desc: "Edit profile",
    icon: <PersonOutlineOutlinedIcon style={iconStyle} />,
    pathName: "profile",
  },
  {
    desc: "Notifcation",
    icon: <NotificationsOutlinedIcon style={iconStyle} />,
    pathName: "notification",
  },
  {
    desc: "Blocking",
    icon: <BlockOutlinedIcon style={iconStyle} />,
    pathName: "blocking",
  },
  {
    desc: "Password & security",
    icon: <GppGoodOutlinedIcon style={iconStyle} />,
    pathName: "security",
  },
  // {
  //   desc: "Activity log",
  //   icon: <HistoryOutlinedIcon style={iconStyle} />,
  //   pathName: "activity",
  // },
  {
    desc: "Viewing & sharing",
    icon: <VisibilityOffOutlinedIcon style={iconStyle} />,
    pathName: "viewing",
  },
];

const profileDetailStyle = { ...iconStyle };
profileDetailStyle.fontSize = "1.3rem";
export const profileDetails = [
  {
    type: "DOB",
    icon: <CakeOutlinedIcon style={profileDetailStyle} />,
    desc: "Born",
  },
  {
    type: "joinedDate",
    icon: <CalendarMonthOutlinedIcon style={profileDetailStyle} />,
    desc: "Joined",
  },
  {
    type: "location",
    icon: <LocationOnOutlinedIcon style={profileDetailStyle} />,
    desc: "",
  },
  {
    type: "email",
    icon: <AlternateEmailOutlinedIcon style={profileDetailStyle} />,
    desc: "",
  },
  {
    type: "facebook",
    icon: <FontAwesomeIcon icon={faFacebook} />,
    desc: "",
  },
  {
    type: "twitter",
    icon: <FontAwesomeIcon icon={faTwitter} />,
    desc: "",
  },
  {
    type: "instagram",
    icon: <FontAwesomeIcon icon={faInstagram} />,
    desc: "",
  },
  {
    type: "linkedIn",
    icon: <FontAwesomeIcon icon={faLinkedinIn} />,
    desc: "",
  },
  {
    type: "website",
    icon: <FontAwesomeIcon icon={faGlobe} />,
    desc: "",
  },
];
