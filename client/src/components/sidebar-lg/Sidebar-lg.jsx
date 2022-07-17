import "./sidebar-lg.css"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';



export default function SidebarLg() {
  return (
    <div className="sidebar-lg-container">
        <div className="sidebar-lg-wrapper">
            {/* <div className="sidebar-lg-top">
                <img src={avi2} alt="avatar" className="sidebar-lg-avi" />
                <p className="sidebar-lg-username">
                    Ahmed Quamordeen Gbolahan
                </p>
            </div>
            <hr className="sidebar-lg-hr" /> */}
            <div className="sidebar-lg-bottom">
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <OtherHousesOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Home
                    </span>
                </div>
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <PermIdentityOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Profile
                    </span>
                </div>
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <PeopleAltOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Community
                    </span>
                </div>
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <LocalPostOfficeOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Chats
                    </span>
                </div>
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <NotificationsOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Notification
                    </span>
                    <div className="sidebar-lg-notification-count"></div>
                </div>
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <ExploreOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Explore
                    </span>
                </div>
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <SettingsOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Settings
                    </span>
                </div>
                <div className="sidebar-lg-bottom-item">
                    <icon className="sbi-lg-icon">
                        <LogoutOutlinedIcon />
                    </icon>
                    <span className="sbi-lg-desc">
                        Logout
                    </span>
                </div>               
            </div>
        </div>
    </div>
  )
}
