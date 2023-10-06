import { createSlice } from "@reduxjs/toolkit";
import { getBasePath, capitalize } from "../util/functions";

const initialState = {
  isHomePage: false,
  isProfilePage: false,
  isCommentsPage: false,
  isNotificationPage: false,
  isCommunityPage: false,
  isStoryPage: false,
  isSettingsPage: false,
  isBookmarksPage: false,
};

const basePathsAt1 = [
  "profile",
  "notifications",
  "community",
  "story",
  "settings",
  "bookmarks",
];

// This isn't the best approach for this but i just resorted to it.
// Its better to create a wrapper for Each Router component. The wrapper takes an id(page identifier) together with their route strings and every other prop. Inside this wrapper, there's a context provider that provides this id. the routes and props are attached to the actual Router component. This way you could use the useContext hook to get the page identifier i.e current page
export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      const pathname = action.payload;
      const basePathAt1 = getBasePath(pathname);
      const basePathAt2 = getBasePath(pathname, 2);
      return pathname === "/"
        ? {
            ...initialState,
            isHomePage: true,
          }
        : basePathAt2 === "post"
        ? { ...initialState, isCommentsPage: true }
        : basePathsAt1.includes(basePathAt1) && {
            ...initialState,
            [`is${capitalize(basePathAt1)}Page`]: true,
          };
    },
  },
});

export const routerReducer = routerSlice.reducer;

export const getCurrentPageState = (state) => state.router;
