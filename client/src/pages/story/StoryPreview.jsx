import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useEffect, useState } from "react";
import image from "../../assets/avatar-square.png";
import useZoom from "../../components/zoom/useZoom";
import Zoom from "../../components/zoom/Zoom";

const StoryPreview = () => {
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
    setIsEditing(true);
  };

  return (
    <div className="story-preview-main">
      <section>
        <h4>Preview</h4>
        <div>
          <div className="story-preview-box">
            <img
              src={image}
              alt="my story"
              style={{ transform: `scale(${zoom})` }}
              onClick={startEdit}
            />
          </div>
          <div
            className="story-edit"
            onClick={(e) => {
              e && e.stopPropagation && e.stopPropagation();
            }}
          >
            {!isEditing ? (
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
