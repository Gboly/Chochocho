import "./createPost.css"
import avi2 from "../../avatar-square.png"
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CreatePostHeader from "../createPost-header/CreatePostHeader";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WriteAlt from "../write-alt/WriteAlt";

   

export default function CreatePost({
        createPost,
        openCreatePost,
        closeCreatePostWithin,
        focusCreateContainerClassName,
        altContainerHeight,
        openCreateAlt,
        closeCreateAlt,
        createAlt,
        fileType,
        fileUrl,
        getFile,
        removePicture,
        getElemOnOpaqueNode
    }) {
    const [options, setOptions] = useState(false)    
    const [textValue, settextValue] = useState("")
    const [placeholder, setplaceholder] = useState(true)
 
    
    const customTextAreaNode = useRef()
    const fileInputNode = useRef()
    const createPostNode = useRef()

    useEffect(()=>{
        getElemOnOpaqueNode(createPostNode.current)
    }, [getElemOnOpaqueNode])

    const navigate = useNavigate()

    useEffect(()=>{
        textValue ? setplaceholder(false) : setplaceholder(true)
        createPost && customTextAreaNode.current.focus()       
    }, [textValue, createPost])

    const openOptions = ()=> setOptions(true)
    const closeOptions = ()=> options && setOptions(false)
 
    const getTextValue = (e)=>{
        const value = e.target.textContent
        settextValue(value)
    }
    const handleGetFile = ()=>{
        getFile(fileInputNode.current)
    }
    const handleRemovePicture = ()=>{
        removePicture(fileInputNode.current)
    }
       
        
  return (    
    <div ref={createPostNode} id={createAlt ? "create-container-forAlt" : ""} className={`create-container ${createPost ? focusCreateContainerClassName : "" }`} onClick={closeOptions} >
        {createAlt 
        ? <WriteAlt {...{closeCreateAlt, fileUrl, altContainerHeight }} />
        : null}
        <form className={` ${createPost ? "create-wrapper-focus" : "create-wrapper" }`}>
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
                        {
                            fileType.startsWith("video")
                            ?   <>
                                    <video src={fileUrl} alt="post" className="create-middle-media"  controls />
                                    <div onClick={handleRemovePicture} className="media-option-custom-icon remove-video-icon">
                                        ✖
                                    </div>
                                </>
                            :   fileType.startsWith("image")
                                ?   <>
                                        <div className="media-container-options">
                                            <div onClick={handleRemovePicture} className="media-option-custom-icon remove-picture-icon">
                                                ✖
                                            </div>
                                            <div onClick={openCreateAlt} className="media-option-custom-icon alt-text-icon">
                                                +ALT
                                            </div>
                                        </div>
                                        <img src={fileUrl} alt="post" className="create-middle-media" />
                                    </>
                                :   null
                        }                    
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
                        <input ref={fileInputNode} name="media-upload" id="media-upload" type="file" className="upload-file" onChange={handleGetFile} />                  
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