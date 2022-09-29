import Friend from "./friend/Friend";
import "./right-bar.css";
import SearchBar from "./search-bar/SearchBar";
import Story from "./story/Story";

export default function RightBar() {
  return (
    <>
      <div className="rightbar-wrapper">
        <div className="rightbar-search-container">
          <SearchBar />
        </div>
        <div className="rightbar-story">
          <Story />
        </div>
        <div className="rightbar-friends-wrapper">
          <Friend />
        </div>
      </div>
    </>
  );
}
