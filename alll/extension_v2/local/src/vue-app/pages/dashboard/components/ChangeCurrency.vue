<template>
  <div class="currency-container">
    <span class="label">{{ $t("currency") }}</span>
    <div
      class="currency-value"
      @click="dropdownActive = true"
      v-click-outside="{
        handler: function () {
          dropdownActive = false;
        },
      }"
    >
      <span>{{ displayText }}</span>
      <img src="@images/icons/arrow-dropdown.svg" alt="" />
    </div>
    <ul class="currency-dropdown" :class="{ active: dropdownActive }">
      <template v-for="item in items" :key="item.text">
        <li
          class="currency-item"
          :class="{
            'flex-center': !item.symbol,
            'selected': item.text === displayText,
            'selected-flag': item.text === displayText,
          }"
          @click="$emit('onChangeCurrency', item.value)"
        >
          <span class="currency-text">{{ item.text }}</span>
          <span v-if="item.symbol" class="symbol">({{ item.symbol }})</span>
        </li>
      </template>
    </ul>
  </div>
</template>
  
<script>
export default {
  name: "ChangeCurrency",
  props: {
    items: Array,
    selectedCurrency: String,
  },
  emits: ["onChangeCurrency"],
  data() {
    return { dropdownActive: false };
  },
  computed: {
    displayText() {
      return (
        this.items.find((item) => item.value === this.selectedCurrency)?.text ||
        ""
      );
    },
  },
  mounted() {
    this.onHoverItem();
  },
  methods: {
    onHoverItem() {
      const listCurrency = document.querySelectorAll(".currency-item");
      listCurrency.forEach((item) => {
        item.addEventListener("mouseover", handleMouseOver);
        item.addEventListener("mouseout", handleMouseOut);
      });

      function handleMouseOver(event) {
        listCurrency.forEach((item) => item.classList.remove("selected"));
        event.target.classList.add("selected");
      }
      function handleMouseOut() {
        listCurrency.forEach((item) => {
          item.classList.remove("selected");
          if (item.classList.contains("selected-flag"))
            item.classList.add("selected");
        });
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
.currency-container {
  height: 100%;
  display: flex;
  border-radius: 3px;
  align-items: center;
  font-family: Medium;
  position: relative;
  border: 1px solid #fff;
  justify-content: space-between;
  background-color: var(--bs-background-btn);

  .label {
    padding: 0 10px;
    margin-right: 10px;
    pointer-events: none;
    color: var(--bs-text-color);
  }

  .currency-value {
    width: 70px;
    height: 100%;
    display: flex;
    padding: 0 10px;
    align-items: center;
    background: #fff;
    justify-content: space-between;
    cursor: pointer;

    img {
      width: 13px;
    }
  }
}

.currency-dropdown {
  right: 0;
  top: 100%;
  padding: 0;
  width: 80px;
  z-index: 100;
  padding: 3px;
  display: none;
  margin-top: 3px;
  position: absolute;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);

  &.active {
    display: block;
  }

  .currency-item {
    display: flex;
    padding: 5px 10px;
    border-radius: 3px;
    font-family: "Reg";
    justify-content: space-between;
    cursor: pointer;

    &:hover,
    &.selected {
      color: #fff;
      background: var(--bs-text-color);
    }
  }

  .flex-center {
    justify-content: center;
  }
}

::-webkit-scrollbar {
  width: 4px;
  height: 8px;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: var(--bs-scroll-normal);
}
</style>