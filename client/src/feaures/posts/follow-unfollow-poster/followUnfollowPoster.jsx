import "./follow-unfollow-poster.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFetchedUsersById,
  useFollowUserMutation,
} from "../../../app/api-slices/usersApiSlice";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { closeFollowPoster } from "../../../app/actions/homeActions";
import { getFollowPosterstate } from "../post-excerpt/postExcerptSlice";
import {
  closePopupOnOpaqueOverlay,
  fieldUpdate,
} from "../../../util/functions";
import { GeneralContext } from "../../../routes/Router";
import { useContext } from "react";
import { showConfirmation } from "../../../app/actions/layoutActions";

export default function FollowUnfollowPoster() {
  const dispatch = useDispatch();
  const { id: followPosterId } = useSelector(getFollowPosterstate);
  const { authUser, isFollowing } = useContext(GeneralContext);
  // The post must have been fetched before this component can be rendered, so destructuring it straightaway is okay.
  const { userId } = useSelector((state) =>
    selectPostById(state, followPosterId)
  );
  const user = useSelector((state) => selectFetchedUsersById(state, userId));

  const followState = isFollowing(userId) ? "Unfollow" : "Follow";

  const [follow, { error }] = useFollowUserMutation();

  const handleFollow = (e) => {
    e && e.preventDefault();
    const args = {
      authUserId: authUser.id,
      userId,
      updates: {
        following: fieldUpdate({
          record: authUser,
          updateFieldKey: "following",
          checkId: userId,
          checkKey: "userId",
        }),
        followers: fieldUpdate({
          record: user,
          updateFieldKey: "followers",
          checkId: authUser.id,
          checkKey: "userId",
        }),
      },
    };

    follow(args);
    closePopupOnOpaqueOverlay(closeFollowPoster);
    dispatch(
      showConfirmation({
        type: "follow",
        progress: 100,
        message: `You ${followState}ed @${user.username}`,
      })
    );
  };

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          {followState} @{user.username}
        </header>
        <main className="ffPost-main">
          Their posts will no longer show up on your home timeline.
        </main>
        <footer className="ffPost-footer">
          <button
            className={`ffPost-button ffPost-${
              isFollowing(userId) ? "submit" : "cancel"
            }`}
            onClick={() => closePopupOnOpaqueOverlay(closeFollowPoster)}
          >
            Cancel
          </button>
          <button
            className={`ffPost-button ffPost-${
              isFollowing(userId) ? "cancel" : "submit"
            }`}
            onClick={handleFollow}
          >
            {followState}
          </button>
        </footer>
      </div>
    </div>
  );
}
