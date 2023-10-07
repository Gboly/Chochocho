import "./post-share.css";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { iconStyle } from "../../../util/iconDescContent";
import { useContext, useMemo, useState } from "react";
import {
  closePopupOnTransparentOverlay,
  copyTextToClipboard,
  removeFromAnArray,
} from "../../../util/functions";
import { useDispatch, useSelector } from "react-redux";
import { closePostShare } from "../../../app/actions/homeActions";
import {} from "../../../app/api-slices/usersApiSlice";
import { getPostShareState } from "../post-excerpt/postExcerptSlice";
import { showConfirmation } from "../../../app/actions/layoutActions";
import { GeneralContext } from "../../../routes/Router";
import { useBookmarkPostMutation } from "../../../app/api-slices/postsApiSlice";

export default function PostShare() {
  const dispatch = useDispatch();
  const {
    authUser: { bookmarks },
    isBookmarked: getIsBookmarkedStatus,
  } = useContext(GeneralContext);
  const { postId, username } = useSelector(getPostShareState);

  const isBookmarked = useMemo(
    () => getIsBookmarkedStatus(postId),
    [getIsBookmarkedStatus, postId]
  );

  const [bookmark] = useBookmarkPostMutation();

  const close = () => closePopupOnTransparentOverlay(closePostShare);
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
    const update = isBookmarked
      ? removeFromAnArray(bookmarks, "postId", postId)
      : [...bookmarks, { postId, date: new Date().toISOString() }];
    bookmark({ postId, update });
    dispatch(
      showConfirmation({
        type: "bookmark",
        progress: 100,
        message: `Successfully ${
          isBookmarked ? "removed" : "added"
        } post to bookmarks`,
      })
    );
    close();
  };

  const handleClick = (e, action) => {
    e && e.stopPropagation && e.stopPropagation();
    action && action();
  };

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
