import "./others.css";
import {
  showPopupOnOpaqueOverlay,
  truncateEngagements,
} from "../../../util/functions";
import { useSelector } from "react-redux";
import { selectPostTotalComments } from "../../../feaures/comments/commentsApiSlice";
import { useDispatch } from "react-redux";
import { openEngagedUsersList } from "../../../app/actions/homeActions";
import {
  engagedUsersListType,
  repostType,
  otherRepostType,
  otherLikeType,
  othercommentType,
  likeType,
} from "../../../util/types";

export default function Others({ postId, reposts, likes }) {
  const repostTotal = reposts.length;

  const commentsTotal = useSelector((state) =>
    selectPostTotalComments(state, postId)
  );

  const commentsOrLikesTotal = likes ? likes.length : commentsTotal;
  const commentsOrLikesType = likes ? otherLikeType : othercommentType;

  const types = {
    [repostType]: { type: repostType, userIds: reposts },
    [likeType]: { type: likeType, userIds: likes },
  };

  const handleClick = (e, type) => {
    e && e.stopPropagation && e.stopPropagation();
    type !== othercommentType &&
      showPopupOnOpaqueOverlay(
        openEngagedUsersList,
        engagedUsersListType,
        types[type]
      );
  };

  return (
    <div className="post-bottom-right">
      {commentsOrLikesTotal > 0 && (
        <span
          className="comments-count"
          onClick={(e) => handleClick(e, commentsOrLikesType)}
        >
          {truncateEngagements(commentsOrLikesTotal)}{" "}
          {`${commentsOrLikesType}${commentsOrLikesTotal === 1 ? "" : "s"}`}
        </span>
      )}
      {repostTotal > 0 && (
        <span
          className="share-count"
          onClick={(e) => handleClick(e, repostType)}
        >
          {truncateEngagements(repostTotal)}{" "}
          {`${otherRepostType}${repostTotal === 1 ? "" : "s"}`}
        </span>
      )}
    </div>
  );
}
