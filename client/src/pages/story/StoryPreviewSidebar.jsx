import React, { useContext } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { iconStyle } from "../../util/iconDescContent";
import UserCameo from "../../components/user-cameo/UserCameo";
import { GeneralContext } from "../../routes/Router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeVisibilityType,
  openSettings,
  removeMedia,
} from "../../app/actions/storyActions";
import { storyVisibilitySettingsType } from "../../util/types";
import {
  showPopupOnOpaqueOverlay,
  effectConfirmation,
} from "../../util/functions";
import { useCreateStoryMutation } from "../../app/api-slices/storiesApiSlice";
import { getUploadedMedia } from "./storySlice";

const StoryPreviewSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser: { id, username, displayName, profileImage, storyVisibility },
  } = useContext(GeneralContext);
  const { type, src } = useSelector(getUploadedMedia);

  const [shareStory, { error }] = useCreateStoryMutation();

  const discard = () => {
    dispatch(removeMedia());
    navigate(-1);
  };

  const handleShare = (e) => {
    e && e.preventDefault();
    const body = { mediaType: type, media: src };
    dispatch(removeMedia());
    type && src && shareStory({ body });
    navigate(-1);
    effectConfirmation("story");
  };

  const showSettings = () => {
    dispatch(changeVisibilityType(storyVisibility.type));
    showPopupOnOpaqueOverlay(openSettings, storyVisibilitySettingsType);
  };

  return (
    <aside className="story-sidebar story-preview-sidebar">
      <header>
        <h1>Your Story</h1>
        <i onClick={showSettings}>
          <SettingsIcon style={iconStyle} />
        </i>
      </header>
      <UserCameo
        {...{
          userId: id,
          alignItems: true,
          single: true,
          header: displayName || username,
          sub: username,
          avatarProp: { size: 3, src: profileImage },
        }}
      />
      <div className="sps-buttons">
        <button onClick={discard}>Discard</button>
        <button onClick={handleShare}>Share to story</button>
      </div>
    </aside>
  );
};

export default StoryPreviewSidebar;
