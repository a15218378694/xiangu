<template>
  <div>
    <header class="orderPageHeader bgcWhite" tag="header">
      <img class="back" v-if="isShow" @click="back" src="../assets/img/订单详情_slices/Arrow@3x.png" alt="">
      <slot name="header"></slot>
    </header>
    <div class="headerZW"></div>
  </div>

</template>

<script>
export default {
  data: function() {
    return {
      isShow: true
    };
  },
  props: {
    curCom: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.detCurRouter();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    detCurRouter() {
      console.log();
      if (location.hash != "#/mall") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
};
</script>

