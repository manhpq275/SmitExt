import Config from "./configs";
import { createApp } from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./routers";
import * as smitComponents from "@common";
import { auth } from '@vue-app/directives'
import ToastPlugin from 'vue-toast-notification';
import { configLocalization } from "./utils/localization";
import { AuthRepository } from "@data/repositories/AuthRepository";
import mitt from 'mitt';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';


import "bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "vue-toast-notification/dist/theme-sugar.css";
import 'vue-toast-notification/dist/theme-bootstrap.css';
import "../assets/styles/index.scss";
import "@data/repositories/NativeApi.js";

Config.initConfig();
    const i18n = configLocalization();
    const language = store.getters.getUserLanguage;
    const emitter = mitt();
    i18n.setLocale(language || i18n.getLocale());

    const vuetify = createVuetify({
      components,
      directives,
    });

    const app = createApp(App);

    for (const componentKey in smitComponents) {
      if (Object.hasOwnProperty.call(smitComponents, componentKey)) {
        const smitCom = smitComponents[componentKey].default;
        app.component(smitCom.name, smitCom);
      }
    }
    app.config.globalProperties.emitter = emitter;
    app.directive('auth', auth)
    app.use(router).use(store).use(ToastPlugin).use(i18n).use(vuetify).use(Vuesax);
    app.mount("#app");


