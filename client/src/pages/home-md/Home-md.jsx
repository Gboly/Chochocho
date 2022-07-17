import "./home-md.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import Rightbar from "../../components/rightbar/Rightbar"
import { useState, useEffect } from "react"

export default function HomeMd() {
    const [sidebar, setSidebar] = useState(false)

    useEffect(()=>{
        if(sidebar){document.body.className = "hidden-body"}
        else{
          document.body.className = ""
        }
      }, [sidebar])

    function displaySidebar(){
      setSidebar(true)
    }
    const hideSidebar = ()=>{
      setSidebar(false)
    }
  
  return (
    <div className="home-md-container">
        <div className="home-md-wrapper">
            {sidebar && <Sidebar />}
            <Nav displaySidebar={displaySidebar} />            
            <div className="home-md-main" onClick={hideSidebar}>
                <div className="home-md-main-wrapper">
                    <CreatePost />
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
                <div className="home-rightbar-container">
                    <Rightbar />
                </div>                
            </div>
            
        </div>
    </div>
  )
}
