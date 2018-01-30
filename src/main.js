// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@/assets/css/header.css";
import "@/assets/css/base.css";
import "@/assets/css/groundDet.css";
import "@/assets/css/groundItem.css";
import "@/assets/icon/iconfont.css";

import Vue from "vue";
import Vuex from "vuex";
import VueLazyload from "vue-lazyload";
import infiniteScroll from "vue-infinite-scroll";
import App from "./App";
import http from "./utils/http";
import api from "./utils/api";
import router from "./router";
import axios from "axios";
import "mint-ui/lib/style.css";
import bridge from './constant/nativeJSBridge';

Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyload, {
  loading: require("./assets/img/common/loading.gif")
});

Vue.config.productionTip = false;
new function() {
  var _self = this;
  _self.width = 750; //设置默认最大宽度
  _self.fontSize = 100; //默认字体大小
  _self.widthProportion = function() {
    var p =
      ((document.body && document.body.clientWidth) ||
        document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
    // > 1 ? 1 : p < 0.5 ? 0.5 : p;
    return p;
  };
  _self.changePage = function() {
    document
      .getElementsByTagName("html")[0]
      .setAttribute(
        "style",
        "font-size:" +
          _self.widthProportion() * _self.fontSize +
          "px !important"
      );
  };
  _self.changePage();
  window.addEventListener(
    "resize",
    function() {
      _self.changePage();
    },
    false
  );
}();

new Vue({
  el: "#app",
  router,
  mounted() {
    
  },
  methods: { 

  },
  template: "<App/>",
  components: { App }
});
