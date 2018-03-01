import Vue from "vue";
import Router from "vue-router";
import mall from "@/view/mall.vue";
import GoodsDetail from "@/view/goodsDetail.vue";
import OrderDet from "@/view/orderDet.vue";
import Yanzheng from "@/view/yanzheng.vue";
import GroundDet from "@/view/groundDet.vue";
import GroundDetApp from "@/view/groundDetApp.vue";
import Search from "@/view/search.vue";
import shopCart from "@/view/shopCart.vue";
import moreGround from "@/view/moreGround.vue";
import typeDet from "@/view/typeDet.vue";
import playDet from "@/view/playDet.vue";
import yaoqing from "@/view/yaoqing.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/mall"
    },
    {
      path: "/goodsDetail",
      component: GoodsDetail
    },
    {
      path: "/moreGround",
      component: moreGround
    },
    {
      path: "/groundDet",
      component: GroundDet
    },
    {
      path: "/groundDetApp",
      component: GroundDetApp
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/yanzheng",
      component: Yanzheng
    },
    {
      path: "/mall",
      component: mall
    },
    {
      path: "/typeDet",
      component: typeDet
    },
    {
      path: "/orderDet",
      component: OrderDet
    },
    {
      path: "/shopCart",
      component: shopCart
    },
    {
      path: "/playDet",
      component: playDet
    },
    {
      path: "/yaoqing",
      component: yaoqing
    }
  ]
});
