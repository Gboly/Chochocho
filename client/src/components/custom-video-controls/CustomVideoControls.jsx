import "./custom-video-controls.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { useState, useRef } from "react";
import { useEffect, useCallback } from "react";
import PlayBackSpeed from "../playback-speed/PlayBackSpeed";


export default function CustomVideoControls({getPlaybackSpeedNode, openPlaybackspeed, playbackSpeed, index, closePlaybackSpeed, globalPlaybackRateState, setGlobalPlayBackRateState, fileUrl}) {
    const [initialPlay, setInitialPlay] = useState(false)
    const [showControls, setShowControls] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [currentProgressIndicator, setCurrentProgressIndicator] = useState(false)
    const [duration, setDuration] = useState("0:00")
    const [currentTime, setCurrentTime] = useState("0:00")
    const [maxProgress, setMaxProgress] = useState(0)
    const [currentProgress, setCurrentProgress] = useState(0)
    const [mouseDown, setMouseDown] = useState(false)
    

    const videoNode = useRef()
    const progressBarNode = useRef()
    const currentProgressIndicatorNode = useRef()

    const timing = useCallback((time)=>{        
        const min = Math.floor(time / 60)
        const sec = Math.round(time % 60)
        
        if(sec > 9){
            return(`${min}:${sec}`)
        }
            return(`${min}:0${sec}`)
    }, [])

    const videoSkip = useCallback((e, type)=>{
        let skipPositionRelativeToWindow;
        type === "touchmove" ? skipPositionRelativeToWindow = e.changedTouches[0].clientX : skipPositionRelativeToWindow = e.clientX
        const progressBarPositionRelativeToWindow = progressBarNode.current.getBoundingClientRect().left
        const offsetPositionRelativeToProgressBar = skipPositionRelativeToWindow - progressBarPositionRelativeToWindow
        const {duration} = videoNode.current
        const maxProgress = progressBarNode.current.clientWidth
        
        offsetPositionRelativeToProgressBar < 0 
        ? videoNode.current.currentTime = (0/maxProgress) * duration
        : offsetPositionRelativeToProgressBar > maxProgress
        ? videoNode.current.currentTime = (maxProgress/maxProgress) * duration
        : videoNode.current.currentTime = (offsetPositionRelativeToProgressBar/maxProgress) * duration
    }, [])

    useEffect(()=>{
        showControls && setMaxProgress(progressBarNode.current.clientWidth)
        videoNode.current.addEventListener("ended", ()=>{
            setPlaying(false)
            setShowControls(true)            
        })
        videoNode.current.addEventListener("loadedmetadata", (e)=>{
            const duration = e.target.duration
            setDuration(()=>timing(duration))                       
        })
        videoNode.current.addEventListener("timeupdate", (e)=>{
            const {currentTime, duration} = e.target
            setCurrentTime(()=>timing(currentTime))
            setCurrentProgress((currentTime/duration)*maxProgress)
        })       
               
    }, [timing, maxProgress, showControls])

    const handleShowControls = ()=>{
        (initialPlay && playing) && setShowControls(true)
    }
    const handleHideControls = ()=>{
        (initialPlay && playing && !mouseDown && !playbackSpeed) && setShowControls(false)
    }
    const handlePlayPause = ()=>{
        !initialPlay && setInitialPlay(true)
        setShowControls(true)        
        
        !playing && videoNode.current.play()
        videoNode.current.addEventListener("play", (e)=>{
            setPlaying(true)            
        })
        playing && videoNode.current.pause()
        videoNode.current.addEventListener("pause", (e)=>{
            setPlaying(false)
        })
    }
    const handleShowCurrentProgressIndicator = ()=>{
        setCurrentProgressIndicator(true)
    }
    const handleHideCurrentProgressIndicator = ()=>{
        !mouseDown && setCurrentProgressIndicator(false)
    }
    const handleProgressSkipOnClick = (e)=>{
        videoSkip(e, "click")
    }
    const handleDragStart = (e)=>{
        e.preventDefault()
        return false        
    }    
    const handleMouseMove = (e)=>{
        videoSkip(e, "mousemove")
    }
    const handleMouseUp = ()=>{
        setMouseDown(false)
        document.removeEventListener("mousemove", handleMouseMove)
    }
    const handleMouseDown = ()=>{
        setMouseDown(true)     
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }
    const handleTouchMove = (e)=>{
        videoSkip(e, "touchmove")
    }
    const handleTouchEnd = ()=>{
        document.removeEventListener("touchmove", handleTouchMove)       
    }
    const handleTouchStart = ()=>{
        setMouseDown(true)
        setCurrentProgressIndicator(true)
        document.addEventListener("touchmove", handleTouchMove)
        document.addEventListener("touchend", handleTouchEnd)
    }    
    const handleFullscreen = ()=>{
        videoNode.current.requestFullscreen 
        ? videoNode.current.requestFullscreen()
        : videoNode.current.webkitRequestFullscreen 
        ? videoNode.current.webkitRequestFullscreen()
        : videoNode.current.mozRequestFullscreen
        && videoNode.current.mozRequestFullscreen()
    }
    const showPlaybackSpeed = (e)=>{
        openPlaybackspeed(e.currentTarget.id)
    }
    const handlePlaybackSpeed = (rate)=>{
        videoNode.current.playbackRate = rate
    }
    

  return (
    <div className='cvc-container' onMouseOver={handleShowControls} onMouseOut={handleHideControls}>
        <div className="cvc-wrapper">
            {playbackSpeed && <PlayBackSpeed {...{getPlaybackSpeedNode, handlePlaybackSpeed, closePlaybackSpeed, globalPlaybackRateState, setGlobalPlayBackRateState}} />}
            {!initialPlay && <div className="cvc-initial-play" onClick={handlePlayPause}>
                <PlayArrowIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
            </div>}
            <video onClick={handlePlayPause} ref={videoNode} src={fileUrl} className={`cvc-video ${initialPlay && "cvc-video-playing"}`} ></video>
            {showControls && <div className="cvc-main" >
            <div className="cvc-progress-container" onClick={handleProgressSkipOnClick} onTouchStart={handleTouchStart} onMouseOver={handleShowCurrentProgressIndicator} onMouseOut={handleHideCurrentProgressIndicator}>
                <progress ref={progressBarNode} value={currentProgress} min={0} max={maxProgress} className={currentProgressIndicator ? "cvc-progress-hover" : "cvc-progress"}> 
                </progress>
                <span className="cvc-progress-bar">
                </span>
                {currentProgressIndicator && <div onMouseDown={handleMouseDown} ref={currentProgressIndicatorNode} className="cvc-current-time-indicator" style={{left:`${currentProgress - 8}px`}} onDragStart={handleDragStart} draggable />}
            </div>
                <div className="cvc-buttons">
                    <div className="cvc-buttons-left">
                        <button className="cvc-playPause" onClick={handlePlayPause}>
                            {playing 
                            ? <PauseIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                            : <PlayArrowIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                            }
                        </button>
                        <span className="cvc-views-count">
                            10,375 views
                        </span>
                    </div>
                    <div className="cvc-buttons-right">
                        <span className="cvc-duration">
                            {`${currentTime} / ${duration}`}
                        </span>
                        <button id={`${index}`} className="cvc-playback-speed" onClick={showPlaybackSpeed}>
                            <SettingsOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />                            
                        </button>
                        <button className="cvc-fullscreen" onClick={handleFullscreen}>
                            <FullscreenOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    </div>
  )
}
