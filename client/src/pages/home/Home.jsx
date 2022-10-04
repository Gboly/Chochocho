import "./home.css";
import CreatePost from "../../feaures/posts/create-post/CreatePost";
import RightBar from "../../feaures/right-bar/RightBar";
import Story from "../../feaures/right-bar/story/Story";

import PostListLoader from "../../feaures/posts/post-list/postListLoader";

import { useSelector } from "react-redux";
import { getCreatePostState } from "../../feaures/posts/create-post/createPostSlice";
import { getPostOptionState } from "../../feaures/posts/post-excerpt/postExcerptSlice";

import { useOutletContext } from "react-router-dom";
import { homeCreatePostPlaceholder, homePageType } from "../../util/types";
import { createContext, useRef } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";

export const HomeContext = createContext();

export default function Home() {
  const createPostIsActive = useSelector(getCreatePostState);
  const { isOpen: postOptionsIsOpen } = useSelector(getPostOptionState);

  const opaqueLayer = useOutletContext();
  const homeNode = useRef();

  return (
    <>
      <HomeContext.Provider value={homeNode}>
        <ScrollCache ref={homeNode}>
          <div
            ref={homeNode}
            className={`home-wrapper ${opaqueLayer ? "outlet-no-scroll" : ""}`}
            id={homePageType}
          >
            <div className="home-main-wrapper">
              <div
                className={`home-story ${
                  createPostIsActive || postOptionsIsOpen
                    ? "story-container"
                    : ""
                }`}
              >
                <Story />
              </div>

              <section
                className={`home-create-post-container ${
                  createPostIsActive ? "home-create-post-container-active" : ""
                }`}
              >
                <CreatePost placeholder={homeCreatePostPlaceholder} />
              </section>

              <section>
                <PostListLoader {...{ createPostIsActive }} />
              </section>
            </div>
          </div>
          <div className="rightbar-container">
            <RightBar />
          </div>
        </ScrollCache>
      </HomeContext.Provider>
    </>
  );
}
