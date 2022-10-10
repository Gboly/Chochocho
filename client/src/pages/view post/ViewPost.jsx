import "./view-post.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import RightBar from "../../feaures/right-bar/RightBar";
import { SettingsHeader } from "../settings/Settings";
import { capitalize } from "../../util/functions";
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
import { LayoutContext } from "../../layout/Layout";
import useOffsetTop from "../../util/useCallbackRef";
import { useCallback } from "react";

export const ViewPostContext = createContext();

export default function ViewPost() {
  const navigate = useNavigate();
  const opaqueLayer = useOutletContext();
  const { postId } = useParams();
  const { isLoading: postIsLoading, isSuccess: postLoadIsSuccessful } =
    useGetPostsQuery();

  const [comments, setComments] = useState([]);
  const [commentsSearchQuery, setCommentsSearchQuery] = useState("");

  const [parents, setParents] = useState([]);
  const [parentsSearchQuery, setParentsSearchQuery] = useState("");

  const postsIds = useSelector(selectPostsIds);
  const post = useSelector((state) => selectPostById(state, postId));

  const { isLoading: commentIsLoading } =
    useGetPostCommentsQuery(commentsSearchQuery);

  // This particular post would have been loaded as a comment or regular post(for direct post) already by the parent.
  // The issue now is when the page link is loaded directly on the browser, the comment is yet to be loaded then.
  // So, this is making sure it is loaded even in such scenario.
  const { isLoading: viewPostExcerptIsLaoding } =
    useGetPostCommentsQuery(postId);

  const { isSuccess: parentsLoadIsSuccessful } =
    useGetPostCommentsQuery(parentsSearchQuery);

  useEffect(() => {
    setComments(post?.comments || []);
    setCommentsSearchQuery((post?.comments || []).join("&id=") || "");

    setParents(post?.parents || []);
    setParentsSearchQuery((post?.parents || []).join("&id=") || "");
  }, [post]);

  const isFetched = useCallback(
    (postId) => {
      return postsIds.includes(Number(postId));
    },
    [postsIds]
  );

  const viewPostNode = useRef();
  const { pageNodes } = useContext(LayoutContext);

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

  // This custom hook handles this process. The parameter postId would serve as dependency to retrieve ref detail
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
            {postIsLoading && <Spinner />}
            {postLoadIsSuccessful && (
              <>
                {parentsLoadIsSuccessful && (
                  <ParentsList parents={parents} isFetched={isFetched} />
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
                      <CommentsList comments={comments} isFetched={isFetched} />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="rightbar-container">
          <RightBar />
        </div>
      </ScrollCache>
    </>
  );
}

export const CommentsList = ({ comments, isFetched }) => {
  // #13, #14
  const commentList = comments.map(
    (commentId) =>
      isFetched(commentId) && (
        <PostExcerpt key={commentId} postId={commentId} comment={true} />
      )
  );

  return <>{commentList}</>;
};

export const ParentsList = ({ parents, isFetched }) => {
  // #13, #14
  const parentList = parents.map(
    (parentId) =>
      isFetched(parentId) && (
        <PostExcerpt key={parentId} postId={parentId} comment={true} />
      )
  );

  return <>{parentList}</>;
};
