import "./post-image-alt.css";
import { useSelector } from "react-redux";
import { getAltMessageState } from "../post-excerpt/postExcerptSlice";
import { closeAltMessage } from "../../../app/actions/homeActions";
import { closePopupOnOpaqueOverlay } from "../../../util/functions";

export default function PostImageAlt() {
  const { alt } = useSelector(getAltMessageState);
  return (
    <div className="pia-container">
      <div className="pia-wrapper">
        <header className="pia-header">Image description</header>
        <p className="pia-alt-message">{alt}</p>
        <button
          className="pia-dismiss"
          onClick={() => closePopupOnOpaqueOverlay(closeAltMessage)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
