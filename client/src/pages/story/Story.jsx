import "./story.css";
import Spinner from "../../components/Spinner/Spinner";
import {
  useState,
  useMemo,
  useCallback,
  createContext,
  useRef,
  useContext,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStoryByIdQuery } from "../../app/api-slices/storiesApiSlice";
import { useGetUserByIdQuery } from "../../app/api-slices/usersApiSlice";
import video from "../../assets/video.mp4";
import {
  videoType,
  imageType,
  blockedYouMessage,
  youBlockedMessage,
} from "../../util/types";
import { findByIdKey, getStoryUserDetails } from "../../util/functions";
import PrevSlide from "./prevSlide";
import NextSlide from "./nextSlide";
import StoryHeader from "./StoryHeader";
import { isEqual } from "lodash";
import { GeneralContext } from "../../routes/Router";

export const StoryContext = createContext();
const Story = () => {
  const { authUser } = useContext(GeneralContext);
  const navigate = useNavigate();
  const { username, storyId } = useParams();
  const videoRef = useRef();

  const {
    data: story,
    isLoading: storyFetchIsLoading,
    isError: storyFetchFailed,
  } = useGetStoryByIdQuery(storyId);
  const { data: user, isLoading: userFetchIsLoading } = useGetUserByIdQuery(
    story?.userId,
    { skip: !story?.userId }
  );

  // Check for block
  const isBlocked = findByIdKey(
    [...authUser?.youBlocked, ...authUser?.blockedYou],
    "userId",
    story?.userId
  );

  const [storyIndex, userIndex, users] = useMemo(() => {
    const userStories = user?.myStories || [];
    const storyIndex = userStories.findIndex(
      (myStory) => myStory.storyId === storyId
    );
    const { userIndex, users } = getStoryUserDetails(authUser, user?.id);
    return [storyIndex, userIndex, users];
  }, [user, storyId, authUser]);

  const currentParams = { username, storyId };
  const [{ prevParams, nextParams }, setParams] = useState({
    prevParams: currentParams,
    nextParams: currentParams,
  });

  //Transition
  const handleTransition = useCallback(
    (transitionType) => {
      if (!isBlocked) {
        const { username: newUsername, storyId: newStoryId } =
          transitionType === "prev"
            ? prevParams
            : transitionType === "next"
            ? nextParams
            : { username, storyId };

        // When making a transition on the last story, navigate to the default story route.
        // The nextParams remains the currentParam whenever it gets to the last story
        transitionType === "next" && isEqual(nextParams, { username, storyId })
          ? navigate("/story")
          : navigate(`/story/${newUsername}/${newStoryId}`, { replace: true });
      }
    },
    [nextParams, navigate, prevParams, username, storyId, isBlocked]
  );

  return (
    <StoryContext.Provider
      value={{
        setParams,
        handleTransition,
        user,
        story,
        storyId,
        users,
        storyIndex,
        userIndex,
        isBlocked,
      }}
    >
      <main className="story-page-main">
        <div
          className="media-option-custom-icon close-story"
          onClick={() => navigate(-1)}
        >
          ✖
        </div>
        <PrevSlide />
        <section>
          <div>
            {!storyFetchFailed && story && user && (
              <>
                <StoryHeader ref={videoRef} />
                {isBlocked ? (
                  <BlockedUserStory userId={user.id} />
                ) : story.mediaType === videoType ? (
                  <video ref={videoRef} src={video} alt="story" autoPlay />
                ) : (
                  <img src={story.media} alt="story" />
                )}
              </>
            )}
            {storyFetchIsLoading && userFetchIsLoading && <Spinner />}
            {storyFetchFailed && <WrongLinkAlert />}
          </div>
          <input type="text" name="" id="" placeholder="Reply" />
        </section>
        <NextSlide />
      </main>
    </StoryContext.Provider>
  );
};

const BlockedUserStory = ({ userId }) => {
  const {
    authUser: { blockedYou, youBlocked },
  } = useContext(GeneralContext);

  const blockMessage = findByIdKey(blockedYou, "userId", userId)
    ? blockedYouMessage
    : findByIdKey(youBlocked, "userId", userId) && youBlockedMessage;

  return (
    <>
      <div className="story-link-error">{blockMessage}</div>
    </>
  );
};

const WrongLinkAlert = () => {
  return (
    <div className="story-link-error">
      <h3>This link does not contain any story</h3>
      <p>Click on a user on the sidebar to view their story.</p>
    </div>
  );
};

export default Story;
