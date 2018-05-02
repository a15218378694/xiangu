// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@/assets/css/header.css";
import "@/assets/css/base.css";
import "@/assets/css/groundDet.css";
import "@/assets/css/groundItem.css";
import "@/assets/icon/iconfont.css";

import Vue from "vue";
import './components/global'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
import App from './App'
import Vuex from "vuex";
import VueLazyload from "vue-lazyload";
import infiniteScroll from "vue-infinite-scroll";
import util from "./utils/util";
import router from "./router";
import axios from 'axios';
import "mint-ui/lib/style.css";
import api from "./utils/api";
import bridgeBack from './constant/nativeJSBridge';
import {
  Loadmore
} from 'mint-ui';

import bridge from './config/bridge.js'
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
Vue.config.devtools = true
Vue.prototype.$bridge = bridge
window.winBri = bridge
Vue.component(Loadmore.name, Loadmore);
Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyload, {
  loading: require("./assets/img/common/loading_image@2x.png")
});
const store = new Vuex.Store({
  state: {
    cartCount: 0
  },
  mutations: {
    updateCartCount(state, cartCount) {
      state.cartCount += cartCount;
    }
  }
});

Vue.config.productionTip = false;
new function () {
  var _self = this;
  _self.width = 750; //设置默认最大宽度
  _self.fontSize = 100; //默认字体大小
  _self.widthProportion = function () {
    var p =
      ((document.body && document.body.clientWidth) ||
        document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
    // > 1 ? 1 : p < 0.5 ? 0.5 : p;
    return p;
  };
  _self.changePage = function () {
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
    function () {
      _self.changePage();
    },
    false
  );
}();

router.beforeEach((to, from, next) => {
  if (winBri.getSheBei() !== "iPhone" && winBri.getSheBei() !== "Android") {
    // util.goLogin()
  }
  next()
})
new Vue({
  el: "#app",
  router,
  created() {
    let token = util.getStore("token");
    axios.defaults.headers.common["tonken"] = token || 'xtm0552116446';
    this.chanToken()
  },
  mounted() {
    window.vue = this;

  },
  methods: {
    chanToken() {
      window.changeToken = function (hyToken) {
        //测试token xtm0552116446
        // util.toastEven(hyToken, true)
        util.setStore("token",hyToken);
        // axios.defaults.headers.common["tonken"] = hyToken

      }
    }
  },
  bridgeBack,
  store,
  render: h => h(App)
});
