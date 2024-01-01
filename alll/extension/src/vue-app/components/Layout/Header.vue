<template>
  <div class="header">
    <div class="header-title">
      <div class="left">
        <img class="logo-app" alt="">
        <div class="title">
          <div class="main-title text-color-header">{{$t('title.title')}}</div>
          <div class="version text-color-header">{{$t('title.version')}}</div>
        </div>
      </div>
    </div>
    <div class="header-menu">
      <button type="button" class="btn btn-menu text-color-header" @click="goToMenu">
        <span><i class="bi bi-list text-color-header"></i></span>
        {{$t('title.menu')}}
      </button>
    </div>
  </div>
</template>
<script>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'
export default {
  setup(){
    const store = useStore();
    const router = useRouter();
    const routerName = store.getters.getUserInfo.role ?  'account' :  'login'
    const goToMenu = ()  => {
      router.push({name: routerName})
    }
    return {goToMenu}
  }
};
</script>
<style lang="scss" scoped>

.header-title {
  display: flex;
  align-items: center;

  .left {
    display: flex;
  }

  .title {
    margin-left: 10px;

    .main-title {
      font-size: 18px;
      font-family: Bold;
    }

    .version {
      font-size: 12px;
      opacity: 0.7;
    }
  }
}

.header-menu {
  display: flex;
  align-items: center;
  font-family: Medium;
  .btn-menu{
    border: 1px sloid var(--bs-background-btn);
    background: var(--bs-background-btn);
    height: 32px;
    display: flex;
    align-items: center;

    .bi-list {
      margin-right: 5px;
    }
  }
}
</style>