<template>
  <div>
    <div class="orderDets">
      <nav-header>
        <span class="orderDetTit" slot="header">拼团详情</span>
      </nav-header>
      <div class="perInfo">
        <div class="shouhuo">
          <span class="shouhuoren">收货人：</span>
          <span class="ming">温</span>
          <span class="phone">123</span>
        </div>
        <div class="addr">
          <span class="dizhi">收货地址：</span>
          <span class="dizhiDet">
            <span class="shi">shenz</span>
            <span class="qu">龙华</span>
          </span>
        </div>
        <img class="bianji" src="../assets/img/订单详情_slices/编辑@3x.png" alt="">
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
        <goods-item :orderDetailsArr="orderDetailsArr" :checkedGuige="checkedGuige" :totalNum="totalNum"></goods-item>

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
        <input class="liuyan" type="text" placeholder="点击填写买家留言">
      </div>

      <div class="goPay">
        <span class="left">
          <span class="heji">合计：</span>
          <span class="xiushi">￥</span>
          <span class="totPri">{{totalPrice}}</span>
        </span>
        <span class="right" @click="isShowEven">
          <button>立即支付</button>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import goodsItem from "../components/goodsItem.vue";

import NavHeader from "../components/navHeader.vue";
export default {
  name: "name",
  data: function() {
    return {
      isShow: false,
      isCheck: false,
      orderDetData: {},
      myOrders: {},
      orderDetailsArr: [],
      checkedGuige: [],
      totalGoodsPri: 0,
      totalPrice: 0,
      freight: 0,
      totalNum: 0
    };
  },
  methods: {
    isShowEven(buyTypeDet) {
      this.isShow = !this.isShow;
      this.buyType = buyTypeDet;
    },
    comTotleGoodsPri() {
      this.totalPrice = this.myOrders.prices;
      this.freight = this.myOrders.orderDetails.freight;
      this.totalGoodsPri = this.totalPrice - this.freight;
    }
  },
  components: {
    goodsItem,
    NavHeader
  },
  mounted() {
    //传过来的混合数据
    this.orderDetData = JSON.parse(this.$route.query.orderDetData);
    //传递过来的规格
    this.checkedGuige = JSON.parse(this.$route.query.checkedGuige);

    // 订单商品信息集合
    this.myOrders = this.orderDetData.myorders;
    // 订单商品信息数组
    this.orderDetailsArr = this.myOrders.orderDetails.orderDetails[0].shoppingCat;
    //计算商品总价
    this.comTotleGoodsPri();
    //计算总数量
    this.checkedGuige.forEach((v, i) => {
      this.totalNum += parseInt(v[v.length - 1].num);
    });
  }
};
</script>

<style scoped lang="less">
.orderPageHeader {
  background-color: #fff;
  width: 100%;
  height: 0.88rem;
  text-align: center;
  position: relative;
  line-height: 0.88rem;
  border-bottom: 0.02rem solid #dfdfdf;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 0.17rem;
    height: 0.29rem;
    padding: 0.29rem 0.3rem;
    box-sizing: content-box;
  }
  .close {
    width: 0.3rem;
    height: 0.3rem;
  }
  .orderDetTit {
    text-align: center;
  }
}

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