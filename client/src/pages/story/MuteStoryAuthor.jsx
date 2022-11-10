import React from "react";
import { useParams } from "react-router-dom";
import { closeMuteStoryAuthor } from "../../app/actions/storyActions";
import { closePopupOnOpaqueOverlay } from "../../util/functions";

const MuteStoryAuthor = () => {
  const { username } = useParams();

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
          <button className="ffPost-button ffPost-submit">Mute</button>
        </footer>
      </div>
    </div>
  );
};

export default MuteStoryAuthor;
