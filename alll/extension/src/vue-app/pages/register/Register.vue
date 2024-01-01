<template>
  <div class="comp-wrapper">
    <div class="signup-header">
      <div class="signup-header__title">{{ $t("regist-account") }}</div>
      <div class="signup-header__subtitle">
        {{ $t("title.regist-subtitle") }}
      </div>
    </div>

    <form
      class="signup-form"
      autocomplete="false"
      style="margin-top: 20px"
      @submit.prevent="signUpAccount"
    >
      <smit-input
        iconClass="account-icon"
        v-model="userSignUp.displayName"
        :placeholder="$t('full-name')"
        :errorMsg="$v.displayName.$errors[0]?.$message"
      />
      <smit-input
        iconClass="email-icon"
        v-model="userSignUp.email"
        :placeholder="$t('enter-email')"
        :errorMsg="$v.email.$errors[0]?.$message"
      />
      <smit-input
        type="password"
        iconClass="password-icon"
        v-model="userSignUp.password"
        :placeholder="$t('enter-password')"
        :errorMsg="$v.password.$errors[0]?.$message"
      />
      <smit-input
        type="password"
        iconClass="password-icon"
        v-model="userSignUp.rePassword"
        :placeholder="$t('confirm-password')"
        :errorMsg="$v.rePassword.$errors[0]?.$message"
      />
      <smit-input
        iconClass="address-icon"
        v-model="userSignUp.address"
        :placeholder="$t('address')"
        :errorMsg="$v.address.$errors[0]?.$message"
      />

      <button type="submit" class="signup-btn">
        <span>{{ $t("regist-account") }}</span>
      </button>
      <div class="login-link">
        <span>{{ $t("have-an-account") }}</span>
        <router-link to="login">{{ $t("login") }}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Language from "@components/Language.vue";
import { useI18n } from "vue3-i18n";
import { useRouter } from "vue-router";
import { computed, reactive, ref } from "vue";
import { AuthRepository } from "../../data/repositories/AuthRepository";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { email, helpers, minLength, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { containsPasswordRequirement, required$ } from "@utils/validators";
import { useStore } from "vuex";

export default {
  name: "Register",
  components: {
    Language,
  },
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const userSignUp = reactive({
      displayName: "",
      email: "",
      password: "",
      rePassword: "",
      address: "",
      language: i18n.getLocale(),
    });
    const router = useRouter();
    const rules = computed(() => ({
      displayName: {
        required$,
      },
      email: {
        required$,
        email,
      },
      password: {
        required$,
        containsPasswordRequirement,
        minLength: minLength(8),
      },
      rePassword: {
        required$,
        sameAsPassword: helpers.withMessage(
          "Password and Confirm Password must match",
          sameAs(userSignUp.password)
        ),
      },
      address: {
        required$,
      },
      language: {
        required$,
      },
    }));

    const $v = useVuelidate(rules, userSignUp);

    const signUpAccount = async () => {
      $v.value.$touch();
      if ($v.value.$invalid) return;
      const isEmpty = Object.values(userSignUp).every((el) => el === "");

      if (!isEmpty) {
        store.dispatch("showLoading");
        const $toast = useToast();
        const { rePassword, ...data } = userSignUp;

        try {
          const response = await AuthRepository.signUp(data);
          $toast.success(i18n.t("messages.register-success"));
          router.push({ name: "register-confirm-email", state: response });
        } catch (error) {
          $toast.error(error);
        } finally {
          store.dispatch("hideLoading");
        }
      }
    };
    return { signUpAccount, userSignUp, $v };
  },
};
</script>

<style lang="scss" scoped>
.comp-wrapper {
  padding: 0 20px;

  .signup-header {
    &__title {
      color: var(--bs-bg-routerlink);
      font-family: Bold;
      font-size: 24px;
    }

    &__subtitle {
      margin-top: 5px;
      font-size: 16px;
      color: var(--bs-subtitle);
    }
  }
}

.login-link {
  margin-top: 18px;
  justify-content: center;
  cursor: pointer;
}

.top {
  .top-title {
    color: var(--bs-wrapper);
    font-family: Bold;
    font-size: 24px;
  }

  .top-desc {
    margin-top: 5px;
    font-size: 16px;
    color: #a6a6a6;
  }
}

.auth__form--hr {
  height: 1px;
  background: rgba(119, 126, 144, 0.14);
  width: 100%;
  margin-top: 18px;
  margin-bottom: 28px;
}

.show-up {
  transition: all 0.5s;
  z-index: 2;
}

.auth__form {
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.5s ease;
  border-radius: 15px;
  width: 100%;
}

label ._icon,
label .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

._icon {
  display: inline-block;
  mask-image: var(--image-url);
  -webkit-mask-image: var(--image-url);
  background: currentColor;
}

label {
  display: flex;
  height: 45px;
  position: relative;
  padding: 0 16px;
  border: 1px solid #e6e8ec;
  border-radius: 10px;
  margin-bottom: 10px;

  img {
    width: 18px;
  }
}

.form-group {
  height: 70px;
}

.form-input {
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid #e1e1e1;

  &__image {
    width: 20px;
    flex-shrink: 0;

    i:before {
      font-size: 18px;
    }
  }

  &__input {
    font-size: 15px;
    padding: 10px 0;
    flex: 1;
    background: transparent;
    margin-left: 5px;
    border: none;
    outline: none;
  }

  &__clear-btn {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 2px;
    background: #d8dada;
    opacity: 0;
    transition: all 0.2s;
  }
}

.signup-btn {
  cursor: pointer;
  margin-top: 15px;
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

.login-link {
  margin-top: 10px;
  text-align: center;
  justify-content: center;

  span {
    margin-right: 5px;
  }

  a {
    color: var(--bs-text-color);
  }
}

:deep(.spinner-border) {
  --bs-spinner-width: 1.5rem;
  --bs-spinner-height: 1.5rem;
}
</style>