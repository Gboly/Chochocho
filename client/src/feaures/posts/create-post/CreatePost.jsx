import "./create-post.css";
import CreatePostIdle from "./create-post-idle/CreatePostIdle";
import CreatePostActive from "./create-post-active/CreatePostActive";

import { useSelector } from "react-redux";
import { getCreatePostState } from "./createPostSlice";

export default function CreatePost({ placeholder }) {
  const active = useSelector(getCreatePostState);

  return (
    <>
      {active ? (
        <CreatePostActive placeholder={placeholder} />
      ) : (
        <CreatePostIdle placeholder={placeholder} />
      )}
    </>
  );
}
