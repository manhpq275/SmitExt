import store from "../store"
import { checkPermision } from "./helpers";
import Menu from "../pages/_menu/Menu.vue";
import Login from "../pages/login/Login.vue";
import Account from '../pages/account/Account.vue';
import Register from '../pages/register/Register.vue';
import NotFound from "../pages/not-found/NotFound.vue";
import Dashboard from "../pages/dashboard/Dashboard.vue";
import SharePixel from "../pages/share-pixel/SharePixel.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import SuperTarget from '../pages/super-target/SuperTarget.vue';
import DelHiddenAdmin from '../pages/del-hidden-admin/DelHiddenAdmin.vue';
import ExtendedPayment from '../pages/extended-payment/ExtendedPayment.vue';
import RegisterConfirmEmail from '../pages/register-confirm-email/RegisterConfirmEmail.vue';

import DashboardLayout from '../layout/DashboardLayout.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/menu",
      component: Menu,
      redirect: { name: "login" },
      children: [
        // { path: "/login", component: Account, name: "login" },
        { path: "/login", component: Login, name: "login" },
        { path: "/account", component: Account, name: "account", meta: { requiresAuth: true } },

        { path: "/register", component: Register, name: "register" },
        { path: "/register-confirm-email", component: RegisterConfirmEmail, name: "register-confirm-email" },

        { path: "/share-pixel", component: SharePixel, name: "share-pixel" },
        { path: "/extended-payment", component: ExtendedPayment, name: "extended-payment" },
        { path: "/super-target", component: SuperTarget, name: "super-target" },
        { path: "/del-hidden-admin", component: DelHiddenAdmin, name: "del-hidden-admin" },
      ]
    },
    {
      path: "/",
      name: "layout",
      redirect: "dashboard",
      component: DashboardLayout,
      children: [
        { path: "dashboard", component: Dashboard, name: 'dashboard' }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.getIsAuth;
  const isRequireAuth = to.matched.some(route => route.meta.requiresAuth);

  if (isRequireAuth && !isAuth) next("/menu");
  else if (to.path === '/login' && isAuth) next("/");
  else next();
})

router.beforeResolve((to, from, next) => {
  const isAuth = store.getters.getIsAuth;
  const userRole = store.getters.getUserRole;
  const isAuthorization = checkPermision(userRole, to.path);

  if (isAuth && isAuthorization) next();
  else if (isAuth && !isAuthorization) next(from.path);
  else if (!isAuth && !isAuthorization) next(from.path);
  else next();
})

export default router;
