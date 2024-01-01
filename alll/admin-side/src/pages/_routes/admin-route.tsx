import Login from "pages/login/Login";
import Dashboard from "pages/dashboard";
import { Outlet } from "react-router-dom";
import PersonalInfo from "pages/personal-info";
import { PERMISSION } from "models/commons/enum";
import ListUser from "pages/user-management/list-user";
import AdminLayout from "pages/_layouts/admin/AdminLayout";
import ListMember from "pages/member-management/list-member";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import AdminLoginLayout from "pages/_layouts/login/AdminLoginLayout";
import UnAuthorization from "pages/_components/common/UnAuthorization";

export const adminRoutes = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        isShow: false,
        element: <Dashboard />,
      },
      {
        isShow: true,
        permission: [PERMISSION.ALL],
        name: "dashboard",
        path: "dashboard",
        element: <Dashboard />,
        icon: <DashboardOutlined />,
      },
    ],
  },
  {
    isShow: false,
    element: <AdminLoginLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <UnAuthorization />,
  },
];
