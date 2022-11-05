import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import PostImageFullscreen from "../feaures/posts/post-img-fullscreen/PostImgFullscreen";
import {
  OpaqueOverlay,
  TransparentOverlay,
} from "../components/overlay/Overlay";
import { useSelector, useDispatch } from "react-redux";
import { getFullscreenState } from "../feaures/posts/post-excerpt/postExcerptSlice";
import { getOutletOptionState } from "../pages/community/communitySlice";
import {
  getConfirmationState,
  getTransparentOverlayState,
} from "./layoutSlice";
import {} from "../app/actions/homeActions";
import { closeOutletOptions } from "../app/actions/communityActions";

import "./layout.css";

import { useEffect, useState } from "react";
import Confirmation from "../components/confirmation/Confirmation";
import { motion, AnimatePresence } from "framer-motion";

import { getOpaqueOverlayState } from "./layoutSlice";
import { getFriendsOptionsState } from "../feaures/right-bar/righbarSlice";
import { closeFriendsOptions } from "../app/actions/rightbarActions";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="sidebar-container-flex">
          {/* #1  */}
          <Sidebar size="lg" />
          {/* <AnimatePresence>
            {sidebarIsOpen && <Sidebar key={sidebarIsOpen} size="sm" />}
          </AnimatePresence> */}
        </div>
        <Outlet />
      </div>
    </>
  );
}
