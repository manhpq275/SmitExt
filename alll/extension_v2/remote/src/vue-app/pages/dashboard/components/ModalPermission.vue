<template>
  <smit-modal :open="isOpen">
    <div class="permission-modal" v-click-outside="close">
      <div class="tab-area">
        <div
          class="tab-item"
          :class="{ active: activedTab === 'add' }"
          @click="activedTab = 'add'"
        >
          {{ label.addAccount }}
        </div>
        <div
          class="tab-item"
          :class="{ active: activedTab === 'delete' }"
          @click="activedTab = 'delete'"
        >
          {{ label.deleteAccount }}
        </div>
      </div>
      <div class="add-account" v-if="activedTab === 'add'">
        <div class="add-account-label">{{ $t("title.fill-ad-id") }}</div>
        <textarea
          class="form-control modal-textarea"
          rows="4"
          type="text"
          v-model="addAccountTextField"
          :placeholder="$t('title.place-holder-permission')"
        ></textarea>
        <div class="check-permission-type">
          <div class="add-account-label">
            {{ $t("title.account-permission") }}
          </div>
          <div class="permission-radio">
            <div v-for="item in permissionTypeList" :key="item.key">
              <input
                type="radio"
                :id="item.key"
                :checked="permissionCheck == item.value"
                @change="permissionCheck = item.value"
              />
              <label class="form-check-label" :for="item.key">
                {{ $t(item.key) }}
              </label>
            </div>
          </div>
        </div>
        <button
          class="btn modal-btn save-add-btn"
          :disabled="!addAccountTextField"
          @click="onAddAccount"
        >
          {{ $t("title.confirm") }}
        </button>
      </div>
      <div class="delete-account" v-else>
        <div class="account-list">
          <div class="user" v-for="(item, index) in listUser" :key="index">
            <img alt="image" :src="getAccountImgLink(item.id)" />
            <div class="user__name">
              <div class="title">{{ item.name }}</div>
              <div class="sub-text">{{ item.id }}</div>
              <div class="sub-text">
                {{ item.tasks[item.tasks.length - 1] }}
              </div>
            </div>
            <i class="bi bi-trash" @click="onRemoveAcc(item.id)"></i>
          </div>
        </div>
        <div class="delete-account-container">
          <div class="role-del-btn" @click="onRemoveAccExceptMe">
            <i class="bi bi-trash-fill"></i> {{ $t("title.delete-except-you") }}
          </div>
        </div>
      </div>
    </div>
  </smit-modal>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccountImgLink } from "../helper";
import { getSingleAdRequestFields } from "../mockData";
import { PERMISSION_TYPE_LIST } from "@constant/dashBoard";
import { DashBoardRepository } from "@vue-app/data/repositories/DashboarRepository";

export default {
  data() {
    return {
      label: {
        btnText: this.$t("title.save"),
        addAccount: this.$t("title.add-ad-account"),
        deleteAccount: this.$t("title.delete-ad-account"),
        title: this.$t("title.change-account-permissions"),
      },
      isOpen: false,
      activedTab: "add",
      addAccountTextField: "",
      permissionCheck: 1001,
      permissionTypeList: PERMISSION_TYPE_LIST,

      listUser: [],
      accMainId: "",
      getAccountImgLink: getAccountImgLink,
    };
  },
  computed: {
    ...mapGetters(["tokenAEEI", "userID"]),
  },
  methods: {
    // [API]
    async getAds() {
      try {
        const fields = getSingleAdRequestFields(this.userID);

        const params = {
          summary: 1,
          locale: "en_US",
          id: this.accMainId,
          fields: fields.join(","),
          access_token: this.tokenAEEI,
        };
        const { data } = await DashBoardRepository.getAdsAccountById(params);
        this.listUser = data.users.data;
      } catch (error) {}
    },
    // [Event]
    async onAddAccount() {
      const ARR = this.addAccountTextField
        .split(",")
        .filter((el) => el.trim() != "")
        .map((el) => el.trim());
      const idArr = [...new Set(ARR)];

      for (const uid of idArr) {
        try {
          const params = {
            uid: uid,
            method: "POST",
            locale: "en_US",
            id: this.accMainId,
            role: this.permissionCheck,
            access_token: this.tokenAEEI,
          };

          await DashBoardRepository.addAdAccount(params);
          this.$toast.success(this.$t("messages.change-account-name-success"));
          this.close();
        } catch (error) {
          this.$toast.error(error.message);
        }
      }
    },
    async onRemoveAcc(id) {
      try {
        const params = {
          id,
          method: "DELETE",
          locale: "en_US",
          mainId: this.accMainId,
          access_token: this.tokenAEEI,
          adaccount_id: this.accMainId,
        };
        await DashBoardRepository.removeAdAccount(params);
        this.$toast.success(this.$t("messages.delete-success"));
        this.listUser = this.listUser.filter((item) => item.id !== id);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async onRemoveAccExceptMe() {
      try {
        for (const user of this.listUser) {
          if (user.id === this.userID) break;
          const params = {
            id: user.id,
            method: "DELETE",
            locale: "en_US",
            mainId: this.accMainId,
            access_token: this.tokenAEEI,
            adaccount_id: this.accMainId,
          };
          await DashBoardRepository.removeAdAccount(params);
        }

        this.listUser = this.listUser.filter((item) => item.id === this.userID);
        this.$toast.success(this.$t("messages.delete-success"));
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
    async open({ id }) {
      this.accMainId = id;
      this.isOpen = true;
      await this.getAds();
    },
    close() {
      this.isOpen = false;
      this.activedTab = "add";
    },
  },
};
</script>

<style lang="scss" scoped>
.permission-modal {
  width: 350px;
  height: 450px;
  display: flex;
  border-radius: 5px;
  padding: 10px 15px;
  background: #fff;
  flex-direction: column;

  .tab-area {
    width: 100%;
    padding: 3px;
    display: flex;
    border-radius: 5px;
    background: var(--bs-bg-switch-group);

    .tab-item {
      flex: 1;
      padding: 5px;
      font-weight: bold;
      text-align: center;
      border-radius: 4px;
      color: #a4a4a4;
      font-family: "Bold";
      cursor: pointer;

      &.active {
        color: var(--bs-text-color);
        background-color: var(--bs-btn-switch-active);
        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.11);
        border-color: var(--bs-btn-active-border-color);
      }
    }
  }

  .add-account,
  .delete-account {
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    height: calc(100% - 57px);

    .add-account-label {
      font-size: 13px;
      margin-bottom: 5px;
      font-weight: bold;
    }
  }

  .add-account {
    .check-permission-type {
      flex: 1;
      margin-top: 15px;

      .permission-radio > div {
        display: flex;
        padding-left: 10px;
        border-radius: 5px;
        align-items: center;
        border: 1px solid #ccc;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        &:hover {
          border: 1px solid #888;
        }
        .form-check-label {
          width: 100%;
          padding: 5px 10px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }

    .save-add-btn {
      height: 40px;
      width: 100%;
      border: none;
      outline: none;
      font-family: Bold;
      border-radius: 5px;
      transition: all 0.3s;
      color: var(--bs-text-header);
      background: var(--bs-bg-routerlink);

      &:hover {
        opacity: 0.8;
        transition: 0.3s all;
        color: var(--bs-text-header);
        background-color: var(--bs-bg-routerlink);
      }
    }
  }

  .delete-account {
    .account-list {
      flex: 1;
      overflow: auto;
      max-height: 400px;
    }
    .user {
      display: flex;
      padding: 10px;
      position: relative;
      border-radius: 10px;
      border: 1px solid var(--loading-btn);

      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
        border-radius: 50%;
        border: 1px solid var(--bs-text-color);
      }

      &__name {
        flex: 1;
      }

      i {
        top: 50%;
        right: 10px;
        position: absolute;
        transform: translateY(-50%);

        cursor: pointer;

        &:hover {
          &::before {
            color: red;
          }
        }
      }

      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }

    .delete-account-container {
      width: 100%;
      display: flex;
      margin-top: 10px;
      flex-direction: column;

      .role-del-btn {
        height: 40px;
        display: flex;
        text-align: center;
        border-radius: 5px;
        font-weight: normal;
        align-items: center;
        color: #777e90;
        transition: 0.3s all;
        justify-content: center;
        cursor: pointer;
      }

      .role-del-btn {
        color: red;
        font-weight: bold;
        background: #fff2f2;

        i {
          font-size: 15px;
          margin-right: 5px;
        }

        i::before {
          color: red;
        }

        &:hover {
          background: #ffdcdc;
        }
      }
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 6px;
  cursor: default;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(255, 255, 255);
  border-radius: 6px;
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