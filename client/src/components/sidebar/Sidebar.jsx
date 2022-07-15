import "./sidebar.css"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import avi2 from "../../avatar-square.png"
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import {faMessage} from "@fortawesome/free-regular-svg-icons"



export default function Sidebar() {
  return (
    <div className="sidebar-container">
        <div className="sidebar-wrapper">
            <div className="sidebar-top">
                <img src={avi2} alt="avatar" className="sidebar-avi" />
                <p className="sidebar-username">
                    Ahmed Quamordeen Gbolahan
                </p>                
            </div>
            <hr className="sidebar-hr" />
            <div className="sidebar-bottom">
                <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">
                        <PermIdentityOutlinedIcon />
                    </icon>
                    <span className="sbi-desc">
                        Profile
                    </span>
                </div>
                <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">
                        <PeopleAltOutlinedIcon />
                    </icon>
                    <span className="sbi-desc">
                        Community
                    </span>
                </div>
                <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">
                        <LocalPostOfficeOutlinedIcon />
                    </icon>
                    <span className="sbi-desc">
                        Chats
                    </span>
                </div>
                <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">
                        <NotificationsOutlinedIcon />
                    </icon>
                    <span className="sbi-desc">
                        Notification
                    </span>
                    <div className="sidebar-notification-count"></div>
                </div>
                <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">
                        <ExploreOutlinedIcon />
                    </icon>
                    <span className="sbi-desc">
                        Explore
                    </span>
                </div>
                <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">
                        <SettingsOutlinedIcon />
                    </icon>
                    <span className="sbi-desc">
                        Settings
                    </span>
                </div>
                <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">
                        <LogoutOutlinedIcon />
                    </icon>
                    <span className="sbi-desc">
                        Logout
                    </span>
                </div>
                {/* <div className="sidebar-bottom-item">
                    <icon className="sbi-icon">

                    </icon>
                    <span className="sbi-desc">

                    </span>
                </div> */}
            </div>
        </div>
    </div>
  )
}
