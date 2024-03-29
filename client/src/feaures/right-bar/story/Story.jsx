import "./story.css";
import AddIcon from "@mui/icons-material/Add";
import { iconStyle } from "../../../util/iconDescContent";
import { useContext, useMemo } from "react";
import {
  selectFetchedUsersById,
  useGetUsersByIdQuery,
} from "../../../app/api-slices/usersApiSlice";
import { handleMediaUpload, prepareIdsForQuery } from "../../../util/functions";
import { imageType, userIdType, videoType } from "../../../util/types";
import { useSelector } from "react-redux";
import { useGetStoryByIdQuery } from "../../../app/api-slices/storiesApiSlice";
import video from "../../../assets/video.mp4";
import { GeneralContext } from "../../../routes/Router";
import { useNavigate } from "react-router-dom";
import { readUploadedMedia } from "../../../app/actions/storyActions";

const Story = () => {
  const {
    authUser: { otherStoryAuthors, otherStories, myStories },
    viewedUsers,
    activeUsers,
  } = useContext(GeneralContext);

  const { data: storyAuthors, isLoading: storyAuthorsIsLoading } =
    useGetUsersByIdQuery(
      {
        userIds: prepareIdsForQuery(otherStoryAuthors, userIdType),
      },
      { skip: otherStoryAuthors.length < 1 }
    );

  const isFetched = (id) => {
    return (storyAuthors?.ids || []).includes(id);
  };

  return (
    <div className="story-container">
      <CreateStory />
      {myStories.length > 0 && (
        <UserStory
          viewed={myStories.every((story) => story.viewed)}
          isAuthUser={true}
        />
      )}
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
  const navigate = useNavigate();
  const handleMedia = (e) => {
    handleMediaUpload(e, readUploadedMedia);
    navigate("/story/preview");
  };

  return (
    <>
      <label htmlFor="home-create-story" className="rightbar-story-item">
        <section className="rightbar-create-story">
          <i>
            <AddIcon style={iconStyle} />
          </i>
        </section>
        <div>Create a story</div>
      </label>
      <input
        type="file"
        name=""
        id="home-create-story"
        onChange={handleMedia}
        accept="image/*, video/*"
        className="home-create-story"
      />
    </>
  );
};
export const UserStory = ({
  userId,
  viewed,
  allStories: otherStories,
  isAuthUser,
}) => {
  const navigate = useNavigate();
  // Could have just passed the authUserId as the userId prop and myStories from authUser as allStories prop, Only that for some reason, the authUser was not fetched.
  const user = useSelector((state) => selectFetchedUsersById(state, userId));
  const {
    authUser: { username: authUsername, myStories: authUserStories },
  } = useContext(GeneralContext);

  const [myStories, allStories, username, posterStoryId] = useMemo(() => {
    const myStories = isAuthUser ? authUserStories : user?.myStories;
    const allStories = isAuthUser ? authUserStories : otherStories;
    const username = isAuthUser ? authUsername : user?.username;
    const posterStoryId = myStories[myStories.length - 1].storyId;

    return [myStories, allStories, username, posterStoryId];
  }, [user, authUserStories, isAuthUser, otherStories, authUsername]);

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
              src={story.media || video}
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
          <div>{isAuthUser ? "You" : username}</div>
        </div>
      )}
      {/* skeleton whenever isLoading */}
    </>
  );
};

export default Story;
