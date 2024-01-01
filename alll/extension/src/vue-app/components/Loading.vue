<template>
  <div v-if="loading" class="loading-overlay">
    <div class="donut"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
.loading-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  .donut {
    position: fixed;
    width: 3rem;
    height: 3rem;
    margin: 3rem;
    border-radius: 50%;
    border: 0.4rem solid rgba(black, 0.1);
    border-top-color: #2a3042;
    animation: 1.5s spin infinite linear;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>