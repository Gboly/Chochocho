import React from "react";

export default function useOffsetTop(postId) {
  const [defaultScrollTop, setDefaultScrollTop] = React.useState();

  const handleRef = React.useCallback(
    (node) => {
      // using setTimeout here to deal with the issue of stale values. The offsetTop keeps rendering previous value. There's a waiting period for this to be sorted
      //The 60px represents the "allowed" offset.
      node && setTimeout(() => setDefaultScrollTop(node.offsetTop - 60), 200);
    },
    // Even if postId isnt a part of the this function. It is needed as a dependency because this page is mostly nested and this callback needs to be re-rendered everytime we view a new post(comment).
    [postId]
  );

  return [defaultScrollTop, handleRef];
}
