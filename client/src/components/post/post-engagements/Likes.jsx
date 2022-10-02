import "./likes.css";
import {
  showPopupOnOpaqueOverlay,
  truncateLikesEngagements,
} from "../../../util/functions";
import HomeUserAvatar from "../../home-user-avatar/HomeUserAvatar";
import { useDispatch } from "react-redux";
import { openEngagedUsersList } from "../../../app/actions/homeActions";
import { engagedUsersListType, likeType } from "../../../util/types";

export default function Likes({ likes }) {
  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    showPopupOnOpaqueOverlay(openEngagedUsersList, engagedUsersListType, {
      type: likeType,
      userIds: likes,
    });
  };

  const content = likes.reduce((accum, current, index) => {
    if (index <= 2) {
      accum.push(
        <div key={index} className="likes-indicator">
          <HomeUserAvatar userId={current} size="2.2" />
        </div>
      );
    }
    return accum;
  }, []);

  return (
    <div className="post-bottom-left">
      {content}
      {likes.length > 3 && (
        <div
          className="home-user-avatar likes-indicator like-count-remainder"
          onClick={(e) => handleClick(e)}
        >
          {/* Write a function to remove the plus sign when the value ceases to contain the circle */}
          +{truncateLikesEngagements(likes.length - 3)}
        </div>
      )}
    </div>
  );
}
