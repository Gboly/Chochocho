import { useContext, useMemo, useEffect, useState } from "react";
import { StoryContext } from "./Story";
import { useSelector } from "react-redux";
import { selectFetchedUsersById } from "../../app/api-slices/usersApiSlice";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { iconStyle } from "../../util/iconDescContent";

const NextSlide = () => {
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
    const lastUserStory =
      storyIndex === userStories.length - 1 || storyIndex < 0;
    const lastStory = (lastUser && lastUserStory) || isBlocked;
    const nextUserId = users[lastUser ? userIndex : userIndex + 1]?.userId;
    return [nextUserId, lastStory, lastUserStory];
  }, [user, users, storyIndex, userIndex, isBlocked]);

  const nextUser = useSelector((state) =>
    selectFetchedUsersById(state, nextUserId)
  );

  const nextParams = useMemo(() => {
    const userStories = user?.myStories || [];
    const nextUserStories = nextUser?.myStories || [];
    return {
      username: lastUserStory ? nextUser?.username : user?.username,
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
