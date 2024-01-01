import "./style.scss";
import Header from "./header/Header";
import AuthGuard from "HOC/AuthGuard";
import SideBar from "./sideBar/SideBar";
import Authorization from "HOC/Authorization";
import { useNavigate, Outlet } from "react-router-dom";

export default function AdminLayout(props: any) {
  const navigate = useNavigate();

  return (
    <AuthGuard>
      <Authorization>
        <div className="admin-layout">
          <div className="header-section">
            <Header />
          </div>
          <div className="main-section">
            <div className="sidebar-section">
              <SideBar />
            </div>
            <div className="main-content-section">
              <Outlet />
            </div>
          </div>
        </div>
      </Authorization>
    </AuthGuard>
  );
}
