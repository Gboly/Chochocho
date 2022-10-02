import "./post-list.css";
import { useGetPostsQuery } from "../../../app/api-slices/postsApiSlice";
import PostList from "./PostList";
import Spinner from "../../../components/Spinner/Spinner";
import { forwardRef } from "react";

const Loader = (_, ref) => {
  const { isLoading, isSuccess } = useGetPostsQuery();

  return (
    <>
      {isSuccess && <PostList ref={ref} />}
      {isLoading && <Spinner />}
    </>
  );
};

const PostListLoader = forwardRef(Loader);

export default PostListLoader;
