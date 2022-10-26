import React, { useContext, useState, useEffect } from "react";
import { StoryContext } from "./Story";
import UserCameo from "../../components/user-cameo/UserCameo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";
import { videoType, imageType } from "../../util/types";

const imageTimeOut = 12;
const initialTimingState = {
  currentTime: 0,
  duration: 0,
};
const StoryHeader = () => {
  const {
    user: { id, profileImage, displayName, username, myStories },
    story,
    storyId,
    handleTransition,
  } = useContext(StoryContext);

  const [{ currentTime, duration }, setTiming] = useState(initialTimingState);

  useEffect(() => {
    story?.mediaType === imageType &&
      setTiming({
        currentTime: 0,
        duration: imageTimeOut,
      });
  }, [storyId, story]);

  useEffect(() => {
    if (story?.mediaType === imageType) {
      if (currentTime <= duration) {
        var interval = setInterval(
          () =>
            setTiming((currentTiming) => ({
              ...currentTiming,
              currentTime: currentTime + 1,
            })),
          1000
        );
      } else {
        setTiming(initialTimingState);
        //Register in the backend that this story is viewed
        handleTransition("next");
      }
    }

    return () => clearInterval(interval);
  }, [story, currentTime, duration, handleTransition]);

  return (
    <aside className="story-desc-actions">
      <div className="story-progress-container">
        {(myStories || []).map((myStory) => (
          <progress
            key={myStory.storyId}
            min={0}
            max={duration}
            value={myStory.storyId === Number(storyId) ? currentTime : 0}
            className="story-progress"
          />
        ))}
      </div>
      <div className="story-user-actions">
        <UserCameo
          {...{
            userId: id,
            alignItems: true,
            single: true,
            header: displayName,
            sub: username,
            aside: "12h",
            avatarProp: { size: 2.5, src: profileImage },
          }}
        />
        <StoryActions story={story} />,
      </div>
    </aside>
  );
};

const StoryActions = ({ story: { mediaType } }) => {
  return (
    <div className="story-flex-container">
      <i>
        <FontAwesomeIcon icon={faPlay} />
      </i>
      {/* conditionally rendered. Ony with video mediaType */}
      {mediaType === videoType && (
        <i>
          <FontAwesomeIcon icon={faVolumeXmark} />
        </i>
      )}
      <i>
        <FontAwesomeIcon icon={faEllipsis} />
      </i>
    </div>
  );
};

export default StoryHeader;
