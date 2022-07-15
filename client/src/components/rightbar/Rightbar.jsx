import "./rightbar.css"
import StoryMd from "../story-md/Story-md"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import midex from "../../midex.png"
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';

export default function Rightbar() {
  return (
    <div className="rightbar-container">
        <div className="rightbar-wrapper">
            <div className="rightbar-search-container">
                <icon className="rightbar-search-icon">
                    <SearchOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                </icon>
                <input type="text" placeholder="Search friends" className="rightbar-search-input" />
            </div>
            <div className="rightbar-story">
                <StoryMd />
            </div>
            <div className="rightbar-friends-wrapper">
                <div className="rightbar-friends-header">
                    <span className="rfh-title">
                        Friends
                    </span>
                    <icon className="rfh-icon">
                    <MoreHorizOutlinedIcon style={{fontSize: "inherit", color: "inherit", fontWeight: "inherit"}} />
                    </icon>
                </div>
                <div className="rightbar-friends-list">
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Tessboss
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            59 min
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                             <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}} />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            59 min
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}}  />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}}  />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            59 min
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                        <div className="rfli-online-status">
                            <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}}  />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                        <div className="rfli-online-status">
                            <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}}  />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                        <div className="rfli-online-status">
                            <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}}  />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            59 min
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}}  />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            59 min
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                        <div className="rfli-online-status">
                            <FiberManualRecordSharpIcon style={{fontSize: "inherit", color: "#7fff00", fontWeight: "inherit"}}  />
                        </div>
                    </div>
                    <div className="rfl-item">
                        <div className="rfli-details">
                            <img src={midex} alt="friend's avatar" className="rfli-avi" />
                            <span className="rfli-name">
                                Midex
                            </span>
                        </div>
                       <div className="rfli-online-status">
                            59 min
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
