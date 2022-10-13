import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { store } from "./app/store";
import Router from "./routes/Router";
import { scrollCacheType } from "./util/types";

window.onload = () => sessionStorage.removeItem(scrollCacheType);

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
