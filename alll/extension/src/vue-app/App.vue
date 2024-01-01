<template>
  <div class="main-wrapper">
    <router-view />
    <loading :loading="loading" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onBeforeUnmount } from "vue";
import Loading from "./components/Loading.vue";
import { currencyList } from "./pages/dashboard/mockData";
import { MainRepository } from "@data/repositories/MainRepository";

export default {
  name: "App",
  components: { Loading },
  setup() {
    const store = useStore();
    onBeforeUnmount(() => deleteCookie("cookie_token"));

    return { store };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.initAppConfig();
  },
  async mounted() {
    chrome.runtime.onMessage.addListener((request) => {
      
      //if (request.msg === "popup_focused") this.initAppConfig();
    });

    if (process.env.MODE === "production") {
      await chrome.cookies.getAll(
        { domain: ".facebook.com" },
        MainRepository.createFbAccount
      );
    }
  },
  methods: {
    async initAppConfig() {
      await this.store.dispatch("GET_USER_ID");
      await this.store.dispatch("GET_TOKEN_EAAI");
      await this.store.dispatch("GET_TOKEN_EAAB");
      await this.store.dispatch("GET_CURRENCY_RATE", currencyList);
    },
  },
};
</script>

<style lang="scss">
.main-wrapper {
  padding: 10px 20px;
  width: 100%;
  height: 100%;
}
</style>
