import Header from "../../layout/header/Header";
import { StorySidebar } from "./StorySidebar";
import { Outlet } from "react-router-dom";

const StoryLayout = () => {
  return (
    <>
      <div className="story-header">
        <Header />
      </div>
      <main className="story-page">
        <StorySidebar />
        <Outlet />
      </main>
    </>
  );
};

export default StoryLayout;
