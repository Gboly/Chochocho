import "./story.css";

import DisplayImage from "../../../components/display-image/DisplayImage";

export default function Story() {
  const storyList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
    <div key={i} className="story-item">
      <div className="story-img-container">
        <img
          src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG92ZSUyMGZsb3dlcnN8ZW58MHx8MHx8&w=1000&q=80"
          alt="story"
          className="story-img"
        />
      </div>
      <span className="story-username">Henderson</span>
    </div>
  ));

  return (
    <div className="story">
      <div className="story-wrapper">
        <div className="story-item">
          <div className="story-img-container">
            <DisplayImage />
            <i className="add-story-icon">+</i>
          </div>
          <span className="story-username">Gbolahan</span>
        </div>
        {storyList}
      </div>
    </div>
  );
}
