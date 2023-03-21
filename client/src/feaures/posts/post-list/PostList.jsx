import "./post-list.css";
import PostExcerpt from "../post-excerpt/PostExcerpt";
import PostHidden from "../post-hidden/PostHidden";
import { useSelector } from "react-redux";
import {
  selectPostsIds,
  selectRegularPosts,
} from "../../../app/api-slices/postsApiSlice";
import { selectPostIdsByUserId } from "../../../app/api-slices/postsApiSlice";
import {
  getHiddenPosts,
  getRemovedPosts,
} from "../post-excerpt/postExcerptSlice";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

const PostList = ({ postIds, comment, loadComponent }) => {
  const homePosts = useSelector(selectRegularPosts);
  const hiddenPosts = useSelector(getHiddenPosts);
  const removedPosts = useSelector(getRemovedPosts);

  const { userId } = useParams();

  const userPostIds = useSelector((state) =>
    selectPostIdsByUserId(state, { userId })
  );

  const allPostIds = useSelector(selectPostsIds);
  const isFetched = useCallback(
    (postId) => allPostIds.includes(postId),
    [allPostIds]
  );

  // The condition is to check if the current page is either the profile page or home page
  //const postList = (userId ? userPostIds : allPostIds)
  const postList = (postIds || (userId ? userPostIds : homePosts?.ids || []))
    .filter((id) => !removedPosts.includes(id))
    .reduce((accum, current) => {
      if (hiddenPosts.includes(current)) {
        accum.push(<PostHidden key={current} postId={current} />);
      } else
        isFetched(current) &&
          accum.push(
            <PostExcerpt
              key={current}
              postId={current}
              comment={comment}
              loadComponent={loadComponent}
            />
          );

      return accum;
    }, []);

  return <>{postList}</>;
};

export default PostList;
