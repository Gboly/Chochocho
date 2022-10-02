import "./post-share.css";
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { iconStyle } from "../../../util/iconDescContent";
import { useState } from "react";
import { getCurrentUrl, copyTextToClipboard } from "../../../util/functions";
import { displayConfirmation } from "../../../util/functions";
import { useDispatch } from "react-redux";
import { closePostShare } from "../../../app/actions/homeActions";

export default function PostShare({ postId }) {
  const dispatch = useDispatch();
  const [{ repost: isReposted, bookmark: isBookmarked }, setIsChecked] =
    useState({ repost: false, bookmark: false });

  const handleCopy = () => {
    // Change post link.
    const result = copyTextToClipboard(`${getCurrentUrl()}#${postId}`);
    result.then((data) =>
      data ? displayConfirmation("copy") : alert("failed to copy link to post.")
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
