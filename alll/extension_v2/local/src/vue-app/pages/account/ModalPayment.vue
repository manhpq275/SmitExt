<template>
  <div
    class="modal"
    id="modal-payment"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            {{ $t("title.upgrade-account") }}
          </h5>
          <button
            type="button"
            class="close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <img src="@images/CloseBtn.svg" alt="" />
          </button>
        </div>
        <div class="modal-body">
          <div
            class="modal-card"
            v-for="(item, index) of items"
            :key="item.id"
            :class="'modal-card__' + index"
          >
            <div
              class="modal-card-header"
              :class="'modal-card-header__' + index"
            >
              <div class="modal-card-header__info">
                <h1>{{ item.type }}</h1>
                <p>{{ item.desc }}</p>
              </div>
            </div>
            <div class="modal-card-body">
              <div
                v-if="item.price > 0"
                class="modal-card-header__price"
                :class="'modal-card-header__price__' + index"
              >
                ${{ item.price
                }}<span class="modal-card-header__month">/month</span>
              </div>
              <div
                v-else
                class="modal-card-header__price"
                :class="'modal-card-header__price__' + index"
              >
                Free
              </div>
              <li v-for="value of item.benefit" :key="value">
                <img src="@images/svg25.svg" alt="" />
                {{ value }}
              </li>
              <button
                v-if="item.price > 0"
                :class="'modal-card-body__button__' + index"
                @click="onClick(item)"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-payment-card :selected-item="selectedItem" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue3-i18n";
import ModalPaymentCard from "./ModalPaymentCard.vue";
import {Modal} from "bootstrap";
import {PaymentRepository} from "@data/repositories/PaymentRepository";

export default {
  components: {ModalPaymentCard},
  props: {},
  setup() {
    const i18n = useI18n();
    const store = useStore();
    const userInfo = computed(() => store.getters.getUserInfo);
    return { userInfo };
  },
  data() {
    return {
      items: [],
      selectedItem: {}
    };
  },
  async mounted() {
    const { data } = await PaymentRepository.getPackage();
    this.items = data;
    this.items[0].benefit = [
      "Ads check",
      "Supper target",
      "Delete hidden admin",
    ];
    this.items[1].benefit = [
      "Ads check",
      "Supper target",
      "Delete hidden admin",
    ];
    this.items[2].benefit = [
      "Ads check",
      "Supper target",
      "Delete hidden admin",
    ];
    this.items[0].desc = "Become a smitter";
    this.items[1].desc = "Can use some pro feature";
    this.items[2].desc = "Use all smit feature";
  },
  methods: {
    onClick(item) {
      this.selectedItem = item;
      const modal = new Modal(document.getElementById("modal-payment-card"));
      modal.show();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  font-family: "Medium";
  &-title {
    color: var(--bs-text-color);
  }
  &-content {
    height: 354px;
    background-color: #fff;
  }
  &-header {
    padding: 10px 10px 0px;
    border-bottom: unset;
    button {
      border: none;
      background-color: #fff;
      width: 26px;
      height: 26px;
      border-radius: 13px;
    }
  }
  &-dialog {
    max-width: 550px;
  }
  &-body {
    padding: 30px;
    display: flex;
    justify-content: space-between;
  }

  &-card {
    position: relative;
    width: 30%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    &__0 {
      box-shadow: 0 5px 10px #00bdd1;
    }
    &__1 {
      box-shadow: 0 5px 10px #b80165;
    }
    &__2 {
      box-shadow: 0 5px 10px #d8b748;
    }
    &-header {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      border: none;
      &:before {
        content: "";
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        clip-path: polygon(0% 0%, 100% 0%, 100% 73%, 50% 100%, 0% 73%);
      }
      &__0:before {
        background: linear-gradient(to right, #0082aa, #00bdd1);
      }
      &__1:before {
        background: linear-gradient(to right, #88026a, #b80165);
      }
      &__2:before {
        background: linear-gradient(to right, #ffc300, #d8b748);
      }
      &__info {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &__info h1 {
        font-size: 16px;
        text-transform: capitalize;
        margin-bottom: 0;
      }
      &__info p {
        font-size: 9px;
        text-transform: capitalize;
        margin-bottom: 5px;
      }
      &__price {
        border-radius: 50%;
        color: #ffc300;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 24px;
        font-family: "Reg";
        margin-top: 20px;
        margin-bottom: 10px;
        &__0 {
          color: #0082aa;
        }
        &__1 {
          color: #88026a;
        }
        &__2 {
          color: #ffc300;
        }
      }
      &__month {
        font-size: 14px;
        padding-top: 5px;
        display: flex;
        justify-items: flex-end;
      }
    }
    &-body {
      padding: 60px 0 0;
      display: flex;
      flex-direction: column;
      height: 264px;
      li {
        word-break: break-all;
        font-size: 10px;
      }
      button {
        position: absolute;
        bottom: 10px;
        border: none;
        outline: none;
        padding: 8px 30px;
        margin-top: 10px;
        border-radius: 30px;
        color: #fff;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
      &__button {
        &__0 {
          background: linear-gradient(to right, #0082aa, #00bdd1);
        }
        &__1 {
          background: linear-gradient(to right, #88026a, #b80165);
        }
        &__2 {
          background: linear-gradient(to right, #ffc300, #d8b748);
        }
      }
    }
  }
}
</style>