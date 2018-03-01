<template>
  <div>
    <header class="orderPageHeader bgcWhite" tag="header">
      <img class="back" v-if="isShow" @click="back" src="../assets/img/订单详情_slices/Arrow@3x.png" alt="">
      <slot name="header"></slot>
      <slot name="del" class="del"></slot>
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
  mounted() {
    this.detCurRouter();
  },
  methods: {
    back() {
      if (window.location.hash.indexOf("groundDetApp") > -1) {
        if (winBri.getSheBei() == "Android") {
          vuePay.showGoHomeFromJs();
        } else if (winBri.getSheBei() == "iPhone") {
          this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler("didShippingAddress", "123", function() {});
          });
        }
        return
      }
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

