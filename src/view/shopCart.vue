<template>
  <div>
    <div class="shopCartPage">
      <nav-header>
        <span slot="header">购物车</span>
        <span slot="del" class="del" @click="delGood">移出商品</span>
      </nav-header>

      <div v-if="hasGoods">
        <div class="shopCartGoods">
          <v-touch v-for="(item,index) in shopCartGoods" :key="index" v-bind:pan-options="{ direction: 'horizontal', threshold: 100 }" v-on:swipeleft="onSwipeLeft(item)" v-on:swiperight="onSwipeRight(item)" class="goodsItemInfo">
            <div class="infoDet" v-on:click.stop="toGoodsDet(item.pid)">
              <div class="left">
                <img v-if="!item.isSelected" v-on:click.stop="selected(item)" class="sel" src="../assets/img/shopCart/购物车_slices/Oval@2x.png" alt="">
                <img v-else v-on:click.stop="selected(item)" class="sel" src="../assets/img/shopCart/购物车_slices/勾选@2x.png" alt="">
                <img :src="item.image" alt="">
              </div>
              <div class="right">
                <div class="one">{{item.title}}</div>
                <div class="two">
                  <template v-for="(item1,index1) in item.productSizes">
                    <div :key="index1" class="twoItem">
                      <span v-for="(item1Item,item1Key) in item1" :key="item1Key">
                        {{ item1Item }}
                      </span>份
                    </div>
                  </template>
                </div>
                <div class="three">
                  <div class="num">X{{item.buyTotalnum}}</div>
                </div>
                <!-- <div class="closeDel" :class="{'tranShow': shopCartGoods[index].isTranShow}">
                  <span class="del" @click.stop="delGood(item,index)">删除</span>
                </div> -->
              </div>
            </div>
          </v-touch>
        </div>

        <div class="view-more-normal" v-if="shopCartGoods.length && loading" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
          <img style="width:20px;height:20px;" src="../assets/img/common/loading_image@2x.png">
          <!-- <div v-if="this.totalPage <= this.page && !loading">到底部了</div> -->
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
    </div>
    <div v-if="!shopCartGoods.length" class="empty">购物车是空的</div>
  </div>
</template>

<script>
import Vue from "vue";
import api from "../utils/api";
import http from "../utils/http";
import util from "../utils/util";
import navHeader from "@/components/navHeader.vue";
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
var VueTouch = require("vue-touch");
Vue.use(VueTouch, { name: "v-touch" });
export default {
  data: function() {
    return {
      totalPrice: 0,
      shopCartGoods: [{}],
      page: 1,
      totalPage: 0,
      busy: true,
      loading: false,
      endGuigessItemArr: [],
      endGuigessItemArrItem: [],
      endGuigess: [],
      hasGoods: true
    };
  },
  mounted() {
    this.getShopGoods();
    // if (this.shopCartGoods.length == 0) {
    //   this.hasGoods = false;
    // }
  },
  computed: {},
  methods: {
    sureGoOrder: async function(totalPrice) {
      let params = [];
      let paramsObj = {};
      this.shopCartGoods.forEach((v, i) => {
        if (v.isSelected) {
          console.log(v.sid);
          paramsObj.pid = v.pid;
          paramsObj.sid = v.sid;
          params.push(paramsObj);
          paramsObj = {};
          v.productSizes.forEach((v1, i1) => {
            for (let key in v1) {
              if (v1.hasOwnProperty(key)) {
                if (key !== "buynum" && key !== "buyprice") {
                  this.endGuigessItemArrItem.push({ sizes: v1[key] });
                } else if (key == "buynum") {
                  this.endGuigessItemArrItem.push({ num: v1[key] });
                }
              }
            }
            this.endGuigessItemArr.push(this.endGuigessItemArrItem);
            this.endGuigessItemArrItem = [];
          });
          this.endGuigess.push(this.endGuigessItemArr);
          this.endGuigessItemArr = [];
        }
      });

      const res = await http.post1(api.order, params);
      console.log(this.endGuigess);
      if (res.data) {
        this.$router.push({
          path: "orderDet",
          query: {
            orderDetData: JSON.stringify(res.data),
            shopCartGoods: JSON.stringify(this.shopCartGoods),
            endGuigess: JSON.stringify(this.endGuigess),
            totalNum: this.num,
            totalNums: this.totalNums,
            buyway: this.buy_way,
            teamId: `novalues`

            // orderId: res.data.myorders.orderid
          }
        });
      }
    },
    goPayPri() {
      let flag = this.isSelFlag(this.shopCartGoods);
      if (!flag) {
        this.sureGoOrder(this.totalPrice);
      } else {
        Toast("请先选择商品");
      }
    },
    onSwipeLeft(item) {
      item.isTranShow = true;
    },
    onSwipeRight(item) {
      item.isTranShow = false;
    },
    toGoodsDet(goodsId) {
      this.$router.push({
        path: "goodsDetail",
        query: {
          goodsId
        }
      });
    },
    selected(item) {
      item.isSelected = !item.isSelected;
      this.comTot();
    },
    comTot() {
      let totP = 0;
      this.totalPrice = 0;
      this.shopCartGoods.forEach((v, i) => {
        v.productSizes.forEach((v1, i1) => {
          if (v.isSelected) {
            totP += v1.buyprice * v1.buynum;
          }
        });
      });
      this.totalPrice = totP.toFixed(2);
      // this.getTotPrice()
    },
    //打开页面默认获取数据
    getShopGoods() {
      this.loading = true;
      this.fetchShopCart(
        {
          page: this.page
        },
        res => {
          this.loading = false;
          let list = [...res.data.list];
          list.forEach((v, i) => {
            v.isSelected = false;
            v.isTranShow = false;
          });
          this.shopCartGoods = [...list];
          if (this.shopCartGoods.length > 0) {
            this.hasGoods = true;
          } else {
            this.hasGoods = false;
          }
              this.comTot();

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
      let flag = this.isSelFlag(this.shopCartGoods);
      if (!flag) {
        MessageBox({
          title: "提示",
          message: "确定要将此商品移出购物车吗?",
          showCancelButton: true
        }).then(aa => {
          if (aa == "confirm") {
            let delArr = [];
            this.shopCartGoods.forEach((v, i) => {
              if (v.isSelected) {
                delArr.push({
                  pid: v.pid,
                  sid: v.sid,
                  cartNum: v.buynum
                });
              }
            });
            this.fetchDeledGoods(delArr, res => {
              Toast("删除成功");
              this.page = 1;
              this.getShopGoods();
            });
          }
        });
      } else {
        return Toast("请先选择要删除的商品");
      }
    },
    fetchDeledGoods: async function(params, callS) {
      const res = await http.post1(api.delete, params);
      if (res.data) {
        this.loading = false;
        callS && callS(res);
      }
    },
    isSelFlag(arr) {
      return arr.every(v => {
        return v.isSelected == false;
      });
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
    padding: 0.3rem 0.27rem 0 0.8rem;
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
          top: 42%;
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
          line-height: 0.3rem;
          font-size: 0.3rem;
        }
        .two {
          color: rgba(137, 137, 137, 1);
          // height: 1.44rem;
          margin-top: 0.15rem;
          .twoItem {
            width: 4.5rem;
            height: 0.4rem;
            line-height: 0.4rem;
            margin-bottom: 0.12rem;
            background: rgba(242, 242, 242, 1);
            border-radius: 0.05rem;
            font-size: 0.18rem;
            font-family: PingFangSC-Regular;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
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
          background-color: #ea7b35;
          color: #ffffff;
          position: absolute;
          top: 0.3rem;
          right: 0;
          transform: translateX(150%);
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
    left: 0;
    right: 0;
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
.empty {
  text-align: center;
  padding-top: 3rem;
}
</style>