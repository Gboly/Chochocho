import "./edit-post.css";
import avi2 from "../../../assets/avatar-square.png";
import CustomSelect from "../../../components/custom-select/CustomSelect";
import CustomTextArea from "../../../components/custom-text-area/CustomTextArea";
import IconDescription from "../../../components/icon-description/IconDescription";
import Spinner from "../../../components/Spinner/Spinner";
import { visibilityOptions } from "../../../util/formRadioOptions";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import WriteAlt from "../write-alt/WriteAlt";
import { iconStyle } from "../../../util/iconDescContent";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  closeEditPost,
  hideVisibiltyOptions,
  removeMedia,
  openWriteAlt,
  writePost,
  readUploadedMedia,
  setVisibilityValue,
  showVisibilityOptions,
} from "../../../app/actions/homeActions";
import {
  getVisibilityOptionsState,
  getUploadedMedia,
  getPostText,
  getEditPostState,
} from "../create-post/createPostSlice";
import { selectPostById } from "../../../app/api-slices/postsApiSlice";
import {
  closePopupOnOpaqueOverlay,
  showPopupOnOpaqueOverlay,
} from "../../../util/functions";

export default function EditPost() {
  const { id: postId } = useSelector(getEditPostState);
  const post = useSelector((state) => selectPostById(state, postId));
  if (post) {
    var { visibleFor, mediaType, media, content } = post;
  }
  const dispatch = useDispatch();
  const { isOpen: visibilityOptionsIsOpen } = useSelector(
    getVisibilityOptionsState
  );
  const { type: fileType, src, reading } = useSelector(getUploadedMedia);
  const postText = useSelector(getPostText);

  const initialSrcState = mediaType.startsWith("video")
    ? media
    : mediaType.startsWith("image")
    ? media[0]?.src
    : "";

  const [mediaKind, setMediaKind] = useState(mediaType);
  const [mediaSrc, setMediaSrc] = useState(initialSrcState);

  useEffect(() => {
    fileType && setMediaKind(fileType);
    src && setMediaSrc(src);
  }, [fileType, src]);

  useEffect(() => {
    dispatch(readUploadedMedia({ type: mediaType, src: initialSrcState }));
  }, [mediaType, media, dispatch, initialSrcState]);

  return (
    <div
      className="create-container edit-post-contain"
      onClick={() =>
        visibilityOptionsIsOpen && dispatch(hideVisibiltyOptions())
      }
    >
      {/* <WriteAlt /> */}
      <form className="create-wrapper create-wrapper-focus">
        <div className="create-top-styled">
          <div className="create-top">
            <span className="create-top-description">Edit post</span>
            {/* <div className="create-select-section">
              <label htmlFor="visibleFor" className="create-top-instruction">
                Visible for
              </label>
              <div onClick={() => dispatch(showVisibilityOptions())}>
                <CustomSelect
                  {...{
                    options: visibilityOptions,
                    valueId: visibilityOptions.indexOf(visibleFor),
                    getValue: (valId) => dispatch(setVisibilityValue(valId)),
                    isOpen: visibilityOptionsIsOpen,
                  }}
                />
              </div>
            </div> */}
            <i
              id="create-close-icon"
              className="create-close-icon"
              onClick={() => closePopupOnOpaqueOverlay(closeEditPost)}
            >
              <HighlightOffOutlinedIcon style={iconStyle} />
            </i>
          </div>
          <hr className="create-hr" />
        </div>
        <div className="create-middle-focus">
          <div className="create-middle-text create-middle-text-focus">
            <img src={avi2} alt="avatar" className="create-avi" />
            <CustomTextArea
              {...{
                placeholder: "What's happening?",
                sxx: { ph: "create-custom-placeholder", ta: "create-textarea" },
                handleInput: (textContent) => dispatch(writePost(textContent)),
                text: postText,
                content,
              }}
            />
          </div>
          <div className="create-middle-media-container">
            {reading ? (
              <Spinner sxx={"media-load-spinner"} />
            ) : mediaKind.startsWith("video") && media ? (
              <>
                <video
                  src={mediaSrc}
                  alt="post"
                  className="create-middle-media"
                  controls
                />
                <div
                  className="media-option-custom-icon remove-video-icon"
                  onClick={() => {
                    setMediaKind("");
                    setMediaSrc("");
                    dispatch(removeMedia());
                  }}
                >
                  ✖
                </div>
              </>
            ) : mediaKind.startsWith("image") ? (
              <>
                <div className="media-container-options">
                  <div
                    className="media-option-custom-icon remove-picture-icon"
                    onClick={() => {
                      setMediaKind("");
                      setMediaSrc("");
                      dispatch(removeMedia());
                    }}
                  >
                    ✖
                  </div>
                  <div
                    className="media-option-custom-icon alt-text-icon"
                    onClick={() =>
                      showPopupOnOpaqueOverlay(openWriteAlt, "write alt", {
                        defaultAlt: media[0]?.alt || "",
                        type: "edit post",
                      })
                    }
                  >
                    +ALT
                  </div>
                </div>
                <img
                  src={mediaSrc}
                  alt="post"
                  className="create-middle-media"
                />
              </>
            ) : null}
          </div>
          <div className="create-bottom">
            <div className="create-bottom-left">
              <IconDescription />
            </div>
            <div type="submit" className="create-bottom-right">
              <button className="cbr-button">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
