import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import { store } from "./app/store";
import { extendedPostsApiSlice } from "./app/api-slices/postsApiSlice";
import { extendedUsersApiSlice } from "./app/api-slices/usersApiSlice";
import { extendedCommentsApiSlice } from "./feaures/comments/commentsApiSlice";

import Router from "./routes/Router";
import { scrollCacheType } from "./util/types";

// import App from "./App";

window.onload = () => sessionStorage.removeItem(scrollCacheType);

store.dispatch(extendedPostsApiSlice.endpoints.getPosts.initiate());
store.dispatch(extendedUsersApiSlice.endpoints.getUsers.initiate());
store.dispatch(extendedCommentsApiSlice.endpoints.getComments.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Router />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
