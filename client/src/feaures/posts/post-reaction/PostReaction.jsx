import "./post-reaction.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useDispatch } from "react-redux";
import { openPostShare } from "../../../app/actions/homeActions";
import { iconStyle } from "../../../util/iconDescContent";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";

export default function PostReaction({ postId, visibleFor }) {
  const dispatch = useDispatch();
  const [{ like: isLiked, repost: isReposted }, setIsChecked] = useState({
    like: false,
    repost: false,
  });

  const handleChange = (e) => {
    setIsChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  return (
    <div className="post-interaction">
      <span className="pi-item">
        <label htmlFor={`likePost${postId}`}>
          {!isLiked ? (
            <i className="pi-icon likePost" id="not-liked">
              <FontAwesomeIcon icon={solidHeart} />
            </i>
          ) : (
            <i className="pi-icon likePost" id="liked">
              <FontAwesomeIcon icon={regularHeart} />
            </i>
          )}
        </label>
        <input
          onChange={handleChange}
          checked={isLiked}
          type="checkbox"
          name="like"
          id={`likePost${postId}`}
          style={{ display: "none" }}
        />
      </span>
      <span className="pi-item">
        <i className="pi-icon" id="comment">
          <FontAwesomeIcon icon={faCommentDots} />
        </i>
      </span>

      <span className="pi-item">
        <label htmlFor={`repost${postId}`}>
          <i
            className={`pi-icon reposts ${
              isReposted ? "reposted" : "not-reposted"
            } ${visibleFor === "Public" ? "" : "disabled"}`}
          >
            <FontAwesomeIcon icon={faShareFromSquare} />
          </i>
        </label>
        <input
          onChange={handleChange}
          checked={isReposted}
          type="checkbox"
          name="repost"
          id={`repost${postId}`}
          style={{ display: "none" }}
          disabled={visibleFor === "Public" ? false : true}
        />
      </span>

      <span className="pi-item" onClick={() => dispatch(openPostShare(postId))}>
        <i className="pi-icon share">
          <ShareOutlinedIcon style={{ ...iconStyle, fontSize: "1.4rem" }} />
        </i>
      </span>
    </div>
  );
}
