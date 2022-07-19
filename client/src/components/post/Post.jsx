import "./post.css"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
// import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
// import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
// import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import mude from "../../mude.png"
import tess from "../../tess.png"
import midex from "../../midex.png"
import avi2 from "../../avatar-square.png"
import PostOptions from "../post-options/PostOptions";
import PostShare from "../post-share/PostShare";
import { useEffect, useState } from "react";
import video from "../../video.mp4"


export default function Post({activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}) {
    const [postOptions, setpostOptions] = useState(false)
    const [isLiked, setisLiked] = useState(false)
    const [postShare, setpostShare] = useState(false)
    
    useEffect(()=>{
        if(!closePostPopUp){
            postOptions && setpostOptions(false)
            postShare && setpostShare(false)
        }        
    }, [closePostPopUp, setpostOptions, postOptions, postShare])

    const openPostOptions = ()=>{
        setpostOptions(true)
        activateOutsideClosePostPopUp()
    }
    const likePost = ()=>{
        setisLiked(!isLiked)
    }
    const openPostShare = ()=>{
        setpostShare(true)
        activateOutsideClosePostPopUp()
    }

  return (
    <main className="post-container">
        {postOptions &&<PostOptions getPostOptionsNode={getPostPopUpNode} />}
        {postShare &&<PostShare getPostShareNode={getPostPopUpNode} />}
        <div className="post-wrapper">
            <div className="post-main">
                <div className="post-top">
                    <div className="post-top-left">
                        <img src={mude} alt="poster's avatar" className="poster-img" />
                        <div className="poster">
                            <span className="poster-name">
                                Muhydeen salaudeen
                            </span>
                            <span className="post-time">
                                2h. Public
                            </span>
                        </div>
                    </div>
                    <div className="post-top-right">
                        <i className="ptr-icon" onClick={openPostOptions}>
                            <MoreHorizOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </i>
                    </div>
                </div>
                <div className="post-center">
                    <p className="post-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a est vitae massa convallis sodales. In aliquet id velit sit amet tincidunt. Curabitur rutrum eu mauris at efficitur. Integer felis sem, pharetra non ligula non, tincidunt dignissim metus. Donec fermentum ac magna sed dictum. Proin id imperdiet augue.
                    </p>
                    <div className="post-media-container">
                        <video 
                        src={video}
                        alt="post" 
                        className="post-media" controls>
                        
                        </video>                       
                    </div>
                </div>
                <div className="post-bottom">
                    <div className="post-bottom-left">
                        <img 
                        src={midex} 
                        alt="Avatar of a user who liked this post" 
                        className="likes-count" />
                        <img 
                        src={avi2} 
                        alt="Avatar of another user who liked this post" 
                        className="likes-count" />
                        <img 
                        src={tess} 
                        alt="Avatar of another user who liked this post." 
                        className="likes-count" />
                        <div className="like-count-remainder">
                            +1k
                        </div>
                    </div>
                    <div className="post-bottom-right">
                        <span className="comments-count">
                            3.9k comments
                        </span>
                        <span className="share-count">
                            10.1k reposts
                        </span>
                    </div>
                </div>
            </div>
            <hr className="post-hr" />
            <div className="post-interaction">
                <span className="pi-item" onClick={likePost}>
                    <i className="pi-icon" id="like">
                        {isLiked
                        ? <FavoriteOutlinedIcon style={{fontSize: "inherit", color: "#c32aa3", fontWeight: "inherit"}} />
                        : <FavoriteBorderOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} /> 
                        }
                    </i>
                    {/* <span className="pi-text">
                        
                    </span> */}
                </span>
                <span className="pi-item">
                    <i className="pi-icon" id="comment">
                        <CommentOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </i>
                    {/* <span className="pi-text">
                        
                    </span> */}
                </span>
                <span className="pi-item" id="share" onClick={openPostShare}>
                    <i className="pi-icon pi-icon-flip">
                        <IosShareOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit", outline: "inherit"}} />
                    </i>
                    {/* <span className="pi-text">
                        
                    </span> */}
                </span>
            </div>
            {/* <hr />
            <div className="post-comment">
                <div className="comment-input-container">
                    <input type="text" className="comment-input" />
                    <icon className="comment-icon">
                        <GifBoxOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </icon>
                    <icon className="comment-icon">
                        <PermMediaOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </icon>
                    <icon className="comment-icon">
                        <SentimentSatisfiedOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </icon>
                </div>
                <div className="send-comment">
                    <icon className="send-icon">
                        <SendOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </icon>
                </div>
            </div> */}
        </div>        
    </main>
  )
}
