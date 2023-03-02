import "../follow-unfollow-poster/follow-unfollow-poster.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUserById } from "../../../app/api-slices/usersApiSlice";
import {
  selectPostById,
  useDeletePostMutation,
} from "../../../app/api-slices/postsApiSlice";
import {
  activateRefresh,
  closeDeletePost,
  removePost,
} from "../../../app/actions/homeActions";
import { getDeletePostState } from "../post-excerpt/postExcerptSlice";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";
import { useEffect } from "react";

export default function DeletePost() {
  const dispatch = useDispatch();
  const { id: postId } = useSelector(getDeletePostState);
  // const post = useSelector((state) => selectPostById(state, deletePostId));
  const [deletePostById, { error, isSuccess }] = useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(removePost(postId));
      closePopupOnOpaqueOverlay(closeDeletePost);
    }
  }, [isSuccess, dispatch, postId]);

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
          <button
            className="ffPost-button ffPost-submit"
            onClick={() => deletePostById(postId)}
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
}
