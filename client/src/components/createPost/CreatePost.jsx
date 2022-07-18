import "./createPost.css"
import avi2 from "../../avatar-square.png"
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CreatePostHeader from "../createPost-header/CreatePostHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreatePost({createPost, openCreatePost, closeCreatePostWithin}) {
    const [options, setOptions] = useState(false)

    const navigate = useNavigate()

    const openOptions = ()=> setOptions(true)
    const closeOptions = ()=> options && setOptions(false)
        
  return (    
    <div className={`create-container ${createPost && "create-container-focus" }`} onClick={closeOptions} >
        <form className="create-wrapper">
            {createPost && <CreatePostHeader {...{openOptions, options, closeCreatePostWithin}} />}
            <div className="create-middle" >
                <img src={avi2} alt="avatar" className="create-avi" onClick={()=>{navigate("/profile")}} />
                {createPost 
                 ? <textarea rows={7} placeholder="What's happening?" className="create-textarea" />
                 : <input type="text" placeholder="What's happening?" className="create-input" onClick={openCreatePost} />
                 }
            </div>
            <div className="create-bottom">
                <div className="create-bottom-left">
                    <div className="create-bottom-left-item">
                        <i className="cbli-icon">
                        <PermMediaOutlinedIcon 
                        style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </i>
                        <span className="cbli-desc">Media</span>
                    </div>
                    <div className="create-bottom-left-item">
                        <i className="cbli-icon">
                        <LocalOfferOutlinedIcon 
                        style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </i>
                        <span className="cbli-desc">Tag</span>
                    </div>
                    <div className="create-bottom-left-item">
                        <i className="cbli-icon">
                        <SentimentSatisfiedOutlinedIcon 
                        style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </i>
                        <span className="cbli-desc">Feeling</span>
                    </div>
                </div>
                <div type="submit" className="create-bottom-right">
                    <button className="cbr-button" >Post</button>
                </div>
            </div>
        </form>
    </div>    
  )
}