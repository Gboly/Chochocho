import React, { useContext } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { iconStyle } from "../../util/iconDescContent";
import UserCameo from "../../components/user-cameo/UserCameo";
import { GeneralContext } from "../../routes/Router";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeVisibilityType,
  openSettings,
  removeMedia,
} from "../../app/actions/storyActions";
import { storyVisibilitySettingsType } from "../../util/types";
import { showPopupOnOpaqueOverlay } from "../../util/functions";

const StoryPreviewSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser: { id, username, displayName, profileImage, storyVisibility },
  } = useContext(GeneralContext);

  const discard = () => {
    dispatch(removeMedia());
    navigate(-1);
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
          header: displayName,
          sub: username,
          avatarProp: { size: 3, src: profileImage },
        }}
      />
      <div className="sps-buttons">
        <button onClick={discard}>Discard</button>
        <button>Share to story</button>
      </div>
    </aside>
  );
};

export default StoryPreviewSidebar;
