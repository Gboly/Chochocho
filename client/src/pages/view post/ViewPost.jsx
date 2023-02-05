import "./view-post.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import RightBar from "../../feaures/right-bar/RightBar";
import { SettingsHeader } from "../settings/Settings";
import {
  capitalize,
  getAnArrayOfSpecificKeyPerObjectInArray,
  prepareIdsForQuery,
} from "../../util/functions";
import { postType, viewPostPageType } from "../../util/types";
import PostExcerpt from "../../feaures/posts/post-excerpt/PostExcerpt";
import CreatePost from "../../feaures/posts/create-post/CreatePost";
import { commentCreatePostPlaceholder } from "../../util/types";
import { useParams } from "react-router-dom";
import {
  selectPostById,
  selectPostsIds,
  useGetPostCommentsQuery,
  useGetPostsQuery,
} from "../../app/api-slices/postsApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { createContext, useEffect, useRef, useState } from "react";
import { useImperativeHandle, useContext } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import useOffsetTop from "../../util/useCallbackRef";
import { useCallback } from "react";
import { GeneralContext } from "../../routes/Router";
import PostList from "../../feaures/posts/post-list/PostList";
import AuthError from "../sign-in/AuthError";

export const ViewPostContext = createContext();

const initialPage = { skip: 0, limit: 1 };
export default function ViewPost() {
  const navigate = useNavigate();
  const opaqueLayer = useOutletContext();
  const { postId } = useParams();
  const postsIds = useSelector(selectPostsIds);
  const post = useSelector((state) => selectPostById(state, postId));

  // const { isLoading: postIsLoading, isSuccess: postLoadIsSuccessful } =
  //   useGetPostsQuery();

  const [postRange, setPostRange] = useState(initialPage);
  const [comments, setComments] = useState([]);
  const [commentsSearchQuery, setCommentsSearchQuery] = useState("");

  const [parents, setParents] = useState([]);
  const [parentsSearchQuery, setParentsSearchQuery] = useState("");

  const { isLoading: commentIsLoading, error: commentsFetchError } =
    useGetPostCommentsQuery({
      ids: commentsSearchQuery,
      ...postRange,
    });

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setPostRange(({ limit }) => ({
          skip: limit,
          limit: limit + initialPage.limit,
        })),
      60000
    );
    return () => clearTimeout(timeout);
  }, []);

  // This particular post would have been loaded as a comment or regular post(for direct post) already by the parent.
  // The issue now is when the page link is loaded directly on the browser, the comment is yet to be loaded then.
  // So, this is making sure it is loaded even in such scenario.
  const { isLoading: viewPostExcerptIsLaoding, error: postFetchError } =
    useGetPostCommentsQuery({
      ids: postId,
    });

  const { isSuccess: parentsLoadIsSuccessful, error: parentsFetchError } =
    useGetPostCommentsQuery({
      ids: parentsSearchQuery,
    });

  useEffect(() => {
    setComments(post?.comments || []);
    setCommentsSearchQuery(prepareIdsForQuery(post?.comments, "postId"));

    setParents(post?.parents || []);
    setParentsSearchQuery(prepareIdsForQuery(post?.parents, "postId"));
  }, [post]);

  const isFetched = useCallback(
    (postId) => {
      return postsIds.includes(postId);
    },
    [postsIds]
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
            {/* {postIsLoading && <Spinner />}
            {postLoadIsSuccessful && (
              <> */}
            {parentsLoadIsSuccessful && (
              <PostList
                postIds={getAnArrayOfSpecificKeyPerObjectInArray(
                  parents,
                  "postId"
                )}
                comment={true}
              />
            )}
            {!isFetched(postId) ? (
              <Spinner />
            ) : (
              <div ref={handleRef} className="postWithComments">
                <PostExcerpt postId={postId} viewPost={true} />
                <CreatePost placeholder={commentCreatePostPlaceholder} />
                {commentIsLoading ? (
                  <Spinner />
                ) : (
                  <PostList
                    postIds={getAnArrayOfSpecificKeyPerObjectInArray(
                      comments,
                      "postId"
                    )}
                    comment={true}
                  />
                )}
              </div>
            )}
            {/* </>
            )} */}
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

// Skeletons should be used to indicate loading instead of spinners
export const CommentsList = ({ comments, isFetched }) => {
  // #13, #14
  const commentList = comments.map(
    ({ postId }) =>
      isFetched(postId) && (
        <PostExcerpt key={postId} postId={postId} comment={true} />
      )
  );

  return <>{commentList}</>;
};

export const ParentsList = ({ parents, isFetched }) => {
  // #13, #14
  const parentList = parents.map(
    ({ postId }) =>
      isFetched(postId) && (
        <PostExcerpt key={postId} postId={postId} comment={true} />
      )
  );

  return <>{parentList}</>;
};
