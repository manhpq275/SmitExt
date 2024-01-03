<template>
  <div class="tabs-wrapper">
    <ul class="tabs-header">
      <li
        v-for="tab in tabs"
        class="tabs-item"
        :key="tab.props.title"
        :class="{ selected: selectedTitle === tab.props.title }"
        @click="selectedTitle = tab.props.title"
      >
        <span :class="tab.props.iconClass"></span>
        <span>{{ tab.props.title }}</span>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
  
<script>
import { useSlots, ref, provide } from "vue";

export default {
  name: "SmitTabs",
  setup() {
    const slots = useSlots();
    const tabs = ref(slots.default());
    const selectedTitle = ref(tabs.value[0].props.title);
    provide("selectedTitle", selectedTitle);

    return { tabs, selectedTitle };
  },
};
</script>
  
<style lang="scss" scoped>
.tabs-header {
  display: flex;
  height: 40px;
  padding: 0 2px;
  border-radius: 5px;
  align-items: center;
  border: 1px solid #d8dada;
  color: var(--bs-text-color);
  background: var(--bs-bg-switch-group);

  .tabs-item {
    width: 100%;
    height: 36px;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--bs-subtitle);
    &.selected {
      background: var(--bs-btn-switch-active);
      font-family: Medium;
      box-shadow: var(--bs-box-shadow);
      color: var(--bs-text-color);
    }
  }
}
</style>