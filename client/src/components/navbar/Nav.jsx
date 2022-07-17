import "./nav.css"
import avi2 from "../../avatar-square.png"
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';

export default function Nav({displaySidebar}){
  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-left">
          <img src={avi2} alt="avatar" className="avi" onClick={displaySidebar} />
        </div>
        <div className="nav-center">
          <span className="app-name">
            Chochocho
          </span>          
        </div>
        <div className="nav-right">
        <LocalPostOfficeOutlinedIcon />
        </div>
      </div>
    </nav>
  )
}
