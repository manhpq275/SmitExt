<template>
  <div class="comp-wrapper">
    <div class="verify-email-header">
      <div class="verify-email-header__title">{{ $t("verify-email") }}</div>
      <div class="verify-email-header__subtitle">
        {{ $t("title.verify-email-subtitle") }}
      </div>
    </div>

    <form class="verify-email-form" @submit.prevent="verifyEmail">
      <div ref="otpCont" class="verify-email-form__input">
        <input
          type="text"
          class="digit-box"
          v-for="(item, index) in digits"
          :key="index"
          v-model="digits[index]"
          :autofocus="index === 0"
          maxlength="1"
          @keydown="handleKeyDown($event, index)"
        />
      </div>
      <button
        type="submit"
        class="verify-email-btn"
        :disabled="digits.join('').length < 6"
        :class="{ 'verify-email-btn__disable': digits.join('').length < 6 }"
      >
        <span>{{ $t("title.confirm") }}</span>
      </button>
      <div class="resend-code" @click="resendCode">
        {{ $t("resend-code") }}
      </div>
    </form>
  </div>
</template>

<script>
import Language from "@components/Language.vue";
import { useI18n } from "vue3-i18n";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { AuthRepository } from "../../data/repositories/AuthRepository";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useStore } from "vuex";

export default {
  name: "RegisterConfirmEmail",
  components: {
    Language,
  },
  setup() {
    const i18n = useI18n();
    const isLoading = ref(false);
    const verifyCode = ref("");
    const store = useStore();
    const router = useRouter();
    const $toast = useToast();
    let digits = reactive(["", "", "", "", "", ""]);

    const otpCont = ref(null);

    const verifyEmail = async () => {
      const userId = router.options.history.state.data?.id;
      verifyCode.value = digits.join("");
      if (verifyCode.value.length === 6 && userId) {
        try {
          store.dispatch("showLoading");
          await AuthRepository.verifyEmail({
            userId,
            verifyCode: verifyCode.value,
          });
          $toast.success(i18n.t("messages.register-success"));
          router.push({ name: "login" });
        } catch (error) {
          $toast.error(error);
        } finally {
          Object.assign(digits, ["", "", "", "", "", ""]);
          otpCont.value.children[0].focus();
          store.dispatch("hideLoading");
        }
      }
    };
    const handleKeyDown = (event, index) => {
      if (event.key !== "Tab") {
        event.preventDefault();
      }

      if (event.key === "Backspace") {
        digits[index] = null;
        if (index !== 0) {
          otpCont.value.children[index - 1].focus();
        }
        return;
      }
      if (new RegExp("^([0-9])$").test(event.key)) {
        digits[index] = event.key;
        if (index !== 5) {
          otpCont.value.children[index + 1].focus();
        }
      }
    };
    const resendCode = async () => {
      try {
        store.dispatch("showLoading");
        await AuthRepository.sendVerifyEmail({
          email: router.options.history.state.data?.email,
        });
        $toast.success(i18n.t("messages.resend-code-success"));
      } catch (error) {
        $toast.error(error);
      } finally {
        store.dispatch("hideLoading");
      }
    };
    return {
      verifyEmail,
      verifyCode,
      isLoading,
      digits,
      otpCont,
      handleKeyDown,
      resendCode,
    };
  },
};
</script>

<style lang="scss" scoped>
.comp-wrapper {
  .verify-email-header {
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
    }
  }

  .verify-email-btn {
    cursor: pointer;
    margin-top: 15px;
    background: linear-gradient(
      180deg,
      var(--bs-bg-btn-menu1),
      var(--bs-bg-btn-menu2)
    );
    border: 1px solid #fff;
    box-shadow: 2px 22px 24px -10px rgba(0, 0, 0, 0.11);
    border-radius: 11px;
    width: 100%;
    height: 50px;
    font-family: Bold;
    color: #fff;
    transition: all 0.3s;

    &:hover {
      opacity: 0.8;
    }

    &__disable {
      opacity: 0.5 !important;
      cursor: default !important;
    }
  }

  .resend-code {
    margin-top: 10px;
    text-align: center;
    justify-content: center;
    cursor: pointer;
    color: #1b9b48;
  }
}

.verify-email-form {
  margin-top: 30px;

  &__input {
    display: flex;
    margin-bottom: 20px;
  }

  .digit-box {
    flex: 1;
    width: 100%;
    margin: 5px;
    height: 58px;
    padding: 15px;
    font-size: 28px;
    text-align: center;
    border-radius: 3px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid #e1e1e1;
  }

  .digit-box:focus {
    outline: 1px solid black;
  }
}

:deep(.spinner-border) {
  --bs-spinner-width: 1.5rem;
  --bs-spinner-height: 1.5rem;
}
</style>