import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import useZoom from "../../components/zoom/useZoom";
import Zoom from "../../components/zoom/Zoom";
import {
  imageType,
  storyVisibilitySettingsType,
  videoType,
} from "../../util/types";
import { getUploadedMedia } from "./storySlice";
import video from "../../assets/video.mp4";
import UserCameo from "../../components/user-cameo/UserCameo";
import { GeneralContext } from "../../routes/Router";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  changeVisibilityType,
  openSettings,
  removeMedia,
} from "../../app/actions/storyActions";
import { showPopupOnOpaqueOverlay } from "../../util/functions";
import { iconStyle } from "../../util/iconDescContent";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const StoryPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser: { id, profileImage, storyVisibility },
  } = useContext(GeneralContext);
  const { type, src, reading } = useSelector(getUploadedMedia);

  // const { zoomIn, zoomOut, zoom, setZoom, reset } = useZoom();
  // const [rotation, setRotation] = useState(0);

  // const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   const stopEdit = () => setIsEditing(false);
  //   document.body.addEventListener("click", stopEdit);

  //   return () => document.body.removeEventListener("click", stopEdit);
  // }, []);

  // const startEdit = (e) => {
  //   e && e.stopPropagation && e.stopPropagation();
  //   type === imageType && setIsEditing(true);
  // };

  const media =
    type === videoType ? (
      <video src={src} controls />
    ) : (
      <img
        src={src}
        alt="my story"
        // style={{ transform: `scale(${zoom})` }}
        // onClick={startEdit}
      />
    );

  const showSettings = () => {
    dispatch(changeVisibilityType(storyVisibility.type));
    showPopupOnOpaqueOverlay(openSettings, storyVisibilitySettingsType);
  };

  const discard = (e) => {
    e && e.preventDefault();
    dispatch(removeMedia());
    navigate(-1);
  };

  return (
    <div className="story-preview-main">
      <section>
        <header>
          <h4>Preview</h4>
          <i onClick={discard}>
            <HighlightOffOutlinedIcon style={iconStyle} />
          </i>
        </header>
        <div>
          <div className="story-preview-box">
            <i onClick={discard}>
              <HighlightOffOutlinedIcon style={iconStyle} />
            </i>
            {reading ? <Spinner /> : media}
          </div>
          <div
            className="story-edit"
            onClick={(e) => {
              e && e.stopPropagation && e.stopPropagation();
            }}
          >
            {/* {type === imageType ? (
              !isEditing ? (
                <span>Select photo to crop and rotate</span>
              ) : (
                <Zoom
                  {...{
                    zoomIn,
                    zoomOut,
                    zoom,
                    setZoom,
                    reset,
                    button: <Rotate />,
                  }}
                />
              )
            ) : (
              ""
            )} */}
          </div>
          <div className="story-preview-actions-md">
            <div onClick={showSettings}>
              <UserCameo
                {...{
                  userId: id,
                  alignItems: true,
                  single: true,
                  header: "Your story",
                  sub: (
                    <div className="dropdown-icon-desc">
                      <span>Followers</span>
                      <i>
                        <ArrowDropDownIcon />
                      </i>
                    </div>
                  ),
                  avatarProp: { size: 2.5, src: profileImage },
                  notUsername: true,
                }}
              />
            </div>
            <button>Share</button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Rotate = () => {
  const rotate = () => {};
  return (
    <button className="rotate-story-preview" onClick={rotate}>
      {/* pending icon */}
      <i>
        <RestartAltIcon />
      </i>
      <span>Rotate</span>
    </button>
  );
};

export default StoryPreview;
