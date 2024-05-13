<template>
  <div class="table-container">
    <div ref="smitTable" class="table-wrapper">
      <table class="table table-bordered table-fixed">
        <thead>
          <tr>
            <th v-for="item in headers" :key="item.key" :style="{ textAlign: item.position }">
              <span class="header-text" :style="{ width: item.width }">
                {{ item.value }}
              </span>
              <span v-if="item.sort" class="sort-icon" @click="onSortCol(item)"></span>
              <i v-if="item.icon" :class="item.icon" @click="onClickHeaderIcon(item)"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in contents" :key="index" @click="onClickRow(item)">
            <slot name="items" v-bind="item">
              <td v-for="{ key, position, render } in headers" :key="key" :style="{ textAlign: position }">
                <span v-if="render" v-html="render(item)"></span>
                <div v-else>{{ item[key] }}</div>
              </td>
            </slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "SmitTable",
  props: ["headers", "contents", "customHeader"],
  data() {
    return {
      sortSection: {},
    };
  },
  methods: {
    // [Event]
    onClickRow(item) {
      this.$emit("onClickRow", item);
    },
    onSortCol(item) {
      const sortDirection = this.sortSection[item.key];
      if (sortDirection && sortDirection === "asc") {
        this.sortSection[item.key] = "desc";
      } else if (sortDirection && sortDirection === "desc") {
        this.sortSection[item.key] = "asc";
      } else {
        this.sortSection[item.key] = "asc";
      }
      this.$emit("onSortCol", item, this.sortSection[item.key]);
    },
    onClickHeaderIcon(item) {
      this.$emit("onClickHeaderIcon", item);
    }
    // [API]
  },
};
</script>
    
<style lang="scss" scoped>
.table-container {
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 15px;
}

.table-wrapper {
  height: 564px;
  overflow: auto;
  background-color: var(--bs-background-color);

  table {
    margin-bottom: unset;
    border-color: rgba(230, 232, 236, 0.5) !important;

    td {
      padding: 10px 20px !important;
    }

    thead {
      tr {
        z-index: 10;
        border-width: 0;
        position: relative;
      }

      th {
        top: 0px;
        position: sticky;
        font-family: Bold;
        text-align: center;
        white-space: nowrap;
        color: var(--bs-text-color);
        padding: 10px 20px !important;
        background-color: var(--bs-db-header);

        span {
          display: inline-block;
        }
      }
    }

    tbody {
      tr {
        vertical-align: middle;

        td {
          border: 1px solid var(--bs-background-body-table);

          &:nth-child(2) {
            display: flex;
            max-width: 250px;
            font-family: Bold;
            align-items: center;
            justify-content: space-between;
          }
        }
      }

      tr:nth-child(2n) {
        background: hsla(0, 0%, 100%, 0.51);
      }
    }
  }

  .sort-icon {
    top: 50%;
    right: 5px;
    position: absolute;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background: var(--bs-scroll-normal);

  &:hover {
    background: var(--bs-wrapper);
  }

  border-radius: 8px;
}
</style>