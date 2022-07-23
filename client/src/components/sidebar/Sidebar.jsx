import "./sidebar.css"
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import avi2 from "../../avatar-square.png"
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useNavigate} from "react-router-dom";
import { useEffect, useRef  } from "react";



export default function Sidebar({hideSidebar, getPostPopUpNode}) {
    const navigate = useNavigate()
    const sidebarNode = useRef()

    useEffect(()=>{
        getPostPopUpNode(sidebarNode.current)
    },[getPostPopUpNode])

    const handleClick =(e)=>{        
        const id = e.currentTarget.id     
        navigate(`/${id}`)
    }
   
  return (
    <div className="sidebar-container" ref={sidebarNode}>
        <div className="sidebar-wrapper">
            <div className="sidebar-top">
                <button className="sidebar-close-button" onClick={hideSidebar}>
                    <CloseOutlinedIcon style={{color:"inherit", fontSize: "inherit", margin: "inherit"}} />
                </button>
                <img src={avi2} alt="avatar" className="sidebar-avi" />
                <p className="sidebar-username">
                    Ahmed Quamordeen Gbolahan
                </p>
            </div>
            <hr className="sidebar-hr" />
            <div className="sidebar-bottom">
                <div id="profile" className="sidebar-bottom-item" onClick={handleClick}>
                    <i className="sbi-icon">
                        <PermIdentityOutlinedIcon />
                    </i>
                    <span className="sbi-desc">
                        Profile
                    </span>
                </div>                
                <div id="community" className="sidebar-bottom-item" onClick={handleClick}>
                    <i className="sbi-icon">
                        <PeopleAltOutlinedIcon />
                    </i>
                    <span className="sbi-desc">
                        Community
                    </span>
                </div>
                <div id="chats" className="sidebar-bottom-item" onClick={handleClick}>
                    <i className="sbi-icon">
                        <LocalPostOfficeOutlinedIcon />
                    </i>
                    <span className="sbi-desc">
                        Chats
                    </span>
                </div>
                <div id="notification" className="sidebar-bottom-item" onClick={handleClick}>
                    <i className="sbi-icon">
                        <NotificationsOutlinedIcon />
                    </i>
                    <span className="sbi-desc">
                        Notification
                    </span>
                    <div className="sidebar-notification-count"></div>
                </div>
                <div id="explore" className="sidebar-bottom-item" onClick={handleClick}>
                    <i className="sbi-icon">
                        <ExploreOutlinedIcon />
                    </i>
                    <span className="sbi-desc">
                        Explore
                    </span>
                </div>
                <div id="settings" className="sidebar-bottom-item" onClick={handleClick}>
                    <i className="sbi-icon">
                        <SettingsOutlinedIcon />
                    </i>
                    <span className="sbi-desc">
                        Settings
                    </span>
                </div>
                <div id="log-out" className="sidebar-bottom-item" onClick={handleClick}>
                    <i className="sbi-icon">
                        <LogoutOutlinedIcon />
                    </i>
                    <span className="sbi-desc">
                        Logout
                    </span>
                </div>
                {/* <div className="sidebar-bottom-item">
                    <i className="sbi-icon">

                    </i>
                    <span className="sbi-desc">

                    </span>
                </div> */}
            </div>
        </div>
    </div>
  )
}
