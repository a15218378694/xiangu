<template>

  <div>
    <nav-header>
      <span class="orderDetTit" slot="header">玩法详情</span>
    </nav-header>
    <img src="../assets/img/mall/wanfaDet.png" alt="">
  </div>
</template>

<script>
import NavHeader from "../components/navHeader.vue";

export default {
  name: "name",
  data: function() {
    return {};
  },
  methods: {},
  components: {
    NavHeader
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>