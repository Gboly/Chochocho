import "./playback-speed.css";
import FormRadioOptions from "../../../components/form-radio-options/FormRadioOptions";
import {
  playbackSpeedOptions,
  playbackSpeedOptionsStyle,
} from "../../../util/formRadioOptions";
import { playbackSpeedInNumber } from "../../../util/functions";
import { useEffect, useState, forwardRef, useContext } from "react";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPlaybackRateState } from "../../posts/post-excerpt/postExcerptSlice";
import {
  closePlaybackSpeed,
  setPlaybackRate,
} from "../../../app/actions/homeActions";
import { GeneralContext } from "../../../routes/Router";

const PlayBackSpeed = forwardRef(() => {
  const dispatch = useDispatch();
  const { rateId: playbackRateId } = useSelector(getPlaybackRateState);
  const { videoPostNode } = useContext(GeneralContext);

  return (
    <div className="playback-speed-container">
      <div className="playback-speed-wrapper">
        <h3 className="playback-speed-header">Playback speed</h3>
        <div className="playback-speed-options">
          <FormRadioOptions
            {...{
              options: playbackSpeedOptions,
              sxx: playbackSpeedOptionsStyle,
              valueId: playbackRateId,
              setValue: (rateId) => {
                videoPostNode.current.videoPost.playbackRate =
                  playbackSpeedInNumber(rateId);
                dispatch(setPlaybackRate(rateId));
                dispatch(closePlaybackSpeed());
              },
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default PlayBackSpeed;
