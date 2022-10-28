import "./story.css";
import Spinner from "../../components/Spinner/Spinner";
import { useState, useMemo, useCallback, createContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStoryByIdQuery } from "../../app/api-slices/storiesApiSlice";
import { useGetUserByIdQuery } from "../../app/api-slices/usersApiSlice";
import video from "../../assets/video.mp4";
import { videoType, imageType } from "../../util/types";
import { getStoryUserDetails } from "../../util/functions";
import PrevSlide from "./prevSlide";
import NextSlide from "./nextSlide";
import StoryHeader from "./StoryHeader";
import { isEqual } from "lodash";

export const StoryContext = createContext();
const Story = ({ authUser }) => {
  const navigate = useNavigate();
  const { username, storyId } = useParams();
  const videoRef = useRef();

  const {
    data: story,
    isLoading: storyFetchIsLoading,
    isError: storyFetchFailed,
  } = useGetStoryByIdQuery(storyId);
  const { data: user, isLoading: userFetchIsLoading } = useGetUserByIdQuery(
    story?.userId || ""
  );

  const [storyIndex, userIndex, users] = useMemo(() => {
    const userStories = user?.myStories || [];
    const storyIndex = userStories.findIndex(
      (myStory) => myStory.storyId === Number(storyId)
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
        : navigate(`/story/${newUsername}/${newStoryId}`);
    },
    [nextParams, navigate, prevParams, username, storyId]
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
      }}
    >
      <main className="story-page-main">
        <PrevSlide />
        <section>
          <div>
            {!storyFetchFailed && story && user && (
              <>
                <StoryHeader ref={videoRef} />
                {story.mediaType === videoType ? (
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

const WrongLinkAlert = () => {
  return (
    <div className="story-link-error">
      <h3>This link does not contain any story</h3>
      <p>Click on a user on the sidebar to view their story.</p>
    </div>
  );
};

export default Story;
