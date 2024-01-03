<template>
  <div>
    <div class="modal" aria-hidden="true" :id="modalId" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header" v-if="title">
            <div class="modal-title">{{ title }}</div>
            <slot name="modal-header"></slot>
          </div>
          <div class="modal-body">
            <slot name="modal-body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="modal-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showHeader: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    modalId: {
      type: String,
      default: "modal-ad",
    },
    isShowModal:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isShowConfirmModal: false,
    };
  },
  computed: {},
  methods: {
    showModalConfirm() {
      const modal = new bootstrap.Modal("#infoModal");
      // console.log("modal = ", this.$refs.infoModal, modal)
      modal.show();
    },
  },
  watch: {
    modalId(newVal) {
      console.log("modalId = ", newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal{
  --bs-modal-zindex: 1051 !important;
  cursor: default;
}
.modal-backdrop{
  --bs-backdrop-zindex: 100 !important;
}
.modal-dialog {
  width: 350px;
}
.modal-header {
  border-bottom: unset;
  font-size: 15px;
  font-family: Bold;
  padding-bottom: 0px;
  color: #000;
}
.modal-content {
  border-radius: 10px;
  background: #fff;
  min-width: 300px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
}
.modal-footer {
  border-top: unset;
  padding-top: unset;
  display: flex;
  justify-content: center;
}
:deep(.modal-btn) {
  border-radius: 6px;
  --bs-btn-disabled-bg: var(--bs-text-color);
  --bs-btn-disabled-color: #fff;
  --bs-btn-disabled-opacity: 0.3;
  font-size: 14px !important;
  &:hover {
    color: #fff;
    background-color: var(--bs-wrapper);
    opacity: 0.8;
    transition: 0.2s all;
  }
}
</style>