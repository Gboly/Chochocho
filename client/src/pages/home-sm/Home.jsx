import "./home.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect, useState, useRef } from "react"


export default function Home() {
  const [sidebar, setSidebar] = useState(false)
  const [createPost, setCreatePost] = useState(false)

  const createPostNode = useRef()

    useEffect(()=>{
      if(sidebar || createPost){document.body.className = "hidden-body"}
      else{
        document.body.className = ""
      }
    }, [sidebar, createPost])

  function displaySidebar(){
    setSidebar(true)
  }
  const hideSidebar = ()=>{
    setSidebar(false)
  }
  const openCreatePost = ()=>{
    setCreatePost(true)
}
  const closeCreatePostOutside = (e)=>{
    if(createPost){
      if(!createPostNode.current.contains(e.target) || !e.target === createPostNode.current){
        setCreatePost(false)
      }    
    }
  }

  const closeCreatePostWithin = (e)=>{
    e.currentTarget.id === "create-close-icon" && setCreatePost(false)
  }

  return (
    <div className="home-container" onClick={closeCreatePostOutside}>
      {createPost && <div className="home-focusOnCreatePost" />}
        <div className="home-wrapper">
            <Nav displaySidebar={displaySidebar} />
            {sidebar && <Sidebar />}
            <div className="home-body-container" onClick={hideSidebar}>
            <Story />
            <div className={createPost && "home-createposts-container-focus"} ref={createPostNode}>
            <CreatePost {...{openCreatePost, closeCreatePostWithin, createPost}} />
            </div>
            <div className={createPost && "home-posts-container-focus"}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post /> 
            </div>           
             </div>           
        </div>
    </div>
  )
}
