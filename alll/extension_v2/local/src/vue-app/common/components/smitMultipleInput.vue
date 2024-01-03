<template>
  <div class="input-area" @click="onSelectArea">
    <div class="chip" v-for="(item, index) in modelValue" :key="index">
      <div class="chip-text">{{ item }}</div>
      <button @click="onRemoveChip(index)">
        <i class="bi bi-x" style="font-size: 15px"></i>
      </button>
    </div>
    <input
      ref="searchInput"
      type="text"
      v-model.trim="dataInput"
      :placeholder="inputPlaceholder"
      @keypress.enter="onChange()"
      @blur="onChange()"
    />
  </div>
</template>

<script>
import { useI18n } from "vue3-i18n";
import { ref, computed } from "vue";
export default {
  name: "SmitMultipleInput",
  props: {
    modelValue: [],
  },
  setup(props, context) {
    const { t } = useI18n();
    const dataInput = ref("");
    const selected = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        context.emit("update:modelValue", value);
      },
    });

    const inputPlaceholder = computed(() => {
      return props.modelValue.length <= 0 ? t("label.add-keyword") : "";
    });

    const searchInput = ref(null);

    const onChange = () => {
      if (dataInput.value && !selected.value.includes(dataInput.value)) {
        selected.value.push(dataInput.value);
      }
      dataInput.value = "";
    };

    const onRemoveChip = (index) => {
      selected.value.splice(index, 1);
    };

    const onSelectArea = () => {
      searchInput?.value.focus();
    };
    return {
      selected,
      dataInput,
      searchInput,
      inputPlaceholder,
      onChange,
      onSelectArea,
      onRemoveChip,
    };
  },
};
</script>

<style lang="scss" scoped>
.input-area {
  height: 100px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  border-radius: 5px;
  background: #fff;
  border: 1px solid rgb(165, 162, 162);
  cursor: text;

  .chip {
    display: flex;
    font-size: 15px;
    margin-right: 5px;
    border-radius: 5px;
    color: #403e3e;
    margin-bottom: 5px;
    align-items: center;
    height: fit-content;
    background: #c8c9cc;
    padding: 2px 3px 2px 7px;

    cursor: default;
    .chip-text {
      margin-right: 3px;
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :deep(.bi-x::before) {
      vertical-align: -0.2em !important;
    }
  }

  input {
    flex: 1 1;
    width: 100%;
    border: none;
    height: 30px;
    min-width: 200px;

    &:focus {
      outline: none;
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 4px;
  cursor: default;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 2px;
  cursor: default;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(201, 201, 201);
  border-radius: 2px;
  cursor: default;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(201, 201, 201);
}

::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: var(--bs-scroll-normal);
  cursor: default;

  &:hover {
    background: var(--bs-wrapper);
  }
}
</style>