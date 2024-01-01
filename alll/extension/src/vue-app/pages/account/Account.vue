<template>
  <div class="comp-wrapper">
    <div class="top">
      <div class="top-title">{{ $t("title.account") }}</div>
    </div>
    <smit-tabs>
      <smit-tab :title="$t('title.account-info')" iconClass="account-mask-icon">
        <account-infomation />
      </smit-tab>
      <smit-tab :title="$t('change-password')" iconClass="password-mask-icon">
        <change-password-form />
      </smit-tab>
    </smit-tabs>
    <div class="bot">
      <div class="bot-left">{{ $t("title.version") }}</div>
      <Language />
    </div>
  </div>
</template>

<script>
import Language from "@components/Language.vue";
import AccountInfomation from "./components/AccountInfomation.vue";
import ChangePasswordForm from "./components/ChangePasswordForm.vue";

export default {
  components: {
    Language,
    AccountInfomation,
    ChangePasswordForm,
  },
};
</script>

<style lang='scss' scoped>
.top {
  display: flex;
  align-items: center;
}
.top-title {
  font-family: "Heavy";
  font-size: 24px;
  margin-bottom: 20px;
  line-height: 1;
  color: var(--bs-text-color);
}

:deep(.lang_box) {
  margin-left: 0 !important;
}

.bot {
  display: flex;
  margin-top: auto;
  color: #303030;
  padding-top: 10px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ebebeb;
}
</style>