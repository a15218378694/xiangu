<template>
  <div class="hot_goods_items">
    <template v-for="(item,index) in hotGoods">
      <router-link class="hot_goods_item" tag="div" :key="index" :to="{ path: 'goodsDetail', query: { goodsId: item.id}}">
        <img v-lazy="item.image" alt="">
        <div class="tit_item">
          <h3 class="item_tit">{{item.title}}</h3>
          <div class="item_price">
            <span class="ground_price">拼团:￥
              <span class="mod_ground_price">{{item.original_price}}</span>
            </span>
            <span class="old_price">原价:
              <span class="mod_old_price">￥</span>{{item.offering_price}}
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
    overflow: hidden;

    width: 3.45rem;
    height: 5.3rem;
    border-radius: 0.1rem;
    margin: 0.2rem 0 0 0.2rem;
    float: left;
    img {
      width: 100%;
      height: 3.56rem;
      vertical-align: middle;
    }
    .tit_item {
      text-align: left;
      padding: 0.2rem;
      background-color: #fff;
      height: 1.74rem;
      h3 {
        width: 3.05rem;
        height: 0.64rem;
        font-size: 0.26rem;
        font-family: PingFangSC-Medium;
        color: rgba(79, 80, 84, 1);
        line-height: 0.32rem;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 2;
        position: relative;
        overflow: hidden;
        margin-bottom: 0.27rem;
        &:after {
          content: "...";
          font-weight: bold;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }

      .item_price {
        height: 0.42rem;
        font-size: 0;
        .ground_price {
          font-size: 0.2rem;
          color: #ff6d00;
          // margin-right: 0.1rem;
          .mod_ground_price {
            font-size: 0.3rem;
            font-family: PingFangSC-Medium;
            color: rgba(255, 109, 0, 1);
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