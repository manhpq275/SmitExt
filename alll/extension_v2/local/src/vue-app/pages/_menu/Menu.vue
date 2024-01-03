<template>
  <div class="ex-menu" :key="routerAccount">
    <div class="close-btn" @click="backToDashBoard">
      <img src="@images/CloseBtn.svg" alt="" />
    </div>
    <div class="ex-menu__side-menu">
      <div class="logo">
        <img class="sub-logo" />
      </div>
      <div class="main-menu">
        <div class="main-menu__title">
          <img src="@images/left-header-menu.svg" />
          <span>{{ $t("title.menu") }}</span>
        </div>
        <div class="main-menu__list">
          <router-link
            :to="routerAccount"
            class-active="active"
            class="menu-item"
          >
            <span class="menu-image menu-icon1"></span>
            <span class="menu-text">{{ $t("title.account") }}</span>
          </router-link>
          <router-link
            to="/super-target"
            class-active="active"
            class="menu-item"
          >
            <span class="menu-image menu-icon4"></span>
            <span class="menu-text">Super Target</span>
          </router-link>
          <router-link
            v-auth="'premium'"
            to="/del-hidden-admin"
            class-active="active"
            class="menu-item"
          >
            <span class="menu-image menu-icon7"></span>
            <span class="menu-text">Delete Hidden Admin</span>
          </router-link>
          
          <!-- <router-link :to="{ name: 'share-pixel' }" class-active="active" class="menu-item menu-item2">
            <span v-auth="'premium'">Share Pixel</span>
          </router-link>
          <router-link to="/extended-payment" class-active="active" class="menu-item menu-item3">
            <span v-auth="'premium'">Extended Payment</span>
          </router-link>
          <router-link to="/super-target" class-active="active" class="menu-item menu-item4">
            <span v-auth="'premium'">Super Target</span>
          </router-link>
          <li class="menu-item menu-item5">
            <span v-auth="'premium'">Đổi info TKQC</span>
          </li>
          <li class="menu-item menu-item6">
            <span v-auth="'premium'">Super Share Ads</span>
          </li>
          <li class="menu-item menu-item8">
            <span v-auth="'premium'">Ads Review</span>
          </li> -->
        </div>
        <div v-if="isAuth" class="logout-btn" @click="logOut">
          <span class="menu-image logout-icon"></span>
          <span class="menu-text">{{ $t("title.logout") }}</span>
        </div>
      </div>
    </div>
    <div class="ex-menu__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { deleteCookie } from "@pages/helper";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Menu",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isAuth = computed(() => store.getters.getIsAuth);
    const isMember = computed(() => store.getters.getUserInfo.role);

    const routerAccount = computed(() => {
      if (isMember.value) {
        return "/account";
      } else if (route.name === "register") {
        return "/register";
      } else if (route.name === "register-confirm-email") {
        return "register-confirm-email";
      } else return "/login";
    });

    const logOut = () => {
      store.dispatch("SET_USER_INFO", {});
      store.dispatch("LOGOUT", {});
      deleteCookie("cookie_token");
      router.push({ name: "login" });
    };

    const backToDashBoard = () => router.push({ name: "dashboard" });

    return { isAuth, isMember, routerAccount, backToDashBoard, logOut };
  },
};
</script>

<style lang="scss" scoped>
.ex-menu {
  height: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 13px;
  background: hsla(0, 0%, 100%, 0.7);
  box-shadow: 2px 9px 24px rgba(0, 0, 0, 0.05);

  .close-btn {
    top: 15px;
    right: 25px;
    width: 20px;
    height: 20px;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 2px 9px 24px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.2s;
    background: #fff;
    z-index: 10;
  }

  &__side-menu {
    width: 240px;
    height: 100%;
    border: 1px solid;
    position: relative;
    padding: 15px 20px 15px 15px;
    border-radius: 13px 0 0 13px;
    background: hsla(0, 0%, 100%, 0.6);
    box-shadow: 2px 9px 24px rgba(0, 0, 0, 0.08);
    border-image-source: linear-gradient(180deg, #fff, hsla(0, 0%, 100%, 0.33));
  }

  &__content {
    flex: 1;
    overflow: auto;
    padding: 15px 45px;
    border-radius: 0 13px 13px 0;
  }

  .logo img {
    width: var(--bs-width-logo-menu);
    height: 30px;
  }

  .main-menu {
    display: flex;
    margin-top: 25px;
    position: relative;
    flex-direction: column;
    height: calc(100% - 64px);

    &__title {
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        margin-left: 5px;
        font-weight: bold;
        text-transform: uppercase;
      }
    }

    &__list {
      overflow: auto;
      margin-top: 12px;
    }

    .menu-item,
    .logout-btn {
      height: 40px;
      display: flex;
      padding: 0 15px;
      margin-bottom: 5px;
      border-radius: 8px;
      position: relative;
      align-items: center;
      font-family: Medium;
      white-space: nowrap;
      transition: all 0.2s;
      cursor: pointer;

      .menu-text {
        margin-left: 10px;
        color: var(--bs-bg-routerlink);
      }
    }

    .logout-btn {
      left: 0;
      bottom: 0;
      position: absolute;

      .menu-image::before {
        background-color: unset;
      }
    }

    .menu-image {
      width: 15px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: "";
        width: 15px;
        height: 15px;
        display: block;
        background-color: var(--bs-bg-routerlink);
      }
    }

    .menu-icon1::before {
      -webkit-mask: url("@images/menu1.svg") no-repeat center / contain;
      mask: url("@images/menu1.svg") no-repeat center / contain;
      width: 12px;
      height: 12px;
    }

    .menu-item2::before {
      -webkit-mask: url("@images/menu2.svg");
      mask: url("@images/menu2.svg");
      width: 13px;
      height: 11px;
      margin-right: 7px;
    }

    .menu-icon3::before {
      -webkit-mask: url("@images/menu-ext-payment.svg");
      mask: url("@images/menu-ext-payment.svg");
      width: 12px;
      height: 12px;
      margin-right: 8px;
    }

    .menu-icon4::before {
      -webkit-mask: url("@images/menu-target.svg") no-repeat center / contain;
      mask: url("@images/menu-target.svg") no-repeat center / contain;
    }

    .menu-icon5::before {
      -webkit-mask: url("@images/menu-super_share.svg");
      mask: url("@images/menu-super_share.svg");
      width: 12px;
      height: 10px;
      margin-right: 8px;
    }

    .menu-icon6::before {
      -webkit-mask: url("@images/menu-super_share.svg");
      mask: url("@images/menu-super_share.svg");
      width: 12px;
      height: 10px;
      margin-right: 8px;
    }

    .menu-icon7::before {
      -webkit-mask: url("@images/menu-remove_admin.svg") no-repeat center /
        contain;
      mask: url("@images/menu-remove_admin.svg") no-repeat center / contain;
    }

    .menu-item8::before {
      -webkit-mask: url("@images/menu8.svg");
      mask: url("@images/menu8.svg");
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }

    .menu-item9::before {
      -webkit-mask: url("@images/sign-out.svg");
      mask: url("@images/sign-out.svg");
      width: 15px;
      height: 15px;
      margin-right: 5px;
    }

    .router-link-active {
      color: var(--bs-text-header);
      background: var(--bs-bg-routerlink);

      .menu-image::before {
        background-color: var(--bs-text-header);
      }

      .menu-text {
        color: var(--bs-text-header);
      }
    }
  }

  a {
    color: #000;
  }
}
</style>