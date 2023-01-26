import "./likes.css";
import {
  showPopupOnOpaqueOverlay,
  truncateLikesEngagements,
  prepareUserIdsForQuery,
  prepareIdsForQuery,
  getAnArrayOfSpecificKeyPerObjectInArray,
} from "../../../util/functions";
import HomeUserAvatar from "../../home-user-avatar/HomeUserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { openEngagedUsersList } from "../../../app/actions/homeActions";
import { engagedUsersListType, likeType } from "../../../util/types";
import {
  selectFetchedUsersById,
  useGetUsersByIdQuery,
} from "../../../app/api-slices/usersApiSlice";
import { useEffect } from "react";

const start = 0;
const end = 3;
export default function Likes({ likes }) {
  const handleClick = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    showPopupOnOpaqueOverlay(openEngagedUsersList, engagedUsersListType, {
      type: likeType,
      userIds: getAnArrayOfSpecificKeyPerObjectInArray(likes, "userId"),
    });
  };

  const {
    isLoading: UsersThatLikedFetchIsLoading,
    data: usersThatLikedResult,
  } = useGetUsersByIdQuery({
    userIds: prepareIdsForQuery(likes, "userId"),
    start,
    end,
  });

  // useEffect(() => {
  //   console.log(likes, usersThatLikedResult);
  // }, [likes, usersThatLikedResult]);

  const isFetched = (userId) =>
    (usersThatLikedResult || []).ids?.includes(userId) || false;

  const content = likes.map(({ userId }) => {
    return isFetched(userId) && <Liked key={userId} userId={userId} />;
  });

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

const Liked = ({ userId }) => {
  const { profileImage } = useSelector((state) =>
    selectFetchedUsersById(state, userId)
  );

  return (
    <div className="likes-indicator">
      <HomeUserAvatar userId={userId} size="2.2" src={profileImage} />
    </div>
  );
};
