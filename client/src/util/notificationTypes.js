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
import {
  otherLikeType,
  commentType,
  otherRepostType,
  followType,
  mentionType,
  postType,
} from "./types";

export const description = [
  { type: otherLikeType, text: "Liked your" },
  { type: otherRepostType, text: "Reposted your" },
  { type: commentType, text: "Commented on your" },
  { type: followType, text: "Followed you" },
  { type: mentionType, text: "Mentioned you" },
  { type: postType, text: "Added a new" },
];

export const notificationIcons = [
  {
    type: otherLikeType,
    icon: <FontAwesomeIcon icon={faHeart} />,
  },
  {
    type: commentType,
    icon: <FontAwesomeIcon icon={faCommentDots} />,
  },
  {
    type: otherRepostType,
    icon: <FontAwesomeIcon icon={faShareFromSquare} />,
  },
  {
    type: followType,
    icon: <PersonRoundedIcon style={{ ...iconStyle, fontSize: "0.9rem" }} />,
  },
  {
    type: mentionType,
    icon: <AlternateEmailIcon style={{ ...iconStyle, fontSize: "0.85rem" }} />,
  },
  {
    type: postType,
    icon: <PostAddIcon style={{ ...iconStyle, fontSize: "0.9rem" }} />,
  },
];
