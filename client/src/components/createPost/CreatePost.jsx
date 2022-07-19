import "./createPost.css"
import avi2 from "../../avatar-square.png"
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CreatePostHeader from "../createPost-header/CreatePostHeader";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

   

export default function CreatePost({createPost, openCreatePost, closeCreatePostWithin, focusCreateContainerClassName}) {
    const [options, setOptions] = useState(false)
    const [fileName, setfileName] = useState("")
    const [textValue, settextValue] = useState("")
    const [placeholder, setplaceholder] = useState(true)
    const [fileUrl, setfileUrl] = useState("")

    const customTextAreaNode = useRef()

    const navigate = useNavigate()

    useEffect(()=>{        
        textValue ? setplaceholder(false) : setplaceholder(true)
        createPost && customTextAreaNode.current.focus()
        // fileName && console.log(fileName);
    }, [textValue, fileName, createPost])

    const readUploadedMedia = useCallback(fileObject=>{
        const reader = new FileReader()
        reader.addEventListener("load", (e)=>{
            console.log(e)
            console.log(e.target);
            console.log(e.target.result);
            setfileUrl(e.target.result)
        })
        reader.readAsDataURL(fileObject)
    },[])

    const openOptions = ()=> setOptions(true)
    const closeOptions = ()=> options && setOptions(false)
    const getFile = (e)=>{
        const value = e.target.files[0]
        readUploadedMedia(value)
        // setfileName(value)
        // console.log(e.target.files[0].name + "..." + e.target.files[0].size )              
    }
    const getTextValue = (e)=>{
        const value = e.target.textContent 
        settextValue(value)
    }
 
    
        
  return (    
    <div className={`create-container ${createPost ? focusCreateContainerClassName : "" }`} onClick={closeOptions} >
        <form className="create-wrapper">
            {createPost && <CreatePostHeader {...{openOptions, options, closeCreatePostWithin}} />}
            <div className={`create-middle ${createPost ? "create-middle-focus" : ""}`}>
                <div className={`create-middle-text ${createPost ? "create-middle-text-focus" : ""}`} >
                    <img src={avi2} alt="avatar" className="create-avi" onClick={()=>{navigate("/profile")}} />
                    {placeholder 
                     && <span className="textarea-custom-placeholder">
                            What's happening?
                        </span>
                    }
                    {createPost 
                     ? <div ref={customTextAreaNode} onInput={getTextValue} className="create-textarea" contentEditable></div>
                     : <input type="text" placeholder="What's happening?" className="create-input" onFocus={openCreatePost} />
                    }
                </div>
                {createPost 
                    ? <div className="create-middle-media-container">
                        <video src={fileUrl} alt="post" className="create-middle-media"  controls />                    
                      </div> 
                    : null
                }
            </div>
            <div className="create-bottom">
                <div className="create-bottom-left">
                    <div className="create-bottom-left-item">
                        <label htmlFor="media-upload" className="cbli-media-upload">
                            <i className="cbli-icon">
                                <PermMediaOutlinedIcon 
                                style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                            </i>
                            <span className="cbli-desc">Media</span>
                        </label>
                        <input name="media-upload" id="media-upload" type="file" className="upload-file" onChange={getFile} />                  
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