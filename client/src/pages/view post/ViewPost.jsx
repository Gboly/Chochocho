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
  selectPostsAndPostCommentsResult,
  selectPostsIds,
  useGetPostCommentsQuery,
  useGetPostsQuery,
} from "../../app/api-slices/postsApiSlice";
import { selectCommentByPostId } from "../../feaures/comments/commentsApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { createContext, useEffect, useRef, useState } from "react";
import { useImperativeHandle, useContext } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { LayoutContext } from "../../layout/Layout";

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

  const post = useSelector((state) => selectPostById(state, postId));

  const { isLoading: commentIsLoading } =
    useGetPostCommentsQuery(commentsSearchQuery);

  useEffect(() => {
    setComments(post?.comments || []);
    setCommentsSearchQuery((post?.comments || []).join("&id=") || "");

    setParents(post?.parents || []);
  }, [post]);

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

  return (
    <>
      <ScrollCache ref={viewPostNode}>
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
                <ParentsList parents={parents} />
                <PostExcerpt postId={postId} viewPost={true} />
                <CreatePost placeholder={commentCreatePostPlaceholder} />
                {commentIsLoading ? (
                  <Spinner />
                ) : (
                  <CommentsList comments={comments} />
                )}
                {/* {commentIsLoading && <Spinner />}
                {commentLoadIsSuccessful && (
                  <CommentsList postId={postId} comments={comments} />
                )} */}
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

export const CommentsList = ({ comments }) => {
  const postsIds = useSelector(selectPostsIds);

  // #13, #14
  const commentList = comments.map(
    (commentId) =>
      postsIds.includes(commentId) && (
        <PostExcerpt key={commentId} postId={commentId} comment={true} />
      )
  );

  return <>{commentList}</>;
};

export const ParentsList = ({ parents }) => {
  const postsIds = useSelector(selectPostsIds);

  // #13, #14
  const commentList = parents.map(
    (parentId) =>
      postsIds.includes(parentId) && (
        <PostExcerpt key={parentId} postId={parentId} comment={true} />
      )
  );

  return <>{commentList}</>;
};
