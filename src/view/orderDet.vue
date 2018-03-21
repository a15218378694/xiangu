<template>
  <div>
    <div class="orderDets">
      <nav-header>
        <span class="orderDetTit" slot="header">订单详情</span>
      </nav-header>
      <div class="perInfo" @click="editAddr">
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
        <goods-item :orderDetailsArr="shoppingCatArr" :totalNum="totalNum"></goods-item>

        <div class="infoPri">
          <div class="xiaojiBox">
            <span class="left">小计：</span>
            <span class="right">
              <span class="rightOne">￥</span>
              <span class="rightTwo">{{totalGoodsPri}}</span>
            </span>
          </div>
          <div class="xiaojiBox">
            <span class="left">运费：</span>
            <span class="right">
              <span class="rightOne">￥</span>
              <span class="rightTwo">{{freight}}</span>
            </span>
          </div>
          <div class="xiaojiBox">
            <span class="left">数量：</span>
            <span class="right">
              <span class="rightOne">X</span>
              <span class="rightTwo">{{totalNum || totalNums}}</span>
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
          <button :class="[daoji? 'unClick': '']">立即支付
            <span v-if="daoji">{{daoji}}秒</span>
          </button>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import http from "../utils/http";
import util from "../utils/util";
import api from "../utils/api";
import goodsItem from "../components/goodsItem.vue";
import NavHeader from "../components/navHeader.vue";
import { MessageBox } from "mint-ui";

export default {
  name: "name",
  data: function() {
    return {
      liuyanInfo: "",
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
      endGuigess: [],
      lastPage: "",
      curCom: "orderDet",
      btn_done: false,
      daoji: 3,
      province: "",
      city: "",
      locationProvince: ""
    };
  },
  methods: {
    getData() {
      let that = this;
      this.$jsonp("http://api.map.baidu.com/location/ip", {
        ak: "Pswwb3LjDlxDt5KhGQxqn6zhS8hbQAHv"
      })
        .then(json => {
          let prov = json.content.address_detail.province;
          that.locationProvince = prov;
          that.getGroudDet(true, that.getGroundDetCall);
        })
        .catch(err => {
          // Failed.
        });
    },
    fetchGoodsDet: async function() {
      let that = this;
      this.getData();
      let params = {
        name: this.perName, //收货人
        telephone: this.perPhone, // 收货人电话
        address: this.perAddr, //收货人地址
        totalprice: this.prices,
        freight: this.freight,
        shoppingCat: this.shoppingCatArr,
        teamId: this.teamId,
        province: this.province,
        city: this.city,
        buyway: 1,
        locationProvince: this.locationProvince,
        remarkMessage: this.liuyanInfo //留言信息
      };
      if (this.totalNums > 0) {
        params.total_num = this.totalNums;
      } else if (this.totalNums <= 0) {
        params.total_num = this.totalNum;
      }
      if (this.buyway) {
        params.buyway = this.buyway;
      }
      let res = await http.post1(api.submitorder, params);
      if (res.data) {
        if (res.data.code == 2) {
          return MessageBox("提示", res.data.msg);
        }
        this.totalPrice = res.data.totalPrice;
        this.urlParams = `?orderId=${res.data.orderId}&teamId=${this.teamId}`;
        this.groundDetUrl = `${api.baseUrl}/#/groundDet${this.urlParams}`;
        this.orderId = res.data.orderId;
        this.sendOrderID();
      }
    },
    getOrderId() {
      if (this.daoji) {
        return;
      }
      if (!this.perName || !this.perPhone || !this.perAddr) {
        return MessageBox("提示", "请填写完整收货信息");
      }

      if (this.orderId) {
        return this.sendOrderID();
      }
      this.fetchGoodsDet();
    },
    sendOrderID() {
      if (winBri.getSheBei() == "Android") {
        vuePay.showInfoFromJs(
          this.orderId,
          this.teamId,
          this.totalPrice,
          this.groundDetUrl
        );
      } else if (winBri.getSheBei() == "iPhone") {
        let iosData = {
          orderId: this.orderId,
          teamId: this.teamId,
          money: this.totalPrice,
          groundDetUrl: this.groundDetUrl
        };
        this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("didPay", iosData, function(resp) {});
        });
      }
    },
    comTotleGoodsPri() {
      this.totalGoodsPri = this.prices - this.freight;
    },
    getCurSel1() {
      let that = this;
      window.getCurSel = function(perName, perPhone, perAddr, province, city) {
        console.log(perName, perPhone, perAddr, province, city);
        util.toastEven(city);
        that.perPhone = "";
        that.perName = perName;
        that.perPhone = perPhone;
        that.perAddr = perAddr;
        that.province = province;
        that.city = city;
      };
    },
    editAddr() {
      if (winBri.getSheBei() == "Android") {
        vuePay.showAddressFromJs();
      } else if (winBri.getSheBei() == "iPhone") {
        this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("didShippingAddress", "123", function() {});
        });
      }
    }
  },
  created() {
    this.getData();
    this.getCurSel1();
    // this.changeBtn();
    this.lastPage = this.$route.query.curPage;
    this.orderDetData = JSON.parse(this.$route.query.orderDetData); //传过来的混合数据
    this.perName = this.orderDetData.name;
    this.perPhone = this.orderDetData.phone;
    this.perAddr = this.orderDetData.address;
    this.province = this.orderDetData.province;
    this.city = this.orderDetData.city;
    // this.orderId = this.$route.query.orderId; //订单号
    this.status = this.orderDetData.myorders.status; //订单状态：1、待付款，2、待发货，3、待成团，4、已发货，5、已完成，6、已关闭7，待退款'
    this.proNum = this.orderDetData.myorders.proNum; // 商品的总数量
    this.prices = this.orderDetData.myorders.prices.toFixed(2); //商品加上运费的总价格
    this.orderDetails = this.orderDetData.myorders.orderDetails; // 订单商品信息集合
    this.orderDetailsArr = this.orderDetails.orderDetails; // 订单商品包括小计数组

    // this.shoppingCatArr = this.orderDetailsArr[0].shoppingCat; // 订单商品数组
    this.freight = this.orderDetails.freight; //运费
    this.buyway = this.$route.query.buyway;
    this.teamId = this.$route.query.teamId;

    //传递过来的规格  分不清的时候就看vue的状态管理，浏览器插件

    if (
      //多套规格
      this.$route.query.checkedGuige &&
      JSON.parse(this.$route.query.checkedGuige).length > 0
    ) {
      this.checkedGuige = JSON.parse(this.$route.query.checkedGuige);

      if (this.$route.query.totalNums) {
        this.totalNums = this.$route.query.totalNums;
      } //一套规格
    } else if (
      this.$route.query.checkedGuige &&
      JSON.parse(this.$route.query.checkedGuige).length <= 0
    ) {
      console.log(JSON.parse(this.$route.query.newGuigess));
      this.checkedGuige[0] = JSON.parse(this.$route.query.newGuigess);
      this.totalNum = this.$route.query.totalNum;
      console.log(this.totalNum);
    }
    if (this.lastPage == "goodsDetail") {
      this.endGuigess = [this.checkedGuige];
    }

    //下面是购物车的情况
    if (this.$route.query.endGuigess) {
      this.endGuigess = JSON.parse(this.$route.query.endGuigess);
    }
    this.orderDetailsArr.forEach((v, i) => {
      //v.shoppingCat[0]拿到商品对象数据
      v.shoppingCat[0].endGuigess = this.endGuigess[i];
      this.shoppingCatArr.push(v.shoppingCat[0]);
    });
    // 订单商品信息集合
    this.myOrders = this.orderDetData.myorders;
    //计算商品总价
    this.comTotleGoodsPri();
    this.timer = setInterval(() => {
      this.daoji--;
    }, 1000);
  },
  components: {
    goodsItem,
    NavHeader
  },
  watch: {
    daoji() {
      if (!this.daoji) {
        clearInterval(this.timer);
      }
    }
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
    border-bottom: 0.02rem solid #f0f0f0;

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
      .xiaojiBox,
      .yunfeiBox,
      .totBox {
        overflow: hidden;
        height: 0.66rem;
        line-height: 0.66rem;
        color: rgba(158, 159, 161, 1);

        .left {
          float: left;
        }
        .right {
          float: right;
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
.unClick {
  background-color: #8a8a8a !important;
}
</style>