<template>
  <smit-modal :open="isOpen">
    <div class="status-modal" v-click-outside="close">
      <div class="list-status">
        <div class="list-status__item" v-for="item in statusAccountFilter" :key="item.name">
          <label class="form-check-label" :for="item.name">
            <i class="bi bi-circle-fill status" :style="setColorStatus(item.status)"></i>
            <div>
              <div class="status-title">{{ item.name }}</div>
              <div class="number-of-status">{{ $t('title.number-of-account', { num: item.total }) }}</div>
            </div>
          </label>
          <input class="form-check-input" type="checkbox" v-model="item.checked" :id="item.name" />
        </div>
      </div>
      <div class="save-btn" @click="onSave">
        {{ $t('title.save') }}
      </div>
    </div>
  </smit-modal>
</template>

<script>
import { setColorStatus } from "@pages/helper";

export default {
  props: {
    listFbAccount: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      isOpen: false,
      setColorStatus,
    }
  },
  computed: {
    statusAccountFilter() {
      const statusNameArr = ["activity", "disable", "need-to-pay", "due-date", "other"]
      return statusNameArr.map((el, index) => {
        const total = this.listFbAccount.filter(item => index == 4 ? item.status >= (5) : item.status == (index + 1)).length;

        return {
          status: index + 1,
          name: this.$t(el),
          total: total,
          checked: true,
        }
      })
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    onSave() {
      const data = this.statusAccountFilter.filter(el => el.checked == true).map(el => el.status);
      this.$emit("onSave", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.status-modal {
  width: 250px;
  display: flex;
  padding: 5px 15px;
  border-radius: 5px;
  align-items: center;
  background: #fff;
  flex-direction: column;
  justify-content: center;
}

.list-status {
  width: 100%;

  &__item {
    display: flex;
    padding: 5px 0;
    margin-bottom: 5px;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #dee2e6;

    .form-check-label {
      display: flex;
      align-items: center;

      .status {
        margin-right: 16px;
        font-size: 12px;
      }

      .status-title {
        font-weight: bold;
      }

      .number-of-status {
        color: rgb(120, 136, 155);
      }
    }

    .form-check-input:checked {
      background-color: var(--bs-bg-btn-menu1);
      border-color: var(--bs-bg-btn-menu1);
    }

    .form-check-input:focus {
      border-color: var(--bs-bg-btn-menu1);
      box-shadow: unset
    }
  }
}

.save-btn {
  width: 100%;
  height: 38px;
  display: flex;
  margin: 10px 0;
  color: #fff;
  border-radius: 5px;
  align-items: center;
  background: var(--bs-text-color);
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: var(--bs-wrapper);
  }
}
</style>