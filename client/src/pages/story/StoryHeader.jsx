import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  forwardRef,
} from "react";
import { StoryContext } from "./Story";
import UserCameo from "../../components/user-cameo/UserCameo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeXmark,
  faVolumeHigh,
  faEllipsis,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { videoType, storyOptionsType } from "../../util/types";
import {
  convertToUserFriendlyTime,
  showPopupOnTransparentOverlay,
} from "../../util/functions";
import { GeneralContext } from "../../routes/Router";
import { useParams } from "react-router-dom";
import { openStoryOptions } from "../../app/actions/storyActions";

const initialProgressState = {
  value: 0,
  max: 120,
  progressing: true,
};
const StoryHeader = forwardRef((_, videoRef) => {
  const {
    user: { id, profileImage, displayName, username, myStories },
    story,
    storyId,
    handleTransition,
    isBlocked,
  } = useContext(StoryContext);

  const [{ value, max, progressing }, setProgress] =
    useState(initialProgressState);

  // Using the layout effect because there was a flicker with jst useEffect
  useLayoutEffect(() => setProgress(initialProgressState), [storyId]);

  const playPauseTransition = () =>
    setProgress((progress) => ({ ...progress, progressing: !progressing }));

  const videoProgressUpdate = useCallback(
    (e) => {
      const { currentTime, duration } = e.target;
      setProgress((currentProgress) => ({
        ...currentProgress,
        value: (currentTime / duration) * max,
      }));
    },
    [max]
  );

  const imageProgressUpdate = useCallback(() => {
    return setInterval(
      () =>
        progressing &&
        setProgress((currentProgress) => ({
          ...currentProgress,
          value: value + 1,
        })),
      100
    );
  }, [value, progressing]);

  useEffect(() => {
    const video = videoRef.current;
    let interval;
    if (value < max) {
      //The video can only be truthy whenever the story's mediaType is a video.
      video
        ? video.addEventListener("timeupdate", videoProgressUpdate)
        : (interval = imageProgressUpdate());
    } else {
      setProgress(initialProgressState);
      //Register in the backend that this story is viewed
      handleTransition("next");
    }
    return () => {
      interval && clearInterval(interval);
      video && video.removeEventListener("timeupdate", videoProgressUpdate);
    };
  }, [
    story,
    value,
    max,
    handleTransition,
    imageProgressUpdate,
    videoProgressUpdate,
    videoRef,
  ]);

  return (
    <aside className="story-desc-actions">
      <div className="story-progress-container">
        {!isBlocked &&
          (myStories || []).map((userStory) => (
            <StoryProgress
              key={userStory.storyId}
              userStory={userStory}
              value={value}
              max={max}
            />
          ))}
      </div>
      <div className="story-user-actions">
        <UserCameo
          {...{
            userId: id,
            alignItems: true,
            single: true,
            header: displayName || username,
            sub: username,
            aside: convertToUserFriendlyTime(story.createdAt),
            avatarProp: { size: 2.5, src: profileImage },
            icon: !isBlocked ? (
              <StoryActions
                ref={videoRef}
                story={story}
                playPauseTransition={playPauseTransition}
              />
            ) : (
              <></>
            ),
          }}
        />
      </div>
    </aside>
  );
});

const initialActionsState = { playing: true, sound: true, options: false };
const StoryActions = forwardRef(
  ({ story: { mediaType }, playPauseTransition }, videoRef) => {
    const { storyId } = useParams();
    const [{ playing, sound, options }, setActionsState] =
      useState(initialActionsState);

    // Return to initialState for each story
    useEffect(() => setActionsState(initialActionsState), [storyId]);
    const isVideo = useMemo(() => mediaType === videoType, [mediaType]);

    const handlePlayPause = () => {
      setActionsState((actionsState) => ({
        ...actionsState,
        playing: !playing,
      }));
      isVideo
        ? playing
          ? videoRef.current.pause()
          : videoRef.current.play()
        : playPauseTransition();
    };

    const handleSound = () => {
      setActionsState((actionsState) => ({ ...actionsState, sound: !sound }));
      sound ? (videoRef.current.volume = 0) : (videoRef.current.volume = 1);
    };

    const showOptions = (e) => {
      const overlayParams = {
        type: storyOptionsType,
        x: e.clientX,
        y: e.clientY,
      };
      showPopupOnTransparentOverlay(openStoryOptions, overlayParams, storyId);
    };

    return (
      <div className="story-flex-container">
        <i onClick={handlePlayPause}>
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </i>
        {/* conditionally rendered. Only with video mediaType */}
        {isVideo && (
          <i onClick={handleSound}>
            <FontAwesomeIcon icon={sound ? faVolumeXmark : faVolumeHigh} />
          </i>
        )}
        <i onClick={showOptions}>
          <FontAwesomeIcon icon={faEllipsis} />
        </i>
      </div>
    );
  }
);

const StoryProgress = ({ userStory, value, max }) => {
  const {
    authUser: { otherStories },
  } = useContext(GeneralContext);

  const { storyId } = useParams();

  const isViewed = useMemo(() => {
    return otherStories.find(
      (story) => story.storyId === userStory.storyId && story.viewed
    );
  }, [otherStories, userStory]);

  return (
    <progress
      key={userStory.storyId}
      min={0}
      max={max}
      value={userStory.storyId === storyId ? value : isViewed ? max : 0}
      className="story-progress"
    />
  );
};

export default StoryHeader;
