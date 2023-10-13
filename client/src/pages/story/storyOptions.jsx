import React, { useContext } from "react";
import {
  closePopupOnTransparentOverlay,
  showPopupOnOpaqueOverlay,
} from "../../util/functions";
import { storyOptions, authStoryOptions } from "../../util/iconDescContent";
import { useParams } from "react-router-dom";
import { muteStoryType } from "../../util/types";
import { capitalize } from "../../util/functions";
import { closeStoryOptions } from "../../app/actions/storyActions";
import { GeneralContext } from "../../routes/Router";

const StoryOptions = () => {
  const { username, storyId } = useParams();
  const { authUser } = useContext(GeneralContext);

  const handleClick = (e, option) => {
    e && e.stopPropagation && e.stopPropagation();
    const { desc, action } = option;
    if (action) {
      showPopupOnOpaqueOverlay(action, desc, { username, storyId });
    }
    closePopupOnTransparentOverlay(closeStoryOptions);
  };

  const content = (
    username === authUser.username ? authStoryOptions : storyOptions
  ).map((option) => {
    const { icon, desc } = option;

    return (
      <div
        key={desc}
        className="post-option"
        onClick={(e) => handleClick(e, option)}
      >
        <i className="post-option-icon">{icon}</i>
        <span className="post-option-desc">
          {capitalize(desc === muteStoryType ? `mute ${username}` : desc)}
        </span>
      </div>
    );
  });

  return (
    <div className="post-options-container">
      <div className="post-options-wrapper">{content}</div>
    </div>
  );
};

export default StoryOptions;
