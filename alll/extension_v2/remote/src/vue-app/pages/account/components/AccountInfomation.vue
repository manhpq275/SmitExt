<template>
  <div>
    <div class="mid-user d-between" style="">
      <div class="d-flex align-items-center">
        <input type="file" id="avatar" style="display: none" /><label
          for="avatar"
          class="ava-wrapper"
          ><img
            src="@images/account-image-test.jpeg"
            alt=""
            class="mid-user-avatar"
          />
          <div class="ava-change">
            <img src="@images/account-change-ava.svg" alt="" />
            <div
              style="
                color: rgb(255, 255, 255);
                font-size: 10px;
                font-family: Bold;
              "
            >
              Change
            </div>
          </div></label
        >
        <div style="padding-left: 18px">
          <div class="mid-user-name">{{ userInfo.displayName }}</div>
          <div class="mid-user-join">
            {{ `${$t("join-date")} ${createDate}` }}
          </div>
        </div>
      </div>
      <div>
        <img src="@images/account-rank-basic.png" alt="" />
      </div>
    </div>
    <div class="mid-amount d-between mid-padding">
      <div class="d-center">
        <div class="f-me me-2">Member's rank:</div>
        <div class="diamond">{{ userInfo?.role?.toUpperCase() }}</div>
      </div>
      <button class="mid-pay-btn" @click="onPay">+ Upgrade</button>
    </div>
    <div class="mid-amount d-between mid-padding">
      <div class="d-left membersip-benefit">
        <div class="f-me me-2 mb-1">Membership benefits:</div>
        <li v-for="value of benefit" :key="value">
          <img src="@images/svg25.svg" alt="" />
          {{ value }}
        </li>
      </div>
    </div>
    <div class="mid-amount d-between mid-padding">
      <div class="d-left w-100">
        <div class="f-me mb-1">Transaction history:</div>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Invoice #</th>
              <th scope="col">Invoice Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
    <modal-payment />
  </div>
</template>

<script>
import "vue-toast-notification/dist/theme-sugar.css";

import moment from "moment";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import ModalPayment from "../ModalPayment.vue";
import { useToast } from "vue-toast-notification";

export default {
  name: "AccountInfomation",
  components: {
    ModalPayment,
  },
  setup() {
    const store = useStore();
    const $toast = useToast();
    const benefit = ["Ads check", "Supper target", "Delete hidden admin"];
    const isMember = computed(() => store.getters.getUserInfo.role);
    const userInfo = computed(() => store.getters.getUserInfo);
    const createDate = computed(() => {
      const date = store.getters.getUserInfo;
      return moment(date).format("DD-MM-YYYY");
    });

    const changeTab = ref("account");

    return {
      isMember,
      changeTab,
      userInfo,
      createDate,
      benefit,
    };
  },
  methods: {
    onPay() {
      // const modal = new Modal(document.getElementById("modal-payment"));
      // modal.show();
    },
  },
};
</script>

<style lang="scss" scoped>
.membersip-benefit {
  flex-direction: column;

  li {
    word-break: break-all;
    font-size: 14px;
  }
}

.table-borderless {
  background-color: var(--bs-tb-acc-bg);
  font-size: 12px;
  font-family: Bold;
  min-height: 60px;
  margin-bottom: 0px;
}

.mid-user {
  padding: 15px 18px;
  box-shadow: 0 11px 28px hsla(0, 0%, 100%, 0.25);
  backdrop-filter: blur(27px);
  margin-top: 15px;
  border-radius: 10px;
  border: 0.5px solid #e2e2e2;
}

.mid-amount {
  margin-top: 15px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #f3f3f3;
}

.mid-padding {
  padding: 10px 15px;
  height: fit-content;
}

.ava-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
}

.mid-user-avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  z-index: -1;
}

.ava-change {
  position: absolute;
  text-align: center;
  visibility: hidden;
}

.mid-user-name {
  font-family: Bold;
  font-size: 16px;
}

.mid-user-join {
  color: #353535;
}

.f-me {
  font-size: 16px;
  font-family: Medium;
}

.me-2 {
  margin-right: 0.5rem !important;
}

.diamond {
  color: #44a8b9;
}

.diamond,
.star {
  font-family: Medium;
}

.mid-pay-btn {
  height: 32px;
  background: linear-gradient(
    180deg,
    var(--bs-bg-btn-menu1),
    var(--bs-bg-btn-menu2)
  );
  font-family: Bold;
  color: var(--bs-text-header);
  transition: all 0.2s;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 0 10px;
}

.not-registed {
  text-align: center;
  margin-top: 25px;
  font-family: Medium;
  opacity: 0.5;
}
</style>