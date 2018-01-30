<template>
    <div>
      <header class="orderPageHeader">
          <img class="back" src="../assets/img/订单详情_slices/Arrow@3x.png" alt="">
          <span class="orderDetTit">验证手机号</span>
      </header>

      <div class="yanZtit">
          <div class="one">
              本次操作需要短信确认，请输入158****9359收到的短信验证码
          </div>
          <div class="two">
              <input type="text" class="yanZnum" placeholder="输入验证码">
              <button class="faSong">获取验证码</button>
          </div>
          <button class="three">下一步</button>
      </div>

    </div>
</template>

<script>
import navHeader from "../components/navHeader.vue";

export default {
  name: "name",
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="less">
.orderPageHeader {
  background-color: #fff;
  width: 100%;
  height: 0.88rem;
  text-align: center;
  position: relative;
  line-height: 0.88rem;
  border-bottom: 0.02rem solid #dfdfdf;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 0.17rem;
    height: 0.29rem;
    padding: 0.29rem 0.3rem;
    box-sizing: content-box;
  }

  .orderDetTit {
    text-align: center;
  }
}
.yanZtit {
  text-align: left;
  padding: 0.2rem 0.45rem;
  .one {
    height: 0.8rem;
    margin-bottom: 0.2rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    color: rgba(74, 74, 74, 1);
  }
  .two {
    height: 0.96rem;
    line-height: 0.96rem;
    padding-right: 0.24rem;
    background-color: #fff;
    .yanZnum {
      width: 4.3rem;
      border: none;
      border-right: 0.01rem solid #F0F0F0;
      padding: 0;
      padding-left: 0.1rem;
      margin-right: 0.28rem;
    }
    .faSong {
        font-size:0.3rem;
font-family:PingFangSC-Regular;
color:rgba(66,189,86,1);
    }
  }
  .three {
      width: 6.6rem;
      height: 0.96rem;
      line-height: 0.96rem;
      color: #fff;
      background-color: #42BD56;
      margin-top: 0.5rem;
  }
}
</style>