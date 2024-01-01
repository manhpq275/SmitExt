<template>
  <div class="main-wrapper">
    <smit-bubble />
    <smit-payment-setting :key="paymentSettingKey" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import SmitBubble from "./components/smitBubble.vue";
import { currencyList } from "@vue-app/pages/dashboard/mockData";
import SmitPaymentSetting from "./components/smitPaymentSetting.vue";

export default {
  name: "App",
  components: { SmitBubble, SmitPaymentSetting },
  data() {
    return {
      paymentSettingKey: 1,
    };
  },
  setup() {
    const store = useStore();
    return { store };
  },
  mounted() {
    this.initAppConfig();

    setTimeout(() => {
      const smitPaymentSetting = document.querySelector("#smit-payment");
      if (!smitPaymentSetting) this.paymentSettingKey = 2;
    }, 3000);
  },
  methods: {
    async initAppConfig() {
      await this.store.dispatch("GET_TOKEN_EAAG");
      await this.store.dispatch("GET_CURRENCY_RATE", currencyList);
    },
  },
};
</script>
  