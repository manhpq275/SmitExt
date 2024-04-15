<template>
  <div class="dashboard">
    <login-facebook v-if="!isLoginFb" />
    
    <main-filter />
    <template v-if="activeTab === 'account'">
      <personal-account />
    </template>
    <template v-else>
      <business-account />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MainFilter from "./components/MainFilter.vue";
import BusinessAccount from "./components/BusinessAccount.vue";
import PersonalAccount from "./components/PersonalAccount.vue";
import LoginFacebook from '@vue-app/components/LoginFacebook.vue';

export default {
  name: "Dashboard",
  components: {
    MainFilter,
    LoginFacebook,
    BusinessAccount,
    PersonalAccount,
  },
  provide() {
    return { switchAccount: this.switchAccount };
  },
  computed: {
    ...mapGetters(["isLoginFb"]),
  },
  data() {
    return {
      activeTab: "account",
    };
  },
  methods: {
    
    switchAccount(name) {
      //console.log(name);
      this.activeTab = name;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  position: relative;
  flex-direction: column;
  height: calc(100% - 110px);
}
</style>