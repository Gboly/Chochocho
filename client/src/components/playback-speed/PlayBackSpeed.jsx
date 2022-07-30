import "./playback-speed.css"
import FormRadioOptions from "../form-radio-options/FormRadioOptions"
import { useEffect, useState } from "react"
import { useRef } from "react"

const playbackSpeedInNumber = (value)=>{
    const numberReady = value.replace("x", "")
    return Number(numberReady);
}

export default function PlayBackSpeed({getPlaybackSpeedNode, handlePlaybackSpeed, closePlaybackSpeed, globalPlaybackRateState, setGlobalPlayBackRateState}) {

    const [currentOption, setcurrentOption] = useState(globalPlaybackRateState)

    const playbackSpeedNode = useRef()   
   
    useEffect(()=>{
        getPlaybackSpeedNode(playbackSpeedNode.current)        
    },[getPlaybackSpeedNode])

    const handleChange = (e)=>{
        const {value} = e.target
        setcurrentOption(value)
        handlePlaybackSpeed(playbackSpeedInNumber(value))
        setGlobalPlayBackRateState(value)
        closePlaybackSpeed()
    }    

  return (
    <div className="playback-speed-container" ref={playbackSpeedNode}>
        <div className="playback-speed-wrapper">
            <h3 className="playback-speed-header">Playback speed</h3>
            <FormRadioOptions {...{
                options:
                ["0.25x",
                "0.5x",
                "0.75x",
                "1x",
                "1.25x",
                "1.5x",
                "1.75x",
                "2x"],                
                currentOption,
                handleChange,
                optionsContainerClassName: "playback-speed-options",
                sxx: { gap: 17, display: "flex", flexFlow: "row-reverse", justifyContent: "space-between", margin: "0"}
            }} />
        </div>
    </div>
  )
}
