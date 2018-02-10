<template>
  <div class="yaoqingPage">
    <div class="bigBox">
      <div class="yiqi">
        <img src="../assets/img/yaoqing/邀请好友开团_slices/yiqi.png" alt="">
      </div>
      <div class="faqi">
        <p class="one">
          发起拼团
          <span>返现 ¥5,000</span>
        </p>
        <p class="two">离拼成还差
          <span>{{yaoQingObj.balancenum}}</span> 人</p>
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
            <img :src="yaoQingObj.image" alt="">
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
import http from "../utils/http";
import api from "../utils/api";
import util from "../utils/util";
export default {
  name: "name",
  data: function() {
    return {
      yaoQingObj: {
        grouppbooking_people: [
          //所有的团员信息
          {
            id: null,
            teamId: null,
            logo:
              "Expires=1832067698&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=n8R65M0mKm1%2B4LECMIaC2nPag44%3D",
            name: "小明",
            position: "团长", //职位
            open_person: null,
            starttime: 1515555837000,
            buynum: null,
            orderId: null
          },
          {
            id: null,
            teamId: null,
            logo:
              "Expires=1832067698&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=n8R65M0mKm1%2B4LECMIaC2nPag44%3D",
            name: "小黄",
            position: "营长",
            open_person: null,
            starttime: 1516176979000,
            buynum: null,
            orderId: null
          },
          {
            id: null,
            teamId: null,
            logo:
              "Expires=1832067698&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=n8R65M0mKm1%2B4LECMIaC2nPag44%3D",
            name: "小花",
            position: "排长",
            open_person: null,
            starttime: 1516177332000,
            buynum: null,
            orderId: null
          }
        ],
        msg: "success",
        image:
          "http://merchant-service.oss-cn-beijing.aliyuncs.com/install/1516937789180.jpeg?Expires=1832297779&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=C5IWB4LbxizV9P6o3DWsKEBhzPw%3D",
        code: 0,
        balancenum: 9000, // 离拼成剩余数量
        price: 4.5,
        rebate: [
          //返利规则
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
        closeTime: 1516177362000, //拼团结束时间
        pid: 3, //商品id
        title: "LED灯箱",
        buyway: "购买方式",
        limit_num: 30000, //拼团的限购数量
        limit_time: 259200000 //拼团时限
      },

      grouppbooking_people: [
        //所有的团员信息
        {
          id: null,
          teamId: null,
          logo:
            "Expires=1832067698&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=n8R65M0mKm1%2B4LECMIaC2nPag44%3D",
          name: "小明",
          position: "团长", //职位
          open_person: null,
          starttime: 1515555837000,
          buynum: null,
          orderId: null
        },
        {
          id: null,
          teamId: null,
          logo:
            "Expires=1832067698&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=n8R65M0mKm1%2B4LECMIaC2nPag44%3D",
          name: "小黄",
          position: "营长",
          open_person: null,
          starttime: 1516176979000,
          buynum: null,
          orderId: null
        },
        {
          id: null,
          teamId: null,
          logo:
            "Expires=1832067698&OSSAccessKeyId=LTAI81SVaJvQn4sl&Signature=n8R65M0mKm1%2B4LECMIaC2nPag44%3D",
          name: "小花",
          position: "排长",
          open_person: null,
          starttime: 1516177332000,
          buynum: null,
          orderId: null
        }
      ],
      orderId: "",
      teamId: "",
      goodsId: ""
    };
  },
  methods: {
    fetchyaoQingDet: async function() {
      let params = {
        orderId: this.orderId,
        teamId: this.teamId
      };
      const res = await http.get(api.invitefriends, params);
      if (res.data) {
        this.yaoQingObj = res.data;
        this.grouppbooking_people = yaoQingObj.grouppbooking_people;
        this.goodsId = this.yaoQingObj.pid;
      }
    }
  },
  mounted() {
    this.orderId = this.$route.query.orderId;
    if (this.$route.query.teamId) {
      this.teamId = this.$route.query.teamId;
    }
    this.fetchyaoQingDet()
  },
  components: {}
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