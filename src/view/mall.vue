<template>
  <div>
    <!-- <div class="mall_search bgcWhite">
          <mt-search @click.native="toSearch" v-model="value" cancel-text="取消" placeholder="输入你要搜索的商品">
          </mt-search>
        </div> -->
    <nav-header>
      <span class="orderDetTit" slot="header">商城</span>
    </nav-header>
    <div class="mall_noGoods" v-if="!hasGoods">
      <div class="back_img"></div>
      <div class="des">一片空白</div>
      <div class="des">即将开通，敬请期待！</div>
    </div>
    <div class="mall_hasGoods" v-else>
      <div class="carouse bgcWhite">
        <el-carousel indicator-position="none" type="card" height="200px">
          <el-carousel-item v-for="item in banners" :key="item.id">
            <img :src="item.image || defaultImg" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="goods_types bgcWhite">
        <template v-for="(goodsType,idx) in goodsTypes">
          <router-link :to="{path:'typeDet',query: {'typeText':goodsType['name'],'id':goodsType.id}}" class="goods_type" :key="idx">
            <img v-lazy="goodsType.image" alt="">
            <div>{{goodsType.name}}</div>
          </router-link>
        </template>
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

      <goods-tool @getToolGoods="fetchHot" :showRules='showRules'>
        <span slot="goodsToolTit">热门商品</span>
      </goods-tool>

      <shop-item :hotGoods="hotGoods"></shop-item>
      <router-link to="shopCart">
        <img class="shopCart" src="../assets/img/mall/购物车@3x.png" alt="">
      </router-link>
      <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <img style="width:20px;height:20px;" src="../assets/img/common/loading_image@2x.png" v-if="loading">
        <!-- <div v-if="this.totalPage <= this.page && !loading">到底部了</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import http from "../utils/http";
import api from "../utils/api";
import util from "../utils/util";
import groundItem from "../components/groundItem.vue";
import shopItem from "../components/shopItem.vue";
import goodsTool from "../components/goodsTool.vue";
import navHeader from "../components/navHeader.vue";
import { Carousel, CarouselItem } from "element-ui";
import { Search } from "mint-ui";
Vue.component(Search.name, Search);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
let mallObj = {
  name: "name",
  data() {
    return {
      defaultImg: '/static/img/xiangtuLogo2.png',
      groundInfo: [],
      value: "",
      active: "index",
      hasGoods: true,
      goodsTypes: [],
      hotGoods: [],
      page: 1,
      totalPage: 0,
      busy: true,
      loading: false,
      clock: [[]],
      sortType: "def",
      showRules: [
        {
          tit: "综合"
        },
        {
          tit: "销量"
        },
        {
          tit: "商品"
        },
        {
          tit: "价格"
        }
      ],
      sort: 1,
      groups: 1,
      banners: []
    };
  },
  mounted() {
    this.getGoods();
    this.fetchType();
    this.grounding();
    this.getBanner();
  },
  methods: {
    fetchHotGoods: async function(params, callS) {
      const res = await http.get(api.recommend, params);
      if (res.data) {
        this.loading = false;
        callS && callS(res);
      }
    },
    fetchHot(curIndex) {
      this.page = 1;
      this.sort = curIndex + 1;
      this.fetchHotGoods(
        {
          groups: 1,
          sort: this.sort,
          page: this.page
        },
        res => {
          this.hotGoods = res.data.product;
        }
      );
    },
    fetchType: async function() {
      let params = {};
      const res = await http.get(api.productmodule, params);
      if (res.data) {
        this.goodsTypes = res.data.productModel;
      }
    },
    getBanner: async function() {
      let params = {};
      const res = await http.post(api.billboard, params);
      if (res.data) {
        this.banners = res.data.images;
      }
    },
    grounding: async function() {
      let params = {};
      const res = await http.get(api.groupbooking, params);
      if (res.data) {
        if (res.data.gbookingMessage) {
          this.groundInfo = res.data.gbookingMessage.splice(0, 1);
          var timeArr = [];
          for (var i = 0; i < this.groundInfo.length; i++) {
            timeArr[i] =
              this.groundInfo[i].statime / 1000 +
              this.groundInfo[i].limtime / 1000;
          }
          this.clock = util.countdownMore(timeArr, this);
        }
      }
    },
    toSearch() {
      this.$router.push({
        path: "search"
      });
    },
    loadMore() {
      util.loadMore(this, () => {
        this.fetchHotGoods(
          {
            groups: this.groups,
            sort: this.sort,
            page: this.page
          },
          res => {
            this.hotGoods = this.hotGoods.concat(res.data.product);
          }
        );
      });
    },
    //打开页面默认获取数据
    getGoods() {
      this.loading = true;
      this.fetchHotGoods(
        {
          groups: this.groups,
          sort: this.sort,
          page: this.page
        },
        res => {
          this.loading = false;
          this.hotGoods = res.data.product;
          this.totalPage = res.data.pages;
          if (this.page == this.totalPage) {
            this.busy = true;
          } else {
            this.busy = false;
          }
        }
      );
    },
    //点击分类触发
    changeShow(curIndex) {
      this.curIndex = curIndex;
      this.page = 1;
      this.sort = curIndex + 1;
      this.fetchHotGoods(
        {
          groups: 1,
          sort: this.sort,
          page: this.page
        },
        res => {
          this.hotGoods = res.data.product;
        }
      );
      if (curIndex == 3) {
        if (this.sortType == "def" || this.sortType == "down") {
          this.sortType = "up";
        } else if (this.sortType == "up") {
          this.sortType = "down";
        }
      } else {
        this.sortType = "def";
      }
    },
    loadTop() {
      util.loadTop(this);
    }
  },
  components: {
    groundItem,
    shopItem,
    goodsTool,
    navHeader
  }
};

export default mallObj;
</script>

<style lang="less">
.mall_search {
  position: relative;
  width: 6.9rem !important;
  padding: 0 0.3rem;
  box-sizing: content-box;
  font-size: 0.24rem;
  .mint-search {
    padding-top: 0.29rem;
    height: 100% !important;
    box-sizing: content-box !important;
    .mint-searchbar {
      background-color: #eeeeee !important;
      height: 100% !important;
      .mint-searchbar-inner {
        height: 100% !important;
        background-color: #eeeeee !important;
        padding: 0;
        .mint-searchbar-core {
          height: 100% !important;
          background-color: #eeeeee !important;
        }
      }
    }
  }
}
.mall_noGoods {
  position: absolute;
  left: 50%;
  top: 4.45rem;
  transform: translateX(-50%);
  .back_img {
    background: url("./../assets/img/mall/5@2x.png") no-repeat;
    width: 3.18rem;
    height: 2.66rem;
    background-size: contain;
    background-position-x: 0.2rem;
  }
  .des {
  }
}
.mall_hasGoods {
  .carouse {
    padding: 0.29rem 0 0.2rem;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 0.14rem;
      opacity: 0.75;
      line-height: 2rem;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods_types {
    display: flex;
    padding: 0.2rem;
    border-bottom: 0.01rem solid #f0f0f0;
    text-align: center;
    .goods_type {
      flex: 1;
      img {
        width: 1.3rem;
        height: 1.3rem;
      }
      div {
        height: 0.33rem;
        font-size: 0.24rem;
        font-family: PingFangSC-Regular;
        color: rgba(102, 102, 102, 1);
        line-height: 0.33rem;
      }
    }
  }
  .shopCart {
    position: fixed;
    bottom: 1.36rem;
    right: 0.3rem;
    width: 0.8rem;
    height: 0.8rem;
    img {
    }
  }
}

.grounding {
  margin: 0.1rem 0;
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
}
</style>
