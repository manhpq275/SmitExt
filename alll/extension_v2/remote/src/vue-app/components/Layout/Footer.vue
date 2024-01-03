<template>
  <div class="footer">
    <div class="left">
      {{ $t("title.create-by") }}
      <a :href="siteLink" target="_blank" class="highlight">
        <img class="sub-logo" />
      </a>
      {{ $t("title.sponsored-by") }}
      <a
        href=" https://fb.com/groups/dcgr.net/ "
        target="_blank"
        class="highlight"
      >
        {{ $t("title.dc-group") }}
      </a>
    </div>
    <div class="right">
      <div class="product-text">
        {{ $t("title.product-of") }}
        <a target="_blank" :href="siteLink" class="highlight">
          <span class="footer-link btn-cm">{{ siteName }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      siteName: process.env.SITE_NAME,
      siteLink: process.env.SITE_LINK,
    };
  },
};
</script>
<style lang="scss" scoped>
.footer {
  height: 40px;
  display: flex;
  font-family: Reg;
  padding: 0px 20px;
  border-radius: 9px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: hsla(0, 0%, 100%, 0.47);
}

.left {
  display: flex;
  align-items: center;
}

.highlight {
  font-family: Bold;
  padding: 0 6px;
  color: var(--bs-text-color);
  text-decoration: none;
}

.footer-link {
  font-family: Medium;
  padding: 7px;
  font-size: 12px;
  border-radius: 3px;
}

.product-text {
  color: #212529;
}
</style>