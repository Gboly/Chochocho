import "./story.css";
import AddIcon from "@mui/icons-material/Add";
import { iconStyle } from "../../../util/iconDescContent";
import { useContext, useMemo } from "react";
import {
  selectFetchedUsersById,
  useGetUsersByIdQuery,
} from "../../../app/api-slices/usersApiSlice";
import { prepareIdsForQuery } from "../../../util/functions";
import { imageType, userIdType, videoType } from "../../../util/types";
import { useSelector } from "react-redux";
import { useGetStoryByIdQuery } from "../../../app/api-slices/storiesApiSlice";
import video from "../../../assets/video.mp4";
import { GeneralContext } from "../../../routes/Router";
import { useNavigate } from "react-router-dom";

const Story = () => {
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

  return (
    <div className="story-container">
      <CreateStory />
      {activeUsers.map(
        ({ userId }) =>
          isFetched(userId) && (
            <UserStory
              key={userId}
              userId={userId}
              viewed={false}
              allStories={otherStories}
            />
          )
      )}
      {viewedUsers.map(
        ({ userId }) =>
          isFetched(userId) && (
            <UserStory
              key={userId}
              userId={userId}
              viewed={true}
              allStories={otherStories}
            />
          )
      )}
      {/* skeleton whenever isLoading */}
    </div>
  );
};

export const CreateStory = () => {
  return (
    <div className="rightbar-story-item">
      <section className="rightbar-create-story">
        <i>
          <AddIcon style={iconStyle} />
        </i>
      </section>
      <div>Create a story</div>
    </div>
  );
};
export const UserStory = ({ userId, viewed, allStories }) => {
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
        <div className="rightbar-story-item" onClick={handleClick}>
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
          <div>{username}</div>
        </div>
      )}
      {/* skeleton whenever isLoading */}
    </>
  );
};

export default Story;
