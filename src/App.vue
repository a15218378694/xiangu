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
          fromPath: from.path,
          toPath: to.path
        };
        console.log(JSON.stringify(iosData));
        let that = this;
        this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("isHiddenBar", iosData, function(resp) {
            Toast("回调成功");
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
