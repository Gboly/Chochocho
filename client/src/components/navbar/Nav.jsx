import "./nav.css"
import chatImg from "../../chat.png"
import avi2 from "../../avatar-square.png"

export default function Nav(){
  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left">
          <img src={avi2} alt="avatar" className="avi" />
        </div>
        <div className="nav-center">
          <span className="app-name">
            Chochocho
          </span>          
        </div>
        <div className="nav-right">        
        <img src={chatImg} alt="speech bubble icons" className="chat-icon" />
        </div>
      </div>
    </nav>
  )
}
