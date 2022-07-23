import "./home-lg.css"
import Nav  from "../../components/navbar/Nav"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import SidebarLg from "../../components/sidebar-lg/Sidebar-lg"
import Rightbar from "../../components/rightbar/Rightbar"
import ReportPost from "../../components/report-post/ReportPost"
import FollowUnfollowPoster from "../../components/follow-unfollow-poster/FollowUnfollowPoster"
import { useState, useEffect, useRef, useCallback } from "react"


export default function HomeLg() {
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
   
    const createPostNode = useRef()
    const postPopUpNode = useRef()

    useEffect(()=>{
        if(createPost || reportPost || ffPoster){document.body.className = "hidden-body"}
        else {
          document.body.className = ""
        }
    }, [createPost, reportPost, ffPoster])

    const openCreatePost = ()=>{
        setCreatePost(true)
        setOpaqueOverlay(true)
    }
    const closeCreatePostWithin = (e)=>{
      // e.currentTarget.id === "create-close-icon" && 
      setCreatePost(false)
      setOpaqueOverlay(false)
  }
    const closeAnyPopUpByTappingOutside = (e)=>{
        if(opaqueOverlay){
          if((!createPostNode.current.contains(e.target) || !e.target === createPostNode.current) && !reportPost && !ffPoster){
            createAlt && setCreateAlt(false)
            createPost && setCreatePost(false)          
            setOpaqueOverlay(false)
          }
        }
        if (transparentOverlay){
          if(!postPopUpNode.current.contains(e.target) || !e.target === postPopUpNode.current){
            postOptions && setpostOptions(false)
            postShare && setpostShare(false)
            setTransparentOverlay(false)
          }  
        }
    }   
    const getPostPopUpNode = (popUpNode)=>{
      postPopUpNode.current = popUpNode
    }
    const openCreateAlt = ()=>{
      setCreateAlt(true)
    }
    const closeCreateAlt = ()=>{
      setCreateAlt(false)
    }
    const openReportPost = ()=>{
      setReportPost(true)
      setOpaqueOverlay(true)
      setTransparentOverlay(false)
      setpostOptions(false)      
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
 

  return (
    <div className="home-lg-container" onClick={(transparentOverlay || opaqueOverlay) ? closeAnyPopUpByTappingOutside : null}>
    <div className={opaqueOverlay ? "home-focusOnCreatePost" : transparentOverlay ? "home-focusOnPostOptions" : null } />    
        <div className="home-lg-wrapper">            
            <Nav />           
            <div className="home-lg-main">            
              <div className="home-lg-sidebar-container">
                <SidebarLg />
              </div>
              <div className="home-lg-main-wrapper">
                {reportPost && <ReportPost closeReportPost={closeReportPost} />}
                {ffPoster && <FollowUnfollowPoster closeffPoster={closeffPoster} />}
                <div className={createPost ? "home-createposts-container-focus" : ""} ref={createPostNode}>
                    <CreatePost {...{
                      openCreatePost, 
                      closeCreatePostWithin,
                      createPost,
                      focusCreateContainerClassName: "create-container-focus",
                      altContainerHeight: "calc(100vh - 6.5rem)",
                      openCreateAlt,
                      closeCreateAlt,
                      createAlt,
                      fileType,
                      fileUrl,
                      getFile,
                      removePicture
                      }} />
                </div>
                <div className={createPost ? "home-posts-container-focus" : ""}>
                    { ["a","b","c","d","e"].map((value, index)=>
                      <Post 
                      key={index} 
                      postOptions = {targetPost === `${index}` && postOptions} 
                      postShare = {targetPost === `${index}` && postShare}
                      {...{ 
                        index, 
                        getPostPopUpNode, 
                        openPostOptions, 
                        openPostShare, 
                        openReportPost,
                        fileUrl,
                        fileType,
                        openffPoster
                         }} />
                    )
                    }                    
                </div>   
              </div>
                <div className="home-lg-rightbar-container">
                    <Rightbar />
                </div>                
            </div>
            
        </div>
    </div>
  )
}
