<template>
  <div class="shopCartPage">

    <nav-header>
      <span slot="header">购物车</span>
    </nav-header>

    <div class="shopCartGoods">
      <template v-for="(item,index) in shopCartGoods">
        <v-touch :key="index" v-bind:pan-options="{ direction: 'horizontal', threshold: 100 }" v-on:swipeleft="onSwipeLeft(item)" v-on:swiperight="onSwipeRight(item)" class="goodsItemInfo">
          <div class="infoDet" v-on:click.stop="toGoodsDet">
            <div class="left">
              <img v-if="!item.isSelected" v-on:click.stop="selected(item)" class="sel" src="../assets/img/shopCart/购物车_slices/Oval@2x.png" alt="">
              <img v-else v-on:click.stop="selected(item)" class="sel" src="../assets/img/shopCart/购物车_slices/勾选@2x.png" alt="">
              <img :src="item.image" alt="">
            </div>
            <div class="right">
              <div class="one">{{item.title}}</div>
              <div class="two">款式：
                <template v-for="(item1,index1) in shopCartGoods.productSizes">
                  <span :key="index1">
                    <span v-for="(item1Item,item1Key) in item1" :key="item1Key">
                      {{ item1Item }}
                    </span>
                  </span>
                </template>
              </div>
              <div class="three">
                <div class="pri">
                  <span class="priType">原价：</span>
                  <span>￥</span>
                  <span>{{item.offering_price}}</span>
                </div>
                <div class="num">X{{item.buynum}}</div>
              </div>
              <div :class="[item.isTranShow == true?'tranShow':'','closeDel']">
                <span class="del" @click.stop="delGood(item,index)">删除</span>
              </div>
            </div>
          </div>
        </v-touch>
      </template>
    </div>

    <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <img style="width:20px;height:20px;" src="../assets/img/common/loading.gif" v-if="loading">
      <div v-if="this.totalPage <= this.page && !loading">到底部了</div>
    </div>

    <div class="goPay">
      <span class="left">
        <span class="heji">合计：</span>
        <span class="xiushi">￥</span>
        <span class="totPri">{{totalPrice}}</span>
      </span>
      <span class="right" @click="goPayPri">
        <button>立即支付</button>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "../utils/api";
import http from "../utils/http";
import util from "../utils/util";
import navHeader from "@/components/navHeader.vue";
import { Toast } from "mint-ui";
var VueTouch = require("vue-touch");
Vue.use(VueTouch, { name: "v-touch" });
export default {
  data: function() {
    return {
      totalPrice: 0,
      shopCartGoods: [],
      page: 1,
      totalPage: 0,
      busy: true,
      loading: false
    };
  },
  mounted() {
    this.comTot();
    this.getShopGoods();
  },
  computed: {},
  methods: {
    goPayPri() {},
    onSwipeLeft(item) {
      item.isTranShow = true;
    },
    onSwipeRight(item) {
      item.isTranShow = false;
    },
    toGoodsDet() {
      this.$router.push({ path: "goodsDetail" });
    },
    selected(item) {
      item.isSelected = !item.isSelected;
      this.comTot();
    },
    comTot() {
      this.totalPrice = 0;
      this.shopCartGoods.forEach((v, i) => {
        if (v.isSelected) {
          this.totalPrice += v.offering_price;
        }
      });
    },

    //下面是处理接口数据的
    //打开页面默认获取数据
    getShopGoods() {
      this.loading = true;
      this.fetchShopCart(
        {
          page: this.page
        },
        res => {
          this.loading = false;
          this.shopCartGoods = res.data.list;
          this.shopCartGoods.forEach((v, i) => {
            v.isSelected = false;
            v.isTranShow = false;
          });
          this.totalPage = res.data.page_total;
          if (this.page == this.totalPage) {
            this.busy = true;
          } else {
            this.busy = false;
          }
        }
      );
    },
    fetchShopCart: async function(params, callS) {
      const res = await http.get(api.showPro, params);
      if (res.data) {
        this.loading = false;
        callS && callS(res);
      }
    },
    loadMore() {
      this.loading = true;
      util.loadMore(this, that => {
        that.fetchShopCart(
          {
            page: that.page
          },
          res => {
            res.data.list.forEach((v, i) => {
              v.isSelected = false;
            });
            that.shopCartGoods = that.shopCartGoods.concat(res.data.list);
          }
        );
      });
    },
    delGood(item, index) {
      this.fetchDeledGoods(
        [
          {
            pid: item.pid,
            sid: item.sid,
            cartNum: item.buynum
          }
        ],
        res => {
          this.shopCartGoods.splice(index, 1);
          Toast("删除成功");
          this.page = 1;
          this.getShopGoods()
        }
      );
    },
    fetchDeledGoods: async function(params, callS) {
      const res = await http.post1(api.delete, params);
      if (res.data) {
        this.loading = false;
        callS && callS(res);
      }
    }
  },
  components: {
    navHeader
  }
};
</script>

<style scoped lang="less">
.shopCartPage {
  .goodsItemInfo {
    text-align: left;
    padding: 0.3rem 0.27rem 0.33rem 0.8rem;
    background-color: #fff;
    position: relative;
    height: 100%;
    .infoDet {
      overflow: hidden;

      .left {
        float: left;
        margin-right: 0.1rem;
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
        .sel {
          position: absolute;
          left: 0.02rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0.76rem;
          height: 0.76rem;
          padding: 0.2rem;
        }
      }
      .right {
        float: left;

        .one {
          width: 3.31rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 0.3rem;
        }
        .two {
          margin: 0.22rem 0;
          color: rgba(158, 159, 161, 1);
          font-size: 0.24rem;
        }
        .three {
          overflow: hidden;

          .pri {
            float: left;
            color: rgba(255, 109, 0, 1);
            span {
              font-size: 0.3rem;
            }
            .priType {
              font-size: 0.2rem;
            }
          }
          .num {
            float: right;
            font-size: 0.26rem;
            padding-top: 0.04rem;
          }
        }

        .closeDel {
          position: absolute;
          top: 0.3rem;
          right: 0;
          // transform: translateX(50%);
          background-color: #aaa;
          width: 1.3rem;
          height: 1.6rem;
          transition: transform 0.2s;
          .del {
            width: 1.3rem;
            height: 1.6rem;
            line-height: 1.6rem;
            text-align: center;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
          .close {
            position: absolute;
            right: 0;
            top: 0;
            width: 0.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
          }
        }

        .tranShow {
          transform: translateX(0);
        }
      }
    }
  }

  .goPay {
    background-color: #fff;
    height: 1.02rem;
    line-height: 1.02rem;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    font-size: 0.3rem;
    .left {
      float: left;
      width: 4.86rem;
      text-align: right;
      margin-right: 0.3rem;
      .totPri {
        color: rgba(255, 109, 0, 1);
      }
    }
    .right {
      float: right;
      button {
        width: 2.34rem;
        height: 1.02rem;
        background-color: #42bd56;
        color: #fff;
      }
    }
  }
}
</style>