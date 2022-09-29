import "./post-img-fullscreen.css";
import tessboss from "../../../assets/tess.png";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFullscreenState } from "../post-excerpt/postExcerptSlice";
import { closeFullscreen } from "../../../app/actions/homeActions";

export default function PostImageFullscreen({ profileSrc }) {
  const dispatch = useDispatch();
  const { media: src } = useSelector(getFullscreenState);

  const fullScreenImageNode = useRef();

  const closeFullscreenByTappingBlankSpace = (e) => {
    !(fullScreenImageNode.current === e.target) && dispatch(closeFullscreen());
  };
  return (
    <div
      className="pifs-container"
      onClick={closeFullscreenByTappingBlankSpace}
    >
      <div className="pifs-wrapper">
        <div
          className="media-option-custom-icon remove-video-icon close-fullscreen"
          onClick={() => dispatch(closeFullscreen())}
        >
          ✖
        </div>
        <div className="pifs-image-container">
          <img
            ref={fullScreenImageNode}
            src={!profileSrc ? src : profileSrc}
            alt="fullscreen"
            className="pifs-image"
          />
        </div>
      </div>
    </div>
  );
}
