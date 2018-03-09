<template>
  <div :class="[isShow? '': '','goods_det']">

    <div class="con">
      <img class="back" @click="back" src="../assets/img/mall/商品详情_slices/Group@2x.png" alt="">
      <img v-if="!isCollect" @click="collect(0)" class="collect" src="../assets/img/mall/商品详情_slices/收藏@2x.png" alt="">
      <img v-else class="collect" @click="collect(1)" src="../assets/img/mall/商品详情_slices/收藏2@2x.png" alt="">
      <router-link class="toShopCart" to="shopCart">
        <img class="shopCart" src="../assets/img/mall/商品详情_slices/购物车@2x.png" alt="">
      </router-link>
      <span v-if="isLoading1"></span>
    </div>

    <div class="header_img">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="item in proDetails.slidershowAdd" :key="item.id">
          <img :src="item.address" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="goods_det_det">
      <div class="goods_tit">
        {{proDetails.title}}
      </div>

      <div class="item_price">
        <span class="ground_price">拼团：
          <span class="mod_ground_price">￥</span>{{proDetails.original_price}}</span>
        <span class="old_price">原价：
          <span class="mod_old_price">￥</span>{{proDetails.offering_price}}</span>
      </div>

      <div class="ground_play">
        <div class="tit">
          <span class="play_tit">拼团玩法</span>
          <span class="fanli">(拼团返利 ￥2,000~￥5,000)</span>
          <router-link to="playDet" tag="span" class="play_det">玩法详情
            <span>></span>
          </router-link>
        </div>

        <div class="ground_process">
          <div class="one process">
            <span class="left">
              <img src="../assets/img/mall/商品详情_slices/Group 4@2x.png" alt="">
            </span>
            <span class="right">
              <p>选择商品</p>
              <p>付款开团/参团</p>
            </span>
          </div>
          <div class="two process">
            <span class="left">
              <img src="../assets/img/mall/商品详情_slices/Group 41@2x.png" alt="">
            </span>
            <span class="right">
              <p>邀请并等待</p>
              <p>好友支付参团</p>
            </span>
          </div>
          <div class="three process">
            <span class="left">
              <img src="../assets/img/mall/商品详情_slices/Group 42@2x.png" alt="">
            </span>
            <span class="right">
              <p>数量购完</p>
              <p>即可拼成</p>
            </span>

          </div>
        </div>
      </div>

    </div>

    <div class="grounding" v-if="groundInfo.length > 0">
      <div class="top">
        <div class="left">
          <div class="leftImg"></div>
        </div>
        <div class="center">正在拼团</div>
        <div class="right">
          <router-link to="moreGround">查看更多</router-link>
        </div>
      </div>
      <ground-item :groundInfo="groundInfo" :clock="clock"></ground-item>
    </div>

    <div class="goods_det1">
      <div class="top">
        <div class="left">
          <div class="leftImg"></div>
        </div>
        <div class="center">商品详情</div>
      </div>
      <div class="bot_det" v-if="!isShow">
        <!-- proDetails.productDesc -->
        <template v-for="item in proDetails.productDesc">
          <img :key="item.id" :src="item.pro_desc" alt="">
        </template>
        <!-- <div class="loadMore">
            <button>加载更多</button>
          </div> -->
      </div>

    </div>

    <div class="hot_goods">
      <div class="top">
        <div class="left">
          <div class="leftImg"></div>
        </div>
        <div class="center">热门商品</div>
      </div>
      <shop-item :hotGoods="proDetails.recProducts"></shop-item>
    </div>

    <div class="goods_con">
      <div class="kefu">客服</div>
      <button class="ground_buy" @click="isShowEven('拼团',2)">
        <p class="ground_pri">￥{{proDetails.original_price}}</p>
        <p class="groundBtn" v-if="rukou == 'groundDet'">立即拼团</p>
        <p class="groundBtn" v-if="rukou !== 'groundDet'">发起拼团</p>
      </button>
      <button class="alone_buy" @click="isShowEven('单价',1)" v-if="this.rukou !== 'groundDet'">
        <p class="alone_pri">￥{{proDetails.offering_price}}</p>
        <p class="aloneBtn">单价购买</p>
      </button>
    </div>

    <mt-popup v-model="isShow" position="bottom">
      <div class="goods_guige">
        <div class="one">
          <div class="left">
            <img :src="proDetails.slidershowAdd[0].address" alt="">
          </div>
          <div class="cen">
            <div class="tit">{{proDetails.title}}</div>
            <div class="pinGround">
              {{buyType}}：￥
              <span v-if="buyType == '单价'">{{proDetails.offering_price}}</span>
              <span v-if="buyType == '拼团'">{{proDetails.original_price}}</span>
            </div>
          </div>
          <img class="close" @click="isShowEven('close')" src="../assets/img/mall/guige/关闭@3x.png" alt="">
        </div>
        <span v-if="isLoading"></span>
        <scroll ref="listContent" :data="guigess" class="scrollBox" :refreshDelay="refreshDelay">
          <div>
            <div class="two" v-for="(guigesObj,indexss) in guigess" :key="indexss">
              <div class="guigeType">{{guigesObj.sizes}}</div>
              <div>
                <button v-for="(guigeObj,guigeIndex) in guigesObj.sizeslist" :key="guigeIndex" :class="[guigesObj.curIndex == guigeIndex ? 'guigeTypeItemActive' : '','guigeTypeItem']" @click="checkGuige(indexss,guigeIndex,guigesObj,guigeObj)">{{guigeObj.sizes}}</button>
              </div>
            </div>
          </div>
        </scroll>

        <div class="needNum">
          <span>需要数量：</span>
          <input v-model.number="num" type="number" :placeholder="placeHold">
          <img src="../assets/img/mall/guige/提示@3x.png" alt="">
        </div>
        <div class="res">
          <div class="resGuiges" v-if="showChecked">
            <template v-if="checkedGuige.length > 0" v-for="(item,index) in checkedGuige">
              <div :key="index" class="resGuigeItems">
                <template v-for="(addedItem,addedIndex) in item">
                  <span class="resGuigeItem" :key="addedIndex">
                    {{addedItem.sizes || addedItem.num}}
                    <span v-if="addedItem.num">份</span>
                  </span>
                </template>
              </div>
            </template>

          </div>
          <button @click="addCheckGuigeItem">添加所选</button>
        </div>
        <div class="sure">
          <button v-if="buy_way == 1" class="addCart" @click="addCart">加入购物车</button>
          <button class="goOrder" @click="sureGoOrder">确定下单</button>
        </div>
      </div>
    </mt-popup>

    <transition name="fade">
      <div class="specs_cover" @click="showChooseList" v-if="isShow"></div>
    </transition>
  </div>
</template>

<script>
let buyNumRule = 200;
import Vue from "vue";
import axios from "axios";
import http from "../utils/http";
import api from "../utils/api";
import util from "../utils/util";
import shopItem from "../components/shopItem.vue";
import groundItem from "../components/groundItem.vue";
import scroll from "../components/scroll.vue";
import { Popup } from "mint-ui";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Swipe, SwipeItem } from "mint-ui";
import { mapState } from "vuex";

Vue.component(Popup.name, Popup);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: "name",
  data: function() {
    return {
      isLoading1: false,
      refreshDelay: 120,
      isCollect: false,
      isShow: false,
      buyType: "",
      proDetails: {
        slidershowAdd: [{}]
      },
      groundInfo: [],
      clock: [],
      guigess: [],
      newGuigess: [],
      checkedGuige: [],
      totalLength: 0,
      num: "",
      paramsSureOrder: {},
      buy_way: 1,
      guigesNum: 0,
      showChecked: false,
      isLoading: false,
      goodsId: "",
      teamId: "",
      totalNums: 0,
      checkKucunFlag: true,
      rukou: "",
      appPage: 0,
      placeHold: ""
    };
  },
  computed: {
    ...mapState(["cartCount"])
  },
  created() {
    this.goodsId = this.$route.query.goodsId;
    if (this.goodsId == 1) {
      this.placeHold = `400条的倍数进行购买`;
    } else if (this.goodsId == 2) {
      this.placeHold = `200条起订`;
    } else if (this.goodsId == 3) {
      this.placeHold = `200条的倍数进行购买`;
    } else if (this.goodsId == 4) {
      this.placeHold = `30台的倍数进行购买`;
    } else if (this.goodsId == 5) {
      this.placeHold = `100台的倍数进行购买`;
    }
    if (this.$route.query.appPage) {
      this.appPage = this.$route.query.appPage;
    }
    this.rukou = this.$route.query.rukou;
    if (this.$route.query.teamId) {
      this.teamId = this.$route.query.teamId;
    }
  },
  mounted() {
    if (this.rukou == "groundDet") {
      this.isShowEven("拼团", 2);
    }
    this.fetchGoodsDet();
    this.fetchGroundItem(); //拿到团购列表商品中的第一项
  },
  components: {
    shopItem,
    groundItem,
    scroll
  },
  methods: {
    //单价购买或者发起拼团或者关闭
    isShowEven(buyTypeTit, buy_way) {
      if (this.$bridge.getSheBei() == "Android") {
        let token = util.getStore("token");
        Toast("getStore的" + token);
        axios.defaults.headers.common["tonken"] = token;
      }
      if (buyTypeTit == "close") {
        this.isShow = !this.isShow;
        return;
      }
      this.buyType = buyTypeTit;
      this.buy_way = buy_way;
      this.fetchGuigeDet(buy_way);
    },
    fetchGuigeDet: async function(buy_way) {
      this.isLoading1 = !this.isLoading1;
      let params = {
        id: this.goodsId,
        buy_way
      };
      let fetchApi = api.unitprice;

      if (buy_way == 2) {
        params.teamId = this.teamId;
        fetchApi = api.pro;
      }
      const res = await http.get(fetchApi, params);
      if (res.data) {
        if (buy_way == 2 && res.data.code == 2) {
          return MessageBox("提示", res.data.msg);
        }
        this.isShow = !this.isShow;
        setTimeout(() => {
          this.$refs.listContent.refresh();
        }, 20);
        this.$emit("goodsDetailPage", this.isShow);
        this.guigess = res.data.proSize.proSizeLists;
        this.guigess.forEach((v, i) => {
          v.curIndex = -1;
          v.curItem = "";
          this.newGuigess = [];
        });
      }
      this.isLoading1 = !this.isLoading1;
    },
    back() {
      this.$router.go(-1);
    },
    fetchGoodsDet: async function() {
      await http.get(api.pageviews, { id: this.goodsId });
      let params = {
        id: this.goodsId
      };
      const res = await http.get(api.prodetails, params);
      if (res.data) {
        this.proDetails = res.data.proDetails;
        if (this.appPage == 0) {
          this.teamId = res.data.teamId;
        }
      }
    },
    fetchGroundItem: async function() {
      util.grounding(this);
    },

    //guigeIndex  guigeObj对应的索引    guigesObj最外层对象   guigeObj最外层对象的sizeslist数组里面的对象
    checkGuige(indexss, guigeIndex, guigesObj, guigeObj) {
      this.isLoading = true;
      if (guigeObj.sizes !== guigesObj.curItem.sizes) {
        guigesObj.curIndex = guigeIndex;
        guigesObj.curItem = guigeObj;
        this.newGuigess = [];
        this.guigess.forEach((v, i) => {
          //这里一定不能加判断过滤
          this.newGuigess[i] = v.curItem;
        });
        if (this.checkKong(this.newGuigess)) {
          this.getPrice();
        }
      }
      this.isLoading = false;
    },
    //判断数组中是否有undefined
    checkKong(arr) {
      let flag = true;
      if (arr.length == 0) {
        flag = false;
      }
      arr.forEach(v => {
        if (v == "") {
          flag = false;
        }
      });
      return flag;
    },
    getPrice: async function() {
      let params = {
        pid: this.proDetails.id,
        buyway: this.buy_way
      };
      this.newGuigess.map((v, i) => {
        if (i == 0) {
          params.coulour = v.sizes;
        } else if (i == 1) {
          params.sizes = v.sizes;
        } else if (i == 2) {
          params.powers = v.sizes;
        }
      });
      const res = await http.post1(api.getProPrice, params);
      if (res.data) {
        this.publicPrice = res.data.price;
        if (this.buy_way == 1) {
          this.proDetails.offering_price = res.data.price;
        } else {
          this.proDetails.original_price = res.data.price;
        }
      }
    },
    addCart() {
      if (this.checkedGuige.length == 0) {
        if (!this.addCheck() || !this.checkKucunFlag) {
          return;
        }
        //checkedGuige.length == 0 就要去检测库存

        this.newGuigessAdd();
        this.newGuigessGetRequestPrice();
      }

      this.addCartEven();
    },
    //调起加入购物车接口
    addCartEven: async function() {
      let that = this;
      this.showChecked = false;
      let params = this.getParams();
      const res = await http.post1(api.addPro, params);
      if (res.data) {
        this.$store.commit("updateCartCount", 1);
        this.guigesNum = 0;
        this.clearStatus();
        this.clearAllSelGuige();
        MessageBox("提示", res.data.msg);
        this.isShow = !this.isShow;
        return;
      }
    },
    //点击添加所选
    addCheckGuigeItem() {
      //addCheck   检测是否全选  输入的数量是否正常  添加的商品规格是否超过3套了
      // console.log(this.checkKucunFlag);
      if (!this.addCheck() || !this.checkKucunFlag || !this.buyGoodsRule()) {
        return;
      }
      this.newGuigessAdd();
      this.newGuigessGetRequestPrice();
      this.checkedguigeAdd();

      this.clearStatus();
      this.showChecked = true;
      this.guigesNum++;
    },
    checkKucun: async function(paramsKucun) {
      this.checkKucunFlag = true;
      this.showChecked = false;
      let params = {
        buynum: this.num,
        pid: this.proDetails.id,
        teamId: this.teamId
      };
      this.newGuigess.map((v, i) => {
        if (i == 0) {
          params.coulour = v.sizes;
        } else if (i == 1) {
          params.sizes = v.sizes;
        } else if (i == 2) {
          params.powers = v.sizes;
        }
      });
      const res = await http.post1(api.outrepertory, params);
      if (res.data.code == -2) {
        MessageBox("提示", res.data.msg);
        this.checkKucunFlag = false;
      }
    },
    //addCheck   检测是否全选  输入的数量是否正常  添加的商品规格是否超过3套
    addCheck() {
      let flag = true;
      if (this.guigesNum >= 3) {
        flag = false;
        MessageBox("提示", "购买3组以上规格商品请加入购物车购买");
      } else if (!this.checkKong(this.newGuigess)) {
        flag = false;
        MessageBox("提示", `请先选择规格并且各类型规格必选`);
      } else if (!Number.isInteger(this.num) || this.num <= 0) {
        flag = false;
        MessageBox("提示", `请规范输入商品数量并且大于0`);
      }
      return flag;
    },
    newGuigessAdd() {
      this.newGuigess.push({ num: this.num });
    },
    //在checkedguige中增加以显示出来
    checkedguigeAdd() {
      this.checkedGuige.push(this.newGuigess);
    },
    //往newGuigess中添加要发送给后端的数据
    newGuigessGetRequestPrice() {
      //要对应哪套的数据  所以做很多判断
      if (this.guigesNum == 0) {
        this.newGuigess.push({ buyprice1: this.publicPrice });
      } else if (this.guigesNum == 1) {
        this.newGuigess.push({ buyprice2: this.publicPrice });
      } else if (this.guigesNum == 2) {
        this.newGuigess.push({ buyprice3: this.publicPrice });
      }
    },
    //清空规格状态以及清空一套规格
    clearStatus() {
      this.num = "";
      this.newGuigess = [];
      this.guigess.forEach((v, i) => {
        v.curIndex = -1;
        v.curItem = "";
      });
    },
    //清空所有选中规格
    clearAllSelGuige() {
      this.checkedGuige = [];
    },
    delSelGuige(delIndex) {
      MessageBox.confirm("确定删除吗?")
        .then(action => {
          this.checkedGuige.splice(delIndex, 1);
          this.guigesNum--;
        })
        .catch(() => {});
    },
    //确定下单是同时跳转的，newGuigessAdd newGuigessGetRequestPrice两个都要调
    sureGoOrder: async function() {
      //checkedGuige没数据的情况
      if (this.checkedGuige.length == 0) {
        if (!this.addCheck() || !this.checkKucunFlag || !this.buyGoodsRule()) {
          return;
        }
        //没有点添加所选就在确定下单的时候再去检测库存

        this.newGuigessAdd();
        this.newGuigessGetRequestPrice();
      } else {
        this.getTotalNums(this.checkedGuige);
      }

      //发送给后端的数据只是从checkedGuige中抽取出来的
      let params = this.getParams();

      if (this.buy_way == 2) {
        params[0].teamId = this.teamId;
      }
      console.log(params);
      const res = await http.post1(api.order, params);
      if (res.data) {
        if (this.buy_way == 2 && res.data.code == 2) {
          return MessageBox("提示", res.data.msg);
        }
        this.$router.push({
          path: "orderDet",
          query: {
            orderDetData: JSON.stringify(res.data),
            newGuigess: JSON.stringify(this.newGuigess),
            checkedGuige: JSON.stringify(this.checkedGuige),
            totalNum: this.num,
            totalNums: this.totalNums,
            buyway: this.buy_way,
            teamId: this.teamId,
            curPage: "goodsDetail"
            // orderId: res.data.myorders.orderid
          }
        });
      }
    },
    getTotalNums(arr) {
      if (arr.length > 0) {
        arr.forEach(v => {
          v.forEach((v1, i1) => {
            if (i1 == 3) {
              this.totalNums += v1.num;
            }
          });
        });
      }
    },
    //拿到发给后端的参数
    getParams() {
      //发多少套规格
      let cartNum = 1;
      this.paramsSureOrder = {
        pid: this.proDetails.id,
        title: this.proDetails.title,
        image: this.proDetails.slidershowAdd[0].address,
        buyway: this.buy_way,
        cart_num: cartNum
      };
      if (this.checkedGuige.length > 0) {
        this.paramsSureOrder.cart_num = this.checkedGuige.length;
        this.checkedGuige.forEach((v, i) => {
          v.forEach((v1, i1) => {
            if (i == 0) {
              if (i1 == 0) {
                this.paramsSureOrder.colour1 = v1.sizes;
              } else if (i1 == 1) {
                this.paramsSureOrder.sizes1 = v1.sizes;
              } else if (i1 == 2) {
                this.paramsSureOrder.powers1 = v1.sizes;
              } else if (i1 == 3) {
                this.paramsSureOrder.buynum1 = v1.num;
              } else if (i1 == 4) {
                this.paramsSureOrder.buyprice1 = v1.buyprice1;
              }
            } else if (i == 1) {
              if (i1 == 0) {
                this.paramsSureOrder.colour2 = v1.sizes;
              } else if (i1 == 1) {
                this.paramsSureOrder.sizes2 = v1.sizes;
              } else if (i1 == 2) {
                this.paramsSureOrder.powers2 = v1.sizes;
              } else if (i1 == 3) {
                this.paramsSureOrder.buynum2 = v1.num;
              } else if (i1 == 4) {
                this.paramsSureOrder.buyprice2 = v1.buyprice2;
              }
            } else if (i == 2) {
              if (i1 == 0) {
                this.paramsSureOrder.colour3 = v1.sizes;
              } else if (i1 == 1) {
                this.paramsSureOrder.sizes3 = v1.sizes;
              } else if (i1 == 2) {
                this.paramsSureOrder.powers3 = v1.sizes;
              } else if (i1 == 3) {
                this.paramsSureOrder.buynum3 = v1.num;
              } else if (i1 == 4) {
                this.paramsSureOrder.buyprice3 = v1.buyprice3;
              }
            } else if (i == 3) {
              if (i1 == 0) {
                this.paramsSureOrder.colour4 = v1.sizes;
              } else if (i1 == 1) {
                this.paramsSureOrder.sizes4 = v1.sizes;
              } else if (i1 == 2) {
                this.paramsSureOrder.powers4 = v1.sizes;
              } else if (i1 == 3) {
                this.paramsSureOrder.buynum4 = v1.num;
              } else if (i1 == 4) {
                this.paramsSureOrder.buyprice4 = v1.buyprice4;
              }
            }
          });
        });
      } else {
        this.paramsSureOrder.colour1 = this.newGuigess[0].sizes;
        this.paramsSureOrder.sizes1 = this.newGuigess[1].sizes;
        this.paramsSureOrder.powers1 = this.newGuigess[2].sizes;
        this.paramsSureOrder.buynum1 = this.newGuigess[3].num;
        this.paramsSureOrder.buyprice1 = this.newGuigess[4].buyprice1;
      }

      return [this.paramsSureOrder];
    },
    loadTop() {
      util.loadTop(this);
    },
    collect(status) {
      if (!status) {
        this.collectEven();
      } else {
        this.delColl();
      }
    },
    collectEven: async function() {
      const res = await http.get(api.collectproduct, {
        pid: this.proDetails.id
      });
      if (res.data) {
        this.isCollect = !this.isCollect;
        return Toast("收藏成功");
      }
    },
    delColl: async function() {
      const res = await http.post1(api.collectproductDet, [
        { pid: this.proDetails.id }
      ]);
      if (res.data) {
        this.isCollect = !this.isCollect;
        return Toast("取消收藏");
      }
    },
    checkNum() {
      if (!Number.isInteger(this.num) || this.num <= 0) {
        return MessageBox("提示", "请输入规范数量");
      }
    },
    //每个商品对应购买规则
    buyGoodsRule() {
      if (this.buy_way == 1) {
        return true;
      }
      if (this.goodsId == 3) {
        buyNumRule = 200;
      } else if (this.goodsId == 1) {
        buyNumRule = 400;
      } else if (this.goodsId == 5) {
        buyNumRule = 100;
      } else if (this.goodsId == 4) {
        buyNumRule = 30;
      }
      if (
        this.goodsId == 3 ||
        this.goodsId == 1 ||
        this.goodsId == 4 ||
        this.goodsId == 5
      ) {
        if (this.num % buyNumRule) {
          if (this.goodsId == 1 || this.goodsId == 3) {
            MessageBox(`提示`, `购买数量必须以${buyNumRule}条的倍数进行购买`);
            return false;
          } else if (this.goodsId == 4 || this.goodsId == 5) {
            MessageBox(`提示`, `购买数量必须以${buyNumRule}台的倍数进行购买`);
            return false;
          }
        } else {
          return true;
        }
      } else if (this.goodsId == 2) {
        if (this.num < 200) {
          MessageBox(`提示`, `购买数量需200条起订`);
          return false;
        } else {
          return true;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.goods_det {
  .con {
    width: 100%;
    position: fixed;
    z-index: 33;
    top: 0;
    left: 0;
    .back {
      width: 0.8rem;
      height: 0.8rem;
      float: left;
      padding: 0.3rem;
      box-sizing: content-box;
    }
    .toShopCart {
      float: right;
      .shopCart {
        width: 0.8rem;
        height: 0.8rem;
        padding: 0.3rem;
        padding-right: 0.15rem;
        box-sizing: content-box;
      }
    }

    .collect {
      width: 0.8rem;
      height: 0.8rem;
      float: right;
      padding: 0.3rem;
      padding-left: 0.15rem;
      box-sizing: content-box;
    }
  }

  .header_img {
    height: 7.5rem;
    img {
      width: 100%;
    }
  }

  .goods_det_det {
    font-size: 0.24rem;
    padding: 0.4rem;
    padding-top: 0.2rem;
    text-align: left;
    background-color: #fff;
    .goods_tit {
      font-size: 0.48rem;
      width: 6.7rem;
      text-align: left;
      background-color: #fff;
    }
    .item_price {
      background-color: #fff;
      height: 0.9rem;
      line-height: 0.9rem;
      .ground_price {
        color: #ff6d00;
        .mod_ground_price {
          font-size: 0.12rem;
        }
      }

      .old_price {
        text-decoration: line-through;
        padding-left: 0.1rem;
        font-size: 0.12rem;
        color: #9e9fa1;
        .mod_old_price {
        }
      }
    }
    .ground_play {
      background-color: #fefaf1;
      width: 6.7rem;
      height: 1.64rem;
      padding: 0 0.2rem;
      .tit {
        height: 0.7rem;
        line-height: 0.7rem;
        .play_tit {
        }
        .fanli {
          margin: 0 0.6rem 0 0.2rem;
          color: #f59044;
        }
        .play_det {
          color: #9e9fa1;
          span {
          }
        }
      }

      .ground_process {
        display: flex;
        color: #9e9fa1;
        .process {
          display: flex;
          .left {
            position: relative;
            img {
              position: absolute;
              width: 0.28rem;
              height: 0.28rem;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-left: 0.4rem;
            padding-right: 0.3rem;
            p {
              flex: 1;
            }
          }
        }
      }
    }
  }

  .grounding {
    padding: 0 0.4rem;
    background-color: #fff;
    margin-top: 0.1rem;
    .top {
      overflow: hidden;
      height: 0.98rem;
      line-height: 0.98rem;
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
        a {
          color: #9e9fa1;
        }
      }
    }
    .bot {
      padding: 0.2rem 0;
      display: flex;
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
          }
          .num {
            color: #9e9fa1;
            font-size: 0.26rem;
          }
        }
        .bott {
          color: #9e9fa1;
          .kill_time {
            color: #ff6d00;
            margin: 0 0.1rem;
          }
          .kucun {
            color: #ff6d00;
            margin: 0 0.1rem;
          }
        }
      }
      .rightt {
        padding: 0.095rem 0;
        .goGround {
          border: 0.01rem solid #42bd56 !important;
          color: #42bd56;
          width: 1.2rem;
          height: 0.58rem;
          line-height: 0.58rem;
          text-align: center;
          border-radius: 0.15rem;
        }
      }
    }
  }
  .goods_det1 {
    background-color: #fff;
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
      img {
        width: 100%;
        vertical-align: middle;
      }
      // .loadMore {
      //   width: 100%;
      //   button {
      //     width: 2.45rem;
      //     height: 0.64rem;
      //     margin: 0 auto;
      //     line-height: 0.64rem;
      //     color: #fff;
      //     background-color: #42bd56;
      //     border-radius: 0.3rem;
      //   }
      // }
    }
  }

  .hot_goods {
    .top {
      background-color: #fff;
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
    .hot_items {
      overflow: hidden;
      margin-bottom: 1.02rem;
      .hot_goods_item {
        width: 50%;
        float: left;
        img {
          width: 3.45rem;
          height: 3.56rem;
        }
        .tit_item {
          text-align: left;
          padding: 0.2rem;
          width: 100%;
          h3 {
            font-size: 0.26rem;
            width: 3.05rem;
          }
          .item_price {
            .ground_price {
              color: #ff6d00;
              .mod_ground_price {
                font-size: 0.12rem;
              }
            }

            .old_price {
              text-decoration: line-through;
              padding-left: 0.1rem;
              font-size: 0.12rem;
              .mod_old_price {
              }
            }
          }
        }
      }
    }
  }

  .goods_con {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    color: #7cc688;
    padding-left: 2.82rem;
    overflow: hidden;
    background-color: #fff;
    text-align: center;
    .kefu {
      position: absolute;
      width: 1.19rem;
      height: 0.6rem;
      line-height: 0.6rem;
      border-radius: 0.3rem;
      left: 0.28rem;
      top: 0.21rem;
      border: 1px solid #42bd56;
    }
    .ground_buy {
      width: 2.34rem;
      height: 1.02rem;
      padding: 0.07rem 0;
      background-color: #42bd56;
      color: #fff;
      float: right;
    }
    .alone_buy {
      width: 2.34rem;
      height: 1.02rem;
      padding: 0.07rem 0;
      background-color: #e1f3e2;
      float: right;
    }
  }
  .scrollBox {
    max-height: 240px;
    overflow: hidden;
  }
  // .zhezhao {
  //   position: fixed;
  //   left: 0;
  //   right: 0;
  //   top: 0;
  //   bottom: 0;
  // }
  .goods_guige {
    text-align: left;
    width: 100%;
    // position: fixed;
    // bottom: 0;
    // z-index: 3;
    background-color: #fff;
    .one {
      height: 1.6rem;
      position: relative;
      padding: 0.25rem 0.9rem 0.4rem 2.08rem;
      .left {
        position: absolute;
        left: 0.3rem;
        top: -0.3rem;
        img {
          width: 1.6rem;
          height: 1.6rem;
        }
      }
      .cen {
        .tit {
          font-size: 0.32rem;
          width: 4.31rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 0.14rem;
          color: rgba(79, 80, 84, 1);
        }
        .pinGround {
          color: #ff6d00;
          font-size: 0.2rem;
          span {
            font-size: 0.3rem;
          }
        }
      }
      .close {
        box-sizing: content-box !important;
        position: absolute;
        padding: 0.3rem;
        right: 0;
        top: 0;
        width: 0.4rem;
        height: 0.4rem;
      }
    }

    .two {
      text-align: left;
      color: rgba(130, 130, 132, 1);
      padding: 0.32rem;
      padding-bottom: 0;
      .guigeType {
        font-size: 0.28rem;
        margin-bottom: 0.15rem;
      }
      .guigeTypeItem {
        min-width: 1.2rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.05rem;
        font-size: 0.26rem;
        border: 0.01rem solid #f0f0f0;
        min-height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.35rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0.2rem;
      }
      .guigeTypeItemActive {
        color: #42bd56;
        border: 0.01rem solid #42bd56;
      }
    }

    // &:last-child {
    //   padding-bottom: 0.32rem;
    // }

    .needNum {
      margin-top: 0.32rem;
      height: 1.06rem;
      padding: 0.16rem 0.3rem;
      border: 0.01rem solid #f0f0f0;
      position: relative;
      span {
        color: #828284;
        font-size: 0.28rem;
      }
      input {
        width: 4.44rem;
        height: 0.7rem;
        line-height: 0.7rem;
        padding-left: 0.1rem;
        border-radius: 0.03rem;
        color: #828284;
        font-size: 0.26rem;
      }
      .liuyan {
        border: none;
      }
      img {
        width: 0.36rem;
        height: 0.36rem;
        position: absolute;
        right: 0.3rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .res {
      padding: 0.2rem 0.32rem;
      padding-bottom: 1.32rem;
      .resGuiges {
        color: #fff;
        padding-left: 0.03rem;
        margin-bottom: 0.2rem;
        .resGuigeItems {
          height: 0.4rem;

          background: rgba(79, 80, 84, 1);

          border-radius: 0.05rem;

          line-height: 0.34rem;
          position: relative;
          margin-bottom: 0.12rem;
          background-color: #4f5054;
          .resGuigeItem {
            margin-right: 0.03rem;
            // display: inline-block;
            // height: 0.25rem;

            font-size: 0.18rem;
            font-family: PingFangSC-Regular;
            color: rgba(255, 255, 255, 1);
            // line-height: 0.25rem;
          }
          img {
            width: 0.5rem;
            height: 0.5rem;
            position: absolute;
            right: 0;
            top: 0;
            transform: translate(50%, -50%);
          }
        }
      }
      button {
        font-size: 0.26rem;
        width: 1.4rem;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #ffffff;
        background-color: #42bd56;
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
  }
  .mint-popup {
    width: 100%;
  }
}
// .showGuige {
//   width: 7.5rem;
//   height: 10.34rem;
//   overflow: hidden;
// }
.specs_cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 17;
}
</style>
