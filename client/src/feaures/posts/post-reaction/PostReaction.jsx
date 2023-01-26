import "./post-reaction.css";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useDispatch, useSelector } from "react-redux";
import { openPostShare } from "../../../app/actions/homeActions";
import { iconStyle } from "../../../util/iconDescContent";
import { useEffect, useMemo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  selectPostById,
  useReactToPostMutation,
} from "../../../app/api-slices/postsApiSlice";
import { selectPostTotalComments } from "../../comments/commentsApiSlice";
import { postShareType } from "../../../util/types";
import {
  removeFromAnArray,
  showPopupOnTransparentOverlay,
} from "../../../util/functions";
import { useContext } from "react";
import { GeneralContext } from "../../../routes/Router";

export default function PostReaction({
  postId,
  username,
  visibleFor,
  comment,
}) {
  const post = useSelector((state) => selectPostById(state, postId));
  const likesTotal = (post?.likes || []).length;
  const repostsTotal = (post?.reposts || []).length;
  const commentsTotal = useSelector((state) =>
    selectPostTotalComments(state, postId)
  );

  const {
    authUser: { id: authUserId },
  } = useContext(GeneralContext);
  const [react] = useReactToPostMutation();

  const [isLiked, isReposted] = useMemo(() => {
    const isLiked = post.likes.some(({ userId }) => userId === authUserId);
    const isReposted = post.reposts.some(({ userId }) => userId === authUserId);
    return [isLiked, isReposted];
  }, [post, authUserId]);

  const handleChange = (e) => {
    const type = `${e.target.name}s`;

    const addReaction = () => [...post[type], { userId: authUserId }];
    const removeReaction = () =>
      removeFromAnArray(post[type], "userId", authUserId);

    const checked = { likes: isLiked, reposts: isReposted };
    const update = checked[type] ? removeReaction : addReaction;
    const args = {
      postId: post.id,
      type,
      fetchType: { name: post.fetchEndPoint, args: post.fetchArgs },
      update,
    };

    react(args);
  };
  const handleClick = (e, action) => {
    e && e.stopPropagation && e.stopPropagation();
    // Not all clicks here have actual click actions. Just making sure to stopPropagation
    action && action();
  };

  const showPostShare = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    const overlayParams = {
      type: postShareType,
      x: e.clientX,
      y: e.clientY,
      isBottom: true,
    };
    const postShareParams = {
      postId,
      username,
    };
    showPopupOnTransparentOverlay(
      openPostShare,
      overlayParams,
      postShareParams
    );
  };

  return (
    <div className={`post-interaction ${comment ? "comment-interaction" : ""}`}>
      <span className="pi-item" onClick={(e) => handleClick(e)}>
        <label
          className="pi-icon likePost"
          id={!isLiked ? "not-liked" : "liked"}
          htmlFor={`likePost${postId}`}
        >
          <div>
            {!isLiked ? (
              <i>
                <FontAwesomeIcon icon={regularHeart} />
              </i>
            ) : (
              <i className="like-animation">
                <FontAwesomeIcon icon={solidHeart} />
              </i>
            )}
            <span>{comment && likesTotal > 0 && likesTotal}</span>
          </div>
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
      <span className="pi-item" onClick={(e) => handleClick(e)}>
        <label className="pi-icon" id="comment">
          <div>
            <i>
              <FontAwesomeIcon icon={faCommentDots} />
            </i>
            <span>{comment && commentsTotal > 0 && commentsTotal}</span>
          </div>
        </label>
      </span>

      <span className="pi-item" onClick={(e) => handleClick(e)}>
        <label
          className={`pi-icon reposts ${
            isReposted ? "reposted" : "not-reposted"
          } ${visibleFor === "Public" ? "" : "disabled"}`}
          htmlFor={`repost${postId}`}
        >
          <div>
            <i className={isReposted ? "repost-animation" : ""}>
              <FontAwesomeIcon icon={faShareFromSquare} />
            </i>
            <span>{comment && repostsTotal > 0 && repostsTotal}</span>
          </div>
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

      <span className="pi-item" onClick={showPostShare}>
        <i className="pi-icon share">
          <ShareOutlinedIcon style={{ ...iconStyle, fontSize: "1.4rem" }} />
        </i>
      </span>
    </div>
  );
}
