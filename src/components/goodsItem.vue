<template>
  <div class="infoDet">
    <template v-for="(item,index) in orderDetailsArr">
      <div :key="index">
        <div class="left">
          <img :src="item.image" alt="">
        </div>
        <div class="right">
          <div class="one">{{item.title}}</div>
          <div class="two">款式：
            <template v-if="checkedGuige.length > 0" v-for="(item1,index1) in checkedGuige">
              <span :key="index1" class="resGuigeItems">
                <template v-for="(addedItem,addedIndex) in item1">
                  <span class="resGuigeItem" :key="addedIndex">
                    {{addedItem.sizes || addedItem.num}}
                    <span v-if="addedItem.num">份</span>
                  </span>
                </template>
              </span>
            </template>
          </div>
          <div class="three">
            <div class="pri">
              <span class="priType">原价：</span>
              <span>￥</span>
              <span>{{item.offering_price}}</span>
            </div>
            <div class="num">{{totalNum}}</div>
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
      default: []
    },
    totalNum: {
      type: Number,
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
    .one {
      width: 4.31rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.3rem;
    }
    .two {
      margin: 0.22rem 0;
      color: rgba(158, 159, 161, 1);
      font-size: 0.24rem;
      width: 4.76rem;
      height: 0.66rem;
      overflow: hidden;
      .resGuigeItems {
        height: 0.6rem;
        line-height: 0.6rem;
        position: relative;
        margin: 0 0.2rem 0.2rem 0;
        background-color: #4f5054;
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
</style>