<template>
  <div
      class="modal"
      id="modal-payment-card"
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
            <img src="@images/CloseBtn.svg" alt=""/>
          </button>
        </div>
        <div class="modal-body">
          <label>Card Number</label>
          <div id="card-number" class="modal-body-card"></div>
          <label>Card Expiry</label>
          <div id="card-expiry" class="modal-body-card"></div>
          <label>Card CVC</label>
          <div id="card-cvc" class="modal-body-card"></div>
          <button id="custom-button" @click="onClickPay">Pay now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
import {useToast} from "vue-toast-notification";
import {PaymentRepository} from "@data/repositories/PaymentRepository";

export default {
  props: {
    selectedItem: {
      type: Object,
      default: () => {
      }
    }
  },
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.getters.getUserInfo);
    const $toast = useToast();
    return {userInfo, $toast};
  },
  data() {
    return {
      token: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      stripe: null,
    };
  },
  async mounted() {
    this.stripe = Stripe(process.env.STRIPE_TOKEN)
    this.createElements()
  },
  methods: {
    createElements() {
      const elements = this.stripe.elements();
      const style = {
        base: {
          color: 'black',
          fontSize: '14px',
          '::placeholder': {
            color: '#aab7c4',
          }
        },
        invalid: {
          color: 'red',
          iconColor: 'red',
        },
      };
      this.cardNumber = elements.create('cardNumber', {showIcon: true, style});
      this.cardNumber.mount('#card-number');
      this.cardExpiry = elements.create('cardExpiry', {showIcon: true, style});
      this.cardExpiry.mount('#card-expiry');
      this.cardCvc = elements.create('cardCvc', {showIcon: true, style});
      this.cardCvc.mount('#card-cvc');
    },
    async onClickPay() {
      const {token, error} = await this.stripe.createToken(this.cardNumber);
      if (error) {
        // handle error here
        this.$toast.error(error.message);
        return;
      }
      token.email = this.userInfo.email;
      const {data} = await PaymentRepository.createPayment(token, this.selectedItem.id);
      //console.log(data);
    },
  },
  onBeforeUnmount() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &-content {
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
    width: 230px;
  }

  &-body {
    padding: 15px;
    display: flex;
    flex-flow: column;
    &-card {
      margin-bottom: 10px;
    }
  }
}
</style>