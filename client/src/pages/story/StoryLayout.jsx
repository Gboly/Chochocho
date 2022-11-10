import Header from "../../layout/header/Header";
import { StorySidebar } from "./StorySidebar";
import StoryPreviewSidebar from "./StoryPreviewSidebar";
import { Outlet, useLocation } from "react-router-dom";

const previewPath = "/story/preview";
const StoryLayout = () => {
  // Tried using the react router useLocation hook but turns out that the hook is slow to generate its pathname because
  // there's a flicker on switching routes to and fro preview and regular story pages
  return (
    <>
      <div className="story-header">
        <Header />
      </div>
      <main className="story-page">
        {window.location.pathname === previewPath ? (
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
