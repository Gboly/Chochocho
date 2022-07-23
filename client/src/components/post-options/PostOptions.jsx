import "./post-options.css"
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { useRef, useEffect, useState } from "react";



export default function PostOptions({getPostOptionsNode, openReportPost, openffPoster}) {
    //This actually needs to be saved in a DB
    const [followingPost, setfollowingPost] = useState(false) 
    
    const postOptionsNode = useRef()

    useEffect(()=>{        
         getPostOptionsNode(postOptionsNode.current)
    },[getPostOptionsNode])

    const followPost = ()=>{
        setfollowingPost(!followingPost)
    }
  
  return (
    <div className="post-options-container" ref={postOptionsNode}>
        <div className="post-options-wrapper">           
            <div className="post-option">
                <i className="post-option-icon">
                    <VisibilityOffOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </i>
                <span className="post-option-desc">
                    Hide post
                </span>
            </div>
            <div className="post-option" onClick={followPost}>
                <i className="post-option-icon">
                    {followingPost
                    ? <NotificationsOffOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    : <NotificationsOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    }
                </i>
                <span className="post-option-desc">
                    Turn {followingPost ? "off" : "on"} notification for this post
                </span>
            </div>
            <div className="post-option" onClick={openReportPost}>
                <i className="post-option-icon">
                    <ReportOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </i>
                <span className="post-option-desc">
                    Report this post
                </span>
            </div>
            <div className="post-option" onClick={openffPoster}>
                <i className="post-option-icon">
                    <PersonRemoveOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </i>
                <span className="post-option-desc">
                    Unfollow
                </span>
            </div>
        </div>
    </div>
  )
}
