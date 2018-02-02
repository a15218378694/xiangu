<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import http from "./utils/http";
import api from "./utils/api";
import util from "./utils/util";
export default {
  name: "app",
  data() {
    return {
      
    };
  },
  mounted() {},
  methods: {

  },
  watch: {

  }
};
</script>

<style>
#app {
  font-family: PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 0.32rem;
}
</style>
