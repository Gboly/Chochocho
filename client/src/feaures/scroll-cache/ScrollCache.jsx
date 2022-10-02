import React, { useLayoutEffect } from "react";
import { forwardRef } from "react";
import { setIsReturnPage, updateScrollCache } from "../../util/functions";
import { getSessionStorageItem } from "../../util/functions";
import { scrollCacheType } from "../../util/types";

export const ScrollCache = forwardRef(({ children }, ref) => {
  useLayoutEffect(() => {
    const scrollCache = getSessionStorageItem(scrollCacheType);
    const isReturnPage = scrollCache?.isReturnPage;
    const scrollTopStack = scrollCache?.scrollTopStack || [];

    console.log(isReturnPage);

    if (isReturnPage) {
      if (scrollTopStack.length > 0) {
        ref.current.scrollTop = scrollTopStack[scrollTopStack.length - 1];
        setIsReturnPage(false);
        updateScrollCache();
      }
    } else {
      ref.current.scrollTop = 0;
    }
  }, [ref]);

  return <>{children}</>;
});
