import React, { useContext, useEffect, useMemo } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSelector } from "react-redux";
import { selectFetchedUsersById } from "../../app/api-slices/usersApiSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { iconStyle } from "../../util/iconDescContent";
import { useState } from "react";
import { StoryContext } from "./Story";

const PrevSlide = () => {
  const {
    setParams,
    handleTransition,
    user,
    storyId,
    users,
    storyIndex,
    userIndex,
  } = useContext(StoryContext);

  const [prevUserId, firstStory, firstUserStory] = useMemo(() => {
    const firstUser = userIndex <= 0;
    const firstUserStory = storyIndex <= 0;
    const firstStory = firstUser && firstUserStory;
    const prevUserId = users[firstUser ? userIndex : userIndex - 1]?.userId;
    return [prevUserId, firstStory, firstUserStory];
  }, [users, storyIndex, userIndex]);

  const prevUser = useSelector((state) =>
    selectFetchedUsersById(state, prevUserId)
  );

  const prevParams = useMemo(() => {
    const userStories = user?.myStories || [];
    const prevUserStories = prevUser?.myStories || [];
    return {
      username: firstUserStory ? prevUser?.username : user?.username,
      storyId: firstStory
        ? storyId
        : firstUserStory
        ? prevUserStories[prevUserStories.length - 1]?.storyId
        : userStories[storyIndex - 1]?.storyId,
    };
  }, [firstUserStory, prevUser, user, storyId, firstStory, storyIndex]);

  useEffect(
    () => setParams((currentParams) => ({ ...currentParams, prevParams })),
    [prevParams, setParams]
  );

  const [prevHover, setPrevHover] = useState(false);
  const handleMouseOver = () => {
    setPrevHover(true);
  };
  const handleMouseOut = () => {
    setPrevHover(false);
  };

  return (
    <aside
      className={`prev-story ${firstStory ? "first-story" : ""} ${
        prevHover ? "prev-hover" : ""
      }`}
      id={"prev"}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={(e) => handleTransition(e.currentTarget.id)}
    >
      <i>
        <ArrowBackIosNewIcon style={iconStyle} />
      </i>
    </aside>
  );
};

export default PrevSlide;
