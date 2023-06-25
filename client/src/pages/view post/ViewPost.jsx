import "./view-post.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import RightBar from "../../feaures/right-bar/RightBar";
import { SettingsHeader } from "../settings/Settings";
import { capitalize, newRange } from "../../util/functions";
import { postType, viewPostPageType } from "../../util/types";
import PostExcerpt, {
  PostSkeleton,
} from "../../feaures/posts/post-excerpt/PostExcerpt";
import CreatePost from "../../feaures/posts/create-post/CreatePost";
import { commentCreatePostPlaceholder } from "../../util/types";
import { useParams } from "react-router-dom";
import {
  selectPostById,
  selectPostCommentsOrParentsIds,
  useGetPostByIdQuery,
  useGetPostCommentsOrParentsQuery,
} from "../../app/api-slices/postsApiSlice";
import { useSelector } from "react-redux";
import { createContext, useEffect, useRef, useState } from "react";
import { useImperativeHandle, useContext } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import useOffsetTop from "../../util/useCallbackRef";
import { GeneralContext } from "../../routes/Router";
import PostList from "../../feaures/posts/post-list/PostList";
import AuthError from "../sign-in/AuthError";
import Spinner from "../../components/Spinner/Spinner";

export const ViewPostContext = createContext();

const initialPage = { skip: 0, limit: 3 };
export default function ViewPost() {
  const navigate = useNavigate();
  const opaqueLayer = useOutletContext();
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));

  const [postRange, setPostRange] = useState(initialPage);

  const {
    isLoading: commentIsLoading,
    error: commentsFetchError,
    refetch: refetchPosts,
  } = useGetPostCommentsOrParentsQuery({
    id: postId,
    type: "comments",
    ...postRange,
  });

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setPostRange(({ skip, limit }) => newRange(skip, limit, initialPage)),
      10000
    );
    return () => clearTimeout(timeout);
  }, []);

  // Whenever a new post is added by the authorized user, the page is refreshed so that the new post is viewed easily by the user+++++++++++
  // This function sets the post range to the initial page
  const refresh = () => {
    setPostRange(({ skip, limit }) => ({ skip: 0, limit: skip + limit }));
    refetchPosts();
  };

  // This particular post would have been loaded as a comment or regular post(for direct post) already by the parent.
  // The issue now is when the page link is loaded directly on the browser, the comment is yet to be loaded then.
  // So, this is making sure it is loaded even in such scenario.
  const { error: postFetchError } = useGetPostByIdQuery(
    {
      id: postId,
    },
    { skip: post }
  );

  const { isSuccess: parentsLoadIsSuccessful, error: parentsFetchError } =
    useGetPostCommentsOrParentsQuery({
      id: postId,
      type: "parents",
    });

  const parentsIds = useSelector((state) =>
    selectPostCommentsOrParentsIds(state, { id: postId, type: "parents" })
  );
  const commentsIds = useSelector((state) =>
    selectPostCommentsOrParentsIds(state, { id: postId, type: "comments" })
  );

  const viewPostNode = useRef();
  const { pageNodes } = useContext(GeneralContext);

  // #16, #17
  useImperativeHandle(
    pageNodes,
    () => ({
      viewPostNode: viewPostNode.current,
    }),
    [viewPostNode]
  );

  const goBack = () => {
    navigate(-1);
  };

  // This custom hook handles this process. The parameter postId would serve as dependency to retrieve ref details
  const [defaultScrollTop, handleRef] = useOffsetTop(postId);

  return (
    <>
      <ScrollCache ref={viewPostNode} defaultScrollTop={defaultScrollTop}>
        <div
          ref={viewPostNode}
          className={`home-wrapper view-post-container ${
            opaqueLayer ? "outlet-no-scroll" : ""
          }`}
          id={viewPostPageType}
        >
          <div className="home-main-wrapper">
            <SettingsHeader
              text={capitalize(postType)}
              viewPost={true}
              closePopup={goBack}
              overlay={true}
            />
            {!post ? (
              <PostSkeleton />
            ) : (
              <>
                {parentsLoadIsSuccessful && (
                  <PostList
                    postIds={parentsIds}
                    comment={true}
                    loadComponent={<Spinner />}
                  />
                )}
                <div ref={handleRef} className="postWithComments">
                  <PostExcerpt postId={postId} viewPost={true} />
                  <CreatePost
                    placeholder={commentCreatePostPlaceholder}
                    type={"comment"}
                    invalidatePostList={refresh}
                    parents={[
                      ...post?.parents,
                      {
                        postId: post?.id,
                        userId: post?.userId,
                        date: new Date().toISOString(),
                      },
                    ]}
                    style={{ top: "1rem" }}
                  />
                  <PostList
                    postIds={commentsIds}
                    comment={true}
                    loadComponent={<Spinner />}
                  />
                  {commentIsLoading && <Spinner />}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="rightbar-container">
          <RightBar />
        </div>
      </ScrollCache>
      <AuthError
        error={postFetchError || commentsFetchError || parentsFetchError}
      />
    </>
  );
}
