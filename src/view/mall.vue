<template>
  <div>
    <!-- <div class="mall_search bgcWhite">
          <mt-search @click.native="toSearch" v-model="value" cancel-text="取消" placeholder="输入你要搜索的商品">
          </mt-search>
        </div> -->
    <navHeader>
      <span class="orderDetTit" slot="header">商城</span>
    </navHeader>
    <div class="mall_noGoods" v-if="!hasGoods">
      <div class="back_img"></div>
      <div class="des">一片空白</div>
      <div class="des">即将开通，敬请期待！</div>
    </div>
    <div class="mall_hasGoods" v-else>
      <!-- <div class="bgcWhite" style="height:150px;"> 
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in banners" :key="item.id">
            <img :src="item.image || defaultImg" alt="">
          </mt-swipe-item>
        </mt-swipe>
      </div> -->
      <div class="swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="https://merchant-service.oss-cn-beijing.aliyuncs.com/banner1.png" />
            </div>
            <div class="swiper-slide">
              <img src="https://merchant-service.oss-cn-beijing.aliyuncs.com/banner1.png" />
            </div>
            <div class="swiper-slide">
              <img src="https://merchant-service.oss-cn-beijing.aliyuncs.com/banner1.png" />
            </div>

          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="goods_types bgcWhite">
        <template v-for="(goodsType,idx) in goodsTypes">
          <router-link :to="{path:'typeDet',query: {'typeText':goodsType['name'],'id':goodsType.id}}" class="goods_type" :key="idx">
            <img v-lazy="goodsType.image" alt="">
            <div>{{goodsType.name}}</div>
          </router-link>
        </template>
      </div>

      <!-- <div class="grounding" v-if="groundInfo.length > 0">
        <div class="top">
          <div class="left">
            <div class="leftImg"></div>
          </div>
          <div class="center">正在拼团</div>
          <div class="right">
            <router-link to="moreGround">查看更多</router-link>
          </div>
        </div>

        <groundItem :groundInfo="groundInfo" :clock="clock"></groundItem>

      </div> -->

      <goodsTool @getToolGoods="fetchHot" :showRules='showRules'>
        <span slot="goodsToolTit">热门商品</span>
      </goodsTool>

      <shopItem :hotGoods="hotGoods"></shopItem>
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
import "@/utils/swi.js";
import "@/assets/css/swi.css";
// import { Swipe, SwipeItem } from "mint-ui";

// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
import { Search } from "mint-ui";
import { mapState } from "vuex";

Vue.component(Search.name, Search);
export default {
  name: "name",
  data() {
    return {
      defaultImg: "/static/img/xiangtuLogo2.png",
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
  computed: {
    ...mapState(["cartCount"])
  },
  mounted() {
    this.getGoods();
    this.fetchType();
    this.grounding();
    this.getBanner();
    // this.getCartCount();
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        autoplay: 5000,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        // 如果需要分页器
        pagination: ".swiper-pagination"
      });
    });
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
    grounding() {
      // api.groupbooking
      util.grounding(this);
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
      this.loadin = true;
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
    // getCartCount: async function(params = {}) {
    //   const res = await http.get(api.showPro, params);
    //   console.log(res);

    //   if (res.data) {
    //     this.$store.commit("updateCartCount",res.data.list.length);
    //   }
    // },
  }
};
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
  .goods_types {
    display: flex;
    padding: 0.2rem;
    border-bottom: 0.02rem solid #f0f0f0;
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
.el-carousel__item {
  // width: 300px;
}
</style>

    <style>
        .swiper-container {
            margin-top: 20px;
            width: 750px;
            height: 320px;
            margin-bottom: 53px;
            overflow: hidden !important;
        }

        .swiper-container .swiper-wrapper .swiper-slide {
            width: 620px;
            border-radius: 20px;
        }

        .swiper-container .swiper-wrapper .swiper-slide img {
            width: 100%;
            height: 320px;
            border-radius: 20px;
        }

        .swiper-container .swiper-wrapper .swiper-slide-prev {
            margin-top: 18px;
            height: 284px !important;
        }

        .swiper-container .swiper-wrapper .swiper-slide-prev img {
            height: 284px !important;
        }

        .swiper-container .swiper-wrapper .swiper-slide-next {
            margin-top: 18px;
            height: 284px !important;
        }

        .swiper-container .swiper-wrapper .swiper-slide-next img {
            height: 284px !important;
        }

        .swiper-container .swiper-wrapper .swiper-slide-active {
            width: 620px;
        }

        .swiper-pagination {
            bottom: -30px !important;
        }

        .swiper-pagination .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #ff1e1e;
        }

        .swiper-pagination .swiper-pagination-bullet-active {
            width: 21px;
            height: 12px;
            background: #e75230;
            border-radius: 6px;
        }
</style>