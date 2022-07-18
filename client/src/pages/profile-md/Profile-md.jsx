import "./profile-md.css"
import Nav  from "../../components/navbar/Nav"
import Profile from "../profile/Profile"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect } from "react"

export default function ProfileMd() {

  useEffect(() => {
    document.body.className = "" 
  }, [])
  
  
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
