<template>
  <div>
    <div class="orderDets">
      <nav-header>
        <span class="orderDetTit" slot="header">拼团详情</span>
      </nav-header>
      <div class="perInfo">
        <div class="shouhuo">
          <span class="shouhuoren">收货人：</span>
          <span class="ming">{{perName}}</span>
          <span class="phone">{{perPhone}}</span>
        </div>
        <div class="addr">
          <span class="dizhi">收货地址：</span>
          <span class="dizhiDet">
            <span class="shi">{{perAddr}}</span>
            <!-- <span class="qu">龙华</span> -->
          </span>
        </div>
        <img class="bianji" @click="editAddr" src="../assets/img/订单详情_slices/编辑@3x.png" alt="">
      </div>

      <div class="goods_det1">
        <div class="top">
          <div class="left">
            <div class="leftImg"></div>
          </div>
          <div class="center">订单信息</div>
        </div>
      </div>

      <div class="goodsItemInfo">
        <goods-item :orderDetailsArr="shoppingCatArr" :endGuigess="endGuigess" :totalNum="totalNum"></goods-item>

        <div class="infoPri">
          <div class="xiaojiBox">
            <span class="left">小计：</span>
            <span class="right">
              <span class="rightOne">￥</span>
              <span class="rightTwo">{{totalGoodsPri}}</span>
            </span>
          </div>
          <div class="yunfeiBox">
            <span class="yunfei">运费：</span>
            <span class="yunfeiNum">
              <span class="left">￥</span>
              <span class="right">{{freight}}</span>
            </span>
          </div>
        </div>

      </div>

      <div class="buyerWord">
        <span>买家留言：</span>
        <input v-model="liuyanInfo" class="liuyan" type="text" placeholder="点击填写买家留言">
      </div>

      <div class="goPay">
        <span class="left">
          <span class="heji">合计：</span>
          <span class="xiushi">￥</span>
          <span class="totPri">{{prices}}</span>
        </span>
        <span class="right" @click="getOrderId">
          <button>立即支付</button>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import http from "../utils/http";
import api from "../utils/api";
import { hybrid } from "../utils/appapp";
import goodsItem from "../components/goodsItem.vue";
import { MessageBox } from "mint-ui";

import NavHeader from "../components/navHeader.vue";
export default {
  name: "name",
  data: function() {
    return {
      liuyanInfo: '',
      perName: "",
      perPhone: "",
      perAddr: "",
      addr: {},
      isCheck: false,
      myOrders: {},
      checkedGuige: [],
      totalGoodsPri: 0,
      totalNum: 0,
      checkedGuige: [],
      orderIdObj: {},
      orderDetData: {},
      orderId: "",
      status: 1,
      proNum: 0,
      prices: 0,
      orderDetails: {},
      orderDetailsArr: [],
      shoppingCatArr: [],
      freight: 0,
      buyway: 1,
      teamId: "",
      totalNums: 0,
      endGuigess: []
    };
  },
  created() {
    hybrid.getCurSel = this.getCurSel;
  },
  methods: {
    fetchGoodsDet: async function() {
      let that = this;
      let params = {
        name: this.perName, //收货人
        telephone: this.perPhone, // 收货人电话
        address: this.perAddr, //收货人地址
        remarkMessage: this.liuyanInfo //留言信息
      };
      params.orderId = this.orderId;
      params.totalprice = this.prices;
      if (this.totalNums > 0) {
        params.total_num = this.totalNums;
      } else {
        params.total_num = this.totalNum;
      }
      params.freight = this.freight;
      params.buyway = this.buyway;
      params.shoppingCat = this.shoppingCatArr;
      if (this.teamId) {
        params.teamId = this.teamId;
      }
      let res = await http.post1(api.submitorder, params);
      if (res.data) {
        that.orderIdObj = res.data;
        // that.orderIdObj
        vuePay.showInfoFromJs(
          res.data.orderId,
          res.data.teamId,
          res.data.totalPrice
        );
      }
    },
    getOrderId() {
      this.fetchGoodsDet();
    },
    comTotleGoodsPri() {
      this.totalGoodsPri = this.prices - this.freight;
    },
    getCurSel(preName, perPhone, perAddr) {
      this.preName = preName;
      this.perPhone = perPhone;
      this.perAddr = perAddr;
    },
    editAddr() {
      console.log(vuePay.showAddressFromJs);
      vuePay.showAddressFromJs();
    }
  },

  mounted() {
    this.orderDetData = JSON.parse(this.$route.query.orderDetData); //传过来的混合数据
    this.perName = this.orderDetData.name;
    this.perPhone = this.orderDetData.phone;
    this.perAddr = this.orderDetData.address;
    this.orderId = this.$route.query.orderId; //订单号
    this.status = this.orderDetData.myorders.status; //订单状态：1、待付款，2、待发货，3、待成团，4、已发货，5、已完成，6、已关闭7，待退款'
    this.proNum = this.orderDetData.myorders.proNum; // 商品的总数量
    this.prices = this.orderDetData.myorders.prices.toFixed(2); //商品加上运费的总价格
    this.orderDetails = this.orderDetData.myorders.orderDetails; // 订单商品信息集合
    this.orderDetailsArr = this.orderDetails.orderDetails; // 订单商品包括小计数组
    this.shoppingCatArr = this.orderDetailsArr[0].shoppingCat; // 订单商品数组
    this.freight = this.orderDetails.freight; //运费
    this.buyway = this.$route.query.buyway;
    this.teamId = this.orderDetails.teamId;

    //传递过来的规格
    if (JSON.parse(this.$route.query.checkedGuige).length > 0) {
      this.checkedGuige = JSON.parse(this.$route.query.checkedGuige);
      this.totalNums = this.$route.query.totalNums;
    } else {
      this.checkedGuige = this.checkedGuige.push(
        JSON.parse(this.$route.query.newGuigess)
      );
      this.totalNum = this.$route.query.totalNum;
    }
    this.endGuigess = this.checkedGuige;
    // 订单商品信息集合
    this.myOrders = this.orderDetData.myorders;
    //计算商品总价
    this.comTotleGoodsPri();
    //计算总数量
    if (this.checkedGuige.length > 0) {
      this.checkedGuige.forEach((v, i) => {
        this.totalNum += parseInt(v[v.length - 1].num);
      });
    }
  },
  components: {
    goodsItem,
    NavHeader
  }
};
</script>

<style scoped lang="less">
//公共样式
.orderDets {
  text-align: left;

  .perInfo {
    color: rgb(0, 6, 17);
    background-color: #fff;
    padding: 0.5rem 0.3rem;
    position: relative;
    .shouhuo {
      margin-bottom: 0.63rem;
    }
    .bianji {
      position: absolute;
      right: 0.4rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.3rem;
      height: 0.3rem;
    }
  }

  .goods_det1 {
    background-color: #fff;
    margin-top: 0.2rem;
    border-bottom: 0.01rem solid #f0f0f0;

    .top {
      overflow: hidden;
      height: 0.98rem;
      line-height: 0.98rem;

      padding-left: 0.4rem;
      .left {
        float: left;
        position: relative;
        width: 0.26rem;
        height: 100%;
        .leftImg {
          width: 0.26rem;
          height: 0.26rem;
          background-color: #000;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .center {
        float: left;
        padding-left: 0.36rem;
      }
    }
    .bot_det {
      text-align: center;
      .loadMore {
        width: 100%;
        button {
          width: 2.45rem;
          height: 0.64rem;
          margin: 0 auto;
          line-height: 0.64rem;
          color: #fff;
          background-color: #42bd56;
          border-radius: 0.3rem;
        }
      }
    }
  }

  .goodsItemInfo {
    padding: 0.3rem;
    background-color: #fff;

    .infoPri {
      padding-top: 0.3rem;
      .xiaojiBox {
        overflow: hidden;
        height: 0.66rem;
        line-height: 0.66rem;
        .left {
          float: left;
          color: rgba(158, 159, 161, 1);
        }
        .right {
          color: rgba(79, 80, 84, 1);
          float: right;
          .rightOne {
          }
          .rightTwo {
          }
        }
      }
      .yunfeiBox {
        overflow: hidden;
        height: 0.66rem;
        line-height: 0.66rem;
        .yunfei {
          float: left;
          color: rgba(158, 159, 161, 1);
        }
        .yunfeiNum {
          float: right;
          .left {
          }
          .right {
          }
        }
      }
    }
  }

  .buyerWord {
    padding: 0 0.3rem;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    background-color: #fff;
    color: rgba(130, 130, 132, 1);
    span {
    }
    input {
      height: 1rem;
      border: none;
      padding: 0;
      color: rgba(130, 130, 132, 1);
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