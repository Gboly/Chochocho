import "./sidebar-lg.css"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import { useNavigate } from "react-router-dom";


export default function SidebarLg() {

    const navigate = useNavigate()

    const handleClick = (e)=>{
        const id = e.currentTarget.id       
        navigate(`/${id}`)
    }

  return (
    <div className="sidebar-lg-container">
        <div className="sidebar-lg-wrapper">           
            <div className="sidebar-lg-bottom">
                <div id="" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <OtherHousesOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Home
                    </span>
                </div>
                <div id="profile" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <PermIdentityOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Profile
                    </span>
                </div>
                <div id="community" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <PeopleAltOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Community
                    </span>
                </div>
                <div id="chats" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <LocalPostOfficeOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Chats
                    </span>
                </div>
                <div id="notification" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <NotificationsOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Notification
                    </span>
                    <div className="sidebar-lg-notification-count" />
                </div>
                <div id="explore" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <ExploreOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Explore
                    </span>
                </div>
                <div id="settings" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <SettingsOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Settings
                    </span>
                </div>
                <div id="log-out" className="sidebar-lg-bottom-item" onClick={handleClick}>
                    <i className="sbi-lg-icon">
                        <LogoutOutlinedIcon />
                    </i>
                    <span className="sbi-lg-desc">
                        Logout
                    </span>
                </div>               
            </div>
        </div>
    </div>
  )
}
