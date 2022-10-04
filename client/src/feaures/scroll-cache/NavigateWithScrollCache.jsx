import { useContext, useEffect, useMemo } from "react";
import { useCallback } from "react";
import { forwardRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { HomeContext } from "../../pages/home/Home";
import { ProfileContext } from "../../pages/profile/Profile";
import { ViewPostContext } from "../../pages/view post/ViewPost";
import { updateScrollCache } from "../../util/functions";

const NavigateWithScrollCache = ({
  children,
  clicked,
  handleRouting,
  cleanUp,
}) => {
  const location = useLocation();
  const { userId } = useParams();

  const homeNode = useContext(HomeContext);
  const profileNode = useContext(ProfileContext);
  const viewPostNode = useContext(ViewPostContext);

  const ref = useMemo(() => {
    //since these nodes are gotten using useContext hook and this component must be a child element of the context Provider before it gives an actual value, else it's undefined. Then all i'm doing here is checking for the node that is valid and choosing it as the current page node.
    return homeNode || profileNode || viewPostNode;
  }, [homeNode, profileNode, viewPostNode]);

  const handleClick = useCallback(() => {
    if (ref) {
      const scrollTop = ref.current.scrollTop;
      // Checking to see if i'm in the viewPost route. If true, use the location.key as the property name for the scrollTop value. This is to ensure that only when a back button is used in navigating to this route should the scroll be restored. I've also included profile pages(asides authorized user page) to this condition
      // Location.pathname should be used for other routes they're main routes and would be navigated through the sidebar. This would generate a new key which isnt what i need.
      //#3
      const key =
        viewPostNode || (userId !== 1 && profileNode)
          ? location.key
          : location.pathname;
      updateScrollCache(key, scrollTop);
    }
    handleRouting();
  }, [ref, location, userId, handleRouting, profileNode, viewPostNode]);

  useEffect(() => {
    clicked && handleClick();

    // This cleanup is basically setting the click back to false to ensure that it only runs once after click.
    return () => cleanUp();
  }, [clicked, handleClick, cleanUp]);

  return <>{children}</>;
};

export default NavigateWithScrollCache;
