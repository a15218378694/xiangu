<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import http from "./utils/http";
import api from "./utils/api";
import util from "./utils/util";
!(function(window) {
  var n = document.documentElement,
    rootfont,
    isMobile,
    i = document.createElement("style");
  n.firstElementChild.appendChild(i);

  function infinite() {
    var docW = window.innerWidth;

    if (
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      )
    ) {
      isMobile = true;
    }
    if (isMobile) {
      if (docW < 320) {
        docW = 320;
        rootfont = 100 / 750 * docW;
        i.innerHTML = "html{font-size:" + rootfont + "px!important;}";
      } else if (docW <= 750) {
        rootfont = 100 / 750 * docW;
        i.innerHTML = "html{font-size:" + rootfont + "px!important;}";
      } else {
        i.innerHTML = "html{font-size:100px!important;}";
      }
    } else {
      if (docW < 320) {
        docW = 320;
        rootfont = 50 / 750 * docW;
        i.innerHTML = "html{font-size:" + rootfont + "px!important;}";
      } else if (docW <= 750) {
        rootfont = 50 / 750 * docW;
        i.innerHTML = "html{font-size:" + rootfont + "px!important;}";
      } else {
        i.innerHTML = "html{font-size:50px!important;}";
      }
    }
  }
  window.addEventListener(
    "resize",
    function() {
      infinite();
    },
    !1
  );

  window.addEventListener(
    "pageshow",
    function(e) {
      e.persisted && infinite();
    },
    !1
  ),
    infinite();
})(window);
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
      if (this.$bridge.getSheBei() == "Android") {
        let token = util.getStore("token");
        axios.defaults.headers.common["tonken"] = token;
      }
      if (this.$bridge.getSheBei() == "iPhone") {
        let iosData = {
          isHidden: "0"
        };
        if (to.path == "/" || to.path == "/mall") {
          iosData.isHidden = "1";
        }
        this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("isHiddenBar", iosData, function(resp) {});
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
