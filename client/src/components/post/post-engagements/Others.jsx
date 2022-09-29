import "./others.css";
import {
  showPopupOnOpaqueOverlay,
  truncateEngagements,
} from "../../../util/functions";
import { useSelector } from "react-redux";
import { selectPostTotalComments } from "../../../feaures/comments/commentsApiSlice";
import { useDispatch } from "react-redux";
import { openEngagedUsersList } from "../../../app/actions/homeActions";
import { engagedUsersListType, repostType } from "../../../util/types";

export default function Others({ postId, reposts }) {
  const repostLength = reposts.length;

  const commentsTotal = useSelector((state) =>
    selectPostTotalComments(state, postId)
  );

  const handleClick = () =>
    showPopupOnOpaqueOverlay(openEngagedUsersList, engagedUsersListType, {
      type: repostType,
      userIds: reposts,
    });

  return (
    <div className="post-bottom-right">
      {commentsTotal > 0 && (
        <span className="comments-count">
          {truncateEngagements(commentsTotal)}{" "}
          {commentsTotal === 1 ? "comment" : "comments"}
        </span>
      )}
      {repostLength > 0 && (
        <span className="share-count" onClick={handleClick}>
          {truncateEngagements(repostLength)}{" "}
          {repostLength === 1 ? "repost" : "reposts"}
        </span>
      )}
    </div>
  );
}
