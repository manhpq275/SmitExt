import React from "react";
import Config from "configs";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { store } from "pages/_redux/store";
import { createRoot } from "react-dom/client";
import { AppRouter } from "pages/_routes";
import { ToastContainer } from "react-toastify";
import { AuthSliceModule } from "pages/_redux/auth";
import { configLocalization } from "utils/localization";
import AuthRepository from "data/repositories/AuthRepository";
import "./index.scss";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

Config.initConfig()
  .then(async () => {
    configLocalization(); // init localization
    const authAdminRepo = new AuthRepository();

    await authAdminRepo
      .checkAuthentication()
      .then((res) => store.dispatch(AuthSliceModule.setAuth(res)))
      .catch((err) => store.dispatch(AuthSliceModule.setAuth(err)));
    return;
  })
  .finally(() => {
    const container = document.getElementById("root")!;
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{import.meta.env.VITE_WEBSITE_NAME}</title>
        </Helmet>
        <AppRouter />
        <ToastContainer />
      </Provider>
    );
  });
