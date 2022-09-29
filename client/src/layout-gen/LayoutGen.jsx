import "./layout-gen.css";
import { Outlet } from "react-router-dom";

export default function LayoutGen() {
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
