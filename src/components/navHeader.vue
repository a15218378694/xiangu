<template>
    <header class="orderPageHeader" tag="header">
        <img class="back" v-if="isShow" @click="back" src="../assets/img/订单详情_slices/Arrow@3x.png" alt="">
        <slot name="header"></slot>
    </header>

</template>

<script>
export default {
  data: function() {
    return {
      isShow: true
    };
  },
  mounted () {
    this.detCurRouter()  
  },
  methods: {
      back() {
          this.$router.go(-1)
      },
      detCurRouter() {
          console.log();
          if (location.hash != '#/mall') {
              this.isShow = true
          } else {
              this.isShow = false              
          }
      }
  }
};
</script>
