import "./profile-md.css"
import Nav  from "../../components/navbar/Nav"
import Profile from "../profile/Profile"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"


export default function ProfileMd() {
  return (
    <div className="profile-md-container">
        <div className="profile-md-wrapper">
          {/* <Sidebar /> */}
          <Nav />
          <div className="profile-md-main">
              <div className="profile-md-main-wrapper">
                   <Profile />
              </div>
              <div className="profile-rightbar-container">
                  <Rightbar />
              </div>
          </div>            
        </div>
    </div>
  )
}
