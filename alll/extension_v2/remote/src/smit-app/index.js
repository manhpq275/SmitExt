import { createApp } from "vue";
import App from './App.vue';
import store from "@vue-app/store";

window.addEventListener("load", () => {
    const smitApp = document.createElement("div");
    smitApp.id = "SmitApp";

    document.body.insertBefore(smitApp, document.body.firstChild);

    const app = createApp(App);
    app.use(store);
    app.mount(smitApp);
})