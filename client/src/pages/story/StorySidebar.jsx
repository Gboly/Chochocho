import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { iconStyle } from "../../util/iconDescContent";

const story =
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG92ZSUyMGZsb3dlcnN8ZW58MHx8MHx8&w=1000&q=80";
export const StorySidebar = () => {
  return (
    <aside className="story-sidebar">
      <header>
        <h1>Stories</h1>
        <i>
          <SettingsIcon style={iconStyle} />
        </i>
      </header>
      <section className="auth-user-section">
        <p>Your story</p>
        <div className="story-list">
          <div className="story-item">
            <section className="create-story">
              <i>
                <AddIcon />
              </i>
            </section>
            <article>
              <div>ChillingChee</div>
              <div>Create a story. Share a photo or video.</div>
            </article>
          </div>
          {/* <div className="story-item">
              <img src={story} alt="" />
              <article>
                <div>ChillingChee</div>
                <div>20h</div>
              </article>
            </div> */}
        </div>
      </section>
      <section className="other-users-section">
        <p>All story</p>
        <div className="story-list">
          <div className="story-item">
            <img src={story} alt="" />
            <article>
              <div>
                ChillingCheewfvhbewjnfkjnwdbwfbejbfjenfefhefheifhiefhiueh
              </div>
              <div>3m</div>
            </article>
          </div>
          <div className="story-item">
            <img src={story} alt="" />
            <article>
              <div>ChillingChee</div>
              <div>20h</div>
            </article>
          </div>
          <div className="story-item">
            <img src={story} alt="" />
            <article>
              <div>ChillingChee</div>
              <div>20h</div>
            </article>
          </div>
        </div>
      </section>
    </aside>
  );
};
