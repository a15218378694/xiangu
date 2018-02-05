// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@/assets/css/header.css";
import "@/assets/css/base.css";
import "@/assets/css/groundDet.css";
import "@/assets/css/groundItem.css";
import "@/assets/icon/iconfont.css";

import Vue from "vue";
import App from './App'
// import VueRouter from 'vue-router'
import Vuex from "vuex";
import VueLazyload from "vue-lazyload";
import infiniteScroll from "vue-infinite-scroll";
import http from "./utils/http";
import api from "./utils/api";
import router from "./router";
import util from "./utils/util";
import "mint-ui/lib/style.css";
import bridge1 from './constant/nativeJSBridge';

import { Loadmore } from 'mint-ui';
// import bridge from './config/bridge.js'
// Vue.prototype.$bridge = Bridge
Vue.component(Loadmore.name, Loadmore);
{
  // const mall = r => require.ensure([], () => r(require('./view/mall.vue')), 'chunkname1')
  // const goodsDetail = r => require.ensure([], () => r(require('./view/goodsDetail.vue')), 'chunkname2')
  // const groundDet = r => require.ensure([], () => r(require('./view/groundDet.vue')), 'chunkname3')
  // const moreGround = r => require.ensure([], () => r(require('./view/moreGround.vue')), 'chunkname4')
  // const orderDet = r => require.ensure([], () => r(require('./view/orderDet.vue')), 'chunkname5')
  // const playDet = r => require.ensure([], () => r(require('./view/playDet.vue')), 'chunkname6')
  // const search = r => require.ensure([], () => r(require('./view/search.vue')), 'chunkname7')
  // const shopCart = r => require.ensure([], () => r(require('./view/shopCart.vue')), 'chunkname8')
  // const typeDet = r => require.ensure([], () => r(require('./view/typeDet.vue')), 'chunkname9')
  // const yanzheng = r => require.ensure([], () => r(require('./view/yanzheng.vue')), 'chunkname10')
  // const yaoqing = r => require.ensure([], () => r(require('./view/yaoqing.vue')), 'chunkname11')
  // Vue.use(VueRouter);
}
Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyload, {
  loading: require("./assets/img/common/loading.gif")
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
{
  // const router = new VueRouter({
  //   linkActiveClass: 'active',
  //   routes: [
  //     {
  //       path: "/",
  //       redirect: "/mall"
  //     },
  //     {
  //       path: "/mall",
  //       // meta: {
  //       //   requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  //       // },
  //       component: mall
  //     },
  //     {
  //       path: "/goodsDetail",
  //       component: goodsDetail
  //     },
  //     {
  //       path: "/moreGround",
  //       component: moreGround
  //     },
  //     {
  //       path: "/groundDet",
  //       component: groundDet
  //     },
  //     {
  //       path: "/search",
  //       component: search
  //     },
  //     {
  //       path: "/yanzheng",
  //       component: yanzheng
  //     },
  //     {
  //       path: "/typeDet",
  //       component: typeDet
  //     },
  //     {
  //       path: "/orderDet",
  //       component: orderDet
  //     },
  //     {
  //       path: "/shopCart",
  //       component: shopCart
  //     },
  //     {
  //       path: "/playDet",
  //       component: playDet
  //     },
  //     {
  //       path: "/yaoqing",
  //       component: yaoqing
  //     }
  //   ]
  // });
}

// bridge.registerHandler('openWebviewBridgeArticle', function() {
//   log("openWebviewBridgeArticle was called with by ObjC")
// })
router.beforeEach((to, from, next) => {
  let loginObj = {
    goLogin: async function () {
      let params = {
        phone: 15218378694
      };
      const res = await http.post(api.send_SMS_verifyCode, params);
      await http.post(api.login_by_verifyCode, {
        phone: 15218378694,
        code: 1234
      });
      if (res.data) {
        next()
      }
    }
  }
  loginObj.goLogin()
})

new Vue({
  el: "#app",
  router,
  bridge1,
  template: "<App/>",
  components: { App }
});
