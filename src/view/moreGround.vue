<template>
    <div>
      <nav-header>
                <span class="orderDetTit" slot="header">更多拼团</span>        
      </nav-header>      
      <div class="grounding" style="margin: 0;">
          <ground-item :groundInfo="groundInfo" :clock="clock"></ground-item>
      </div>
    </div>
</template>

<script>
import Vue from "vue";
import http from "../utils/http";
import api from "../utils/api";
import axios from "axios";
import util from "../utils/util";
import groundItem from "../components/groundItem.vue";
import navHeader from "../components/navHeader.vue";
export default {
  name: "name",
  data: function() {
    return {
      back: -1,
      groundInfo: [],
      clock: [[]],
      page: 1
    };
  },
  mounted() {
    this.grounding();
  },
  methods: {
    grounding: async function() {
      let params = {
        page: this.page
      };
      const res = await http.get(api.lookmore, params);
      if (res.data) {
        this.groundInfo = res.data.list;
        var timeArr = [];
        for (var i = 0; i < this.groundInfo.length; i++) {
          timeArr[i] =
            this.groundInfo[i].statime / 1000 +
            this.groundInfo[i].limtime / 1000;
        }
        this.clock = util.countdownMore(timeArr, this);
      }
    }
  },
  components: {
    groundItem,
    navHeader
  }
};
</script>

<style scoped>

</style>
