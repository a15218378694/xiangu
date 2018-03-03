<template>
    <div>
        <div class="bot" v-for="(item,index) in groundInfo" :key="index">
            <div class="leftt">
                <img src="../assets/img/mall/商品详情_slices/xiangtusj.png" alt="">
            </div>
            <div class="centerr">
                <div class="topp">
                    <span class="com">{{item.title}}</span>
                    <span class="num">{{item.groupbooking_sum}}人已参与</span>
                </div>
                <div class="bott">
                    <span v-if="clock.length > 0">剩{{clock[index][0]}}:{{clock[index][1]}}:{{clock[index][2]}}</span>
                    <span class="kill_time"></span>结束，剩
                    <span class="kucun">{{item.num}}</span>库存
                </div>
            </div>
            <router-link tag="div" :to="{ path: 'groundDet', query: {orderId: item.orderId, teamId: item.teamId }}" class="rightt">
                <span class="goGround">去拼团</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "name",
  props: {
    groundInfo: {
      default: () => [],
      type: Array
    },
    clock: {
      default: () => [],
      type: Array
    }
  },
  data: function() {
    return {
      killTime: []
    };
  },
  mounted() {},

  methods: {}
};
</script>

<style scoped>

</style>
