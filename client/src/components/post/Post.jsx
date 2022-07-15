import "./post.css"
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
// import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
// import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
// import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import mude from "../../mude.png"
import tess from "../../tess.png"
import midex from "../../midex.png"
import avi2 from "../../avatar-square.png"



export default function Post() {
  return (
    <main className="post-container">
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
                        <icons className="ptr-icon">
                            <MoreHorizOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </icons>
                    </div>
                </div>
                <div className="post-center">
                    <p className="post-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a est vitae massa convallis sodales. In aliquet id velit sit amet tincidunt. Curabitur rutrum eu mauris at efficitur. Integer felis sem, pharetra non ligula non, tincidunt dignissim metus. Donec fermentum ac magna sed dictum. Proin id imperdiet augue.
                    </p>
                    <div className="post-media-container">
                        <img 
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80" 
                        alt="post" 
                        className="post-media" />                       
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
                            10.1k share
                        </span>
                    </div>
                </div>
            </div>
            <hr className="post-hr" />
            <div className="post-interaction">
                <span className="pi-item">
                    <icon className="pi-icon">
                        <FavoriteBorderOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </icon>
                    <span className="pi-text">
                        Like
                    </span>
                </span>
                <span className="pi-item">
                    <icon className="pi-icon">
                        <CommentOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </icon>
                    <span className="pi-text">
                        comment
                    </span>
                </span>
                <span className="pi-item">
                    <icon className="pi-icon pi-icon-flip">
                        <ReplyOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit", outline: "inherit"}} />
                    </icon>
                    <span className="pi-text">
                        share
                    </span>
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
