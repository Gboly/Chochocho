import Header from "../../layout/header/Header";
import { StorySidebar } from "./StorySidebar";
import StoryPreviewSidebar from "./StoryPreviewSidebar";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useMemo } from "react";

const previewPath = "/story/preview";
const StoryLayout = () => {
  const location = useLocation();
  const { username, storyId } = useParams();

  const [indexPage, previewPage, mainPage] = useMemo(() => {
    const path = location.pathname;
    return [
      path === "/story",
      path === previewPath,
      path === `/story/${username}/${storyId}`,
    ];
  }, [location, username, storyId]);

  return (
    <>
      <div className={`story-header ${mainPage ? "story-header-md" : ""}`}>
        <Header />
      </div>
      <main className={`story-page ${mainPage ? "story-page-md" : ""}`}>
        {previewPage ? (
          <StoryPreviewSidebar />
        ) : (
          <StorySidebar indexPage={indexPage} />
        )}
        <Outlet />
      </main>
    </>
  );
};

export default StoryLayout;
