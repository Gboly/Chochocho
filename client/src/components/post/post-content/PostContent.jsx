import CustomVideo from "../../../feaures/custom-video/CustomVideo";
import "./post-content.css";
import { useDispatch } from "react-redux";
import {
  openFullscreen,
  openAltMessage,
} from "../../../app/actions/homeActions";
import { showPopupOnOpaqueOverlay } from "../../../util/functions";
import { altMessageType } from "../../../util/types";

export default function PostContent({ content, mediaType, media, postId }) {
  const dispatch = useDispatch();

  return (
    <div className="post-center">
      <p className="post-text">{content}</p>
      <div
        className="post-media-container"
        onClick={(e) => e && e.stopPropagation && e.stopPropagation()}
      >
        {mediaType.startsWith("video") && (
          <CustomVideo src={media} postId={postId} />
        )}
        {mediaType.startsWith("image") &&
          media &&
          media.map(({ src, alt }, idx) => (
            <div key={idx}>
              <img
                src={src}
                alt={alt}
                className="post-media"
                onClick={() => dispatch(openFullscreen(src))}
              />
              {alt && (
                <button
                  className="post-img-alt-button"
                  onClick={() =>
                    showPopupOnOpaqueOverlay(
                      openAltMessage,
                      altMessageType,
                      alt
                    )
                  }
                >
                  ALT
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
