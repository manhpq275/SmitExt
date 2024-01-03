<template>
  <div class="comp-wrapper">
    <div class="page-header">
      <div class="page-header__title">{{ $t("title.super-target") }}</div>
      <!-- <div class="page-header__subtitle">{{ $t("title.require-login") }}</div> -->
    </div>
    <div class="super-target-area">
      <div class="search-area">
        <smit-multiple-input v-model="listKeyWord" />
      </div>

      <div class="action-area">
        <div
          class="list-target-saved"
          v-click-outside="{
            handler: function () {
              isShowListSaved = false;
            },
          }"
        >
          <div class="saved-btn" @click="isShowListSaved = !isShowListSaved">
            <span>Saved</span>
            <i class="bi bi-bookmark-fill"></i>
            <div class="results-save-amount">{{ dataSaved.length }}</div>
          </div>

          <div class="list-target" v-show="isShowListSaved">
            <div class="list-target__header">
              <div class="title">Saved list</div>
              <div class="total-items">{{ dataSaved.length }}</div>
            </div>
            <hr />
            <div class="list-target__container">
              <div
                class="target-item"
                v-for="(item, index) in dataSaved"
                :key="index"
              >
                <div>{{ item.name }}</div>
                <button @click.stop="onClear(item, index)">
                  <i style="font-size: 15px" class="bi bi-x"></i>
                </button>
              </div>
              <div class="no-results" v-show="dataSaved.length == 0">
                No Result Saved
              </div>
            </div>
            <div class="button-group" v-show="dataSaved.length > 0">
              <button
                type="button"
                class="btn btn-light"
                @click.stop="onClearAll()"
              >
                Clear
              </button>
              <button
                type="button"
                class="btn btn-success btn-clear"
                @click.stop="onCopyAll()"
              >
                Copy all
              </button>
            </div>
          </div>
        </div>

        <div class="search-container">
          <div class="select-country">
            <vs-select
              color="success"
              class="selectExample"
              v-model="countrySelect"
            >
              <vs-select-item
                v-for="(item, index) in locales"
                :key="index"
                :text="item.text"
                :modelValue="item.value"
              />
            </vs-select>
          </div>
          <button
            class="btn btn-success search"
            :disabled="listKeyWord.length <= 0"
            @click="submitSearch"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>

      <div class="table-area">
        <smit-table :headers="tableInfo.headers" :contents="tableInfo.contents">
          <template #items="item">
            <td class="text-center">{{ item.no }}</td>
            <td class="text-left">
              <span class="target-name">{{ item.name }}</span>
            </td>
            <td class="text-center">{{ item.audience_size }}</td>
            <td class="text-center group-button">
              <button @click="onCopy(item)">
                <i class="bi bi-files"></i>
              </button>
              <button @click="onAdd(item)">
                <i v-if="item.check" class="bi bi-check"></i>
                <i v-else class="bi bi-plus"></i>
              </button>
            </td>
          </template>
        </smit-table>
      </div>
    </div>
    <smit-loading v-show="tableInfo.loading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { makeSuperTargetTableData } from "./helpers";
import { getSuperTargetTableHeaders } from "./mockData";
import { SupperTargetRepository } from "@data/repositories/SupperTargetRepository";

export default {
  name: "SuperTarget",
  data() {
    return {
      listKeyWord: [],
      dataSaved: [],
      tableInfo: {
        loading: false,
        headers: [],
        contents: [],
        contentSelected: [],
      },
      countrySelect: "vi_VN",
      isShowListSaved: false,
    };
  },
  computed: {
    ...mapGetters(["tokenAEEB", "adAccountID", "locales"]),
  },
  mounted() {
    this.tableInfo.headers = getSuperTargetTableHeaders(this.$t);
  },
  methods: {
    // [API]
    async submitSearch() {
      try {
        const results = [];
        this.tableInfo.loading = true;

        for (const target of this.listKeyWord) {
          const params = {
            limit: 1000,
            q: target,
            locale: this.countrySelect,
            access_token: this.tokenAEEB,
            adAccountId: this.adAccountID,
          };
          const { data } = await SupperTargetRepository.getTargets(params);
          results.push(...data.data);
        }
        const tableContents = makeSuperTargetTableData(results, this.dataSaved);
        this.tableInfo.contents = tableContents;
        this.tableInfo.loading = false;
      } catch (error) {
        this.$toast.error("Something went wrong, please try again later!");
        this.tableInfo.loading = false;
      }
    },
    // [Event]
    onCopy(item) {
      navigator.clipboard.writeText(item.name);
      this.$toast.success("Copied to clipboard!");
    },
    onAdd(targetItem) {
      const { contents } = this.tableInfo;
      const isExist = this.dataSaved.find((el) => el.id === targetItem.id);
      const selectItem = contents.find((item) => item.id === targetItem.id);
      selectItem.check = true;

      if (!isExist) {
        this.dataSaved.push(selectItem);
        this.$toast.success(`${targetItem.name} was added.`);
      }
    },
    onClear(item, index) {
      this.dataSaved.splice(index, 1);
      this.dataTables[item?.indexList].check = false;
    },
    onClearAll() {
      const { contents } = this.tableInfo;

      this.dataSaved.forEach((targetItem) => {
        const selectItem = contents.find((item) => item.id === targetItem.id);
        if (selectItem) selectItem.check = false;
      });

      this.dataSaved = [];
    },
    onCopyAll() {
      const resultName = this.dataSaved.map((item) => item.name);
      navigator.clipboard.writeText(resultName.join(", "));
      this.$toast.success("Copied to clipboard!");
    },
  },
};
</script>

<style  lang="scss" scoped>
.comp-wrapper {
  .page-header {
    &__title,
    &__subtitle {
      line-height: 1.2;
    }

    &__title {
      font-size: 28px;
      font-family: Bold;
      color: var(--bs-bg-routerlink);
    }

    &__subtitle {
      font-size: 16px;
      color: var(--bs-subtitle);
      margin-top: 5px;
    }
  }
  .super-target-area {
    height: 100%;
    display: flex;
    margin-top: 20px;
    overflow: hidden;
    flex-direction: column;

    .action-area {
      display: flex;
      margin-top: 15px;
      justify-content: space-between;
    }

    .list-target-saved {
      position: relative;
      .saved-btn {
        padding: 10px;
        border-radius: 5px;
        height: fit-content;
        background: var(--bs-wrapper);
        color: white !important;
        cursor: pointer;

        i {
          margin-left: 5px;
          color: white !important;
        }
      }

      .list-target {
        top: 45px;
        width: 250px;
        padding: 10px;
        z-index: 1000;
        color: #000;
        position: absolute;
        border-radius: 5px;
        background: #fff;
        border: 1px solid rgb(204, 204, 204);
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);

        &__header {
          display: flex;
          font-size: 15px;
          font-weight: 700;
          justify-content: space-between;
          .total-items {
            color: var(--bs-wrapper);
          }
        }

        &__container {
          display: flex;
          height: 150px;
          padding: 0 5px;
          overflow: overlay;
          border-radius: 3px;
          flex-direction: column;
          background: var(--bs-border-color-translucent);
          .target-item {
            display: flex;
            padding: 5px 0;
            align-items: center;
            justify-content: space-between;
            div {
              width: 100%;
              overflow: hidden;
              padding-left: 5px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .no-results {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .button-group {
          display: flex;
          margin-top: 10px;
          justify-content: space-between;
        }
      }

      .results-save-amount {
        position: absolute;
        background: red;
        padding: 3px;
        border-radius: 50%;
        color: white;
        font-size: 11px;
        height: 20px;
        width: 20px;
        right: -10px;
        top: -10px;
        text-align: center;
      }
    }

    .search-container {
      display: flex;
      .search {
        padding: 5px 15px;
        background: var(--bs-wrapper);
        border-radius: 5px;
        margin-left: 5px;
        border: none;
        i {
          color: white !important;
        }
      }
      .select-country {
        width: 150px;
        background: #fff;

        :deep(.con-select) {
          width: 100%;
          height: 100%;
          .input-select-con {
            height: 100%;
            input {
              height: 100%;
            }
          }
        }
      }
    }
    .table-area {
      height: 100%;
      overflow: hidden;
      margin-top: 15px;

      .target-name {
        width: 270px;
        display: block;
        overflow: hidden;
        font-weight: bold;
        text-overflow: ellipsis;
        color: var(--bs-text-color);
      }
    }
  }
  .group-button {
    display: flex;
    justify-content: center;

    button {
      width: 30px;
      height: 30px;
      background: #fff;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);

      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        font-size: 20px;
      }
      &:hover {
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
      }

      i {
        color: var(--bs-text-color) !important;
      }
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