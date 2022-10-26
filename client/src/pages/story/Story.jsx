import "./story.css";
import Spinner from "../../components/Spinner/Spinner";
import {
  useState,
  useMemo,
  useEffect,
  useCallback,
  createContext,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStoryByIdQuery } from "../../app/api-slices/storiesApiSlice";
import { useGetUserByIdQuery } from "../../app/api-slices/usersApiSlice";
import video from "../../assets/video.mp4";
import { videoType, imageType } from "../../util/types";
import { getStoryUserDetails } from "../../util/functions";
import PrevSlide from "./prevSlide";
import NextSlide from "./nextSlide";
import StoryHeader from "./StoryHeader";

export const StoryContext = createContext();
const Story = ({ authUser: { otherStoryAuthors } }) => {
  const navigate = useNavigate();
  const { username, storyId } = useParams();

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
    const { userIndex, users } = getStoryUserDetails(
      otherStoryAuthors,
      user?.id
    );
    return [storyIndex, userIndex, users];
  }, [user, storyId, otherStoryAuthors]);

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
      navigate(`/story/${newUsername}/${newStoryId}`);
    },
    [nextParams, navigate, prevParams, username, storyId]
  );

  const storyContextValues = useMemo(
    () => ({
      setParams,
      handleTransition,
      user,
      story,
      storyId,
      users,
      storyIndex,
      userIndex,
    }),
    [handleTransition, user, story, storyId, users, storyIndex, userIndex]
  );

  return (
    <StoryContext.Provider value={storyContextValues}>
      <main className="story-page-main">
        <PrevSlide />
        <section>
          <div>
            {!storyFetchFailed && story && user && (
              <>
                <StoryHeader />
                {story.mediaType === videoType ? (
                  <video src={video} alt="story" />
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
