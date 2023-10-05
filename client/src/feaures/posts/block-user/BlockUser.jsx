import { useSelector, useDispatch } from "react-redux";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import { closeBlockPoster } from "../../../app/actions/homeActions";
import {
  closePopupOnOpaqueOverlay,
  fieldUpdate,
} from "../../../util/functions";
import { getBlockPosterstate } from "../post-excerpt/postExcerptSlice";
import {
  selectFetchedUsersById,
  useBlockUserMutation,
} from "../../../app/api-slices/usersApiSlice";
import { useContext } from "react";
import { GeneralContext } from "../../../routes/Router";
import { showConfirmation } from "../../../app/actions/layoutActions";

export const getBlockArgs = (authUser, user) => ({
  authUserId: authUser.id,
  userId: user.id,
  updates: {
    youBlocked: fieldUpdate({
      record: authUser,
      updateFieldKey: "youBlocked",
      checkId: user.id,
      checkKey: "userId",
    }),
    blockedYou: fieldUpdate({
      record: user,
      updateFieldKey: "blockedYou",
      checkId: authUser.id,
      checkKey: "userId",
    }),
    authUserFollowing: fieldUpdate({
      record: authUser,
      updateFieldKey: "following",
      checkId: user.id,
      checkKey: "userId",
      type: "pull only",
    }),
    userFollowers: fieldUpdate({
      record: user,
      updateFieldKey: "followers",
      checkId: authUser.id,
      checkKey: "userId",
      type: "pull only",
    }),
    userFollowing: fieldUpdate({
      record: user,
      updateFieldKey: "following",
      checkId: authUser.id,
      checkKey: "userId",
      type: "pull only",
    }),
    authUserFollowers: fieldUpdate({
      record: authUser,
      updateFieldKey: "followers",
      checkId: user.id,
      checkKey: "userId",
      type: "pull only",
    }),
  },
});

export default function BlockUser() {
  const dispatch = useDispatch();
  const { id: posterId } = useSelector(getBlockPosterstate);
  const { authUser, isBlocked } = useContext(GeneralContext);
  const { userId } = useSelector((state) => selectPostById(state, posterId));

  const user = useSelector((state) => selectFetchedUsersById(state, userId));

  const blockState = isBlocked(userId) ? "Unblock" : "Block";

  const [block, { error }] = useBlockUserMutation();

  const handleBlock = (e) => {
    e && e.preventDefault();
    const args = getBlockArgs(authUser, user);
    block(args);
    closePopupOnOpaqueOverlay(closeBlockPoster);
    dispatch(
      showConfirmation({
        type: "block",
        progress: 100,
        message: `You ${blockState}ed @${user.username}`,
      })
    );
  };

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          {blockState} @{user.username}
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
          <button className="ffPost-button ffPost-submit" onClick={handleBlock}>
            {blockState}
          </button>
        </footer>
      </div>
    </div>
  );
}
