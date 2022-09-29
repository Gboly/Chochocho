import "./icon-description.css";
import { useState } from "react";
import { iconDescContent } from "../../util/iconDescContent";

import { useDispatch, useSelector } from "react-redux";
import {
  readUploadedMedia,
  openCreatePost,
} from "../../app/actions/homeActions";
import { getCreatePostState } from "../../feaures/posts/create-post/createPostSlice";
import { handleMediaUpload } from "../../util/functions";

export default function IconDescription() {
  const dispatch = useDispatch();
  const { isOpen: createPostIsActive } = useSelector(getCreatePostState);

  const MainContent = ({ icon, desc }) => (
    <>
      <i className="cbli-icon">{icon}</i>
      <span className="cbli-desc">{desc}</span>
    </>
  );

  const mediaUploadAction = (reading, type, src) => {
    if (reading === "reading") {
      dispatch(readUploadedMedia({ reading: true }));
    } else {
      dispatch(readUploadedMedia({ type, src }));
    }
  };

  const handleMedia = (e) => {
    !createPostIsActive && dispatch(openCreatePost());
    handleMediaUpload(e, mediaUploadAction);
  };

  const contentList = iconDescContent.reduce((accum, current, i) => {
    const { icon, desc } = current;

    desc === "Media"
      ? accum.push(
          <div key={i} id={desc} className="create-bottom-left-item">
            <label htmlFor="media-upload" className="cbli-media-upload">
              <MainContent {...{ icon, desc }} />
            </label>
            <input
              name="media-upload"
              id="media-upload"
              type="file"
              className="upload-file"
              onChange={handleMedia}
              accept="image/*, video/*"
            />
          </div>
        )
      : accum.push(
          <div key={i} id={desc} className="create-bottom-left-item">
            <MainContent {...{ icon, desc }} />{" "}
          </div>
        );

    return accum;
  }, []);

  return <>{contentList}</>;
}
