<template>
  <smit-modal :open="isOpen">
    <div class="change-name-modal" v-click-outside="close">
      <h6 class="title">Change Account Name</h6>
      <smit-input
        v-model="accountName"
        :placeholder="$t('title.enter-new-name')"
      />
      <div class="save-btn" @click="onSave">
        {{ $t("title.save") }}
      </div>
    </div>
  </smit-modal>
</template>

<script>
import { mapGetters } from "vuex";
import { DashBoardRepository } from "@data/repositories/DashboarRepository";

export default {
  data() {
    return {
      label: {
        btnText: this.$t("title.save"),
        title: this.$t("title.rename-ad-account"),
      },
      isOpen: false,
      accountId: "",
      accountName: "",
      defaultAccountName: "",
    };
  },
  computed: {
    ...mapGetters(["tokenAEEI"]),
  },
  methods: {
    // [API]
    async changeAccountName() {
      try {
        if (this.defaultAccountName === this.accountName)
          return (this.isOpen = false);
        const params = {
          method: "post",
          locale: "en_US",
          id: this.accountId,
          name: this.accountName,
          access_token: this.tokenAEEI,
        };

        await DashBoardRepository.changeAdAccountName(params);
        this.$toast.success(this.$t("messages.change-account-name-success"));
        this.$emit("changeNameSuccess", this.accountName, this.accountId);
        this.isOpen = false;
      } catch (error) {
        this.$toast.error(this.$t("messages.not-update-account"));
      }
    },
    // [EVENT]
    open({ id, name }) {
      this.accountId = id;
      this.accountName = name;
      this.defaultAccountName = name;
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    onSave() {
      this.changeAccountName();
    },
  },
};
</script>

<style lang="scss" scoped>
.change-name-modal {
  width: 350px;
  display: flex;
  border-radius: 5px;
  background: #fff;
  flex-direction: column;
  justify-content: center;
  padding: 10px 15px 5px 15px;

  .title {
    font-size: 16px;
    font-family: "Bold";
    margin-bottom: 20px;
  }

  :deep(.smit-input) {
    border: 1px solid #e1e1e1;
  }
}

.save-btn {
  width: 100%;
  height: 38px;
  display: flex;
  color: #fff;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 10px;
  background: var(--bs-text-color);
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: var(--bs-wrapper);
  }
}
</style>