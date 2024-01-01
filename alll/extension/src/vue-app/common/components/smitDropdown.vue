<template>
  <div class="smit-form-group-items" :class="{ 'smit-error': errorMsg }">
    <div class="smit-input">
      <div class="" data-bs-toggle="dropdown">{{ modelValue.text }}</div>
      <ul class="dropdown-menu">
        <template v-for="(item, index) in items" :key="index">
          <li @click="$emit('update:modelValue', item)">
            {{ item.text }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "smit-dropdown",
  props: {
    items: Array,
    errorMsg: String,
    iconClass: String,
    placeholder: String,
    modelValue: String || Object,
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.smit-form-group-items {
  height: 60px;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;

  &__image {
    width: 20px;
    flex-shrink: 0;
  }

  .smit-input {
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;

    &__icon {
      width: 20px;
      margin-right: 5px;
      text-align: center;
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      font-size: 14px;
      background: transparent;

      ::placeholder {
        color: #a6a6a6;
      }
    }
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

  .error-message {
    height: 20px;
    color: red;
    font-size: 13px;
  }
}

.smit-error {
  .smit-input {
    border-color: red;
  }
}
</style>