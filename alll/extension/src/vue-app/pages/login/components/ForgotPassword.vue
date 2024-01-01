<template>
  <Modal :title="$t('forget-password')" modalId="forgot-password">
    <template v-slot:modal-body>
      <form v-if="step === 1" ref="send-code" @submit.prevent="sendFBCode">
        <smit-input
          iconClass="no-icon"
          v-model="emailInput"
          :placeholder="$t('enter-email')"
          :errorMsg="$v.emailInput.$errors[0]?.$message"
        />
        <button class="btn modal-btn" type="submit">
          {{ $t("title.confirm") }}
        </button>
      </form>
      <form v-else ref="verify-code" @submit.prevent="verifyFBCode">
        <div>
          <smit-input
            iconClass="no-icon"
            v-model="verifyCode"
            :placeholder="$t('enter-code')"
            :errorMsg="$v1.verifyCode.$errors[0]?.$message"
          />
        </div>
        <button class="btn modal-btn" type="submit">
          {{ $t("title.confirm") }}
        </button>
      </form>
      <button
        id="hide-modal-btn"
        style="display: none"
        data-bs-dismiss="modal"
      ></button>
    </template>
  </Modal>
</template>

<script>
import "vue-toast-notification/dist/theme-sugar.css";

import { computed, ref } from "vue";
import { useI18n } from "vue3-i18n";
import Modal from "@components/Modal.vue";
import { useToast } from "vue-toast-notification";
import { AuthRepository } from "@data/repositories/AuthRepository";
import { useStore } from "vuex";
import { email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { required$ } from "@utils/validators";

export default {
  components: {
    Modal,
  },
  setup() {
    const step = ref(1);
    const i18n = useI18n();
    const $toast = useToast();
    const store = useStore();
    let emailInput = ref("");
    let verifyCode = ref("");

    const emailRules = computed(() => ({
      emailInput: { required$, email },
    }));

    const codeRules = computed(() => ({
      verifyCode: { required$ },
    }));

    const $v = useVuelidate(emailRules, { emailInput }, { $scope: true });
    const $v1 = useVuelidate(codeRules, { verifyCode }, { $scope: true });

    const sendFBCode = async () => {
      $v.value.$touch();
      if ($v.value.$invalid) return;

      store.dispatch("showLoading");
      try {
        await AuthRepository.sendFogotPasswordCode({ email: emailInput.value });
        step.value = 2;
        $toast.info("A verification code has been sent to your email, please enter the code to continue.");
      } catch (error) {
        $toast.error(error.message);
      } finally {
        store.dispatch("hideLoading");
      }
    };

    const verifyFBCode = async () => {
      $v1.value.$touch();
      if ($v1.value.$invalid) return;

      store.dispatch("showLoading");
      try {
        await AuthRepository.verifyFogotPasswordCode({
          email: emailInput.value,
          code: verifyCode.value,
        });
        $toast.success("We've sent password to your email!");
        hideModal();
      } catch (error) {
        $toast.error(error.message);
      } finally {
        store.dispatch("hideLoading");
      }
    };

    const hideModal = () => {
      step.value = 1;
      emailInput.value = "";
      verifyCode.value = "";
      $v.value.$reset();
      $v1.value.$reset();

      const hideModalBtn = document.querySelector("#hide-modal-btn");
      hideModalBtn.click();
    };

    return {
      $v,
      $v1,
      step,
      emailInput,
      verifyCode,
      sendFBCode,
      verifyFBCode,
    };
  },
};
</script>

<style lang="scss" scoped>
.description {
  margin-top: 12px;
  font-size: 12px;
  color: #a6a6a6;
}

.btn.modal-btn {
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-family: Bold;
  border-radius: 5px;
  transition: all 0.2s;
  color: var(--bs-text-header);
  background: var(--bs-bg-routerlink);

  &:hover {
    color: var(--bs-text-header);
    background-color: var(--bs-bg-routerlink);
    opacity: 0.8;
    transition: 0.2s all;
  }
}

:deep(.smit-input) {
  padding: 0 10px;
  border-radius: 3px;
  border: 1px solid #e1e1e1;
  .no-icon {
    width: 0;
    height: 0;
    display: none;
  }
}
</style>