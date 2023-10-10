import SimpleHeader from "../../../components/simple-header/SimpleHeader";
import "./edit-profile-image.css";
import { closeEditProfileImage } from "../../../app/actions/profileActions";
import {
  getEditProfileImageState,
  getProfileUpdateState,
} from "../../../pages/profile/profileSlice";
import { useSelector } from "react-redux";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useContext,
} from "react";
import Spinner from "../../../components/Spinner/Spinner";
import {
  avatarType,
  coverPhotoType,
  editProfileType,
  settingsType,
} from "../../../util/types";
import {
  closeNestedPopupOnOpaqueOverlay,
  closePopupOnOpaqueOverlay,
  capitalize,
  effectConfirmation,
} from "../../../util/functions";
import useZoom from "../../../components/zoom/useZoom";
import Zoom from "../../../components/zoom/Zoom";
import { useUpdateProfileImageMutation } from "../../../app/api-slices/usersApiSlice";
import { GeneralContext } from "../../../routes/Router";

const translateInitialState = { x: 0, y: 0 };
const overflowInitialState = {
  left: null,
  right: null,
  top: null,
  bottom: null,
};

export default function EditProfileImage() {
  const {
    authUser: { id: authUserId },
  } = useContext(GeneralContext);
  const { src, imageType, reading, initiatingRoute } = useSelector(
    getEditProfileImageState
  );
  const { isUpdating, isUpdated } = useSelector(getProfileUpdateState);

  const { zoomIn, zoomOut, zoom, setZoom, reset: resetZoom } = useZoom();
  const [translate, setTranslate] = useState(translateInitialState);
  const [initialOverflow, setInitialOverflow] = useState(overflowInitialState);

  const initialMousePosition = useRef();
  const imageNodes = useRef();

  const [saveImage, { error }] = useUpdateProfileImageMutation();

  const getOverflow = useCallback(() => {
    if (imageNodes.current) {
      const {
        left: bgLeft,
        right: bgRight,
        top: bgTop,
        bottom: bgBottom,
      } = imageNodes.current.bgImageDimensions;
      const {
        left: cropLeft,
        right: cropRight,
        top: cropTop,
        bottom: cropBottom,
      } = imageNodes.current.cropDimensions;

      return {
        left: cropLeft - bgLeft,
        right: bgRight - cropRight,
        top: cropTop - bgTop,
        bottom: bgBottom - cropBottom,
      };
    }
  }, []);

  // useEffect(() => {
  //   const overflow = getOverflow();

  //   // I noticed that on page refresh, top and bottom gives a negative value. so, this is just to ensure consistency
  //   Object.keys(overflow).forEach(
  //     (key) => (overflow[key] = Math.abs(overflow[key]))
  //   );

  //   setInitialOverflow(overflow);
  // }, [getOverflow]);

  // const moveImageWithinBorder = ()

  const handleMouseMove = (e) => {
    const finalMousePosition = { x: e.clientX, y: e.clientY };
    const offsetX = finalMousePosition.x - initialMousePosition.current.x;
    const offsetY = finalMousePosition.y - initialMousePosition.current.y;

    const { left, right, top, bottom } = getOverflow();
    console.log(left, right, top, bottom);

    // #9
    if (
      (offsetX > 0 && left <= 0) ||
      (offsetX < 0 && right <= 0) ||
      (offsetY < 0 && bottom <= 0) ||
      (offsetY > 0 && top <= 0)
    ) {
      initialMousePosition.current = {
        x: finalMousePosition.x - translate.x,
        y: finalMousePosition.y - translate.y,
      };

      return;
    }
    setTranslate({ x: offsetX, y: offsetY });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    initialMousePosition.current = null;
  };

  const handleMouseDown = (e) => {
    initialMousePosition.current = {
      x: e.clientX - translate.x,
      y: e.clientY - translate.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const reset = () => {
    resetZoom();
    setTranslate(translateInitialState);
  };

  const handleClose = useCallback(() => {
    initiatingRoute === settingsType
      ? closePopupOnOpaqueOverlay(closeEditProfileImage)
      : closeNestedPopupOnOpaqueOverlay(closeEditProfileImage, editProfileType);
  }, [initiatingRoute]);

  const handleSave = (e) => {
    e && e.preventDefault();
    const body = {
      [imageType === avatarType ? "profileImage" : "coverPhoto"]: src,
    };
    src && saveImage({ body, authUserId });
  };

  useEffect(() => {
    isUpdating && effectConfirmation(imageType);
    isUpdated && closePopupOnOpaqueOverlay(closeEditProfileImage);
  }, [isUpdated, isUpdating, imageType, handleClose]);

  return (
    <div
      className={`edit-profile-image-container ${
        imageType === coverPhotoType ? "edit-cover-photo-container" : ""
      } ${isUpdating ? "report-transparent" : ""}`}
    >
      <SimpleHeader
        desc={`Preview ${capitalize(imageType)}`}
        closeAction={handleClose}
        overlay={true}
      />
      {reading ? (
        <Spinner />
      ) : imageType === avatarType ? (
        <EditAvatar
          ref={imageNodes}
          {...{ src, zoom, zoomIn, zoomOut, translate, handleMouseDown }}
        />
      ) : imageType === coverPhotoType ? (
        <EditCoverPhoto
          {...{ src, zoom, zoomIn, zoomOut, translate, handleMouseDown }}
        />
      ) : (
        ""
      )}
      {/* <Zoom
        {...{
          zoomIn,
          zoomOut,
          zoom,
          setZoom,
          reset,
          button: <button>Save</button>,
        }}
      /> */}
      <div className="flex-end">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

const EditAvatar = forwardRef(
  ({ src, zoom, zoomIn, zoomOut, translate, handleMouseDown }, ref) => {
    const cropCircleNode = useRef();
    const bgImageNode = useRef();

    useImperativeHandle(ref, () => ({
      get cropDimensions() {
        return cropCircleNode.current.getBoundingClientRect();
      },
      get bgImageDimensions() {
        return bgImageNode.current.getBoundingClientRect();
      },
    }));

    const { x, y } = translate;

    return (
      <div className="avatar-edit-wrapper">
        <img
          ref={bgImageNode}
          style={{ transform: `scale(${zoom}) translate(${x}px, ${y}px)` }}
          className="bg-image-blur"
          src={src}
          alt=""
        />
        <div ref={cropCircleNode} className="crop-circle">
          <img
            style={{ transform: `scale(${zoom}) translate(${x}px, ${y}px)` }}
            className="avatar-edit"
            src={src}
            alt=""
            // onWheel={(e) => (e.deltaY > 0 ? zoomIn() : zoomOut())}
            draggable={false}
            // onMouseDown={handleMouseDown}
          />
        </div>
      </div>
    );
  }
);

function EditCoverPhoto({
  src,
  zoom,
  zoomIn,
  zoomOut,
  translate,
  handleMouseDown,
}) {
  return (
    <div className="coverphoto-edit-wrapper">
      <img
        style={{ transform: `scale(${zoom}) translateX(${translate})` }}
        src={src}
        alt="edit new avatar"
        // onWheel={(e) => (e.deltaY > 0 ? zoomIn() : zoomOut())}
      />
    </div>
  );
}

// export { EditCoverPhoto, EditAvatar };
