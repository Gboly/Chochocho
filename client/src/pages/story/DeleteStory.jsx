import React from "react";
import { useParams } from "react-router-dom";
import { closeDeleteStory } from "../../app/actions/storyActions";
import { closePopupOnOpaqueOverlay } from "../../util/functions";

const DeleteStory = () => {
  const { username } = useParams();

  return (
    <div className="ffPost-container">
      <div className="ffPost-wrapper">
        <header className="ffPost-header create-top-description">
          Delete Story
        </header>
        <main className="ffPost-main">
          Are you sure you want to delete this story?
        </main>
        <footer className="ffPost-footer">
          <button
            className="ffPost-button ffPost-cancel"
            onClick={() => closePopupOnOpaqueOverlay(closeDeleteStory)}
          >
            Cancel
          </button>
          <button className="ffPost-button ffPost-submit">Delete</button>
        </footer>
      </div>
    </div>
  );
};

export default DeleteStory;
