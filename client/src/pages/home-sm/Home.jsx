import "./home.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import ReportPost from "../../components/report-post/ReportPost"
import FollowUnfollowPoster from "../../components/follow-unfollow-poster/FollowUnfollowPoster"
import PostImageFullscreen from "../../components/post-image-fullscreen/PostImageFullscreen"
import { useEffect, useState, useRef, useCallback } from "react"


export default function Home() {
  const [sidebar, setSidebar] = useState(false)
  const [createPost, setCreatePost] = useState(false)
  const [transparentOverlay, setTransparentOverlay] = useState(false)
  const [opaqueOverlay, setOpaqueOverlay] = useState(false)
  const [createAlt, setCreateAlt] = useState(false)
  const [reportPost, setReportPost] = useState(false)
  const [postOptions, setpostOptions] = useState(false)    
  const [postShare, setpostShare] = useState(false)
  const [targetPost, setTargetPost] = useState("")
  const [fileUrl, setfileUrl] = useState("")
  const [fileType, setfileType] = useState("")
  const [ffPoster, setFfPoster] = useState(false)
  const [postImageFullscreen, setPostImageFullscreen] = useState(false)
  const [postImageAlt, setPostImageAlt] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(false)
  const [globalPlaybackRateState, setPlaybackRate] = useState("1x")

  const elementOnOpaqueOverlayNode = useRef()
  const elementOnTransparentOverlayNode = useRef()

    useEffect(()=>{
      if(sidebar || opaqueOverlay){document.body.className = "hidden-body"}
      else{
        document.body.className = ""
      }
    }, [sidebar, opaqueOverlay])

  function displaySidebar(){
    setSidebar(true)
    setTransparentOverlay(true)
  }
  const hideSidebar = ()=>{
    setSidebar(false)
    setTransparentOverlay(false)
  }
  const openCreatePost = ()=>{
    setCreatePost(true)
    setOpaqueOverlay(true)
  }
  const closeCreatePostWithin = (e)=>{
    // e.currentTarget.id === "create-close-icon" &&s
    setCreatePost(false)
    setOpaqueOverlay(false)
  }
  
  const closeAnyPopUpByTappingOutside = (e)=>{
    if(opaqueOverlay){
      if(  !(elementOnOpaqueOverlayNode.current.contains(e.target) || e.target === elementOnOpaqueOverlayNode.current) 
        && !reportPost 
        && !ffPoster
          ){
        createAlt && setCreateAlt(false)
        createPost && setCreatePost(false)
        postImageAlt && setPostImageAlt(false)
        setOpaqueOverlay(false)
      }           
    }
    if (transparentOverlay){
      if(!elementOnTransparentOverlayNode.current.contains(e.target) || !e.target === elementOnTransparentOverlayNode.current){
        sidebar && setSidebar(false)
        postOptions && setpostOptions(false)
        postShare && setpostShare(false)
        playbackSpeed && setPlaybackSpeed(false)
        setTransparentOverlay(false)
      }  
    }
  }
  const getElemOnOpaqueNode = (node)=>{
    elementOnOpaqueOverlayNode.current = node
  }
  const getElemOnTransParentNode = (popUpNode)=>{
    elementOnTransparentOverlayNode.current = popUpNode
  }
  const openCreateAlt = ()=>{
    setCreateAlt(true)
  }
  const closeCreateAlt = ()=>{
      setCreateAlt(false)
  }
  const openReportPost = ()=>{
    setReportPost(true)
    setTransparentOverlay(false)
    setpostOptions(false)
    setOpaqueOverlay(true)
  }
  const closeReportPost = ()=>{
    setReportPost(false)
    setOpaqueOverlay(false)
  }
  const openPostOptions = (target)=>{
    setpostOptions(true)
    setTransparentOverlay(true)
    setTargetPost(target)      
  }  
  const openPostShare = (target)=>{
      setpostShare(true)
      setTransparentOverlay(true)
      setTargetPost(target)
  }
  const readUploadedMedia = useCallback(fileObject=>{
    const reader = new FileReader()
    reader.addEventListener("load", (e)=>{        
        setfileUrl(e.target.result)
    })
    reader.readAsDataURL(fileObject)
  },[])
  const getFile = (fileInputNode)=>{
    const fileObject = fileInputNode.files[0]
    const type = fileObject.type
    setfileType(type)
    readUploadedMedia(fileObject)
    !createPost && openCreatePost()     
  }
  const removePicture = (fileInputNode)=>{
    setfileType("")
    setfileUrl("")
    fileInputNode.value = ""
  }
  const openffPoster = ()=>{
    setFfPoster(true)
    setOpaqueOverlay(true)
    setTransparentOverlay(false)
    setpostOptions(false) 
  }
  const closeffPoster = ()=>{
    setFfPoster(false)
    setOpaqueOverlay(false)
  }
  const openPifs = ()=>{
    setPostImageFullscreen(true)    
  }
  const closePifs = ()=>{
    setPostImageFullscreen(false)
  }
  const openPostImageAlt = ()=>{
    setPostImageAlt(true)
    setOpaqueOverlay(true)    
  }
  const closePostImageAlt = ()=>{
    setPostImageAlt(false)
    setOpaqueOverlay(false)
  }
  const openPlaybackspeed = (target)=>{
    setPlaybackSpeed(true)
    setTransparentOverlay(true)
    setTargetPost(target)
  }
  const closePlaybackSpeed = ()=>{
    setPlaybackSpeed(false)
    setTransparentOverlay(false)      
  }
  const setGlobalPlayBackRateState = (rate)=>{
    setPlaybackRate(rate)
  }


  return (
    <div className="home-container" onClick={(transparentOverlay || opaqueOverlay) ? closeAnyPopUpByTappingOutside : null}>
      <div className={opaqueOverlay ? "home-focusOnCreatePost" : transparentOverlay ? "home-focusOnPostOptions" : null } />
        <div className="home-wrapper">
            <Nav displaySidebar={displaySidebar} />
            {sidebar && <Sidebar {...{hideSidebar, getPostPopUpNode: getElemOnTransParentNode}} />}            
              <Story />
              {reportPost && <ReportPost closeReportPost={closeReportPost} />}
              {ffPoster && <FollowUnfollowPoster closeffPoster={closeffPoster} />}
              {postImageFullscreen && <PostImageFullscreen fileUrl={fileUrl} closePifs={closePifs} />}
              <div className={createPost ? "home-createposts-container-focus" : ""} >
              <CreatePost {...{
                openCreatePost,
                closeCreatePostWithin,
                createPost,
                focusCreateContainerClassName: "create-container-focus-sm",
                altContainerHeight: "100vh",
                openCreateAlt,
                closeCreateAlt,
                createAlt,
                fileType,
                fileUrl,
                getFile,
                removePicture,
                getElemOnOpaqueNode
                }} />
              </div>
              <div className={createPost ? "home-posts-container-focus" : ""}>
              { ["a","b","c","d","e"].map((value, index)=>
                      <Post 
                      key={index} 
                      postOptions = {targetPost === `${index}` && postOptions} 
                      postShare = {targetPost === `${index}` && postShare}
                      playbackSpeed = {targetPost === `${index}` && playbackSpeed}
                      {...{ 
                        index, 
                        getElemOnTransParentNode, 
                        openPostOptions, 
                        openPostShare, 
                        openReportPost,                        
                        fileUrl,
                        fileType,
                        openffPoster,
                        openPifs,
                        openPostImageAlt,
                        closePostImageAlt,
                        postImageAlt,
                        getElemOnOpaqueNode,
                        openPlaybackspeed,
                        closePlaybackSpeed,
                        globalPlaybackRateState, 
                        setGlobalPlayBackRateState
                         }} />
                    )
                    }
              </div>                       
        </div>
    </div>
  )
}
