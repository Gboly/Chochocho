import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { iconStyle } from "../../util/iconDescContent";
import { useCallback, useContext, useMemo } from "react";
import { GeneralContext } from "../../routes/Router";
import { useGetUsersByIdQuery } from "../../app/api-slices/usersApiSlice";
import {
  convertToUserFriendlyTime,
  prepareIdsForQuery,
  sortStoryAuthors,
} from "../../util/functions";
import { userIdType } from "../../util/types";
import { useSelector } from "react-redux";
import { selectFetchedUsersById } from "../../app/api-slices/usersApiSlice";
import { useGetStoryByIdQuery } from "../../app/api-slices/storiesApiSlice";
import video from "../../assets/video.mp4";
import { videoType } from "../../util/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const story =
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG92ZSUyMGZsb3dlcnN8ZW58MHx8MHx8&w=1000&q=80";
export const StorySidebar = () => {
  const {
    authUser: { otherStoryAuthors, otherStories },
    viewedUsers,
    activeUsers,
  } = useContext(GeneralContext);

  const { data: storyAuthors, isLoading: storyAuthorsIsLoading } =
    useGetUsersByIdQuery({
      userIds: prepareIdsForQuery(otherStoryAuthors, userIdType),
    });

  const isFetched = (id) => {
    return (storyAuthors?.ids || []).includes(id);
  };

  const viewedUserStories = viewedUsers.map(
    ({ userId }) =>
      isFetched(userId) && (
        <UserStory
          key={userId}
          userId={userId}
          viewed={true}
          allStories={otherStories}
        />
      )
  );
  const activeUserStories = activeUsers.map(
    ({ userId }) =>
      isFetched(userId) && (
        <UserStory
          key={userId}
          userId={userId}
          viewed={false}
          allStories={otherStories}
        />
      )
  );

  return (
    <aside className="story-sidebar">
      <header>
        <h1>Stories</h1>
        <i>
          <SettingsIcon style={iconStyle} />
        </i>
      </header>
      <section className="auth-user-section">
        <p>Your story</p>
        <div className="story-list">
          <CreateStory />
        </div>
      </section>
      {activeUserStories.length > 0 && (
        <section className="other-users-section">
          <p>Recent updates</p>
          <div className="story-list">{activeUserStories}</div>
          {/* skeleton whenever isLoading */}
        </section>
      )}
      {viewedUserStories.length > 0 && (
        <section className="other-users-section">
          <p>Viewed updates</p>
          <div className="story-list">{viewedUserStories}</div>
          {/* skeleton whenever isLoading */}
        </section>
      )}
    </aside>
  );
};

const CreateStory = () => {
  return (
    <div className="story-item create-story-container">
      <section className="create-story">
        <i>
          <AddIcon />
        </i>
      </section>
      <article>
        <div>Create a story</div>
        <div>Share a photo or video.</div>
      </article>
    </div>
  );
};

const UserStory = ({ userId, viewed, allStories }) => {
  const navigate = useNavigate();
  const { username, myStories } = useSelector((state) =>
    selectFetchedUsersById(state, userId)
  );

  const posterStoryId = useMemo(() => {
    return myStories[myStories.length - 1].storyId;
  }, [myStories]);

  const { data: story, isLoading: storyIsLoading } =
    useGetStoryByIdQuery(posterStoryId);

  const storyToBeViewedId = useMemo(() => {
    // This works fine only if the allStories result is sorted based on time created.
    const storyToBeViewed = allStories.find(
      (story) => story.userId === userId && !story.viewed
    );
    return storyToBeViewed ? storyToBeViewed.storyId : myStories[0].storyId;
  }, [myStories, allStories, userId]);

  const handleClick = () => {
    navigate(`/story/${username}/${storyToBeViewedId}`);
  };

  return (
    <>
      {story && (
        <div className="story-item" onClick={handleClick}>
          {story.mediaType === videoType ? (
            <video
              src={video}
              alt="last story post vid"
              className={`${viewed ? "viewed" : ""}`}
            />
          ) : (
            <img
              src={story.media}
              alt="last story post"
              className={`${viewed ? "viewed" : ""}`}
            />
          )}
          <article>
            <div>{username}</div>
            <div>{convertToUserFriendlyTime(story.createdAt)}</div>
          </article>
        </div>
      )}
    </>
  );
};
