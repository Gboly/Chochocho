import "../follow-unfollow-poster/follow-unfollow-poster.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { closeDeletePost } from "../../../app/actions/homeActions";
import { getDeletePostState } from "../post-excerpt/postExcerptSlice";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";

export default function DeletePost() {
  // const { id: deletePostId } = useSelector(getDeletePostState);
  // const post = useSelector((state) => selectPostById(state, deletePostId));

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          Delete Post
        </header>
        <main className="ffPost-main">
          Are you sure you want to delete this post ?
        </main>
        <footer className="ffPost-footer">
          <button
            className="ffPost-button ffPost-cancel"
            onClick={() => closePopupOnOpaqueOverlay(closeDeletePost)}
          >
            Cancel
          </button>
          <button className="ffPost-button ffPost-submit">Delete</button>
        </footer>
      </div>
    </div>
  );
}
