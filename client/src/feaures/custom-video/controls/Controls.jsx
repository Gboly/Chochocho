import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { iconStyle } from "../../../util/iconDescContent";
import PlaybackSpeed from "../playback-speed/PlaybackSpeed";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  forwardRef,
  createContext,
} from "react";

import { useSelector, useDispatch } from "react-redux";
import { getPlayState } from "../customVideoSlice";
import { openPlaybackSpeed } from "../../../app/actions/homeActions";
import { getPlaybackRateState } from "../../posts/post-excerpt/postExcerptSlice";

import "./controls.css";
import { showPopupOnTransparentOverlay, timing } from "../../../util/functions";
import { playbackSpeedType } from "../../../util/types";

const Controls = forwardRef(
  ({ postId, playing, handlePlayPause, duration }, ref) => {
    const [currentProgressIndicator, setCurrentProgressIndicator] =
      useState(false);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [maxProgress, setMaxProgress] = useState(0);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

    const currentProgressIndicatorNode = useRef();
    const progressBarNode = useRef();

    const videoSkip = useCallback(
      (e, type) => {
        let skipPositionRelativeToWindow;
        type === "touchmove"
          ? (skipPositionRelativeToWindow = e.changedTouches[0].clientX)
          : (skipPositionRelativeToWindow = e.clientX);
        const progressBarPositionRelativeToWindow =
          progressBarNode.current.getBoundingClientRect().left;
        const offsetPositionRelativeToProgressBar =
          skipPositionRelativeToWindow - progressBarPositionRelativeToWindow;
        const { duration } = ref.current;
        const maxProgress = progressBarNode.current.clientWidth;

        offsetPositionRelativeToProgressBar < 0
          ? (ref.current.currentTime = (0 / maxProgress) * duration)
          : offsetPositionRelativeToProgressBar > maxProgress
          ? (ref.current.currentTime = (maxProgress / maxProgress) * duration)
          : (ref.current.currentTime =
              (offsetPositionRelativeToProgressBar / maxProgress) * duration);
      },
      [ref]
    );

    useEffect(() => {
      setMaxProgress(progressBarNode.current.clientWidth);
      ref.current.addEventListener("timeupdate", (e) => {
        const { currentTime, duration } = e.target;
        setCurrentTime(() => timing(currentTime));
        setCurrentProgress((currentTime / duration) * maxProgress);
      });
    }, [maxProgress, ref]);

    const handleShowCurrentProgressIndicator = () => {
      setCurrentProgressIndicator(true);
    };

    const handleHideCurrentProgressIndicator = () => {
      !mouseDown && setCurrentProgressIndicator(false);
    };

    const handleProgressSkipOnClick = (e) => {
      videoSkip(e, "click");
    };

    const handleMouseMove = (e) => {
      videoSkip(e, "mousemove");
    };

    const handleMouseUp = () => {
      setMouseDown(false);
      document.removeEventListener("mousemove", handleMouseMove);
    };

    const handleMouseDown = () => {
      setMouseDown(true);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleTouchMove = (e) => {
      videoSkip(e, "touchmove");
    };

    const handleTouchEnd = () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };

    const handleTouchStart = () => {
      setMouseDown(true);
      setCurrentProgressIndicator(true);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    };

    const handleFullscreen = () => {
      ref.current.requestFullscreen
        ? ref.current.requestFullscreen()
        : ref.current.webkitRequestFullscreen
        ? ref.current.webkitRequestFullscreen()
        : ref.current.mozRequestFullscreen &&
          ref.current.mozRequestFullscreen();
    };

    const showPlaybackSpeed = (e) => {
      e && e.stopPropagation && e.stopPropagation();
      const overlayParams = {
        type: playbackSpeedType,
        x: e.clientX,
        y: e.clientY,
        isBottom: true,
      };
      showPopupOnTransparentOverlay(openPlaybackSpeed, overlayParams, postId);
    };

    return (
      <>
        <div className="cvc-main">
          <div
            className="cvc-progress-container"
            onClick={handleProgressSkipOnClick}
            onTouchStart={handleTouchStart}
            onMouseOver={handleShowCurrentProgressIndicator}
            onMouseOut={handleHideCurrentProgressIndicator}
          >
            <progress
              ref={progressBarNode}
              value={currentProgress}
              min={0}
              max={maxProgress}
              className={
                currentProgressIndicator ? "cvc-progress-hover" : "cvc-progress"
              }
            ></progress>
            <span className="cvc-progress-bar"></span>
            {currentProgressIndicator && (
              <div
                onMouseDown={handleMouseDown}
                ref={currentProgressIndicatorNode}
                className="cvc-current-time-indicator"
                style={{ left: `${currentProgress - 8}px` }}
                onDragStart={(e) => e.preventDefault()}
                draggable
              />
            )}
          </div>
          <div className="cvc-buttons">
            <div className="cvc-buttons-left">
              <button className="cvc-playPause" onClick={handlePlayPause}>
                {playing ? (
                  <PauseIcon style={iconStyle} />
                ) : (
                  <PlayArrowIcon style={iconStyle} />
                )}
              </button>
              <span className="cvc-views-count">10,375 views</span>
            </div>
            <div className="cvc-buttons-right">
              <span className="cvc-duration">
                {`${currentTime} / ${duration}`}
              </span>
              <button
                className="cvc-playback-speed"
                onClick={showPlaybackSpeed}
              >
                <SettingsOutlinedIcon style={iconStyle} />
              </button>
              <button className="cvc-fullscreen" onClick={handleFullscreen}>
                <FullscreenOutlinedIcon style={iconStyle} />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Controls;
