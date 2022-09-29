import "./custom-video.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState, useRef } from "react";
import { useEffect, useCallback } from "react";
// import PlayBackSpeed from "../playback-speed/PlayBackSpeed";
import { iconStyle } from "../../util/iconDescContent";
import video from "../../assets/video.mp4";
import { timing } from "../../util/functions";

import { useSelector, useDispatch } from "react-redux";
import { getPlaybackRateState } from "../posts/post-excerpt/postExcerptSlice";

import Controls from "./controls/Controls";

export default function CustomVideo({ src, postId }) {
  // const dispatch = useDispatch();
  // const {isOpen: initialPlay, id: initialPlayId} = useSelector(getInitialPlayState);
  // const playing = useSelector(getPlayState);
  // const controls = useSelector(getControlsState);

  const [initialPlay, setInitialPlay] = useState(false);
  const [controls, setControls] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const { isOpen: playbackIsOpen } = useSelector(getPlaybackRateState);

  const videoNode = useRef();

  useEffect(() => {
    videoNode.current.addEventListener("loadedmetadata", (e) => {
      const duration = e.target.duration;
      setDuration(() => timing(duration));
    });
    videoNode.current.addEventListener("ended", () => {
      setPlaying(false);
      setControls(true);
    });
  }, []);

  const showControls = () => {
    initialPlay && playing && setControls(true);
  };
  const hideControls = () => {
    // playbackSpeed && mouseDown with useContext
    initialPlay && playing && !playbackIsOpen && setControls(false);
  };
  const handlePlayPause = () => {
    !initialPlay && setInitialPlay(true);
    setControls(true);

    !playing && videoNode.current.play();
    videoNode.current.addEventListener("play", (e) => {
      setPlaying(true);
    });
    playing && videoNode.current.pause();
    videoNode.current.addEventListener("pause", (e) => {
      setPlaying(false);
    });
  };

  return (
    <div
      className="cvc-container"
      onMouseOver={showControls}
      onMouseOut={hideControls}
    >
      <div className="cvc-wrapper">
        {/* {playbackSpeed && <PlayBackSpeed {...{getPlaybackSpeedNode, handlePlaybackSpeed, closePlaybackSpeed, globalPlaybackRateState, setGlobalPlayBackRateState}} />} */}
        {!initialPlay && (
          <div className="cvc-initial-play" onClick={handlePlayPause}>
            <PlayArrowIcon style={iconStyle} />
          </div>
        )}
        <video
          ref={videoNode}
          src={video}
          className={`cvc-video ${initialPlay && "cvc-video-playing"}`}
          onClick={handlePlayPause}
        ></video>
        {controls && (
          <Controls
            ref={videoNode}
            {...{ postId, playing, handlePlayPause, duration }}
          />
        )}
      </div>
    </div>
  );
}
