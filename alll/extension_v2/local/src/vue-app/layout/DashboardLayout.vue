<template>
  <div class="dashboard-layout">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Layout/Header.vue";
import Footer from "../components/Layout/Footer.vue";

export default {
  name: "DashboardLayout",
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.dashboard-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>