import "./profile-lg.css"
import Nav  from "../../components/navbar/Nav"
import Story from "../../components/story-sm/Story"
import CreatePost from "../../components/createPost/CreatePost"
import Post from "../../components/post/Post"
import SidebarLg from "../../components/sidebar-lg/Sidebar-lg"
import Rightbar from "../../components/rightbar/Rightbar"
import Profile from "../profile/Profile"


export default function ProfileLg() {
  return (
    <div className="profile-lg-container">
        <div className="profile-lg-wrapper">            
            <Nav />           
            <div className="profile-lg-main">
            <div className="profile-lg-sidebar-container">
            <SidebarLg />
            </div>
                <div className="profile-lg-main-wrapper">                
                   <Profile />  
                </div>
                <div className="profile-lg-rightbar-container">
                    <Rightbar />
                </div>                
            </div>
            
        </div>
    </div>
  )
}
