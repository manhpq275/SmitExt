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
        <smit-input
            iconClass="email-icon"
            v-model="email"
            :placeholder="$t('enter-email')"
            :errorMsg="v$.email.$errors[0]?.$message"
        />
        <div class="check-permission-type">
          <div class="add-account-label">
            {{ $t("title.assign-bm-role") }}
          </div>
          <div class="permission-radio">
            <div v-for="item in roleTypeList" :key="item.key">
              <input
                  type="radio"
                  :id="item.key"
                  :checked="roleCheck == item.value"
                  @change="roleCheck = item.value"
              />
              <label class="form-check-label" :for="item.key">
                {{ item.text }}
              </label>
            </div>
          </div>
        </div>
        <button
            class="btn modal-btn save-add-btn"
            :disabled="!email"
            @click="addBMAccount"
        >
          {{ $t("title.confirm") }}
        </button>
      </div>
      <div class="delete-account" v-else>
        <div class="account-list">
          <div class="user" v-for="(item, index) in listUser" :key="index">
            <div class="user__name">
              <div class="title">{{ item.name }}</div>
              <div class="sub-text">{{ item.id }}</div>
              <div class="sub-text">
                {{ item.role }}
              </div>
            </div>
            <i class="bi bi-trash" @click="onRemoveAcc(item.id)"></i>
          </div>
        </div>
      </div>
    </div>
  </smit-modal>
</template>

<script>
import {mapGetters} from "vuex";
import {DashBoardRepository} from "@vue-app/data/repositories/DashboarRepository";
import {required$} from "@utils/validators";
import {email} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default {
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      label: {
        btnText: this.$t("title.save"),
        addAccount: this.$t("title.invite-people"),
        deleteAccount: this.$t("title.delete-ad-account")
      },
      isOpen: false,
      activedTab: "add",
      addAccountTextField: "",
      email: '',
      listUser: [],
      roleCheck: 'ADMIN',
      roleTypeList: [
        {
          key: 'ADMIN',
          value: 'ADMIN',
          text: this.$t('admin-access')
        },
        {
          key: 'EMPLOYEE',
          value: 'EMPLOYEE',
          text: this.$t('employee-access')
        }
      ],
      bmInfo: ''
    };
  },
  validations: {
    email: {
      required$,
      email,
    }
  },
  computed: {
    ...mapGetters(["tokenAEEI", "tokenAEEB", "userID"]),
  },
  methods: {
    async getListUser() {
      const getParams = {
        locale: "en_US",
        access_token: this.tokenAEEI
      }
      this.listUser = (await DashBoardRepository.getBMUser(getParams, this.bmInfo.id)).data.data;
    },
    async addBMAccount() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      const createParams = {
        email: this.email,
        role: this.roleCheck,
        locale: "en_US",
        access_token: this.tokenAEEI
      }
      try {
        await DashBoardRepository.createBMAccount(createParams, this.bmInfo.id);
        this.$toast.success(this.$t("messages.success"));
        this.close();
      } catch (e) {
        this.$toast.error(e.response.data.error.message);
      }
    },
    async onRemoveAcc(userId) {
      try {
        await DashBoardRepository.deleteBMUser({
          locale: "en_US",
          access_token: this.tokenAEEB
        }, userId)
        this.$toast.success(this.$t("messages.delete-success"));
      } catch (e) {
        this.$toast.error(e.response.data.error.message);
      }
    },
    async open(bmInfo) {
      this.bmInfo = bmInfo;
      this.isOpen = true;
      await this.getListUser();
    },
    close() {
      this.isOpen = false;
      this.activedTab = "add";
      this.email = ''
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