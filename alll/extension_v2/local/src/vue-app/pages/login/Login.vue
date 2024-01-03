<template>
  <div class="comp-wrapper">
    <div class="login-header">
      <div class="login-header__title">{{ $t("login") }}</div>
      <div class="login-header__subtitle">{{ $t("title.require-login") }}</div>
    </div>
    <form class="login-form" @submit.prevent="logIn">
      <smit-input
        iconClass="email-icon"
        v-model="loginInfo.email"
        :placeholder="$t('enter-email')"
        :errorMsg="$v.email.$errors[0]?.$message"
      />
      <smit-input
        type="password"
        iconClass="password-icon"
        v-model="loginInfo.password"
        :placeholder="$t('enter-password')"
        :errorMsg="$v.password.$errors[0]?.$message"
      />

      <div class="fogot-password">
        <a data-bs-toggle="modal" :data-bs-target="`#forgot-password`">{{
          $t("forget-password")
        }}</a>
      </div>
      <button class="login-btn" type="submit">
        <div v-if="isLoading" class="spinner-border" role="status">
          <span class="visually-hidden">{{ $t("login") }}</span>
        </div>
        <span v-else>{{ $t("login") }}</span>
      </button>
      <div class="signup-link">
        <span>{{ $t("not-member") }}</span>
        <router-link to="register">{{ $t("sign-up") }}</router-link>
      </div>
    </form>
    <div class="bot">
      <div class="bot-left">{{ $t("title.version") }}</div>
      <Language />
    </div>
    <ForgotPassword />
  </div>
</template>

<script>
import "vue-toast-notification/dist/theme-sugar.css";

import { useStore } from "vuex";
import { useI18n } from "vue3-i18n";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { computed, ref, reactive } from "vue";
import { email } from "@vuelidate/validators";
import { required$ } from "@utils/validators";
import Language from "@components/Language.vue";
import { useToast } from "vue-toast-notification";
import ForgotPassword from "./components/ForgotPassword.vue";
import { AuthRepository } from "../../data/repositories/AuthRepository";

export default {
  name: "Login",
  components: {
    Language,
    ForgotPassword,
  },
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const isLoading = ref(false);
    const router = useRouter();
    const loginInfo = reactive({
      email: "",
      password: "",
    });

    const rules = computed(() => ({
      email: {
        email,
        required$,
      },
      password: {
        required$,
      },
    }));

    const $v = useVuelidate(rules, loginInfo, { $scope: false });

    const logIn = async () => {
      $v.value.$touch();
      console.log($v);
      if ($v.value.$invalid) return;

      const $toast = useToast();
      isLoading.value = true;
      try {
        const response = await AuthRepository.login(loginInfo);
        if (response?.data) {
          localStorage.setItem("jwt", response.data.accessToken);
          store.dispatch("SET_USER_INFO", response.data);
          store.dispatch("SET_USER_LOGIN", loginInfo);
          store.dispatch("LOGIN_SUCCESS", loginInfo);
          i18n.setLocale(response.data.language || i18n.getLocale());
        }
        $toast.success(i18n.t("messages.success"));
        router.push({ name: "account" });
      } catch (error) {
        $toast.error(error);
        store.dispatch("LOGIN_FAIL", {});
      }
      isLoading.value = false;
    };
    return { loginInfo, logIn, isLoading, $v };
  },
};
</script>

<style lang="scss" scoped>
.comp-wrapper {
  .login-header {
    &__title,
    &__subtitle {
      line-height: 1.2;
    }

    &__title {
      font-size: 28px;
      font-family: Bold;
      color: var(--bs-bg-routerlink);
    }

    &__subtitle {
      font-size: 16px;
      color: var(--bs-subtitle);
      margin-top: 5px; 
    }
  }

  .login-form {
    margin-top: 60px;

    .fogot-password {
      color: var(--bs-bg-routerlink);
      margin-top: 10px;
      text-align: right;

      &:hover {
        cursor: pointer;
      }
    }

    .login-btn {
      cursor: pointer;
      margin-top: 20px;
      background: linear-gradient(
        180deg,
        var(--bs-bg-btn-menu1),
        var(--bs-bg-btn-menu2)
      );
      border: 1px solid var(--bs-text-header);
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

    .signup-link {
      margin-top: 20px;
      text-align: center;

      span {
        margin-right: 5px;
      }

      a {
        color: var(--bs-text-color);
      }
    }
  }

  :deep(.spinner-border) {
    --bs-spinner-width: 1.5rem;
    --bs-spinner-height: 1.5rem;
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

  :deep(.lang_box) {
    margin-left: 0 !important;
  }
}
</style>