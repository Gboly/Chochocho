import "./home.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import ReportPost from "../../components/report-post/ReportPost"
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
   
  const createPostNode = useRef()
  const postPopUpNode = useRef()

    useEffect(()=>{
      if(sidebar || createPost){document.body.className = "hidden-body"}
      else{
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
    // e.currentTarget.id === "create-close-icon" &&s
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
    <div className="home-container" onClick={(transparentOverlay || opaqueOverlay) ? closeAnyPopUpByTappingOutside : null}>
      <div className={opaqueOverlay ? "home-focusOnCreatePost" : transparentOverlay ? "home-focusOnPostOptions" : null } />
        <div className="home-wrapper">
            <Nav displaySidebar={displaySidebar} />
            {sidebar && <Sidebar {...{hideSidebar, getPostPopUpNode}} />}            
              <Story />
              {reportPost && <ReportPost closeReportPost={closeReportPost} />}
              <div className={createPost ? "home-createposts-container-focus" : ""} ref={createPostNode}>
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
                        postOptions,
                        fileUrl,
                        fileType }} />
                    )
                    }
              </div>                       
        </div>
    </div>
  )
}
