<template>
  <div>
    <header class="orderPageHeader bgcWhite" :class="{'iphHeight':isIph}" tag="header">
      <img class="back" :class="{'iph' : isIph}" v-if="isShow" @click="back" src="../assets/img/订单详情_slices/Arrow@3x.png" alt="">
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
      isShow: true,
      isIph: ""
    };
  },
  mounted() {
    this.detCurRouter();
    if (winBri.getSheBei() == "iPhone") {
      this.isIph = true;
    }
  },
  methods: {
    back() {
      if (
        window.location.hash.includes("groundDetApp") ||
        window.location.hash.includes("groundDetOut")
      ) {
        if (winBri.getSheBei() == "Android") {
          vuePay.showGoHomeFromJs();
        } else if (winBri.getSheBei() == "iPhone") {
          this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler("didQuitAtPresent", "123", function() {});
          });
        }
        return;
      } else if (
        window.location.hash.includes("groundDet") &&
        !window.location.hash.includes("groundDetApp") &&
        !window.location.hash.includes("groundDetOut")
      ) {
        if (winBri.getSheBei() == "iPhone") {
          this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler("returnShoppingHome", "123", function() {});
          });
        } else if (winBri.getSheBei() == "Android") {
          // return this.$router.push('mall')
          vuePay.showGoHomeFromJs();
        }
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

