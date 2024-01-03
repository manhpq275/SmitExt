<template>
  <div class="comp-wrapper">
    <div class="top">
      <div>
        <img src="@images/share-pixel.svg" class="top-icon" />
      </div>
      <div>
        <div class="top-title">Share Pixel</div>
      </div>
    </div>
    <div class="top-desc">
      Share Pixel is a tool to support sharing Pixel for many individual
      accounts at the same time without having to have the right to manage that
      individual account
    </div>
    <div class="mid">
      <div>
        <label for="idbm"> Id BM </label
        ><input
          id="idbm"
          type="text"
          placeholder="Enter the BM ID containing the Pixel for which you have Admin rights"
          class="share_pixel-control mid-input form-control"
        />
      </div>
      <div>
        <label for="idpx"> Id Pixel </label
        ><input
          id="idpx"
          type="text"
          placeholder="Enter the Pixel ID. Note: Pixel must be owned by BM entered above."
          class="share_pixel-control mid-input form-control"
        />
      </div>
      <div>
        <label for="idad"> Id Ads </label
        ><textarea
          rows="3"
          :placeholder="idAdsPlaceHolder"
          id="idad"
          class="share_pixel-control mid-input form-control"
        ></textarea>
      </div>
      <div class="d-flex justify-content-between">
        <div></div>
        <button class="submit-btn">Share</button>
      </div>
      <!---->
    </div>
  </div>
</template>

<script>
export default {
  name: "SharePixel",
  data() {
    return {
    };
  },
  computed: {
    idAdsPlaceHolder() {
      return `Enter the IDs of the individual accounts you want to share the Pixel.
Note: The individual accounts are separated by commas. For example: 1000xxx, 1000xxx, ...`;
    },
  },
};
</script>

<style lang="scss" scoped>
.top{
  display: flex;
  align-items: center;
  .top-icon{
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 9px;
    background: #35c96e;
    padding: 8px;
    margin-right: 8px;
  }
  .top-title{
    font-family: 'Heavy';
    font-size: 28px;
  }
}
.top-desc{
  margin-top: 10px;
  font-size: 15px;
}
.mid{
  margin-top: 40px;
  label{
    font-family: Medium;
    margin-bottom: 5px;
  }
  input,
  textarea{
    padding: 11px 10px;
    background: #fff;
    font-size: 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .mid-input{
    margin-bottom: 15px;
  }
  textarea.form-control {
    min-height: calc(1.5em + 0.75rem + 2px);
  }
}
.justify-content-between {
  display: flex;
  justify-content: space-between !important;
}
.submit-btn{
  width: 120px;
  height: 42px;
  padding: 0 30px;
  font-family: Bold;
  color: #fff;
  margin-top: auto;
  float: right;
  font-size: 15px;
  background: linear-gradient(180deg, #7cc09f, #45926a);
  border: 1px solid #fafffc;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.09);
  backdrop-filter: blur(17px);
  transition: all 0.2s;
  border-radius: 10px;
}
</style>