import { useContext, useMemo, useEffect, useState } from "react";
import { StoryContext } from "./Story";
import { useSelector } from "react-redux";
import { selectFetchedUsersById } from "../../app/api-slices/usersApiSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { iconStyle } from "../../util/iconDescContent";
import { getDeleteStoryState, getMuteStoryAuthorState } from "./storySlice";
import {
  useDeleteStoryMutation,
  useMuteStoryAuthorMutation,
} from "../../app/api-slices/storiesApiSlice";
import { closePopupOnOpaqueOverlay } from "../../util/functions";
import {
  closeDeleteStory,
  closeMuteStoryAuthor,
} from "../../app/actions/storyActions";

const NextSlide = () => {
  const { isActive: deleteIsActive, storyId: storyIdToDelete } =
    useSelector(getDeleteStoryState);
  const {
    isOpen: userIsToBeMuted,
    isActive: muteIsActive,
    userId: userIdToMute,
  } = useSelector(getMuteStoryAuthorState);

  const {
    setParams,
    handleTransition,
    user,
    storyId,
    users,
    storyIndex,
    userIndex,
    isBlocked,
  } = useContext(StoryContext);

  const [nextUserId, lastStory, lastUserStory] = useMemo(() => {
    const userStories = user?.myStories || [];
    const lastUser = userIndex === users.length - 1 || userIndex < 0;
    // Whenever a user is about to be muted. Regardless of its storyIndex, let current story be registered as the lastUserStory
    const lastUserStory =
      userIsToBeMuted ||
      storyIndex === userStories.length - 1 ||
      storyIndex < 0;
    const lastStory = (lastUser && lastUserStory) || isBlocked;
    const nextUserId = users[lastUser ? userIndex : userIndex + 1]?.userId;
    return [nextUserId, lastStory, lastUserStory];
  }, [user, users, storyIndex, userIndex, isBlocked, userIsToBeMuted]);

  const nextUser = useSelector((state) =>
    selectFetchedUsersById(state, nextUserId)
  );

  const nextParams = useMemo(() => {
    const userStories = user?.myStories || [];
    const nextUserStories = nextUser?.myStories || [];
    return {
      username: lastStory
        ? user?.username
        : lastUserStory
        ? nextUser?.username
        : user?.username,
      storyId: lastStory
        ? storyId
        : lastUserStory
        ? nextUserStories[0]?.storyId
        : userStories[storyIndex + 1]?.storyId,
    };
  }, [lastStory, lastUserStory, user, nextUser, storyId, storyIndex]);

  useEffect(
    () => setParams((currentParams) => ({ ...currentParams, nextParams })),
    [nextParams, setParams]
  );

  const [nextHover, setNextHover] = useState(false);
  const handleMouseOver = () => {
    setNextHover(true);
  };
  const handleMouseOut = () => {
    setNextHover(false);
  };

  //Deleting a story
  const [deleteStory, { error }] = useDeleteStoryMutation();
  const [muteStoryAuthor] = useMuteStoryAuthorMutation();

  useEffect(() => {
    if (deleteIsActive) {
      handleTransition("next");
      closePopupOnOpaqueOverlay(closeDeleteStory);
      deleteStory({ storyId: storyIdToDelete });
    }
    if (muteIsActive) {
      handleTransition("next");
      closePopupOnOpaqueOverlay(closeMuteStoryAuthor);
      muteStoryAuthor({ userId: userIdToMute });
    }
  }, [
    deleteIsActive,
    handleTransition,
    storyIdToDelete,
    deleteStory,
    muteStoryAuthor,
    muteIsActive,
    userIdToMute,
  ]);

  return (
    <aside
      className={`next-story ${lastStory ? "last-story" : ""} ${
        nextHover ? "next-hover" : ""
      }`}
      id={"next"}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={(e) => handleTransition(e.currentTarget.id)}
    >
      <i>
        <ArrowForwardIosIcon style={iconStyle} />
      </i>
    </aside>
  );
};

export default NextSlide;
