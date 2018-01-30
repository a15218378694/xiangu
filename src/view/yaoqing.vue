<template>
  <div class="yaoqingPage">
    <div class="bigBox">
      <div class="yiqi">
        <img src="../assets/img/yaoqing/邀请好友开团_slices/邀请拼团_icn@2x.png" alt="">
      </div>
      <div class="faqi">
        <p class="one">
          发起拼团
          <span>返现 ¥5,000</span>
        </p>
        <p class="two">离拼成还差
          <span>1</span> 人</p>
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
            <img src="../assets/img/订单详情_slices/3934756966_1131286789.400x400@3x.png" alt="">
          </div>
          <div class="right">
            <div class="one">LED灯箱灯条 拉布卡布软布软布软布软膜</div>
            <div class="three">
              <div class="pri">
                <span class="priType">原价：</span>
                <span>￥</span>
                <span>4.5</span>
              </div>
            </div>
              <router-link class="goDet" tag="button" to="goodsDetail">查看商品详情</router-link>
          </div>
        </div>
        <table border="1" cellspacing="0">
          <tr>
            <th class="oneth"></th>
            <th>团长</th>
            <th>营长</th>
            <th>排长</th>
          </tr>
          <tr>
            <td class="onetd">数量</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
          <tr>
            <td class="onetd">返利</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
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

        <div class="bot">
          <div class="leftt">
            <img src="../assets/img/mall/商品详情_slices/象涂-商家版@2x.png" alt="">
          </div>
          <div class="centerr">
            <div class="topp">
              <span class="com">欧格星科技</span>
              <span class="num">团长</span>
            </div>
            <div class="bott">
              动态时间 开团
            </div>
          </div>

        </div>
                <div class="bot">
          <div class="leftt">
            <img src="../assets/img/mall/商品详情_slices/象涂-商家版@2x.png" alt="">
          </div>
          <div class="centerr">
            <div class="topp">
              <span class="com">欧格星科技</span>
              <span class="num">团长</span>
            </div>
            <div class="bott">
              动态时间 开团
            </div>
          </div>

        </div>
                <div class="bot">
          <div class="leftt">
            <img src="../assets/img/mall/商品详情_slices/象涂-商家版@2x.png" alt="">
          </div>
          <div class="centerr">
            <div class="topp">
              <span class="com">欧格星科技</span>
              <span class="num">团长</span>
            </div>
            <div class="bott">
              动态时间 开团
            </div>
          </div>

        </div>
                <div class="bot">
          <div class="leftt">
            <img src="../assets/img/mall/商品详情_slices/象涂-商家版@2x.png" alt="">
          </div>
          <div class="centerr">
            <div class="topp">
              <span class="com">欧格星科技</span>
              <span class="num">团长</span>
            </div>
            <div class="bott">
              动态时间 开团
            </div>
          </div>

        </div>

      </div>

      <div class="konghe1">
      </div>

      <div class="sure">
        <button class="addCart">立即参与</button>
      </div>
    </div>

  </div>
</template>

<script>
// import goodsItem from "../components/goodsItem.vue";

export default {
  name: "name",
  data: function() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.yaoqingPage {
  background: url("../assets/img/yaoqing/邀请好友开团_slices/背景图-顶部@2x.png") no-repeat;
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
    background: url("../assets/img/yaoqing/邀请好友开团_slices/发起拼团-背景@2x.png")
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
      width: 2.39rem;
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
      background:rgba(66,189,86,1);
      color: #FFFFFF;
    }
  }
}
</style>