import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "./layout.css";

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
