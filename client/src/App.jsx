import "./app.css"
import Home from "./pages/home-sm/Home"
import HomeMd from "./pages/home-md/Home-md"
import HomeLg from "./pages/home-lg/Home-lg"
import Profile from "./pages/profile/Profile"
import ProfileMd from "./pages/profile-md/Profile-md"
import ProfileLg from "./pages/profile-lg/Profile-lg"

export default function App() {
  return (
    <div className="pages-container">
        <ProfileLg />
    </div>
  )
}
