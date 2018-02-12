<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import http from "./utils/http";
import api from "./utils/api";
import util from "./utils/util";
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    // this.$bridge.callhandler("ObjC Echo", params, data => {
    //   // 处理返回数据
    // });
  },
  methods: {},
  watch: {
    $route(to, from) {
    if (this.$bridge.getSheBei() == "iPhone") {
        let iosData = {
          isHidden: "0"
        };
        if (to.path == '/' || to.path == '/mall') {
          iosData.isHidden = "1"
        }
        this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("isHiddenBar", iosData, function(resp) {
          });
        });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 0.32rem;
}
</style>
