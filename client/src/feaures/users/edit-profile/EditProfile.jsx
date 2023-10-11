import "./edit-profile.css";
//import coverPhoto from "../../../assets/cover-photo.png";
import avi2 from "../../../assets/avatar-square.png";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { iconStyle } from "../../../util/iconDescContent";
import { useSelector } from "react-redux";
import { closeEditProfile } from "../../../app/actions/profileActions";
import SimpleHeader from "../../../components/simple-header/SimpleHeader";
import {
  closePopupOnOpaqueOverlay,
  handleprofileImageUpload,
  showErrorAlert,
} from "../../../util/functions";
import { useRef, useEffect, useState, useContext } from "react";
import { getEditProfileImageState } from "../../../pages/profile/profileSlice";
import { editProfileData } from "../../../util/iconDescContent";
import {
  avatarType,
  coverPhotoType,
  defaultcoverPhoto,
} from "../../../util/types";
import { GeneralContext } from "../../../routes/Router";
import { useUpdateProfileDetailsMutation } from "../../../app/api-slices/usersApiSlice";
import HomeUserAvatar from "../../../components/home-user-avatar/HomeUserAvatar";

const getInitialState = (authUser) =>
  editProfileData.reduce((accum, current) => {
    accum = { ...accum, [current.name]: authUser[current.name] };
    return accum;
  }, {});
export default function EditProfile() {
  const { authUser } = useContext(GeneralContext);
  const { profileImage, coverPhoto, id: authUserId } = authUser;
  const [profile, setProfile] = useState(getInitialState(authUser));
  const [hasChanged, setHasChanged] = useState(false);

  const { isOpen: editProfileImageIsOpen } = useSelector(
    getEditProfileImageState
  );

  const [submitDetails, { error, data }] = useUpdateProfileDetailsMutation();

  const avatarNode = useRef();

  useEffect(() => {
    !editProfileImageIsOpen && (avatarNode.current.value = null);
  }, [editProfileImageIsOpen]);

  const handleMedia = (e, imageType) =>
    !e.target.files[0].type.startsWith("image")
      ? alert("File type not supported")
      : handleprofileImageUpload(e, { imageType });

  const handleChange = (e) => {
    setHasChanged(true);
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => closePopupOnOpaqueOverlay(closeEditProfile);

  const handleSubmit = (e) => {
    e && e.preventDefault();
    profile && submitDetails({ body: profile, authUserId });
    handleClose();
  };

  const formContent = editProfileData.reduce((accum, current, index) => {
    const { label, type, placeholder, autoComplete, name } = current;

    if (current.label === "Bio") {
      accum.push(
        <div key={index} className="bio-section">
          <label htmlFor={name}>{label}</label>
          <textarea
            name={name}
            value={profile[name]}
            onChange={handleChange}
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
            onChange={handleChange}
            value={profile[name]}
            placeholder={placeholder}
            autoComplete={autoComplete}
          />
        </div>
      );
    }

    return accum;
  }, []);

  return (
    <div className="edit-profile-container">
      <SimpleHeader
        desc={"Edit details"}
        closeAction={handleClose}
        overlay={true}
      />
      <div className="edit-profile-image-wrapper">
        <img
          src={coverPhoto || defaultcoverPhoto}
          alt="profile cover"
          className="edit-profile-coverphoto"
        />
        <label htmlFor="cover-photo">
          <i>
            <FileUploadOutlinedIcon style={iconStyle} />
          </i>
        </label>
        <input
          id="cover-photo"
          type="file"
          onChange={(e) => handleMedia(e, coverPhotoType)}
        />
      </div>
      <div className="edit-profile-avatar-wrapper edit-profile-image-wrapper">
        <HomeUserAvatar
          {...{
            size: 5,
            src: profileImage,
            noLink: true,
          }}
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
          onChange={(e) => handleMedia(e, avatarType)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        {formContent}
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
            type="cancel"
          >
            Cancel
          </button>
          <button
            disabled={!hasChanged}
            className={`${!hasChanged ? "disabled-button" : ""}`}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
