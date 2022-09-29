import { iconStyle } from "./iconDescContent";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CommentIcon from "@mui/icons-material/Comment";
import IosShareIcon from "@mui/icons-material/IosShare";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";

export const description = [
  { type: "like", text: "Liked your" },
  { type: "repost", text: "Reposted your" },
  { type: "comment", text: "Commented on your" },
  { type: "follow", text: "Followed you" },
  { type: "mention", text: "Mentioned you" },
  { type: "post", text: "Added a new" },
];

export const notificationIcons = [
  {
    type: "like",
    icon: <FontAwesomeIcon icon={faHeart} />,
  },
  {
    type: "comment",
    icon: <FontAwesomeIcon icon={faCommentDots} />,
  },
  {
    type: "repost",
    icon: <FontAwesomeIcon icon={faShareFromSquare} />,
  },
  {
    type: "follow",
    icon: <PersonRoundedIcon style={{ ...iconStyle, fontSize: "0.9rem" }} />,
  },
  {
    type: "mention",
    icon: <AlternateEmailIcon style={{ ...iconStyle, fontSize: "0.85rem" }} />,
  },
  {
    type: "post",
    icon: <PostAddIcon style={{ ...iconStyle, fontSize: "0.9rem" }} />,
  },
];
