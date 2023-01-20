import "./edit-profile.css";
import { useDispatch, useSelector } from "react-redux";
import { openEditProfileImage } from "../../../app/actions/profileActions";
import {
  handleMediaUpload,
  showPopupOnOpaqueOverlay,
} from "../../../util/functions";
import { getEditProfileImageState } from "../../../pages/profile/profileSlice";
import avi2 from "../../../assets/avatar-square.png";
import defaultProfileImage from "../../../assets/account.png";
import { iconStyle } from "../../../util/iconDescContent";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useRef, useEffect, useContext, useMemo } from "react";
import { socialLinks, profileDetails } from "../../../util/settingsContent";
import { SettingsHeader } from "../../../pages/settings/Settings";
import { useState } from "react";
import { editProfileImageType } from "../../../util/types";
import { GeneralContext } from "../../../routes/Router";

export default function EditProfile() {
  const dispatch = useDispatch();
  const { authUser } = useContext(GeneralContext);
  const { profileImage } = authUser;
  const { isOpen: editProfileImageIsOpen } = useSelector(
    getEditProfileImageState
  );

  const [profileInitialState, socialsInitialState] = useMemo(() => {
    const profileInitialState = profileDetails.reduce((accum, { name }) => {
      accum = { ...accum, [name]: authUser[name] };
      return accum;
    }, {});
    const socialsInitialState = socialLinks.reduce((accum, { name }) => {
      accum = { ...accum, [name]: authUser[name] };
      return accum;
    }, {});

    return [profileInitialState, socialsInitialState];
  }, [authUser]);

  const [imageSrc, setImageSrc] = useState(profileImage);
  const [profile, setProfile] = useState(profileInitialState);
  const [socials, setSocials] = useState(socialsInitialState);

  const avatarNode = useRef();

  useEffect(() => {
    !editProfileImageIsOpen && (avatarNode.current.value = null);
  }, [editProfileImageIsOpen]);

  const handleMedia = (e, imageType) =>
    !e.target.files[0].type.startsWith("image")
      ? alert("File type not supported")
      : handleMediaUpload(e, (reading, type, src) =>
          reading === "reading"
            ? showPopupOnOpaqueOverlay(
                openEditProfileImage,
                editProfileImageType,
                { reading: true }
              )
            : showPopupOnOpaqueOverlay(
                openEditProfileImage,
                editProfileImageType,
                {
                  imageType,
                  src,
                  initiatingRoute: "settings",
                }
              )
        );

  const handleProfileChange = (e) =>
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSocialsChange = (e) =>
    setSocials((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const topSection = profileDetails.reduce((accum, current, index) => {
    const { label, type, placeholder, autoComplete, name } = current;

    if (current.label === "Bio") {
      accum.push(
        <div key={index} className="bio-section">
          <label htmlFor={name}>{label}</label>
          <textarea
            name={name}
            value={profile[name]}
            onChange={handleProfileChange}
            id={name}
            placeholder={placeholder}
          ></textarea>
        </div>
      );
    } else {
      accum.push(
        <div key={index}>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            id={name}
            name={name}
            onChange={handleProfileChange}
            value={profile[name]}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        </div>
      );
    }

    return accum;
  }, []);

  const bottomSection = socialLinks.map((current, index) => {
    const { label, placeholder, name } = current;

    return (
      <div key={index}>
        <label htmlFor={name}>{label}</label>
        <input
          type="url"
          id={name}
          name={name}
          value={socials[name]}
          onChange={handleSocialsChange}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
    );
  });

  return (
    <main className="settings-edit-profile">
      <SettingsHeader text={"Edit Profile"} />
      <div>
        <img
          src={imageSrc || ""}
          onError={() => {
            imageSrc !== defaultProfileImage &&
              setImageSrc(defaultProfileImage);
          }}
          alt=""
          className="edit-profile-avatar"
        />
        <label htmlFor="edit-avatar">
          <i>
            <FileUploadOutlinedIcon style={iconStyle} />
          </i>
        </label>
        <input
          ref={avatarNode}
          id="edit-avatar"
          type="file"
          onChange={(e) => handleMedia(e, "avatar")}
        />
      </div>
      <form action="" className="settings-edit-profile-form">
        {topSection}
        <h3>Social links</h3>
        {bottomSection}
        <footer>
          <button>Reset</button>
          <button>Save</button>
        </footer>
      </form>
    </main>
  );
}
