<template>
  <div class="infoDet">
    <template v-for="(item,index) in orderDetailsArr">
      <div class="goodsItemBox" :key="index">
        <div class="left">
          <img :src="item.image" alt="">
        </div>
        <div class="right">
          <div class="one">{{item.title}}</div>
          <div class="two">
            <div v-if="checkedGuige.length > 0" :key="index1" class="resGuigeItems" v-for="(item1,index1) in checkedGuige">
              <template v-for="(addedItem,addedIndex) in item1">
                <span class="resGuigeItem" :key="addedIndex">
                  {{addedItem.sizes || addedItem.num}}
                  <span v-if="addedItem.num">份</span>
                </span>
              </template>
            </div>
            <div class="resGuigeItems" v-if="newGuigess.length > 0">
              <template v-for="(item1,index1) in newGuigess">
                <span :key="index1" class="resGuigeItem">
                  {{item1.sizes}}
                  <span v-if="index1 == newGuigess.length - 1">份</span>
                </span>
              </template>
            </div>
          </div>
          <div class="three">
            <div class="pri">
              <span class="priType">原价：</span>
              <span>￥</span>
              <span>{{item.offering_price}}</span>
            </div>
            <div class="num">X{{totalNum}}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    orderDetailsArr: {
      type: Array,
      default: []
    },
    checkedGuige: {
      type: Array,
      default: () => []
    },
    newGuigess: {
      type: Array,
      default: () => []
    },
    totalNum: {
      default: 0
    }
  },
  data: function() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.infoDet {
  .goodsItemBox {
    overflow: hidden;
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
      width: 5.1rem;
      .one {
        width: 4.31rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.3rem;
      }
      .two {
        margin: 0.1rem 0;
        color: rgba(158, 159, 161, 1);
        font-size: 0.24rem;
        overflow: hidden;
        .resGuigeItems {
          width: 5.1rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background: rgba(242, 242, 242, 1);
          border-radius: 0.05rem;
          position: relative;
          margin-bottom: 0.1rem;
          overflow: hidden;
          .resGuigeItem {
            margin-right: 0.03rem;
          }
        }
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
        .num {
          float: right;
          font-size: 0.26rem;
          padding-top: 0.04rem;
        }
      }
    }
  }
}
</style>