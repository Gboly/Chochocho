import "./home-lg.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import SidebarLg from "../../components/sidebar-lg/Sidebar-lg"
import Rightbar from "../../components/rightbar/Rightbar"


export default function HomeLg() {
  return (
    <div className="home-lg-container">
        <div className="home-lg-wrapper">            
            <Nav />           
            <div className="home-lg-main">
            <div className="home-lg-sidebar-container">
            <SidebarLg />
            </div>
                <div className="home-lg-main-wrapper">                
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
                <div className="home-lg-rightbar-container">
                    <Rightbar />
                </div>                
            </div>
            
        </div>
    </div>
  )
}
