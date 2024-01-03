<template>
  <div class="smit-loading">
    <div class="back-drop"></div>
    <div class="loading-container">
      <div class="spinner-border text-success"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "smit-loading",
  props: {
    modelValue: String,
    errorMsg: String,
    placeholder: String,
    iconClass: String,
    type: {
      type: String,
      default: "text",
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.smit-loading {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: fixed;

  .back-drop {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }

  .loading-container {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);

    .spinner-border {
      width: 4rem;
      height: 4rem;
    }
  }
}
</style>