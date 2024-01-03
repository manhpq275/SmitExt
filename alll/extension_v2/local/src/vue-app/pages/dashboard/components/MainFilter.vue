<template>
  <div class="task-bar">
    <div class="tab-area">
      <div
        class="tab-item"
        :class="{ active: activeTab === 'account' }"
        @click="activeTab = 'account'"
      >
        {{ $t("title.account") }}
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'bm' }"
        @click="activeTab = 'bm'"
      >
        {{ $t("title.bm") }}
      </div>
    </div>

    <div class="filter-area">
      <div class="filter-area__item">
        <div class="search-input">
          <input
            type="text"
            ref="inputId"
            placeholder="Enter “Name” or “ID”"
            @keyup.enter="onSearchAccount"
          />
          <i class="bi bi-search" @click="onSearchAccount"></i>
        </div>
      </div>
      <div class="filter-area__item">
        <button class="export-txt" @click="onExportTxt">
          <span><i class="bi bi-download"></i></span>
          {{ $t("title.export-txt") }}
        </button>
      </div>
      <div class="filter-area__item">
        <change-currency
          :items="currencyList"
          :selectedCurrency="selectedCurrency"
          @onChangeCurrency="onChangeCurrency"
        />
      </div>
      <div class="filter-area__item">
        <div class="refresh-btn" @click="onReloadData">
          <i class="bi bi-arrow-clockwise"></i>
          <span>{{ $t("title.refresh-data") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { currencyList } from "../mockData";
import ChangeCurrency from "./ChangeCurrency.vue";

export default {
  components: {
    ChangeCurrency,
  },
  inject: ["switchAccount"],
  computed: {
    ...mapGetters(["currency"]),
  },
  data() {
    return {
      activeTab: "account",
      selectedCurrency: "",
      currencyList: currencyList,
    };
  },
  watch: {
    activeTab(newVal) {
      this.switchAccount(newVal);
      this.selectedCurrency = "";
    },
  },
  methods: {
    // Event
    onReloadData() {
      this.emitter.emit("onRefreshData");
    },
    onExportTxt() {
      this.emitter.emit("onExportTxt");
    },
    onSearchAccount() {
      const searchBoxVal = this.$refs.inputId.value;
      this.emitter.emit("onSearchAccount", searchBoxVal.toLowerCase());
    },
    onChangeCurrency(val) {
      this.selectedCurrency = val;
      this.emitter.emit("onChangeCurrency", val);
    },
    //
  },
};
</script>
<style lang="scss" scoped>
.task-bar {
  height: 34px;
  display: flex;
  margin: 10px 0;
  align-items: center;
  justify-content: space-between;

  .tab-area {
    width: 166px;
    padding: 3px;
    display: flex;
    border-radius: 5px;
    background: var(--bs-bg-switch-group);
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);

    .tab-item {
      flex: 1;
      padding: 3px;
      font-weight: bold;
      text-align: center;
      border-radius: 4px;
      color: #a4a4a4;
      font-family: "Bold", serif;
      cursor: pointer;

      &.active {
        color: var(--bs-text-color);
        background-color: var(--bs-btn-switch-active);
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);
        border-color: var(--bs-btn-active-border-color);
      }
    }
  }

  .filter-area {
    height: 100%;
    display: flex;
    align-items: center;

    &__item {
      height: 100%;

      &:not(:last-child) {
        margin-right: 10px;
      }

      .btn {
        height: 100%;
      }
    }
  }

  .export-txt,
  .refresh-btn {
    height: 100%;
    display: flex;
    padding: 0 10px;
    border-radius: 3px;
    align-items: center;
    font-family: "Medium", serif;
    color: var(--bs-text-color);
    border: 1px solid #fff;
    background-color: var(--bs-background-btn);
    cursor: pointer;

    i {
      margin-right: 5px;
    }
  }

  .search-input {
    height: 100%;
    padding: 0 10px;
    position: relative;
    border-radius: 3px;
    background: #fff;
    border: 1px solid #fff;
    cursor: pointer;

    input {
      width: 150px;
      height: 100%;
      border: none;
      outline: none;
      padding-right: 10px;

      &::placeholder {
        font-size: 13px;
      }
    }
  }
}
</style>