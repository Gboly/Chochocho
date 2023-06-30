import "./create-post.css";
import CreatePostIdle from "./create-post-idle/CreatePostIdle";
import CreatePostActive from "./create-post-active/CreatePostActive";

import { useSelector } from "react-redux";
import { getCreatePostState } from "./createPostSlice";

export default function CreatePost({
  placeholder,
  type,
  parents,
  invalidatePostList,
  style,
}) {
  const active = useSelector(getCreatePostState);

  return (
    <>
      {active && (
        <CreatePostActive
          placeholder={placeholder}
          type={type}
          parents={parents}
          invalidatePostList={invalidatePostList}
          style={style}
        />
      )}
      {<CreatePostIdle placeholder={placeholder} active={active} type={type} />}
    </>
  );
}
