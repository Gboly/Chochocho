import React from "react";
import { useParams } from "react-router-dom";
import {
  activateMuteStoryAuthor,
  closeMuteStoryAuthor,
} from "../../app/actions/storyActions";
import { closePopupOnOpaqueOverlay } from "../../util/functions";
import { useDispatch } from "react-redux";

const MuteStoryAuthor = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const handleMute = (e) => {
    e && e.preventDefault();
    // Actual delete function is in the NextSlide component
    dispatch(activateMuteStoryAuthor());
  };

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          Mute @{username}
        </header>
        <main className="ffPost-main">
          You will no longer be able to view their story but would remain
          friends.
        </main>
        <footer className="ffPost-footer">
          <button
            className="ffPost-button ffPost-cancel"
            onClick={() => closePopupOnOpaqueOverlay(closeMuteStoryAuthor)}
          >
            Cancel
          </button>
          <button className="ffPost-button ffPost-submit" onClick={handleMute}>
            Mute
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MuteStoryAuthor;
