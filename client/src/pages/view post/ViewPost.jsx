import "./view-post.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import RightBar from "../../feaures/right-bar/RightBar";
import { SettingsHeader } from "../settings/Settings";
import { capitalize, setIsReturnPage } from "../../util/functions";
import { postType, viewPostPageType } from "../../util/types";
import PostExcerpt from "../../feaures/posts/post-excerpt/PostExcerpt";
import CreatePost from "../../feaures/posts/create-post/CreatePost";
import { commentCreatePostPlaceholder } from "../../util/types";
import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../../app/api-slices/postsApiSlice";
import {
  selectCommentByPostId,
  useGetCommentsQuery,
} from "../../feaures/comments/commentsApiSlice";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { createContext, useRef } from "react";
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
  const { isLoading: commentIsLoading, isSuccess: commentLoadIsSuccessful } =
    useGetCommentsQuery();

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
                <PostExcerpt postId={postId} viewPost={true} />
                <CreatePost placeholder={commentCreatePostPlaceholder} />
              </>
            )}
            {commentIsLoading && <Spinner />}
            {commentLoadIsSuccessful && <CommentsList postId={postId} />}
          </div>
        </div>
        <div className="rightbar-container">
          <RightBar />
        </div>
      </ScrollCache>
    </>
  );
}

export const CommentsList = ({ postId }) => {
  const comments = useSelector((state) => selectCommentByPostId(state, postId));

  // #13, #14
  // const commentList = comments.reduce((commentId) => {

  // })

  return (
    <>
      <PostExcerpt postId={1} comment={true} />
      <PostExcerpt postId={6} comment={true} />
      <PostExcerpt postId={5} comment={true} />
    </>
  );
};
