import "./icon-description.css";
import { iconDescContent } from "../../util/iconDescContent";

import { useSelector } from "react-redux";
import {
  readUploadedMedia,
  openCreatePost,
} from "../../app/actions/homeActions";
import { getCreatePostState } from "../../feaures/posts/create-post/createPostSlice";
import {
  handleMediaUpload,
  showPopupOnOpaqueOverlay,
} from "../../util/functions";
import { createPostType } from "../../util/types";

export default function IconDescription() {
  const { isOpen: createPostIsActive } = useSelector(getCreatePostState);

  const MainContent = ({ icon, desc }) => (
    <>
      <i className="cbli-icon">{icon}</i>
      <span className="cbli-desc">{desc}</span>
    </>
  );

  const handleMedia = (e) => {
    !createPostIsActive &&
      showPopupOnOpaqueOverlay(openCreatePost, createPostType);
    handleMediaUpload(e, readUploadedMedia);
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
