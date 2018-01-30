<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import http from "./utils/http";
import api from "./utils/api";
export default {
  name: "app",
  mounted() {
    this.goLogin();
  },
  methods: {
    goLogin: async function() {
      let params = {
        phone: 15218378694
      };
      const res = await http.post(api.send_SMS_verifyCode, params);
      await http.post(api.login_by_verifyCode, {
        phone: 15218378694,
        code: 1234
      });
      if (res.data) {
      }
    }
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
