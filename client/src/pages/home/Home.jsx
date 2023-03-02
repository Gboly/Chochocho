import "./home.css";
import CreatePost from "../../feaures/posts/create-post/CreatePost";
import RightBar from "../../feaures/right-bar/RightBar";
import Story from "../../feaures/right-bar/story/Story";

import PostListLoader from "../../feaures/posts/post-list/postListLoader";

import { useDispatch, useSelector } from "react-redux";
import { getCreatePostState } from "../../feaures/posts/create-post/createPostSlice";
import {
  getPostOptionState,
  getRefreshPostsState,
} from "../../feaures/posts/post-excerpt/postExcerptSlice";

import { homeCreatePostPlaceholder, homePageType } from "../../util/types";
import {
  createContext,
  useRef,
  useImperativeHandle,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { GeneralContext } from "../../routes/Router";
import { useGetPostsQuery } from "../../app/api-slices/postsApiSlice";
import PostList from "../../feaures/posts/post-list/PostList";
import Spinner from "../../components/Spinner/Spinner";
import AuthError from "../sign-in/AuthError";
import { newRange } from "../../util/functions";
import { deactivateRefresh } from "../../app/actions/homeActions";

export const HomeContext = createContext();

// Limit of 1 & 2 works inconsistently.
const initialPage = { skip: 0, limit: 3 };
export default function Home() {
  const dispatch = useDispatch();
  const [postRange, setPostRange] = useState(initialPage);
  const {
    isLoading,
    error,
    isSuccess,
    refetch: refetchPosts,
  } = useGetPostsQuery(postRange);
  const createPostIsActive = useSelector(getCreatePostState);
  const { isOpen: postOptionsIsOpen } = useSelector(getPostOptionState);

  const homeNode = useRef();
  const { pageNodes, opaqueOverlayIsOpen } = useContext(GeneralContext);

  // #16, #17
  useImperativeHandle(
    pageNodes,
    () => ({
      homeNode: homeNode.current,
    }),
    [homeNode]
  );

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setPostRange(({ skip, limit }) => newRange(skip, limit, initialPage)),
      10000
    );
    return () => clearTimeout(timeout);
  }, []);

  // Whenever a new post is added by the authorized user, the home page is refreshed so that the new post is viewed easily by the user
  // This function sets the post range to the initial page
  const refresh = useCallback(() => {
    setPostRange(({ skip, limit }) => ({ skip: 0, limit: skip + limit }));
    refetchPosts();
  }, [refetchPosts]);

  return (
    <>
      <ScrollCache ref={homeNode}>
        <div
          ref={homeNode}
          className={`home-wrapper ${
            opaqueOverlayIsOpen ? "outlet-no-scroll" : ""
          }`}
          id={homePageType}
        >
          <div className="home-main-wrapper">
            <div
              className={`home-story ${
                createPostIsActive || postOptionsIsOpen
                  ? "home-story-container"
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
              <CreatePost
                placeholder={homeCreatePostPlaceholder}
                type={"post"}
                invalidatePostList={refresh}
              />
            </section>

            <section>
              <PostList />
              {isLoading && <Spinner />}
            </section>
          </div>
        </div>
        <div className="rightbar-container">
          <RightBar />
        </div>
      </ScrollCache>

      <AuthError error={error} />
    </>
  );
}
