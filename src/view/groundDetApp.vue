<template>
  <div>
    <div class="groundDetPage">
      <nav-header>
        <span class="orderDetTit" slot="header">拼团详情wai</span>
      </nav-header>

      <ground-step>
        <!-- 绿色 -->
        <img class="step" slot="step1" src="../assets/img/拼团详情-未参团_slices/act1.png" alt="">
        <!-- 绿色 -->
        <!-- v-if="this.status != 3 && this.status != 9 && this.status != 11" -->
        <img class="step" v-if="this.teamStatus == 2 || this.teamStatus == 3 || this.teamStatus == 5" slot="step2" src="../assets/img/拼团详情-未参团_slices/act2.png" alt="">
        <img class="step" v-else slot="step2" src="../assets/img/拼团详情-未参团_slices/def2.png" alt="">
        <img class="step" v-if="this.teamStatus == 3" slot="step3" src="../assets/img/拼团详情-未参团_slices/active3.png" alt="">
        <!-- v-if="this.status != 9" -->
        <img class="step" v-else slot="step3" src="../assets/img/拼团详情-未参团_slices/def3.png" alt="">
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
              <td>补贴</td>
              <td v-for="item in groundDetInfo.rebate" :key="item.id">
                {{ item.price }}
              </td>
            </tr>
          </table>
          <div class="tip">
            开团/参与人都将享有随机返现 最高可达
            <span>10%</span>
          </div>
        </div>
      </div>

      <!-- <div class="detTit">
        <a href="javascript:;">查看订单详情</a>
      </div> -->

      <div class="killBox bgcWhite">
        <div class="one" v-if="groundDetInfo.teamStatus == 1 && groundDetInfo.balancePerson > 0">
          未开团，离成团还差
          <span>{{groundDetInfo.balancePerson}}</span> 人
        </div>
        <div class="one" v-if="groundDetInfo.teamStatus == 2 && groundDetInfo.balancenum > 0">
          已开团，离拼成还剩
          <span>{{groundDetInfo.balancenum}}</span> 条
        </div>
        <div class="one" v-if="groundDetInfo.teamStatus == 3">
          拼团成功，
          <span>{{groundDetInfo.limit_num}}K</span> 条已全部拼完
        </div>
        <div class="one" v-if="groundDetInfo.teamStatus == 4 && groundDetInfo.balancenum > 0">
          拼团失败，离拼成还剩
          <span>{{groundDetInfo.balancenum}}</span> 条
        </div>
        <div class="two" v-if="groundDetInfo.teamStatus != 3 && groundDetInfo.teamStatus != 4">
          剩
          <span>{{clock[0] || '00'}}</span>:
          <span>{{clock[1] || '00'}}</span>:
          <span>{{clock[2] || '00'}}</span>自动结束
        </div>
        <div class="three" v-if="groundDetInfo.teamStatus != 4 && groundDetInfo.teamStatus != 3">
          快去邀请好友参团吧！
          <router-link to="playDet">玩法详情</router-link>
        </div>
        <div class="three" v-if="groundDetInfo.teamStatus == 3">
          我们将根据你所填写的地址进行发货 具体请查看
          <router-link to="playDet">玩法详情</router-link>
        </div>
        <div class="three" v-if="groundDetInfo.teamStatus == 4">
          <div>支付的金额将自动返回到你的钱包</div>
          <div>人缘太差了</div>
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
              <img :src="item.logo || defaultImg" alt="">
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
        <button class="addCart" @click="goGoodsDet" v-if="this.teamStatus == 2">{{leftText}}</button>
        <button class="goOrder" @click="goShare" v-if="this.teamStatus != 5">{{rightText}}</button>
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
import { fetchJSON } from "../utils/fetch";
import { MessageBox } from "mint-ui";

export default {
  name: "name",
  data: function() {
    return {
      defaultImg: "/static/img/xiangtuLogo2.png",
      clock: [],
      teamStatus: -1,
      timer: "",
      orderId: "",
      teamId: "",
      goodsId: "",
      groundDetInfo: {
        rebate: [],
        grouppbooking_people: []
      },
      leftText: "",
      rightText: "",
      province: ""
    };
  },
  created() {
    this.getData();
    this.getLocal();
    this.orderId = this.$route.query.orderId;
    if (this.$route.query.teamId) {
      this.teamId = this.$route.query.teamId;
    }
  },
  methods: {
    getLocal() {
      let that = this;
      window.getProvi = function(prov) {
        util.toastEven(prov);
        that.province = prov;
        that.getGroudDet(true, that.getGroundDetCall);
      };
    },
    getData() {
      console.log(123);
      this.$jsonp("http://api.map.baidu.com/location/ip", { ak: 'Pswwb3LjDlxDt5KhGQxqn6zhS8hbQAHv' })
        .then(json => {
          console.log(json.content.address_detail.province);
        })
        .catch(err => {
          // Failed.
        });
    },
    getGroundDetCall(res) {
      this.teamStatus = res.data.teamStatus;
      if (this.teamStatus == 1) {
        this.leftText = "";
        this.rightText = "邀请好友开团";
      } else if (this.teamStatus == 2) {
        this.leftText = "立即参与";
        this.rightText = "立即分享";
      } else if (this.teamStatus == 3) {
        this.leftText = "";
        this.rightText = "晒单领取大奖";
      } else if (this.teamStatus == 4 || this.teamStatus == 5) {
        this.leftText = "";
        this.rightText = "";
      }
      this.status = res.data.status;
      this.goodsId = res.data.pid;
      this.groundDetInfo = res.data;
      this.teamId = this.groundDetInfo.grouppbooking_people[0].teamId;
      this.groundDetInfo.grouppbooking_people.forEach(v => {
        v.starttime = util.timestampToTime(v.starttime);
      });
    },
    async getGroudDet(flag = true, calls) {
      let that = this;
      //PC端
      if (winBri.getSheBei() !== "iPhone" && winBri.getSheBei() !== "Android") {
        that.orderId = 10871879897;
      }
      let params = {
        orderId: that.orderId,
        teamId: that.teamId,
        province: that.province
      };
      const res = await http.get(api.gototuxedo, params);
      if (res.data) {
        calls && calls(res);
        if (flag) {
          if (that.groundDetInfo.teamStatus == 1) {
            that.countdown(that.groundDetInfo.openCloseTime / 1000);
          } else {
            that.countdown(that.groundDetInfo.gBookingCloseTime / 1000);
            // this.countdown((new Date().getTime() + 10000) / 1000);
          }
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
            goodsId: this.goodsId,
            rukou: "groundDet",
            teamId: this.teamId,
            appPage: 1
          }
        });
      } else {
        MessageBox("提示", "点太快啦");
      }
    },
    //邀请用的图片标题链接
    goShare() {
      let that = this;
      let token = util.getStore("token");
      let urlParams = `?orderId=${this.orderId}&teamId=${
        this.teamId
      }&token=${token}`;

      let totUrl = `${api.baseUrl}/#/yaoqing${urlParams}`;
      let tit = "我正在发起拼团，邀请您一起来开团，一起享受最高优惠价格";
      let des = `目前离开团还差${this.groundDetInfo.balancePerson}人`;
      let pic = `${api.baseUrl}/static/img/yiqi.91cc4db.png`;
      if (this.groundDetInfo.teamStatus == 2) {
        tit = "我正在参与拼团，邀请您一起来参团，一起享受最高优惠价格";
        des = `目前离拼成还差${this.groundDetInfo.balancenum}条`;
      }
      if (winBri.getSheBei() == "Android") {
        console.log(totUrl, tit, des, pic);
        vuePay.showShareFromJs(totUrl, tit, des, pic);
      } else if (winBri.getSheBei() == "iPhone") {
        this.$bridge.setupWebViewJavascriptBridge(function(bridge) {
          bridge.callHandler(
            "didGroupBookingShare",
            { totUrl, tit, des, pic },
            function(resp) {
              console.log({ totUrl, tit, des, pic });
            }
          );
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
      .tip {
        margin-top: 0.18rem;
        height: 0.3rem;
        font-size: 0.22rem;
        font-family: PingFangSC-Regular;
        color: rgba(158, 159, 161, 1);
        line-height: 0.3rem;
        span {
          height: 0.33rem;
          font-size: 0.24rem;
          font-family: PingFangSC-Medium;
          color: rgba(255, 109, 0, 1);
          line-height: 0.33rem;
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
      // height: 0.46rem;
      // line-height: 0.46rem;
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
          border-radius: 50%;
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
    z-index: 999;
    background-color: #fff;
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