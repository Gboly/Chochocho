import "./post-image-fullscreen.css"
import midex from "../../midex.png"

export default function PostImageFullscreen() {
  return (
    <div className='pifs-container'>
        <div className="pifs-wrapper">
            <div className="media-option-custom-icon remove-video-icon">
              ✖
            </div>
            <div className="pifs-image-container">
                <img src={midex} alt="Would be passed down from create post" className="pifs-image" />
            </div>
        </div>
    </div>
  )
}
