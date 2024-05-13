<template>
  <div class="main-table">
    <smit-table :headers="tableInfo.headers" :contents="tableInfo.contents" @onClickHeaderIcon="onClickHeaderIcon">
      <template #items="item">
        <td class="text-center">
          <span class="bi bi-circle-fill status-circle" :style="setColorStatus(item.status)"></span>
        </td>
        <td class="account-name">
          <div class="d-flex">
            <span class="td-text" @click="goToAdManager('name', item.accountId)">
              {{ item.name }}
            </span>
            <span class="td-menu">
              <i class="bi bi-three-dots" data-bs-toggle="dropdown" aria-expanded="false"></i>
              <ul class="dropdown-menu">
                <li class="dropdown-item" @click="openChangeNameModal(item)">
                  {{ $t("title.rename-advertister") }}
                </li>
                <li class="dropdown-item" @click="openChangePermissionModal(item)">
                  {{ $t("title.repermission-advertister") }}
                </li>
              </ul>
            </span>
          </div>
          <div class="sub-text">{{ item.accountId }}</div>
        </td>
        <td class="text-left td-text" @click="goToAdManager('balance', item.accountId)">
          {{ item.balance }}
        </td>
        <td class="text-left td-text" @click="goToAdManager('threshold_amount', item.accountId)">
          {{ item.threshold_amount }}
        </td>
        <td class="text-left">{{ item.limited }}</td>
        <td class="text-left">{{ item.total }}</td>
        <td class="text-center">{{ item.currency }}</td>
        <td class="text-center">{{ item.numberOfCard }}</td>
        <td class="text-center">{{ item.role }}</td>
        <td class="text-center">{{ item.next_bill_date }}</td>
        <td class="text-center">{{ item.created_time }}</td>
        <td class="text-center">{{ item.accountType }}</td>
        <td class="text-center">{{ item.cardNumber }}</td>
        <td class="text-center">{{ item.disable_reason }}</td>
        <td class="text-center">{{ item.timeZone }}</td>
        <td class="text-center">{{ item.countryCode }}</td>
      </template>
    </smit-table>
    <smit-loading v-show="tableInfo.loading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StatusModal from "./StatusModal.vue";
import { setColorStatus } from "@pages/helper";
import ModalChangeName from "./ModalChangeName.vue";
import ModalPermission from "./ModalPermission.vue";
import { MainRepository } from "@vue-app/data/repositories/MainRepository";
import { makePersonalAccounts, exportTxt, makeAdInfoData } from "../helper";
import { DashBoardRepository } from "@data/repositories/DashboarRepository";
import { SmitFbSystem } from "@data/repositories/tracking";
import { getPersonalAccountHeaders, getPersonalRequestFields, } from "../mockData";

export default {
  name: "PersonalAccount",
  components: { StatusModal, ModalChangeName, ModalPermission },
  data() {
    return {
      tableInfo: {
        loading: false,
        headers: [],
        contents: [],
        contentsSave: [],
        pagination: {
          after: null,
          before: null,
          perPage: 10,
          totalPage: 0,
          currentPage: 1,
        },
      },
      currency: "",
      searchKeyword: "",
      setColorStatus,
    };
  },
  computed: {
    ...mapGetters(["tokenAEEI", "userID", "isTokenReady"]),
  },
  watch: {
    isTokenReady: {
      immediate: true,
      handler(val) {
        if (val) this.getAdsAccount();
      },
    },
  },
  mounted() {
    this.tableInfo.headers = getPersonalAccountHeaders(this.$t);
    this.emitter.on("exportTxt", this.exportTxt);
    this.emitter.on("onRefreshData", this.onRefreshData);
    this.emitter.on("onSearchAccount", this.onSearchAccount);
    this.emitter.on("onChangeCurrency", this.onChangeCurrency);
  },
  beforeUnmount() {
    this.emitter.off("exportTxt", this.exportTxt);
    this.emitter.off("onRefreshData", this.onRefreshData);
    this.emitter.off("onSearchAccount", this.onSearchAccount);
    this.emitter.off("onChangeCurrency", this.onChangeCurrency);
  },
  methods: {
    async nextPageAdsAccount() {
      
    },
    // [API]
    async getAdsAccount(after) {
      //console.log("PersonalAccount");
     

      const fields = getPersonalRequestFields(this.userID);

      let params = {
        summary: 1,
        limit: 10,
        locale: "en_US",
        fields: fields.join(","),
        access_token: this.tokenAEEI,
      };
      if (after) {
        params.after = after;
        this.tableInfo.loading = false;
        params.limit = 10;
      } else {
        this.tableInfo.loading = true;
        params.limit = 15;
      }
      const { data } = await DashBoardRepository.getAdsAccounts(params);
      SmitFbSystem.tracking("AdsAccount", data.data);
      var tmpAccount = makePersonalAccounts(data.data, this.searchKeyword, this.currency);
      this.tableInfo.contents.push(...tmpAccount);
      this.tableInfo.contentsSave = this.tableInfo.contents;
      this.tableInfo.loading = false;
  
      var tempNext = data.paging;

        if (tempNext?.cursors?.after) {
          this.getAdsAccount(tempNext.cursors.after);
            // var tmpParams = params;
            // tmpParams.after = tempNext.cursors.after;
            // const { tmpData } = await DashBoardRepository.getAdsAccounts(tmpParams);
            // tempNext = tmpData.paging;
            // tmpAccount = makePersonalAccounts(data.data, this.searchKeyword, this.currency);
            // this.tableInfo.contents.push(...tmpAccount);
        }
    },
    // [EVENT]
    onChangePage(direction) {
      this.getAdsAccount(direction);
    },
    onChangePerPage(perPage) {
      this.tableInfo.pagination.currentPage = 1;
      this.tableInfo.pagination.perPage = perPage;
      this.getAdsAccount();
    },
    onChangeNameSuccess(acName, acId) {
      const { contents } = this.tableInfo;
      contents.find((item) => item.id === acId).name = acName;
    },
    onRefreshData() {
      this.getAdsAccount();
    },
    onSearchAccount(accountName) {
      this.searchKeyword = accountName;
      this.tableInfo.pagination.currentPage = 1;
      this.tableInfo.pagination.perPage = accountName ? "max" : 10;
      this.getAdsAccount();
    },
    onChangeCurrency(currency) {
      this.currency = currency;
      localStorage.setItem("SelectedCurrency", currency);
      this.getAdsAccount();
    },
    onClickHeaderIcon(item) {
      if (item.key === "status") this.$refs.statusModal.open();
    },
    onFilterStatus(data) {
      const { contentsSave } = this.tableInfo
      const getStatusValid = (tableItem => data.includes(tableItem.status))
      this.tableInfo.contents = contentsSave.filter(getStatusValid);
      this.$refs.statusModal.close()
    },
    openChangeNameModal(item) {
      this.$refs.changeNameModal.open(item)
    },
    openChangePermissionModal(item) {
      this.$refs.changePermissionModal.open(item)
    },
    exportTxt(data) {
      if (data === "account") {
        exportTxt(this.tableInfo.headers, this.tableInfo.contentsSave);
      }
    },
    // [MOVE]
    goToAdManager(key, id) {
      let action_url;
      if (key === "name") {
        action_url = `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=${id}`;
      } else if (key === "balance") {
        action_url = `https://business.facebook.com/ads/manager/account_settings/account_billing/?act=${id}&pid=p1&page=account_settings&tab=account_billing_settings`;
      } else if (key === "threshold_amount") {
        action_url = `https://business.facebook.com/ads/manager/account_settings/information/?act=${id}&pid=p1&page=account_settings&tab=account_information`;
      }
      openNewTab({ url: action_url, active: true });
    },
  },
};
</script>

<style scoped lang="scss">
.main-table {
  display: flex;
  flex-direction: column;
  height: calc(100% - 54px);
}

.account-name {
  font-weight: bold;
  position: relative;
  color: var(--bs-text-color);

  .td-menu {
    right: 10px;
    position: absolute;
  }
}
</style>