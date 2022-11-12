import Header from "../../layout/header/Header";
import { StorySidebar } from "./StorySidebar";
import StoryPreviewSidebar from "./StoryPreviewSidebar";
import { Outlet, useLocation } from "react-router-dom";

const previewPath = "/story/preview";
const StoryLayout = () => {
  const location = useLocation();
  return (
    <>
      <div className="story-header">
        <Header />
      </div>
      <main className="story-page">
        {location.pathname === previewPath ? (
          <StoryPreviewSidebar />
        ) : (
          <StorySidebar />
        )}
        <Outlet />
      </main>
    </>
  );
};

export default StoryLayout;
