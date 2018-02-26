<template>
  <div>
    <div class="groundDetPage">
      <nav-header>
        <span class="orderDetTit" slot="header">拼团详情</span>
      </nav-header>

      <ground-step>
        <img class="step" slot="step1" src="../assets/img/拼团详情-未参团_slices/Group 4@3x.png" alt="">
        <img class="step" v-if="this.teamStatus != 2" slot="step2" src="../assets/img/拼团详情-未参团_slices/Group4@2x.png" alt="">
        <img class="step" v-if="this.teamStatus == 2" slot="step2" src="../assets/img/拼团详情-未参团_slices/GroupA 41@2x.png" alt="">
        <img class="step" v-if="this.teamStatus != 3" slot="step3" src="../assets/img/拼团详情-未参团_slices/Group 42@3x.png" alt="">
        <img class="step" v-if="this.teamStatus == 3" slot="step3" src="../assets/img/拼团详情-未参团_slices/Group 4@2x.png" alt="">
      </ground-step>

      <div class="fanliBox bgcWhite">
        <div class="left">
          <img :src="groundDetInfo.image" alt="">
        </div>
        <div class="right">
          <div class="tit">{{groundDetInfo.title}}</div>
          <div class="item_price">
            <span class="ground_price">拼团：
              <span class="mod_ground_price">￥</span>
              <span class="gro_num">{{groundDetInfo.price}}</span>
            </span>
          </div>
          <table cellspacing="0">
            <tr>
              <th></th>
              <th v-for="item in groundDetInfo.rebate" :key="item.id">
                {{ item.name }}
              </th>
            </tr>
            <tr>
              <td>数量</td>
              <td v-for="item in groundDetInfo.rebate" :key="item.id">
                {{ item.num }}
              </td>
            </tr>
            <tr>
              <td>返利</td>
              <td v-for="item in groundDetInfo.rebate" :key="item.id">
                {{ item.price }}
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="detTit">
        <a href="javascript:;">查看订单详情</a>
      </div>

      <div class="killBox bgcWhite">
        <div class="one">
          <img src="" alt=""> 已开团，离拼成还剩
          <span>{{groundDetInfo.balancenum}}</span> 条
        </div>
        <div class="two">
          剩
          <span>{{clock[0]}}</span>:
          <span>{{clock[1]}}</span>:
          <span>{{clock[2]}}</span>自动结束
        </div>
        <div class="three">
          快去邀请好友参团吧！
          <router-link to="playDet">玩法详情</router-link>
        </div>
      </div>

      <div class="entryGround">
        <div class="top">
          <div class="left">
            <div class="leftImg"></div>
          </div>
          <div class="center">参团人数：{{groundDetInfo.join_num}}人</div>
          <div class="right" v-if="groundDetInfo.grouppbooking_people.length > 3">
            剩余库存：
            <span>{{groundDetInfo.balancenum}}</span>条
          </div>
        </div>

        <div v-for="item in groundDetInfo.grouppbooking_people" :key="item.id">
          <div class="bot">
            <div class="leftt">
              <img :src="item.logo" alt="">
            </div>
            <div class="centerr">
              <div class="topp">
                <span class="com">{{item.name}}</span>
                <span class="num">{{item.position}}</span>
              </div>
              <div class="bott">
                {{item.starttime}} 开团
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sure">
        <button class="addCart" @click="goGoodsDet" v-if="isMas == 1">立即参与</button>
        <button class="goOrder" ref="share" @click="goShare">立即分享</button>
      </div>

    </div>

  </div>
</template>

<script>
import NavHeader from "../components/navHeader.vue";
import GroundStep from "../components/groundStep.vue";
import http from "../utils/http";
import api from "../utils/api";
import util from "../utils/util";
import { MessageBox } from "mint-ui";

export default {
  name: "name",
  data: function() {
    return {
      clock: [],
      teamStatus: -1,
      timer: "",
      orderId: "",
      teamId: "",
      goodsId: "",
      isMas: 1,
      groundDetInfo: {
        msg: "sucess",
        image:
          "http://merchant-service.oss-cn-beijing.aliyuncs.com/install/1516937789180.jpeg?Expires=1832297779&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=C5IWB4LbxizV9P6o3DWsKEBhzPw%3D",
        code: 0,
        timeId: "164311",
        balancenum: "12",
        rebate: [
          {
            id: null,
            oid: null,
            name: "团长",
            num: 10000,
            price: 5000
          },
          {
            id: null,
            oid: null,
            name: "营长",
            num: 7000,
            price: 3500
          },
          {
            id: null,
            oid: null,
            name: "排长",
            num: 5000,
            price: 2500
          }
        ],
        join_num: 1,
        pid: 3,
        title: "LED灯箱",
        limit_time: 259200000,
        limit_createtime: 86400000,
        grouppbooking_people: [
          {
            id: null,
            teamId: null,
            logo:
              "http://merchant-service.oss-cn-beijing.aliyuncs.com/install/1516712381297.jpg?Expires=1832072380&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=o9RN2o1uGdidkwj7XTJlrZDAtgQ%3D",
            name: "安度因",
            position: "团长",
            open_person: null,
            starttime: 1517053500000,
            buynum: null,
            orderId: null
          }
        ],
        openteamTimeNum: 1517053500000,
        openteamTime: 1517053500000,
        price: 4.5,
        name: "安度因",
        nowtime: 1517053500000,
        logo:
          "http://merchant-service.oss-cn-beijing.aliyuncs.com/install/1516712381297.jpg?Expires=1832072380&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=o9RN2o1uGdidkwj7XTJlrZDAtgQ%3D",
        position: "团长",
        limit_num: 30000
      }
    };
  },
  mounted() {
    this.orderId = this.$route.query.orderId;
    if (this.$route.query.isMas) {
      this.isMas = this.$route.query.isMas;
    }
    if (this.isMas == 0) {
      this.$refs.share.style['width'] = `100%`;
    }
    if (this.$route.query.teamId) {
      this.teamId = this.$route.query.teamId;
    }
    // this.countdown(15117198744.64);
    this.getGroudDet();
  },
  methods: {
    getGroudDet: async function() {      
      let params = {
        orderId: this.orderId
      };
      if (this.teamId) {
        params.teamId = this.teamId;
      }
      const res = await http.get(api.finishpay, params);
      if (res.data) {
        this.teamStatus = res.data.teamStatus;
        this.goodsId = res.data.pid;
        this.groundDetInfo = res.data;
        if (this.isMas == 0) {
        this.countdown(this.groundDetInfo.OpenCloseTimeNum);
        } else {
        this.countdown(this.groundDetInfo.gBookingCloseTime);
        }
      }
    },
    countdown: function(expire_time) {
      // 清除定时器
      if (this.timer) clearTimeout(this.timer);
      var times = (expire_time - new Date().getTime() / 1000) * 1000;
      util.countdown(this, times);
    },
    goGoodsDet() {
      if (this.goodsId) {
        this.$router.push({
          path: "goodsDetail",
          query: {
            goodsId: this.goodsId
          }
        });
      } else {
        MessageBox("提示", "点太快啦");
      }
    },
    goShare() {
      let urlParams = `?orderId=${this.orderId}`;
      if (this.teamId) {
        urlParams = `?orderId=${this.orderId}&teamId=${this.teamId}`;
      }
      let totUrl = `http://merchant.xljkj.cn/#/yaoqing${urlParams}`;
      console.log(totUrl);
      if (winBri.getSheBei() == "Android") {
        vuePay.showShareFromJs(totUrl);
      } else if (winBri.getSheBei() == "iPhone") {
        this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler("didPay", iosData, function(resp) {});
        });
      }
    }
  },
  components: {
    NavHeader,
    GroundStep
  }
};
</script>

<style scoped lang="less" >
.groundDetPage {
  .fanliBox {
    padding: 0.3rem;
    overflow: hidden;
    border-bottom: 0.01rem solid #f0f0f0;

    .left {
      float: left;
      margin-right: 0.2rem;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
    .right {
      float: left;
      .tit {
        width: 4.63rem;
        font-size: 0.3rem;
        color: rgba(79, 80, 84, 1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      table {
        width: 4.78rem;
        border: 0.01rem solid #dadada;
        text-align: center;
        th {
          text-align: center;
          background-color: #42bd56;
          color: #fff;
          font-size: 0.24rem;
          border-left: 0.01rem solid #dadada;
        }
        th:nth-of-type(1) {
          border-left: none;
          
        }
        td {
          font-size: 0.22rem;
          color: rgba(158, 159, 161, 1);
          border: 0.01rem solid #dadada;
        }
      }
    }
  }

  .detTit {
    height: 0.74rem;
    line-height: 0.74rem;
    color: #9297a3;
    margin-bottom: 0.1rem;
    background-color: #fff;
    text-align: center;
  }

  .killBox {
    padding: 0.21rem 0;
    margin-bottom: 0.01rem;
    text-align: center;
    .one {
      height: 0.6rem;
      line-height: 0.6rem;
      color: rgba(79, 80, 84, 1);
      font-size: 0.3rem;
      img {
      }
      span {
        color: #ff5400;
      }
    }
    .two {
      height: 0.51rem;
      line-height: 0.51rem;
      color: rgba(79, 80, 84, 1);
      font-size: 0.28rem;
      span {
        font-size: 0.26rem;
        font-family: PingFangSC-Regular;
        color: rgba(255, 255, 255, 1);
        width: 0.4rem;
        height: 0.4rem;
        background: rgba(153, 152, 153, 1);
        border-radius: 0.05rem;
      }
    }
    .three {
      height: 0.46rem;
      line-height: 0.46rem;
      a {
        text-decoration: underline;
        color: #59b9e1;
      }
    }
  }
  .entryGround {
    padding: 0 0.4rem;
    background-color: #fff;
    margin-top: 0.1rem;
    padding-bottom: 0.98rem;
    .top {
      overflow: hidden;
      height: 0.98rem;
      line-height: 0.98rem;
      border-bottom: 0.01rem solid #f0f0f0;

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
      .right {
        float: right;
        span {
          color: #ff6d00;
        }
      }
    }
    .bot {
      padding: 0.2rem 0;
      display: flex;
      border-bottom: 0.01rem solid #f0f0f0;

      .leftt {
        img {
          width: 0.9rem;
          height: 0.9rem;
          margin-right: 0.15rem;
        }
      }
      .centerr {
        flex: 1;
        display: flex;
        flex-flow: wrap;
        flex-direction: column;
        text-align: left;
        .topp {
          text-align: left;
          .com {
            padding-right: 0.15rem;
            font-size: 0.3rem;
            color: rgba(79, 80, 84, 1);
          }
          .num {
            font-size: 0.22rem;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            background-color: #4f5054;
            font-size: 0.26rem;
            display: inline-block;
            vertical-align: middle;
            width: 0.86rem;
            height: 0.42rem;
            line-height: 0.42rem;
            border-radius: 0.05rem;
          }
        }
        .bott {
          color: rgba(79, 80, 84, 1);
          font-size: 0.26rem;
        }
      }
    }
  }

  .sure {
    height: 1.02rem;
    line-height: 1.02rem;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 0.3rem;
    .addCart {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50%;
      background-color: #e1f3e2;
      color: #7cc688;
    }
    .goOrder {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 50%;
      background-color: #42bd56;
      color: #fff;
    }
  }

  .item_price {
    margin-bottom: 0.14rem;
    text-align: left;
    .ground_price {
      font-size: 0.2rem;
      color: #ff6d00;
      .mod_ground_price {
      }
    }

    .gro_num {
      font-size: 0.3rem;
    }
  }
}
</style>