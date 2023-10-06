import {
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./bookmark.css";
import { ScrollCache } from "../../feaures/scroll-cache/ScrollCache";
import { bookmarksBasePathType } from "../../util/types";
import RightBar from "../../feaures/right-bar/RightBar";
import { GeneralContext } from "../../routes/Router";
import {
  getAnArrayOfSpecificKeyPerObjectInArray,
  newRange,
  prepareIdsForQuery,
} from "../../util/functions";
import { useGetPostByIdQuery } from "../../app/api-slices/postsApiSlice";
import { postSkeletons } from "../../feaures/posts/post-excerpt/PostExcerpt";
import PostList from "../../feaures/posts/post-list/PostList";
import { useSelector } from "react-redux";
import { getOpaqueOverlayState } from "../../layout/layoutSlice";

const initialPage = { skip: 0, limit: 10 };
export default function Bookmarks() {
  const bookmarksNode = useRef();
  const {
    pageNodes,
    authUser: { bookmarks },
  } = useContext(GeneralContext);

  const { isOpen: opaqueOverlayIsOpen, hidden: opaqueOverlayIsHidden } =
    useSelector(getOpaqueOverlayState);

  useImperativeHandle(
    pageNodes,
    () => ({
      bookmarksNode: bookmarksNode.current,
    }),
    [bookmarksNode]
  );

  const [pageRange, setPageRange] = useState(initialPage);

  const { isLoading, data, error } = useGetPostByIdQuery(
    {
      id: prepareIdsForQuery(bookmarks, "postId"),
      ...pageRange,
    },
    { skip: !bookmarks.length }
  );

  const fetchMore = useCallback(() => {
    !isLoading &&
      data.ids.length &&
      setPageRange(({ skip, limit }) => newRange(skip, limit, initialPage));
  }, [isLoading, data]);

  return (
    <>
      <ScrollCache ref={bookmarksNode} fetchMore={fetchMore}>
        <div
          ref={bookmarksNode}
          className={`home-wrapper ${
            opaqueOverlayIsOpen && !opaqueOverlayIsHidden
              ? "outlet-no-scroll"
              : ""
          }`}
          id={bookmarksBasePathType}
        >
          <div className="home-main-wrapper">
            <header className="bookmark-header">
              <span>Bookmarks</span>
              {/* <i>
                <SettingsOutlinedIcon style={iconStyle} />
              </i> */}
            </header>
            <PostList
              postIds={getAnArrayOfSpecificKeyPerObjectInArray(
                bookmarks,
                "postId"
              )}
            />
            {isLoading && postSkeletons(pageRange)}
          </div>
        </div>
        <div className="rightbar-container">
          <RightBar />
        </div>
      </ScrollCache>
    </>
  );
}
