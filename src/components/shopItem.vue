<template>
  <div class="hot_goods_items">
    <template v-for="(item,index) in hotGoods">
      <router-link class="hot_goods_item" tag="div" :key="index" :to="{ path: 'goodsDetail', query: { goodsId: item.id}}">
        <img v-lazy="item.image" alt="">
        <div class="tit_item">
          <h3 class="item_tit">{{item.title}}</h3>
          <div class="item_price">
            <span class="ground_price">拼团：
              <span class="mod_ground_price">￥</span> 4.3
            </span>
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import http from "../utils/http";
import api from "../utils/api";
import axios from "axios";
export default {
  props: ["hotGoods"],
  name: "name",
  data: function() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.hot_goods_items {
  overflow: hidden;
  .hot_goods_item {
    text-align: center;
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
        height: 0.69rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item_price {
        .ground_price {
          font-size: 0.2rem;
          color: #ff6d00;
          .mod_ground_price {
          }
        }

        .gro_num {
          font-size: 0.3rem;
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
</style>