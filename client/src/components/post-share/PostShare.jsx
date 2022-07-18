import "./post-share.css"
import AirlineStopsOutlinedIcon from '@mui/icons-material/AirlineStopsOutlined';
import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useState, useEffect, useRef } from "react";

export default function PostShare({getPostShareNode}) {
    const [bookMarkedPost, setbookMarkedPost] = useState(false)
    const [reposted, setreposted] = useState(false)
    const postShareNode = useRef()

    useEffect(()=>{
        // console.log(postOptionsNode.current)
         getPostShareNode(postShareNode.current)
    },[getPostShareNode])

    const bookmarkPost = ()=>{
        setbookMarkedPost(!bookMarkedPost)
    }
    const repost = ()=>{
        setreposted(!reposted)
    }

  return (
    <div className="post-share-container" ref={postShareNode}>
        <div className="post-share-wrapper">
            <div className={`post-share-item ${reposted && "post-share-repost"}`} id="repost" onClick={repost} >
                <i className="psi-icon">
                    <AirlineStopsOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </i>
                <span className="psi-desc">
                    {`Repost${reposted ? "ed" : ""}`}
                </span>
            </div>
            <div className="post-share-item" onClick={bookmarkPost}>
                <i className="psi-icon">
                {bookMarkedPost
                    ? <BookmarkRemoveOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    : <BookmarkAddOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    }
                </i>
                <span className="psi-desc">
                {bookMarkedPost ? "Remove from" : "Add to"} Bookmarks
                </span>
            </div>
            <div className="post-share-item" >
                <i className="psi-icon">
                    <LocalPostOfficeOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </i>
                <span className="psi-desc">
                    Share via Direct Message
                </span>
            </div>
            <div className="post-share-item" >
                <i className="psi-icon">
                    <LinkOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </i>
                <span className="psi-desc">
                    Copy link to Post
                </span>
            </div>
        </div>
    </div>
  )
}
