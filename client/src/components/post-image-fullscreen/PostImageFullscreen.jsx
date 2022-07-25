import "./post-image-fullscreen.css"
import tess from "../../tess.png"
import { useEffect, useRef } from "react"

export default function PostImageFullscreen({fileUrl, closePifs, getFullscreenImageNode}) {

    const fullScreenImageNode = useRef()
   

    const closeFullscreenByTappingBlankSpace = (e)=>{
        !(fullScreenImageNode.current === e.target) && closePifs()
    }

  return (
    <div className='pifs-container' onClick={closeFullscreenByTappingBlankSpace}>
        <div className="pifs-wrapper">
            <div className="media-option-custom-icon remove-video-icon" onClick={closePifs}>
              ✖
            </div>
            <div className="pifs-image-container">
                <img ref={fullScreenImageNode} src={fileUrl} alt="Would be passed down from create post" className="pifs-image" />
            </div>
        </div>
    </div>
  )
}
