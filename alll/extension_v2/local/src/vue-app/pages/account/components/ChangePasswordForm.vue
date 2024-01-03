<template>
  <form class="change-password-form" @submit.prevent="changePassword">
    <smit-input
      type="password"
      iconClass="password-mask-icon"
      v-model="changePassInfo.currentPass"
      :placeholder="$t('enter-current-password')"
      :errorMsg="$v.currentPass.$errors[0]?.$message"
    />
    <smit-input
      type="password"
      iconClass="password-mask-icon"
      v-model="changePassInfo.changePass"
      :placeholder="$t('enter-new-password')"
      :errorMsg="$v.changePass.$errors[0]?.$message"
    />
    <smit-input
      type="password"
      iconClass="password-mask-icon"
      v-model="changePassInfo.reChangePass"
      :placeholder="$t('re-enter-new-password')"
      :errorMsg="$v.currentPass.$errors[0]?.$message"
    />
    <button class="change-password-btn" type="submit">
      {{ $t("change-password") }}
    </button>
  </form>
</template>

<script>
import { reactive, computed } from "vue";
import useVuelidate from "@vuelidate/core";
import { required$ } from "@utils/validators";

export default {
  name: "ChangePasswordForm",
  setup() {
    const changePassInfo = reactive({
      currentPass: "",
      changePass: "",
      reChangePass: "",
    });

    const rules = computed(() => ({
      currentPass: {
        required$,
      },
      changePass: {
        required$,
      },
      reChangePass: {
        required$,
      },
    }));

    const $v = useVuelidate(rules, changePassInfo, { $scope: false });

    const changePassword = () => {
      $v.value.$touch();
      // console.log("userLogin = ", currentPass.value);
      // if (
      //   !changePassInfo.currentPass ||
      //   !changePassInfo.changePass ||
      //   !changePassInfo.reChangePass
      // ) {
      //   $toast.error(i18n.t("messages.not-empty-input"));
      // } else if (currentPass.value !== changePassInfo.currentPass) {
      //   $toast.error(i18n.t("messages.wrong-password"));
      // } else if (
      //   currentPass.value === changePassInfo.changePass ||
      //   currentPass.value === changePassInfo.reChangePass
      // ) {
      //   $toast.error(i18n.t("messages.not-same-password"));
      // } else if (changePassInfo.changePass !== changePassInfo.reChangePass) {
      //   $toast.error(i18n.t("messages.not-match-new-password"));
      // } else {
      //   //call API change password
      //   // logOut()
      // }
    };

    return { $v, changePassInfo, changePassword };
  },
};
</script>

<style lang="scss" scoped>
.change-password-form {
  margin-top: 30px;
}

.change-password-btn {
  cursor: pointer;
  margin-top: 25px;
  background: linear-gradient(
    180deg,
    var(--bs-bg-btn-menu1),
    var(--bs-bg-btn-menu2)
  );
  border: 1px solid var(--bs-border);
  box-shadow: 2px 22px 24px -10px rgba(0, 0, 0, 0.11);
  border-radius: 11px;
  width: 100%;
  height: 50px;
  font-family: Bold;
  color: var(--bs-text-header);
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }
}
</style>