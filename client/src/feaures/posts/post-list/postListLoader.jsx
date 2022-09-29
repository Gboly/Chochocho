import "./post-list.css";
import { useGetPostsQuery } from "../../../app/api-slices/postsApiSlice";
import PostList from "./PostList";
import Spinner from "../../../components/Spinner/Spinner";

const PostListLoader = () => {
  const { isLoading, isSuccess } = useGetPostsQuery();

  return (
    <>
      {isSuccess && <PostList />}
      {isLoading && <Spinner />}
    </>
  );
};

export default PostListLoader;
