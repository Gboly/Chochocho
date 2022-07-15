import "./profile.css"
import Post from "../../components/post/Post"
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import coverPhoto from "../../cover-photo.png"
import avi2 from "../../avatar-square.png"

export default function Profile() {
  return (
    <div className="profile-container">
        <div className="profile-wrapper">
            <div className="profile-top">
                <img src={coverPhoto} alt="profile cover" className="profile-coverphoto" />
                <div className="profile-top-absolute">
                    <div className="profile-avatar-container">
                        <img src={avi2} alt="" className="profile-avatar" />
                    </div>
                    <button className="edit-profile">
                        Edit profile
                    </button>
                </div>                
                <span className="profile-username">
                    Ahmed Quamordeen Gbolahan
                </span>
                <p className="profile-bio">
                    Fullstack software engineer at Google.
                </p>
                <div className="profile-top-details">
                    <div className="ptd-item">
                        <icon className="ptdi-icon">
                            <CakeOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </icon>
                        <span className="ptdi-desc">
                            Born 13 March
                        </span>
                    </div>
                    <div className="ptd-item">
                        <icon className="ptdi-icon">
                            <CalendarMonthOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </icon>
                        <span className="ptdi-desc">
                            Joined July 2022
                        </span>
                    </div>
                    <div className="ptd-item">
                        <icon className="ptdi-icon">
                            <LocationOnOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </icon>
                        <span className="ptdi-desc">
                            Silicon valley
                        </span>
                    </div>
                    <div className="ptd-item">
                        <icon className="ptdi-icon">
                            <AlternateEmailOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                        </icon>
                        <span className="ptdi-desc">
                            Gbolahanahmed1@gmail.com
                        </span>
                    </div>
                </div>
                <div className="follow-detail">
                    <div className="follow-detail-item">
                        <span className="following-count">
                            3,126
                        </span>
                        <span className="following-text">
                            Following
                        </span>
                    </div>
                    <div className="follow-detail-item">
                        <span className="followers-count">
                            1.1M
                        </span>
                        <span className="followers-text">
                            Followers
                        </span>
                    </div>
                </div>
            </div>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    </div>
  )
}
