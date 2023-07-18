import React, { useContext, useEffect, useLayoutEffect } from "react";
import { forwardRef } from "react";
import { getSessionStorageItem } from "../../util/functions";
import {
  communityPageType,
  profilePageType,
  scrollCacheType,
  settingsPageType,
  viewPostPageType,
} from "../../util/types";
import { useLocation, useParams } from "react-router-dom";
import { GeneralContext } from "../../routes/Router";

// These are pages with outlets. They do not require scroll caching
const cacheExemptions = [settingsPageType, communityPageType];
export const ScrollCache = forwardRef(
  ({ children, defaultScrollTop, fetchMore }, ref) => {
    const location = useLocation();
    const { userId } = useParams();
    const { pageRefresh, setPageRefresh, authUser } =
      useContext(GeneralContext);

    // Restoring a page's scroll position
    useLayoutEffect(() => {
      if (!cacheExemptions.includes(ref.current?.id) && ref.current) {
        const scrollCache = getSessionStorageItem(scrollCacheType);
        const key =
          ref.current?.id === viewPostPageType ||
          // #3
          (userId !== authUser?.id && ref.current?.id === profilePageType)
            ? location.key
            : location.pathname;
        ref.current.scrollTop = scrollCache[key] || defaultScrollTop || 0;
      }

      // cleanup function.
      return () => setPageRefresh(false);
    }, [
      location,
      ref,
      userId,
      pageRefresh,
      setPageRefresh,
      defaultScrollTop,
      authUser,
    ]);

    // Implementation of infinite page
    useEffect(() => {
      const element = ref.current;
      let isThrottled = false;
      let timeOutId = null;

      const handleScroll = (e) => {
        const { scrollTop, scrollHeight, offsetHeight } = e.target;

        if (scrollTop + offsetHeight >= scrollHeight - 20 && !isThrottled) {
          isThrottled = true;
          fetchMore();
          timeOutId = setTimeout(() => (isThrottled = false), 3000);
        }
      };

      element.addEventListener("scroll", handleScroll);

      return () => {
        element.removeEventListener("scroll", handleScroll);
        clearTimeout(timeOutId);
      };
    }, [ref, fetchMore]);

    return <>{children}</>;
  }
);
