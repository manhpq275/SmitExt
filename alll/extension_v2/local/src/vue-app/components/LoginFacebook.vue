<template>
  <div class="login-facebook">
    <img src="@images/login-facebook.png" alt="" />
    <h3>Not logged in Facebook</h3>
    <p>Please login to Facebook to be able to use the features</p>
    <div class="login-facebook__btn" @click="onClickFacebookBtn">
      <img src="@images/facebook-icon.svg" alt="" />
      <span>Login Facebook</span>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "LoginFacebook",
  methods: {
    onClickFacebookBtn() {
      chrome.tabs.create({ url: "https://www.facebook.com/", active: true });
    },
  },
};
</script>
  
<style lang="scss" scoped>
.login-facebook {
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  position: absolute;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  flex-direction: column;
  justify-content: center;

  h3 {
    font-family: "Bold";
  }

  &__btn {
    height: 40px;
    display: flex;
    padding: 0 15px;
    transition: 0.3s;
    border-radius: 3px;
    align-items: center;
    border: 1px solid #1877f2;
    cursor: pointer;

    &:hover {
      background: rgba(0, 178, 255, 0.1);
    }

    span {
      font-size: 16px;
      margin-left: 5px;
      color: #1877f2;
      font-family: "Bold";
    }
  }
}
</style>