import "./style.scss";

import useRole from "HOC/useRole";
import { Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { appRouter } from "pages/_routes";
import { useTranslation } from "react-i18next";
import { PERMISSION } from "models/commons/enum";
import { ItemType } from "antd/lib/menu/hooks/useItems";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function SideBar() {
  const userRole = useRole();
  const { t } = useTranslation();

  const buildSideBar = () => {
    const sideBarItems: ItemType[] = [];
    (appRouter[0] as any).children.map((route: any, routeIdx: React.Key) => {
      const { permission } = route;

      if (!route.isShow) return;

      if (
        userRole &&
        permission?.indexOf(PERMISSION.ALL) &&
        permission?.indexOf(userRole)
      )
        return;

      if (route.children) {
        const routeName = t(`sideBar.text.${route.name}`);
        const subMenu = route.children.map((child: any, childIdx: any) => {
          const path = `${route.path}/${child.path}`;
          const subLabel = (
            <Link to={path}>{t(`sideBar.text.${child.name}`)}</Link>
          );
          return getItem(
            subLabel,
            routeIdx.toString().concat(`-${childIdx.toString()}`)
          );
        });

        sideBarItems.push(getItem(routeName, routeIdx, route.icon, subMenu));
      } else {
        const routeName = (
          <Link to={route.path}>{t(`sideBar.text.${route.name}`)}</Link>
        );
        sideBarItems.push(getItem(routeName, routeIdx, route.icon));
      }
    });

    return sideBarItems;
  };

  return (
    <div className="admin-side-bar">
      <Menu defaultSelectedKeys={["1"]} items={buildSideBar()} mode="inline" />
    </div>
  );
}
