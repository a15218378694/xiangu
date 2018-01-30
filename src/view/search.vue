<template>
  <div>
    <div class="searchPage">
      <div class="sea bgcWhite">
        <input type="text" placeholder="输入你要搜索的商品">
        <img src="../assets/img/搜索@2x.png" alt="">
        <router-link tag="span" to="/mall">
          返回
        </router-link>
      </div>

      <div class="his">搜索历史</div>

      <div class="biaoqian">
        <span>LED灯箱灯条 20W电压</span>
        <span>LE灯条 </span>
        <span>LEDW电压</span>
        <span>LED灯箱灯条 20W电压</span>
      </div>
    </div>
  </div>

</template>

<script>
import util from '../utils/util'
export default {
  name: "name",
  data: function() {
    return {};
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.searchPage {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  .sea {
    border-bottom: 0.01rem solid #f0f0f0;
    text-align: center;
    display: flex;
    line-height: 0.6rem;
    padding: 0.1rem 0 0.1rem 0.3rem;
    position: relative;

    input {
      width: 5.79rem;
      height: 0.6rem;
      padding-left: 0.55rem;
      border-radius: 0.15rem;
      background-color: #eeeeee;
      color: rgba(191, 191, 191, 1);
      font-size: 0.24rem;
    }
    img {
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      left: 0.49rem;
      top: 50%;
      transform: translateY(-50%);
    }
    span {
      flex: 1;
      height: 0.6rem;
      display: inline-block;
      color: rgba(79, 80, 84, 1);
      font-size: 0.34rem;
    }
  }

  .his {
    text-align: left;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    color: rgba(158, 159, 161, 1);
    margin: 0.3rem 0 0.3rem 0.3rem;
  }

  .biaoqian {
      margin-left: 0.3rem;
    span {
      float: left;
      padding: 0.2rem;
      margin: 0 0.2rem 0.2rem 0;
      background: rgba(234, 238, 242, 1);
      border-radius: 0.1rem;
    }
  }
}
</style>