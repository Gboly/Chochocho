import "./create-post-active.css";
import CustomSelect from "../../../../components/custom-select/CustomSelect";
import CustomTextArea from "../../../../components/custom-text-area/CustomTextArea";
import IconDescription from "../../../../components/icon-description/IconDescription";
import Spinner from "../../../../components/Spinner/Spinner";
import { visibilityOptions } from "../../../../util/formRadioOptions";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { iconStyle } from "../../../../util/iconDescContent";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import {
  closeCreatePost,
  hideVisibiltyOptions,
  removeMedia,
  openWriteAlt,
  writePost,
  setVisibilityValue,
  showVisibilityOptions,
} from "../../../../app/actions/homeActions";
import {
  getVisibilityOptionsState,
  getUploadedMedia,
  getPostText,
  getNewPostDetails,
} from "../createPostSlice";
import HomeUserAvatar from "../../../../components/home-user-avatar/HomeUserAvatar";
import {
  closePopupOnOpaqueOverlay,
  showPopupOnOpaqueOverlay,
} from "../../../../util/functions";
import { GeneralContext } from "../../../../routes/Router";
import { useAddPostMutation } from "../../../../app/api-slices/postsApiSlice";
import AuthError from "../../../../pages/sign-in/AuthError";

export default function CreatePostActive({
  placeholder,
  type,
  parents,
  invalidatePostList,
  style,
}) {
  const {
    authUser: { profileImage },
  } = useContext(GeneralContext);
  const dispatch = useDispatch();
  const { isOpen: visibilityOptionsIsOpen, valueId } = useSelector(
    getVisibilityOptionsState
  );
  const { type: fileType, src, reading } = useSelector(getUploadedMedia);
  const postText = useSelector(getPostText);

  const [addPost, { isSuccess, isLoading, error }] = useAddPostMutation();
  const newPost = useSelector(getNewPostDetails);

  const addNewPost = (e) => {
    e && e.preventDefault();
    const args = {
      ...newPost,
      type,
      parents: parents || [],
      date: new Date().toISOString(),
    };

    (postText || src) && addPost(args);
  };

  useEffect(() => {
    if (isSuccess) {
      invalidatePostList();
      closePopupOnOpaqueOverlay(closeCreatePost);
    }
  }, [isSuccess, invalidatePostList]);

  const mediasection = reading ? (
    <Spinner sxx={"media-load-spinner"} />
  ) : fileType.startsWith("video") ? (
    <>
      <video src={src} alt="post" className="create-middle-media" controls />
      <div
        className="media-option-custom-icon remove-video-icon"
        onClick={() => dispatch(removeMedia())}
      >
        ✖
      </div>
    </>
  ) : fileType.startsWith("image") ? (
    <>
      <div className="media-container-options">
        <div
          className="media-option-custom-icon remove-picture-icon"
          onClick={() => dispatch(removeMedia())}
        >
          ✖
        </div>
        <div
          className="media-option-custom-icon alt-text-icon"
          onClick={() =>
            showPopupOnOpaqueOverlay(openWriteAlt, "write alt", {
              type: "create post",
            })
          }
        >
          +ALT
        </div>
      </div>
      <img src={src} alt="post" className="create-middle-media" />
    </>
  ) : null;

  return (
    <div
      className={`create-container create-container-focus ${
        // Closing this component immediately the request is sent affects the access to the isSuccess and isLoading result. This is some sort of work-around to make this component transparent till the request is succesful and at this point, its okay to close the component.
        isLoading ? "create-container-transparent" : ""
      }`}
      onClick={() =>
        visibilityOptionsIsOpen && dispatch(hideVisibiltyOptions())
      }
      style={style || {}}
    >
      <form
        className="create-wrapper create-wrapper-focus"
        onSubmit={addNewPost}
      >
        <div className="create-top-styled">
          <div className="create-top">
            <span className="create-top-description">Create a post</span>
            <i
              id="create-close-icon"
              className="create-close-icon"
              onClick={() => closePopupOnOpaqueOverlay(closeCreatePost)}
            >
              <HighlightOffOutlinedIcon style={iconStyle} />
            </i>
          </div>
          <hr className="create-hr" />
        </div>
        <div className="create-middle-focus">
          <div className="create-middle-text create-middle-text-focus">
            <HomeUserAvatar
              // #3
              userId={1}
              src={profileImage}
              size="2.2"
              style={{ marginRight: "1rem" }}
              noLink={true}
            />
            <CustomTextArea
              {...{
                placeholder: placeholder,
                sxx: { ph: "create-custom-placeholder", ta: "create-textarea" },
                handleInput: (textContent) => dispatch(writePost(textContent)),
                text: postText,
              }}
            />
          </div>
          <div className="create-middle-media-container">{mediasection}</div>
          <div className="create-bottom">
            <div className="create-bottom-left">
              <IconDescription />
            </div>
            <div type="submit" className="create-bottom-right">
              <button
                className={`cbr-button ${
                  postText || src ? "" : "cbr-button-disabled"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
      <AuthError error={error} />
    </div>
  );
}
