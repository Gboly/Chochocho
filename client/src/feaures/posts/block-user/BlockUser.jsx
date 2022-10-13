import { useSelector } from "react-redux";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { closeBlockPoster } from "../../../app/actions/homeActions";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";
import { getBlockPosterstate } from "../post-excerpt/postExcerptSlice";
import { selectFetchedUsersById } from "../../../app/api-slices/usersApiSlice";

export default function BlockUser() {
  const { id: posterId } = useSelector(getBlockPosterstate);
  const { userId } = useSelector((state) => selectPostById(state, posterId));

  const { username } = useSelector((state) =>
    selectFetchedUsersById(state, userId)
  );

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          Block @{username}
        </header>
        <main className="ffPost-main">
          They can no longer see things you post on your timeline, tag you,
          start a conversation with you or add you as a friend.
        </main>
        <footer className="ffPost-footer">
          <button
            className="ffPost-button ffPost-cancel"
            onClick={() => closePopupOnOpaqueOverlay(closeBlockPoster)}
          >
            Cancel
          </button>
          <button className="ffPost-button ffPost-submit">Block</button>
        </footer>
      </div>
    </div>
  );
}
