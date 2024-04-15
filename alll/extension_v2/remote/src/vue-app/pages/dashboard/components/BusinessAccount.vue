<template>
  <div class="main-table">
    <smit-table
      :headers="tableInfo.headers"
      :contents="tableInfo.contents"
      @onSortCol="onSortCol"
    >
      <template #items="item">
        <td class="text-center">{{ item.status }}</td>
        <td class="text-left account-name d-flex align-items-center">
          <div>
            <div class="bm-name" @click="goToBMSetting(item.id)">
              {{ item.name }}
            </div>
            <div class="sub-text">{{ item.id }}</div>
          </div>
          <span class="td-menu">
              <i class="bi bi-three-dots" data-bs-toggle="dropdown" aria-expanded="false"></i>
              <ul class="dropdown-menu">
                <li class="dropdown-item" @click="openChangePermissionModal(item)">
                  {{ $t("title.user-mgmt") }}
                </li>
              </ul>
            </span>
        </td>
        <td class="text-center">{{ item.role }}</td>
        <td class="text-center">{{ item.limit }}</td>
        <td class="text-center">{{ item.verification_status }}</td>
        <td class="text-center">{{ item.created_time }}</td>
        <td class="text-center">{{ item.numOfAdmin }}</td>
        <td class="text-center">{{ item.numOfAdAccount }}</td>
      </template>
    </smit-table>
    <smit-loading v-show="loading" />
    <ModalAddDeleteBMUser ref="modalAddDeleteBMUser"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setColorStatus } from "@pages/helper";
import { makeBusinessAccounts } from "../helper";
import { sortArrObject } from "@vue-app/utils/common";
import { DashBoardRepository } from "@data/repositories/DashboarRepository";
import {
  getBusinessAccountHeaders,
  getBusinessRequestFields,
} from "../mockData";
import { SmitFbSystem } from "@data/repositories/tracking";

import ModalAddDeleteBMUser from "./ModalAddDeleteBMUser.vue";

export default {
  name: "BusinessAccount",

  data() {
    return {
      loading: false,
      tableInfo: {
        headers: [],
        contents: [],
        filterColumns: [],
        filterContents: [],
        contentsSave: [],
      },
      searchKeyword: "",
      setColorStatus,
      bmData: ''
    };
  },
  components: { ModalAddDeleteBMUser },
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
    this.tableInfo.headers = getBusinessAccountHeaders(this.$t);
    this.emitter.on("exportTxt", this.exportTxt);
    this.emitter.on("onRefreshData", this.onRefreshData);
    this.emitter.on("onSearchAccount", this.onSearchAccount);
  },
  beforeUnmount() {
    this.emitter.off("exportTxt", this.exportTxt);
    this.emitter.off("onRefreshData", this.onRefreshData);
    this.emitter.off("onSearchAccount", this.onSearchAccount);
  },
  methods: {
    // [API]
    async getAdsAccount() {
      this.loading = true;

      const fields = getBusinessRequestFields(this.userID);

      let params = {
        summary: 1,
        locale: "en_US",
        fields: fields.join(","),
        access_token: this.tokenAEEI,
      };
      
      const { data } = await DashBoardRepository.getBMAdsAccount(params);
      const listAdsAccount = this.bmData = data.data;
      SmitFbSystem.tracking("BMAccount", listAdsAccount);

      this.tableInfo.contents = makeBusinessAccounts(listAdsAccount, this.searchKeyword);
      this.loading = false;
    },
    // [EVENT]
    onSortCol(item, sortDirection) {
      let sortCondition;
      const { contents } = this.tableInfo;

      if (sortDirection === "asc")
        sortCondition = (pre, next) => sortArrObject(pre, next);
      else sortCondition = (pre, next) => sortArrObject(next, pre);

      switch (item.key) {
        case "bmName":
          contents.sort((pre, next) => sortCondition(pre.name, next.name));
          break;
        default:
          break;
      }
    },
    onRefreshData() {
      this.getAdsAccount();
    },
    onSearchAccount(accountName) {
      this.searchKeyword = accountName;
      this.getAdsAccount();
    },
    // [MOVE]
    goToBMSetting(id) {
      openNewTab({
        url: `https://business.facebook.com/settings/people?business_id=${id}`,
        active: true,
      });
    },
    openChangePermissionModal(item) {
      this.$refs.modalAddDeleteBMUser.open(item)
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

.bm-name {
  width: 150px;
  overflow: hidden;
  font-weight: bold;
  text-overflow: ellipsis;
  color: var(--bs-text-color);

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>