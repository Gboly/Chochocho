import SimpleHeader from "../../../components/simple-header/SimpleHeader";
import "./edit-profile-image.css";
import { Stack, Slider } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { closeEditProfileImage } from "../../../app/actions/profileActions";
import { getEditProfileImageState } from "../../../pages/profile/profileSlice";
import { useSelector } from "react-redux";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
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
} from "../../../util/functions";

const translateInitialState = { x: 0, y: 0 };
const overflowInitialState = {
  left: null,
  right: null,
  top: null,
  bottom: null,
};

export default function EditProfileImage() {
  const { src, imageType, reading, initiatingRoute } = useSelector(
    getEditProfileImageState
  );
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState(translateInitialState);
  const [initialOverflow, setInitialOverflow] = useState(overflowInitialState);

  const initialMousePosition = useRef();
  const imageNodes = useRef();

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

  const zoomIn = () => zoom < 2 && setZoom((prev) => prev + 0.1);
  const zoomOut = () => zoom > 0.5 && setZoom((prev) => prev - 0.1);

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
    setZoom(1);
    setTranslate(translateInitialState);
  };

  const handleClose = () => {
    initiatingRoute === settingsType
      ? closePopupOnOpaqueOverlay(closeEditProfileImage)
      : closeNestedPopupOnOpaqueOverlay(closeEditProfileImage, editProfileType);
  };
  return (
    <div
      className={`edit-profile-image-container ${
        imageType === coverPhotoType ? "edit-cover-photo-container" : ""
      }`}
    >
      <SimpleHeader
        desc={"Edit photo"}
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
      <section>
        <aside>
          <div>
            <Stack spacing={1.5} direction="row" alignItems="center">
              <i onClick={zoomOut}>
                <RemoveCircleOutlineIcon style={{ fontSize: "1.2rem" }} />
              </i>
              <Slider
                sx={{ width: "12rem", color: "#c32aa3" }}
                step={0.1}
                min={0.5}
                max={2}
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
              />
              <i onClick={zoomIn}>
                <AddCircleOutlineIcon style={{ fontSize: "1.2rem" }} />
              </i>
            </Stack>
          </div>
          <span>{Math.round((zoom - 1) * 100)}%</span>
          <i onClick={reset}>
            <RestartAltIcon />
          </i>
        </aside>
        <button>Save</button>
      </section>
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
            onWheel={(e) => (e.deltaY > 0 ? zoomIn() : zoomOut())}
            draggable={false}
            onMouseDown={handleMouseDown}
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
        onWheel={(e) => (e.deltaY > 0 ? zoomIn() : zoomOut())}
      />
    </div>
  );
}

// export { EditCoverPhoto, EditAvatar };
