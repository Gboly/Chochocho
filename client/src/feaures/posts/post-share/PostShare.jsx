import "./post-share.css";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { iconStyle } from "../../../util/iconDescContent";
import { useState } from "react";
import { copyTextToClipboard } from "../../../util/functions";
import { displayConfirmation } from "../../../util/functions";
import { useDispatch, useSelector } from "react-redux";
import { closePostShare } from "../../../app/actions/homeActions";
import {} from "../../../app/api-slices/usersApiSlice";
import { getPostShareState } from "../post-excerpt/postExcerptSlice";
import { showConfirmation } from "../../../app/actions/layoutActions";

export default function PostShare() {
  const dispatch = useDispatch();
  const [{ bookmark: isBookmarked }, setIsChecked] = useState({
    bookmark: false,
  });
  const { postId, username } = useSelector(getPostShareState);

  const handleCopy = () => {
    // Change post link.
    const result = copyTextToClipboard(
      `${window.location.origin}/${username}/post/${postId}`
    );
    result.then((data) =>
      data
        ? dispatch(showConfirmation({ type: "copy", progress: 100 }))
        : alert("failed to copy link to post.")
    );
  };

  const handleChange = (e) => {
    setIsChecked((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleClick = (e, action) => {
    e && e.stopPropagation && e.stopPropagation();
    action && action();
  };

  const close = () => dispatch(closePostShare());

  return (
    <div className="post-share-container">
      <div className="post-share-wrapper">
        <div className="post-share-item" onClick={handleClick}>
          <label htmlFor="bookmark">
            <i className="psi-icon">
              {isBookmarked ? (
                <BookmarkRemoveOutlinedIcon style={iconStyle} />
              ) : (
                <BookmarkAddOutlinedIcon style={iconStyle} />
              )}
            </i>
            <span className="psi-desc">
              {isBookmarked ? "Remove from" : "Add to"} Bookmarks
            </span>
          </label>
          <input
            type="checkbox"
            name="bookmark"
            id="bookmark"
            checked={isBookmarked}
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="post-share-item" onClick={handleClick}>
          <i className="psi-icon">
            <LocalPostOfficeOutlinedIcon style={iconStyle} />
          </i>
          <span className="psi-desc">Share via Direct Message</span>
        </div>
        <div
          className="post-share-item"
          onClick={(e) =>
            handleClick(e, () => {
              handleCopy();
              close();
            })
          }
        >
          <i className="psi-icon">
            <LinkOutlinedIcon style={iconStyle} />
          </i>
          <span className="psi-desc">Copy link to Post</span>
        </div>
      </div>
    </div>
  );
}
