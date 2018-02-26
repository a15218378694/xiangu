<template>
  <div class="typeDetPage">
    <nav-header>
      <span class="orderDetTit" slot="header">{{typeText}}</span>
    </nav-header>

      <goods-tool @getToolGoods="fetchType" :showRules='showRules'>
        <span slot="goodsToolTit">热门商品</span>
      </goods-tool>

    <shop-item :hotGoods="product"></shop-item>
    <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <img style="width:20px;height:20px;" src="../assets/img/common/loading_image@2x.png" v-if="loading">
      <!-- <div v-if="this.totalPage <= this.page && !loading">到底部了</div> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import http from "../utils/http";
import api from "../utils/api";
import axios from "axios";
import util from "../utils/util";
import navHeader from "../components/navHeader.vue";
import shopItem from "../components/shopItem.vue";
import goodsTool from "../components/goodsTool.vue";

export default {
  name: "name",
  data: function() {
    return {
      typeText: "",
      imgUrl: "",
      typeIndex: 0,
      product: [],
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
      loading: false,
      page: 1,
      sort: 1,
      groups: 1,
      totalPage: 0
    };
  },
  mounted() {
    this.typeText = this.$route.query.typeText;
    this.cid = this.$route.query.id;
    this.imgUrl = this.$route.query.imgUrl;
    this.initDet();
  },
  methods: {
    fetchTypeDet: async function(params, callS) {
      const res = await http.get(api.module, params);
      if (res.data) {
        this.loading = false;
        callS && callS(res);
      }
    },
    fetchType(curIndex) {
      this.page = 1;
      this.sort = curIndex + 1;
      this.fetchTypeDet(
        {
          cid: this.cid,
          groups: 1,
          sort: this.sort,
          page: this.page
        },
        res => {
          this.product = res.data.product;
        }
      );
    },
    loadMore() {
      util.loadMore(this, () => {
        this.fetchTypeDet(
          {
            groups: this.groups,
            sort: this.sort,
            page: this.page,
            cid: this.cid
          },
          res => {
            this.loading = false;
            this.product = this.product.concat(res.data.product);
          }
        );
      });
    },
    //打开页面默认获取数据
    initDet() {
      this.loading = true;
      this.fetchTypeDet(
        {
          groups: this.groups,
          sort: this.sort,
          page: this.page,
          cid: this.cid
        },
        res => {
          this.loading = false;
          this.product = res.data.product;
          this.totalPage = res.data.pages;
          if (this.page == this.totalPage) {
            this.busy = true;
          } else {
            this.busy = false;
          }
        }
      );
    }
  },
  components: {
    navHeader,
    shopItem,
    goodsTool
  }
};
</script>

<style scoped lang="less">

</style>