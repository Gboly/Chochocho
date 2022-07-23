import "./home-md.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import ReportPost from "../../components/report-post/ReportPost"
import { useState, useEffect, useRef, useCallback } from "react"

export default function HomeMd() {
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
   
    const createPostNode = useRef()
    const postPopUpNode = useRef()

    useEffect(()=>{
        if(sidebar || createPost || reportPost){document.body.className = "hidden-body"}
        else {
          document.body.className = ""
        }
    }, [sidebar, createPost, reportPost])

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
      // e.currentTarget.id === "create-close-icon" && 
      setCreatePost(false)
      setOpaqueOverlay(false)
  }
    const closeAnyPopUpByTappingOutside = (e)=>{
      if(opaqueOverlay){
        if((!createPostNode.current.contains(e.target) || !e.target === createPostNode.current) && !reportPost){
          createAlt && setCreateAlt(false)
          createPost && setCreatePost(false)            
          setOpaqueOverlay(false)
        }          
      }
      if (transparentOverlay){
        if(!postPopUpNode.current.contains(e.target) || !e.target === postPopUpNode.current){
          postOptions && setpostOptions(false)
          postShare && setpostShare(false)
          sidebar && setSidebar(false)
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
  
  return (
    <div className="home-md-container" onClick={(transparentOverlay || opaqueOverlay) ? closeAnyPopUpByTappingOutside : null}>
    <div className={opaqueOverlay ? "home-focusOnCreatePost" : transparentOverlay ? "home-focusOnPostOptions" : "" } />
        <div className="home-md-wrapper">
            {sidebar && <Sidebar {...{hideSidebar, getPostPopUpNode}} />}
            <Nav displaySidebar={displaySidebar} />            
            <div className="home-md-main" >
                <div className="home-md-main-wrapper">
                {reportPost && <ReportPost closeReportPost={closeReportPost} />}
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
                        fileType }} />
                    )
                    }
                    </div>  
                </div>
                <div className="home-rightbar-container">
                    <Rightbar />
                </div>                
            </div>
            
        </div>
    </div>
  )
}
