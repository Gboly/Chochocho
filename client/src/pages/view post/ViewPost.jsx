import "./view-post.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import RightBar from "../../feaures/right-bar/RightBar";
import { SettingsHeader } from "../settings/Settings";
import { capitalize, setIsReturnPage } from "../../util/functions";
import { postType } from "../../util/types";
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
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useRef } from "react";
import { setIsFreshPage } from "../../app/actions/layoutActions";
import { forwardRef } from "react";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";

export default function ViewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opaqueLayer = useOutletContext();
  const { postId } = useParams();
  const { isLoading: postIsLoading, isSuccess: postLoadIsSuccessful } =
    useGetPostsQuery();
  const { isLoading: commentIsLoading, isSuccess: commentLoadIsSuccessful } =
    useGetCommentsQuery();

  const viewPostNode = useRef();

  //   useLayoutEffect(() => {
  //     viewPostNode.current.scrollTop = 0;
  //   });

  const goBack = () => {
    // making sure the page on this back route returns to cached scrollTop
    setIsReturnPage(true);
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
            {commentLoadIsSuccessful && (
              <CommentsList postId={postId} ref={viewPostNode} />
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

const Comments = ({ postId }, ref) => {
  const comments = useSelector((state) => selectCommentByPostId(state, postId));

  // #13, #14
  // const commentList = comments.reduce((commentId) => {

  // })

  return (
    <>
      <PostExcerpt postId={1} ref={ref} comment={true} />
      <PostExcerpt postId={6} ref={ref} comment={true} />
      <PostExcerpt postId={5} ref={ref} comment={true} />
    </>
  );
};

export const CommentsList = forwardRef(Comments);
