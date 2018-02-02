<template>
    <div>
      <nav-header>
        <span class="orderDetTit" slot="header">拼团详情</span>
      </nav-header>

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