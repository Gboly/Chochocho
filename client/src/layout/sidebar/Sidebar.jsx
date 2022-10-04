import "./sidebar.css";
import { sidebarContent } from "../../util/sidebarContent";
import { useSelector } from "react-redux";
import { getSidebarState } from "../layoutSlice";

import SidebarTop from "../../components/sidebar/sidebar-top/SidebarTop";
import SidebarItem from "../../components/sidebar/sidebar-item/SidebarItem";
import { motion } from "framer-motion";

const spreadInOutVariant = {
  // #5
  hidden: {
    x: "-14rem",
  },
  visible: {
    x: 0,
    transition: { duration: 2, ease: "backInOut" },
  },
  exit: {
    x: "-14rem",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Sidebar({ size }) {
  // #3
  //sidebarContent[1].id = "profile/1";

  const sidebarItems = sidebarContent.map((content, index) => (
    <SidebarItem key={index} {...{ ...content }} />
  ));

  return (
    // #6
    <div className={`${size === "lg" ? "sidebar-lg" : ""}`}>
      <motion.div
        variants={spreadInOutVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`sidebar-container`}
        // style={{ display: sidebarIsOpen ? "block" : "" }}
        // style={{ display: "none" }}
      >
        <div className="sidebar-lg-wrapper">
          <div className="sidebar-top-container">
            <SidebarTop />
          </div>
          <div className="sidebar-lg-bottom">{sidebarItems}</div>
        </div>
      </motion.div>
    </div>
  );
}
