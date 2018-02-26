<template>
    <div class="hot_goods_tit bgcWhite">
        <div class="left">
            <span></span>
            <slot name="goodsToolTit"></slot>
        </div>
        <div class="right">
            <span class="right_item" v-for="(rule,index) in showRules" :key="index" :class="[curIndex == index ?'activeType':'']" @click="changeShow(index)">{{rule.tit}}</span>
            <span v-if="sortType == 'up'" class="iconfont icon-z-arrowDown"></span>
            <span v-if="sortType == 'down'" class="iconfont icon-z-arrowUp"></span>
            <!-- <img class="sortImg" src="../assets/img/mall/Group 4_slices (1)/Group 4@2x.png"> -->
        </div>
    </div>
</template>

<script>
export default {
  props: ["showRules"],
  data: function() {
    return {
      curIndex: 0,
      sortType: "def"
    };
  },
  methods: {
    changeShow(curIndex) {
      this.curIndex = curIndex;
      this.$emit("getToolGoods", curIndex);
      if (curIndex == 3) {
        if (this.sortType == "def" || this.sortType == "down") {
          this.sortType = "up";
        } else if (this.sortType == "up") {
          this.sortType = "down";
        }
      } else {
        this.sortType = "def";
      }
    }
  }
};
</script>

<style scoped lang="less">
.hot_goods_tit {
  display: flex;
  height: 0.98rem;
  line-height: 0.98rem;
  padding: 0 0.33rem;
  // margin-bottom: 0.2rem;
  .left {
    flex: 1;
    text-align: left;
    span:first-child {
      display: inline-block;
      width: 0.26rem;
      height: 0.26rem;
      background: rgba(79, 80, 84, 1);
      margin-right: 0.1rem;
    }
  }
  .right {
    width: 3rem;
    margin: 0 auto;
    position: relative;
    .right_item {
      color: rgba(203, 203, 203, 1);
      font-size: 0.26rem;
      margin-right: 0.1rem;
      .sortImg {
        width: 0.08rem;
        height: 0.22rem;
        position: absolute;
        top: 55%;
        transform: translate(0.15rem, -50%); // padding-left: 0.1rem;
      }
    }
    .right_item:last-child {
      width: 1rem;
      margin-right: 0;
    }
    .activeType {
      color: #42bd56;
    }
  }
}
</style>