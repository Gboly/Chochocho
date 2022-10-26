import Header from "../../layout/header/Header";
import { StorySidebar } from "./StorySidebar";
import Spinner from "../../components/Spinner/Spinner";
import { Outlet } from "react-router-dom";

const StoryLayout = ({ authUser }) => {
  return (
    <>
      {authUser ? (
        <>
          <div className="story-header">
            <Header />
          </div>
          <main className="story-page">
            <StorySidebar />
            <Outlet />
          </main>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default StoryLayout;
