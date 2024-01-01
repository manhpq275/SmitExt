<template>
  <teleport to=".x1cvmir6">
    <div class="smit-payment" id="smit-payment">
      <div class="smit-payment-content">
        <div class="content-header">
          <div class="content-header__title">
            <span class="ads-check-icon" v-html="iconJS.ads_check_icon"></span>
            <span>Ads Check</span>
          </div>
        </div>
        <div class="content-main">
          <div class="list-item">
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Balance</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.balance }}</div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Daily spending limitation</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.limited }}</div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Threshold</span>
              </div>
              <div class="ads-info-item__value">
                {{ adsInfo.threshold_amount }}
              </div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Total amount spending</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.total }}</div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Creation time</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.created_time }}</div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Invoice time</span>
              </div>
              <div class="ads-info-item__value">
                {{ adsInfo.next_bill_date }}
              </div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Hidden Admin</span>
              </div>
              <div
                class="ads-info-item__value"
                :class="{ 'red-text': adsInfo.hidden_admin }"
              >
                {{ adsInfo.hidden_admin }}
              </div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Account type</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.accountType }}</div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Timezone</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.timeZone }}</div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Payment card</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.cardNumber }}</div>
            </div>
            <div class="ads-info-item">
              <div class="ads-info-item__name">
                <span class="item-text">Roles</span>
              </div>
              <div class="ads-info-item__value">{{ adsInfo.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
  
  <script>
import { mapGetters } from "vuex";
import { iconJS } from "@smit-app/helpers/icons";
import { makeAdInfoData } from "@smit-app/helpers";
import { FacebookRepository } from "@vue-app/data/repositories/FacebookRepository";

export default {
  name: "SmitPaymentSetting",
  data() {
    return {
      adsInfo: {},
      iconJS,
    };
  },
  computed: {
    ...mapGetters(["tokenAEEG", "adAccountID", "userID", "isFetchEAAG"]),
  },
  watch: {
    isFetchEAAG: {
      immediate: true,
      handler(val) {
        if (val) this.getAds();
      },
    },
  },
  methods: {
    // [API]
    async getAds() {
      try {
        const fields = [
          "adtrust_dsl",
          "adspaymentcycle{threshold_amount}",
          "insights.date_preset(maximum){spend}",
          "balance",
          "next_bill_date",
          "owner",
          "owner_business",
          `userpermissions.user(${this.userID}).as(user_roles)`,
          "currency",
          "account_id",
          "name",
          "business",
          "account_status",
          "created_time",
          "timezone_name",
          "timezone_offset_hours_utc",
          "userpermissions.limit(500){user{id},role}",
          "all_payment_methods{pm_credit_card{display_string,exp_month,exp_year,is_verified}}",
        ];

        const params = {
          access_token: this.tokenAEEG,
          __cppo: 1,
          __activeScenarioIDs: [],
          __activeScenarios: [],
          __interactionsMetadata: [],
          _reqName: "adaccount",
          fields: fields.join(","),
          locale: "en_US",
          method: "get",
          pretty: 0,
          suppress_http_code: 1,
          id: this.adAccountID,
        };
        const { data } = await FacebookRepository.getAdsAccountBubble(params);
        this.adsInfo = makeAdInfoData(data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.smit-payment-content {
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 0 3px 0px #ccc;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjUxMCIgdmlld0JveD0iMCAwIDM2MCA1MTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMTQwNV8zODMzKSI+CjxyZWN0IHdpZHRoPSIzNjAiIGhlaWdodD0iNTEwIiBmaWxsPSJ3aGl0ZSIvPgo8ZyBvcGFjaXR5PSIwLjUiIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2ZfMTE0MDVfMzgzMykiPgo8cGF0aCBkPSJNMjQzLjM3NCAyMzEuMzc1QzIzMi4xNzEgMTEwLjUzMyAzMjguNzM3IDMwLjk3MjEgMzc4LjQyMSA2LjI5Njg4TDM1Ny40MTcgNTQxLjQ4M0MyODEuMzkxIDUzNy44MTUgMTI4LjMzNyA1MjkuODc5IDEyNC4zMzUgNTI3LjQ3OEMxMTkuMzMzIDUyNC40NzcgMTI0LjMzNSA0MjUuNDQyIDE1Mi4zNDUgNDM3LjQ0N0MxODAuMzU1IDQ0OS40NTEgMjU3LjM3OSAzODIuNDI3IDI0My4zNzQgMjMxLjM3NVoiIGZpbGw9IiM0NEMzRjkiLz4KPHBhdGggZD0iTTE3NS4zNDggNDEyLjc0NEMxNjIuNTM0IDI4Ni4wMjggNjcuOTc3NyA4My45NjM0IDExLjI5MTMgLTkuNDAyMzRILTE3LjcxODhWNTQwLjc4OUM5My4zMTk4IDUzNy43ODggMzE5Ljk5OCA1MzMuNTg2IDMzOC40MDUgNTQwLjc4OUMzNTYuODExIDU0Ny45OTEgMzYzLjQxNCA0OTcuNzc0IDM2NC40MTQgNDcxLjc2NUMzMjUuNCA0ODEuNDM1IDE4NC4zNTEgNTAxLjc3NSAxNzUuMzQ4IDQxMi43NDRaIiBmaWxsPSIjMjdFNEEwIi8+CjwvZz4KPHJlY3QgeD0iLTIuMDcwMzEiIHk9Ii0yNS4zMzU5IiB3aWR0aD0iMzYyLjA3IiBoZWlnaHQ9IjU2NC45NDEiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMDciLz4KPC9nPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9mXzExNDA1XzM4MzMiIHg9Ii0xNDIuNzYyIiB5PSItMTM0LjQ0NiIgd2lkdGg9IjY0Ni4yMjciIGhlaWdodD0iODAwLjk3NyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI2Mi41MjE3IiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfMTE0MDVfMzgzMyIvPgo8L2ZpbHRlcj4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xMTQwNV8zODMzIj4KPHJlY3Qgd2lkdGg9IjM2MCIgaGVpZ2h0PSI1MTAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==);

  .content-header {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    background: linear-gradient(
      180deg,
      rgba(4, 133, 162, 0.6),
      rgba(17, 199, 78, 0.6)
    );

    &__title {
      display: flex;
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      align-items: center;
    }

    :deep(.ads-check-icon) {
      display: contents;

      svg {
        margin-right: 10px;
      }
    }
  }

  .content-main {
    padding: 10px;

    .list-item {
      border-radius: 5px;
      background: #fff;
    }

    .ads-info-item {
      display: flex;
      font-size: 14px;
      padding: 8px 10px;
      font-weight: bold;
      align-items: center;
      justify-content: space-between;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(231, 231, 231, 0.47);
      }

      &__name {
        display: flex;
        align-items: center;

        .item-text {
          line-height: 1.5;
        }
      }
    }

    :deep(.item-icon) {
      display: contents;

      svg {
        margin-right: 5px;
      }
    }
  }

  .red-text {
    color: red;
  }
}
</style>