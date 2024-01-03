<template>
  <div class="smit-tab" v-show="selectedTitle === title">
    <slot></slot>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "SmitTab",
  props: ["title", "iconClass"],
  setup() {
    const selectedTitle = inject("selectedTitle");
    return { selectedTitle };
  },
};
</script>

<style></style>