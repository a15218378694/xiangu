import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const mall = () => import('@/view/mall.vue')
const GoodsDetail = () => import('@/view/GoodsDetail.vue')
const OrderDet = () => import('@/view/OrderDet.vue')
const GroundDet = () => import('@/view/GroundDet.vue')
const GroundDetApp = () => import('@/view/GroundDetApp.vue')
const Search = () => import('@/view/Search.vue')
const shopCart = () => import('@/view/shopCart.vue')
const moreGround = () => import('@/view/moreGround.vue')
const typeDet = () => import('@/view/typeDet.vue')
const playDet = () => import('@/view/playDet.vue')
const yaoqing = () => import('@/view/yaoqing.vue')
const groundDetSerList = () => import('@/view/groundDetSerList.vue')


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
      path: "/groundDetOut",
      component: groundDetSerList
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
