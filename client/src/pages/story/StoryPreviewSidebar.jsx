import React, { useContext } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { iconStyle } from "../../util/iconDescContent";
import UserCameo from "../../components/user-cameo/UserCameo";
import { GeneralContext } from "../../routes/Router";

const StoryPreviewSidebar = () => {
  const {
    authUser: { id, username, displayName, profileImage },
  } = useContext(GeneralContext);
  return (
    <aside className="story-sidebar">
      <header>
        <h1>Your Story</h1>
        <i>
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
        <button>Discard</button>
        <button>Share to story</button>
      </div>
    </aside>
  );
};

export default StoryPreviewSidebar;
