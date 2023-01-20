import "./others.css";
import {
  getAnArrayOfSpecificKeyPerObjectInArray,
  showPopupOnOpaqueOverlay,
  truncateEngagements,
} from "../../../util/functions";
import { openEngagedUsersList } from "../../../app/actions/homeActions";
import {
  engagedUsersListType,
  repostType,
  otherRepostType,
  otherLikeType,
  othercommentType,
  likeType,
} from "../../../util/types";

export default function Others({ postId, reposts, likes, comments }) {
  const repostTotal = reposts.length;

  const commentsOrLikesTotal = likes ? likes.length : comments.length;
  const commentsOrLikesType = likes ? otherLikeType : othercommentType;

  const types = {
    [otherRepostType]: {
      type: repostType,
      userIds: getAnArrayOfSpecificKeyPerObjectInArray(reposts, "userId"),
    },
    [otherLikeType]: {
      type: likeType,
      userIds: getAnArrayOfSpecificKeyPerObjectInArray(likes, "userId"),
    },
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
          onClick={(e) => handleClick(e, otherRepostType)}
        >
          {truncateEngagements(repostTotal)}{" "}
          {`${otherRepostType}${repostTotal === 1 ? "" : "s"}`}
        </span>
      )}
    </div>
  );
}
