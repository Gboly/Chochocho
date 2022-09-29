import "./follow-unfollow-poster.css";
import { useSelector } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { closeFollowPoster } from "../../../app/actions/homeActions";
import { getFollowPosterstate } from "../post-excerpt/postExcerptSlice";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";

export default function FollowUnfollowPoster() {
  const { id: followPosterId } = useSelector(getFollowPosterstate);
  const post = useSelector((state) => selectPostById(state, followPosterId));
  const user = useSelector((state) => selectUserById(state, post?.userId));

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          Unfollow @{user?.username}
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
