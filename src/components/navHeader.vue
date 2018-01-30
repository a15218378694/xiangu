<template>
    <header class="orderPageHeader" tag="header">
        <img class="back" @click="back" src="../assets/img/订单详情_slices/Arrow@3x.png" alt="">
        <slot name="header"></slot>
    </header>

</template>

<script>
export default {
  data: function() {
    return {
      
    };
  },
  methods: {
      back() {
          this.$router.go(-1)
      }
  }
};
</script>
