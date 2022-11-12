import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import useZoom from "../../components/zoom/useZoom";
import Zoom from "../../components/zoom/Zoom";
import { imageType, videoType } from "../../util/types";
import { getUploadedMedia } from "./storySlice";
import video from "../../assets/video.mp4";

const StoryPreview = () => {
  const { type, src, reading } = useSelector(getUploadedMedia);

  const { zoomIn, zoomOut, zoom, setZoom, reset } = useZoom();
  const [rotation, setRotation] = useState(0);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const stopEdit = () => setIsEditing(false);
    document.body.addEventListener("click", stopEdit);

    return () => document.body.removeEventListener("click", stopEdit);
  }, []);

  const startEdit = (e) => {
    e && e.stopPropagation && e.stopPropagation();
    type === imageType && setIsEditing(true);
  };

  const media =
    type === videoType ? (
      <video src={src} controls />
    ) : (
      <img
        src={src}
        alt="my story"
        style={{ transform: `scale(${zoom})` }}
        onClick={startEdit}
      />
    );

  return (
    <div className="story-preview-main">
      <section>
        <h4>Preview</h4>
        <div>
          <div className="story-preview-box">
            {reading ? <Spinner /> : media}
          </div>
          <div
            className="story-edit"
            onClick={(e) => {
              e && e.stopPropagation && e.stopPropagation();
            }}
          >
            {type === imageType ? (
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
            )}
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
