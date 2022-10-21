import "./story.css";
import Header from "../../layout/header/Header";
import { StorySidebar } from "./StorySidebar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { iconStyle } from "../../util/iconDescContent";
import Spinner from "../../components/Spinner/Spinner";
import UserCameo from "../../components/user-cameo/UserCameo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faVolumeOff } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPause } from "@fortawesome/free-solid-svg-icons";

// looks like i'm prop drilling the authUser? Its less code than context
const Story = ({ authUser }) => {
  return (
    <>
      {authUser ? (
        <>
          <div className="story-header">
            <Header />
          </div>
          <main className="story-page">
            <StorySidebar />
            <StoryMainSection authUser={authUser} />
          </main>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const StoryMainSection = ({ authUser }) => {
  return (
    <main className="story-page-main">
      <aside className="prev-story">
        <i>
          <ArrowBackIosNewIcon style={iconStyle} />
        </i>
      </aside>
      <section>
        <div>
          <StoryMainDescAndActions authUser={authUser} />
          <img src={authUser.profileImage} alt="" />
        </div>
        <input type="text" name="" id="" placeholder="Reply" />
      </section>
      <aside className="next-story">
        <i>
          <ArrowForwardIosIcon style={iconStyle} />
        </i>
      </aside>
    </main>
  );
};

const StoryMainDescAndActions = ({
  authUser: { id, profileImage, displayName, username },
}) => {
  return (
    <aside className="story-desc-actions">
      <div className="story-progress-container">
        <progress min={0} max={100} value={20} />
        <progress min={0} max={100} value={0} />
        <progress min={0} max={100} value={0} />
        <progress min={0} max={100} value={0} />
      </div>
      <div className="story-user-actions">
        <UserCameo
          {...{
            userId: id,
            alignItems: true,
            single: true,
            header: displayName,
            sub: username,
            aside: "12h",
            avatarProp: { size: 2.5, src: profileImage },
          }}
        />
        <StoryMainActions />,
      </div>
    </aside>
  );
};

const StoryMainActions = () => {
  return (
    <div className="story-flex-container">
      <i>
        <FontAwesomeIcon icon={faPlay} />
      </i>
      {/* conditionally rendered. Ony with video mediaType */}
      <i>
        <FontAwesomeIcon icon={faVolumeXmark} />
      </i>
      <i>
        <FontAwesomeIcon icon={faEllipsis} />
      </i>
    </div>
  );
};

export default Story;
