<template>
  <div class="yaoqingPage">
    <div class="bigBox">
      <div class="yiqi">
        <img src="../assets/img/yaoqing/邀请好友开团_slices/yiqi.png" alt="">
      </div>
      <div class="faqi" v-if="yaoQingObj.status == 0">
        <p class="one">
          发起拼团
          <span>返现至 ¥5,000</span>
        </p>
        <p class="two">离开团还差
          <span>{{yaoQingObj.balancePerson}}</span> 人</p>
        <p class="three">
          <router-link to="playDet">查看玩法详情</router-link>
        </p>
      </div>
      <div class="yikai" v-if="yaoQingObj.status == 3">
        <p class="one">
          参与拼团
          <span>返现至 ¥5,000</span>
        </p>
        <p class="two">离拼成还剩
          <span>{{yaoQingObj.balancenum}}</span> 条</p>
        <p class="three">
          <router-link to="playDet">查看玩法详情</router-link>
        </p>
      </div>
      <div class="groundGoodsDes">
        <div class="oneBox">
          <div class="one">
            <img class="left" src="../assets/img/yaoqing/邀请好友开团_slices/箭头@2x.png" alt="">
            <span class="cen">拼团商品介绍</span>
            <img class="right" src="../assets/img/yaoqing/邀请好友开团_slices/箭头11@2x.png" alt="">
          </div>
        </div>
        <div class="infoDet">
          <div class="left">
            <img :src="yaoQingObj.image || defaultImg" alt="">
          </div>
          <div class="right">
            <div class="one">{{yaoQingObj.title}}</div>
            <div class="three">
              <div class="pri">
                <span class="priType">原价：</span>
                <span>￥</span>
                <span>{{yaoQingObj.price}}</span>
              </div>
            </div>
            <router-link class="goDet" tag="button" :to="`goodsDetail?goodsId=${goodsId}`">查看商品详情</router-link>
          </div>
        </div>

        <table border="1" cellspacing="0">
          <tr class="oneth">
            <th></th>
            <th v-for="item in yaoQingObj.rebate" :key="item.id">
              {{ item.name }}
            </th>
          </tr>
          <tr class="onetd">
            <td>数量</td>
            <td v-for="item in yaoQingObj.rebate" :key="item.id">
              {{ item.num }}
            </td>
          </tr>
          <tr class="onetd">
            <td>返利</td>
            <td v-for="item in yaoQingObj.rebate" :key="item.id">
              {{ item.price }}
            </td>
          </tr>
        </table>

      </div>

      <div class="groundPer">
        <div class="oneBox">
          <div class="one">
            <img class="left" src="../assets/img/yaoqing/邀请好友开团_slices/箭头@2x.png" alt="">
            <span class="cen">拼团商品介绍</span>
            <img class="right" src="../assets/img/yaoqing/邀请好友开团_slices/箭头11@2x.png" alt="">
          </div>
        </div>

        <div v-for="item in grouppbooking_people" :key="item.id">
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

      <div class="konghe1">
      </div>

      <div class="sure">
        <button class="addCart" @click="lijiAdd">立即参与</button>
      </div>
    </div>

  </div>
</template>

<script>
// import goodsItem from "../components/goodsItem.vue";
import http from "../utils/http";
import api from "../utils/api";
import util from "../utils/util";
import { Toast } from "mint-ui";
// import { MessageBox } from "mint-ui";

export default {
  name: "name",
  data: function() {
    return {
      defaultImg: "/static/img/xiangtuLogo2.png",
      JSESSIONID: "",
      merchant_login_flag: "",
      yaoQingObj: {
        grouppbooking_people: [],
        rebate: []
      },

      grouppbooking_people: [],
      orderId: "",
      teamId: "",
      goodsId: ""
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.merchant_login_flag = this.$route.query.merchant_login_flag;
    util.setCookie("merchant_login_flag", this.merchant_login_flag);
    this.teamId = this.$route.query.teamId;
    this.fetchyaoQingDet();
  },
  mounted() {},
  components: {},
  methods: {
    fetchyaoQingDet: async function() {
      let params = {
        orderId: this.orderId,
        teamId: this.teamId
      };
      console.log(params);
      const res = await http.get(api.invitefriends, params);
      console.log(res);
      if (res.data) {
        this.yaoQingObj = res.data;
        this.grouppbooking_people = this.yaoQingObj.grouppbooking_people;
        this.goodsId = this.yaoQingObj.pid;
      }
    },
    lijiAdd() {
      //判断是否唤醒app
      const tipInfo =
        "即将跳转，如果唤醒APP后没进入拼团详情或者登录页面，请关闭APP重试";
      var url_ios = `xiangTuAPP://?pid=${
        api.baseUrl
      }/&pid1=/groundDetApp?orderId=${this.orderId}&teamId=${this.teamId}`;

      var url_ios_download =
        "http://merchant.xljkj.cn/text/Merchantdownload/index.html";

      var url_android = `ogxscheme://ogxhost/?pid=${
        api.baseUrl
      }/&pid1=/groundDetApp?orderId=${this.orderId}&teamId=${this.teamId}`;
      console.log(url_android);
      var url_android_download =
        "http://merchant.xljkj.cn/text/Merchantdownload/index.html";

      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      var browser = {
        versions: (function() {
          var u = navigator.userAgent.toLowerCase();
          return {
            weixin: u.match(/MicroMessenger/i) == "micromessenger", //是否微信
            qq: u.match(/QQ/i) == "qq" //是否QQ
          };
        })()
      };
      if (isAndroid == true) {
        if (browser.versions.weixin == true) {
          alert(
            "点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装"
          );
        } else {
          var loadTime = new Date();
          // MessageBox("提示", tipInfo);

          location.href = url_android;
          setTimeout(function() {
            var outTime = new Date();
            if (outTime - loadTime > 800) {
              location.href = url_android_download;
            }
          }, 1000);
        }
      } else if (isiOS == true) {
        if (browser.versions.weixin == true || browser.versions.qq == true) {
          alert(
            "点击右上角按钮，然后在弹出的菜单中，点击在浏览器中打开，即可安装"
          );
        } else {
          // MessageBox("提示", tipInfo);
          var loadTime = new Date();
          location.href = url_ios;
          setTimeout(function() {
            var outTime = new Date();
            if (outTime - loadTime > 800) {
              window.setAttribute("location", url_ios_download);
            }
          }, 1000);
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.yaoqingPage {
  background: url("../assets/img/yaoqing/邀请好友开团_slices/beijingdibu.png")
    no-repeat;
  width: 7.5rem;
  min-height: 13.34rem;
  background-size: contain;
  padding-top: 0.46rem;
  background-color: rgba(248, 94, 104, 1);
  .yiqi {
    margin-bottom: 2.73rem;
    text-align: center;
    img {
      width: 5.45rem;
      height: 2.24rem;
    }
  }
  .faqi {
    text-align: center;
    background: url("../assets/img/yaoqing/邀请好友开团_slices/faqibeijing.png")
      no-repeat;
    background-size: contain;
    width: 6.61rem;
    height: 2.98rem;
    padding-top: 0.54rem;
    margin: 0 auto;
    margin-bottom: 0.3rem;
    p {
      margin: 0 auto;
    }
    .one {
      width: 4.21rem;
      height: 0.56rem;
      font-size: 0.4rem;
      font-family: PingFangSC-Semibold;
      color: rgba(255, 255, 255, 1);
      line-height: 0.56rem;
      span {
        color: #f0ed76;
      }
    }
    .two {
      height: 0.45rem;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 0.45rem;
      span {
        color: #f0ed76;
      }
    }
    .three {
      a {
        width: 1.51rem;
        height: 0.33rem;
        font-size: 0.24rem;
        font-family: PingFangSC-Regular;
        color: rgba(194, 250, 255, 1);
        line-height: 0.33rem;
        text-decoration: underline;
      }
    }
  }
  .yikai {
    text-align: center;
    background: url("../assets/img/yaoqing/邀请好友开团_slices/faqibeijing.png")
      no-repeat;
    background-size: contain;
    width: 6.61rem;
    height: 2.98rem;
    padding-top: 0.54rem;
    margin: 0 auto;
    margin-bottom: 0.3rem;
    p {
      margin: 0 auto;
    }
    .one {
      width: 4.21rem;
      height: 0.56rem;
      font-size: 0.4rem;
      font-family: PingFangSC-Semibold;
      color: rgba(255, 255, 255, 1);
      line-height: 0.56rem;
      span {
        color: #f0ed76;
      }
    }
    .two {
      height: 0.45rem;
      font-size: 0.32rem;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 0.45rem;
      span {
        color: #f0ed76;
      }
    }
    .three {
      a {
        width: 1.51rem;
        height: 0.33rem;
        font-size: 0.24rem;
        font-family: PingFangSC-Regular;
        color: rgba(194, 250, 255, 1);
        line-height: 0.33rem;
        text-decoration: underline;
      }
    }
  }

  .groundGoodsDes {
    width: 6.7rem;
    height: 5.14rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.2rem;
    margin: 0 auto;
    padding: 0 0.335rem 0 0.2rem;
    margin-bottom: 0.3rem;

    .oneBox {
      height: 1.12rem;
      width: 100%;
      position: relative;
      .one {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        justify-content: center;
        .left {
          width: 0.59rem;
          height: 0.12rem;
          padding-top: 0.15rem;
          box-sizing: content-box;
        }
        .cen {
          width: 1.88rem;
          height: 0.42rem;
          font-size: 0.3rem;
          font-family: PingFangSC-Regular;
          color: rgba(0, 187, 204, 1);
          line-height: 0.42rem;
        }
        .right {
          width: 0.59rem;
          height: 0.12rem;
          padding-top: 0.15rem;
          box-sizing: content-box;
        }
      }
    }
    .infoDet {
      overflow: hidden;
      position: relative;
      .left {
        float: left;
        margin-right: 0.1rem;
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
      }
      .right {
        float: left;
        margin-left: 0.1rem;
        .one {
          width: 4.31rem;
          font-size: 0.3rem;
          text-align: left;
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
        }
        .goDet {
          position: absolute;
          right: 0;
          bottom: 0.1rem;
          width: 1.6rem;
          height: 0.46rem;
          line-height: 0.46rem;
          background: rgba(255, 255, 255, 0.4);
          border: 0.01rem solid rgba(0, 187, 204, 1);

          border-radius: 0.1rem;
          font-size: 0.2rem;
          font-family: PingFangSC-Light;
          color: rgba(0, 187, 204, 1);
        }
      }
    }

    table {
      width: 6.05rem;
      height: 1.64rem;
      background: rgba(255, 255, 255, 0.5);
      border: 0.01rem solid #fff;
      margin-top: 0.2rem;
      text-align: center;
      th {
        text-align: center;
        width: 6.05rem;
        height: 0.5rem;
        background: rgba(0, 187, 204, 1);
        color: #fff;
        font-size: 0.24rem;
      }

      td {
        font-size: 0.24rem;
        font-family: PingFangSC-Regular;
        color: rgba(158, 159, 161, 1);
      }

      .oneth,
      .onetd {
      }
    }
  }

  .groundPer {
    width: 6.7rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.2rem;
    margin: 0 auto;
    padding: 0 0.335rem 0 0.2rem;
    .oneBox {
      height: 1.12rem;
      width: 100%;
      position: relative;
      .one {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        justify-content: center;
        .left {
          width: 0.59rem;
          height: 0.12rem;
          padding-top: 0.15rem;
          box-sizing: content-box;
        }
        .cen {
          width: 1.88rem;
          height: 0.42rem;
          font-size: 0.3rem;
          font-family: PingFangSC-Regular;
          color: rgba(0, 187, 204, 1);
          line-height: 0.42rem;
        }
        .right {
          width: 0.59rem;
          height: 0.12rem;
          padding-top: 0.15rem;
          box-sizing: content-box;
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
          height: 0.37rem;
          font-size: 0.26rem;
          font-family: PingFangSC-Regular;
          color: rgba(79, 80, 84, 1);
          line-height: 0.37rem;
        }
      }
    }
  }

  .konghe1 {
    height: 1.3rem;
    width: 100%;
  }

  .sure {
    height: 1.02rem;
    line-height: 1.02rem;
    display: flex;
    font-size: 0.3rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    .addCart {
      flex: 1;
      background: rgba(66, 189, 86, 1);
      color: #ffffff;
    }
  }
}
</style>