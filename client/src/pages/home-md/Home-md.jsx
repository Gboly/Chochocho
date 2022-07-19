import "./home-md.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import { useState, useEffect, useRef } from "react"

export default function HomeMd() {
    const [sidebar, setSidebar] = useState(false)
    const [createPost, setCreatePost] = useState(false)
    const [closePostPopUp, setclosePostPopUp] = useState(false)
   
    const createPostNode = useRef()
    const postPopUpNode = useRef()

    useEffect(()=>{
        if(sidebar || createPost){document.body.className = "hidden-body"}
        else {
          document.body.className = ""
        }
    }, [sidebar, createPost])

    function displaySidebar(){
        setSidebar(true)
    }
    const hideSidebar = ()=>{
        sidebar && setSidebar(false)
    }
    const openCreatePost = ()=>{
        setCreatePost(true)
    }
    const closeCreatePostWithin = (e)=>{
      e.currentTarget.id === "create-close-icon" && setCreatePost(false)
    }
    const closeAnyPopUpByTappingOutside = (e)=>{
      if(createPost){
        if(!createPostNode.current.contains(e.target) || !e.target === createPostNode.current){
          setCreatePost(false)
        }          
      }
      if (closePostPopUp){
        if(!postPopUpNode.current.contains(e.target) || !e.target === postPopUpNode.current){
          setclosePostPopUp(false)
        }  
      }
    }
    const activateOutsideClosePostPopUp = ()=>{
      setclosePostPopUp(true)
    }
    const getPostPopUpNode = (postOptionsNodex)=>{
      postPopUpNode.current = postOptionsNodex      
    }      
  
  return (
    <div className="home-md-container" onClick={(closePostPopUp || createPost) ? closeAnyPopUpByTappingOutside : null}>
    <div className={createPost ? "home-focusOnCreatePost" : closePostPopUp ? "home-focusOnPostOptions" : "" } />
        <div className="home-md-wrapper">
            {sidebar && <Sidebar />}
            <Nav displaySidebar={displaySidebar} />            
            <div className="home-md-main" onClick={hideSidebar}>
                <div className="home-md-main-wrapper">
                    <div className={createPost && "home-createposts-container-focus"} ref={createPostNode}>
                        <CreatePost {...{openCreatePost, closeCreatePostWithin, createPost, focusCreateContainerClassName: "create-container-focus"}} />
                    </div>
                    <div className={createPost && "home-posts-container-focus"}>
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} />
                        <Post {...{activateOutsideClosePostPopUp, getPostPopUpNode, closePostPopUp}} /> 
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
