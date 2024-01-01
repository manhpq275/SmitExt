<template>
  <div class="table-control">
    <div class="pagination-group">
      <div class="row-dropdown">
        <span>{{ $t("title.row") }}</span>
        <select
          class="form-select"
          v-model="pagination.perPage"
          @input="changePerPage"
        >
          <option
            v-for="item in tableRowOption"
            :key="item.value"
            :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="number-page">
        <div class="angle" :class="{ disable: pagination.currentPage == 1 }">
          <span @click="changePage('prev')"> &#8249; </span>
        </div>
        <div class="paging-text">
          {{ pagination.currentPage || 1 }} / {{ pagination.totalPage || 1 }}
        </div>
        <div
          class="angle"
          :class="{ disable: pagination.currentPage == pagination.totalPage }"
        >
          <span @click="changePage('next')"> &#8250; </span>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "SmitTableControl",
  props: {
    pagination: {
      type: Object,
    },
  },
  data() {
    return {
      currencyRate: "usd",
      currencyOption: [
        { text: "USD", value: "usd" },
        { text: "VND", value: "vnd" },
      ],
      tableRowOption: [
        { text: "10", value: 10 },
        { text: "50", value: 50 },
        { text: "100", value: 100 },
        { text: "Max", value: "max" },
      ],
    };
  },
  methods: {
    reloadData() {
      this.$emit("refreshData");
    },
    changePage(direction) {
      this.$emit("changePage", direction);
    },
    changePerPage(v) {
      this.$emit("changePerPage", v.target.value);
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.table-control {
  display: flex;
  font-size: 13px;
  margin-bottom: 15px;
  font-family: Medium;
  align-items: center;
  color: var(--bs-text-color);
  justify-content: flex-end;

  .pagination-group {
    display: flex;
    align-items: center;
  }
}

.pagination-group {
  .row-dropdown,
  .number-page {
    height: 27px;
    display: flex;
    border-radius: 3px;
    white-space: nowrap;
    align-items: center;
    border: 1px solid #fff;
    background-color: var(--bs-background-btn);
    cursor: pointer;
  }

  .row-dropdown {
    margin-right: 10px;
    padding: 5px 0px 5px 5px;
  }

  .number-page {
    .paging-text {
      display: flex;
      width: max-content;
      color: var(--bs-text-role);
    }
    .angle {
      width: 25px;
      height: 25px;
      display: flex;
      font-size: 20px;
      border-radius: 5px;
      padding-bottom: 3px;
      align-items: center;
      transition: all 0.3s;
      justify-content: center;
      color: var(--bs-text-color);
      background: var(--bs-background-btn);
      cursor: pointer;

      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }

    span {
      width: 25px;
      height: 25px;
      display: flex;
      border-radius: 5px;
      padding-bottom: 3px;
      align-items: center;
      transition: all 0.3s;
      justify-content: center;
    }
  }
}

.form-select {
  font-size: 13px;
  height: inherit;
  margin-left: 5px;
  font-family: Medium;
  line-height: initial;
  border-radius: unset;
  min-width: 75px !important;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-right: 10px !important;
  background-color: var(--bs-db-bg-form);
  --bs-border-color: var(--bs-background-color);
  background-position: right 0.3rem center !important;
  --bs-form-select-bg-img: url("@images/arrow-dropdown.svg");
}

.disable {
  background: #a4a4a4;
  cursor: not-allowed !important;

  span {
    pointer-events: none;
  }
}
</style>