import "./follow-unfollow-poster.css";
import { useSelector } from "react-redux";
import { selectFetchedUsersById } from "../../../app/api-slices/usersApiSlice";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { closeFollowPoster } from "../../../app/actions/homeActions";
import { getFollowPosterstate } from "../post-excerpt/postExcerptSlice";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";

export default function FollowUnfollowPoster() {
  const { id: followPosterId } = useSelector(getFollowPosterstate);
  // The post must have been fetched before this component can be rendered, so destructuring it straightaway is okay.
  const { userId } = useSelector((state) =>
    selectPostById(state, followPosterId)
  );

  const { username } = useSelector((state) =>
    selectFetchedUsersById(state, userId)
  );

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          Unfollow @{username}
        </header>
        <main className="ffPost-main">
          Their posts will no longer show up on your home timeline.
        </main>
        <footer className="ffPost-footer">
          <button
            className="ffPost-button ffPost-cancel"
            onClick={() => closePopupOnOpaqueOverlay(closeFollowPoster)}
          >
            Cancel
          </button>
          <button className="ffPost-button ffPost-submit">Unfollow</button>
        </footer>
      </div>
    </div>
  );
}
