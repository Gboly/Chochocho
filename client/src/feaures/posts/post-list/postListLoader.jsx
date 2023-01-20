import "./post-list.css";
import { useGetPostsQuery } from "../../../app/api-slices/postsApiSlice";
import PostList from "./PostList";
import Spinner from "../../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const initialPage = { skip: 0, limit: 1 };
const PostListLoader = () => {
  const { userId } = useParams();

  const [postIds, setPostIds] = useState([]);
  const [postRange, setPostRange] = useState(initialPage);

  const { isLoading, isSuccess, data } = useGetPostsQuery(postRange);

  return (
    <>
      {isSuccess && <PostList postIds={postIds} />}
      {isLoading && <Spinner />}
    </>
  );
};

export default PostListLoader;
