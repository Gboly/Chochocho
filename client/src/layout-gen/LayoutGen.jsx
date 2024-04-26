import { useEffect } from "react";
import "./layout-gen.css";
import { Outlet } from "react-router-dom";

export default function LayoutGen() {
  // On Iphones, the content of the pages goes beyond 100vh. Scroll is required in this case.
  useEffect(() => {
    document.body.style.overflowY = "visible";
    return () => {
      document.body.style.overflowY = "hidden";
    };
  }, []);

  return (
    <main className="layout-gen-container">
      <nav className="nav-container">
        <div className="nav-wrapper">
          <div className="nav-center">
            <span className="app-name">Chochocho</span>
          </div>
        </div>
      </nav>
      <Outlet />
    </main>
  );
}
