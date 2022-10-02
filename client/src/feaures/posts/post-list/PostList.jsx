import "./post-list.css";
import PostExcerpt from "../post-excerpt/PostExcerpt";
import PostHidden from "../post-hidden/PostHidden";
import { useSelector } from "react-redux";
import { selectPostsIds } from "../../../app/api-slices/postsApiSlice";
import { selectPostIdsByUserId } from "../../../app/api-slices/postsApiSlice";
import {
  getHiddenPosts,
  getRemovedPosts,
} from "../post-excerpt/postExcerptSlice";
import { useParams } from "react-router-dom";
import { forwardRef } from "react";

const List = (_, ref) => {
  const allPostIds = useSelector(selectPostsIds);
  const hiddenPosts = useSelector(getHiddenPosts);
  const removedPosts = useSelector(getRemovedPosts);

  const { userId } = useParams();

  const userPostIds = useSelector((state) =>
    selectPostIdsByUserId(state, Number(userId))
  );

  const postList = (userId ? userPostIds : allPostIds)
    .filter((id) => !removedPosts.includes(id))
    .reduce((accum, current) => {
      if (hiddenPosts.includes(current)) {
        accum.push(<PostHidden key={current} postId={current} />);
      } else
        accum.push(<PostExcerpt key={current} ref={ref} postId={current} />);

      return accum;
    }, []);

  return <>{postList}</>;
};

const PostList = forwardRef(List);

export default PostList;
