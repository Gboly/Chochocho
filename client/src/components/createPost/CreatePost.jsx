import "./createPost.css"
import avi2 from "../../avatar-square.png"
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';


export default function CreatePost() {
  return (
    <div className="create-container">
        <form className="create-wrapper">
            <div className="create-top">
                <img src={avi2} alt="avatar" className="create-avi" />
                <input type="text" placeholder="What's happening?" className="create-input" />
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
