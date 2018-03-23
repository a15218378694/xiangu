import http from './http'
import api from './api'
import { Toast } from "mint-ui";


export default {
  toastEven(msg,flag) {
    // Toast(msg)
    if (flag) {
      Toast(msg)
    }
  },
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  },

  dateformat(micro_second) {
    // 秒数
    var second = Math.floor(micro_second / 1000);
    // 小时位
    var hr = Math.floor(second / 3600);

    // 分钟位
    var min = Math.floor((second - hr * 3600) / 60);

    // 秒位
    var sec = second - hr * 3600 - min * 60; // equal to => var sec = second % 60;

    // 毫秒位，保留2位
    var micro_sec = Math.floor((micro_second % 1000) / 10);

    return [hr, min, sec].map(this.formatNumber);
  },

  async countdown(that, total_micro_second) {
    // console.log(total_micro_second);
    if (total_micro_second <= 0 || isNaN(total_micro_second)) {
      that.clock = [0, 0, 0].map(this.formatNumber);

      let params = {
        teamId: that.teamId,
        orderId: that.orderId
      }
      await http.get(api.finishcutdown, params)
      that.getGroudDet(false, that.getGroundDetCall)
      if (that.timer != undefined) {
        clearTimeout(that.timer);
      }
      // timeout则跳出递归 
      return;
    } else {
      // 渲染倒计时时钟
      that.clock = this.dateformat(total_micro_second);
    }

    that.timer = setTimeout(() => {
      total_micro_second -= 1000;
      this.countdown(that, total_micro_second);
    }, 1000);
  },

  remove_array(array, index) {
    for (var i = 0; i < array.length; i++) {
      var temp = array[i];
      if (!isNaN(index)) {
        temp = i;
      }
      if (temp == index) {
        for (var j = i; j < array.length; j++) {
          array[j] = array[j + 1];
        }
        array.length = array.length - 1;
      }
    }
    return array;
  },

  //格式化多个时间戳
  countdownMore(timeArr, that) {
    // 清除定时器
    if (that.timer) {
      clearTimeout(that.timer);
    }
    var times = [];
    timeArr.map(function (v, i) {
      times[i] = (v - new Date().getTime() / 1000) * 1000;
    });
    this.countdowns(that, times);
  },

  /**
   *多个定时器
   */
  countdowns(that, total_micro_seconds) {
    var clock = [];
    for (var i = 0; i < total_micro_seconds.length; i++) {
      var total_micro_second = total_micro_seconds[i];
      if (total_micro_second <= 0 || isNaN(total_micro_second)) {
        clock[i] = [0, 0, 0].map(this.formatNumber);
        // if (that.timer != undefined) {
        //   total_micro_seconds = this.remove_array(total_micro_seconds, i);
        // }
        // timeout则跳出递归
        continue;
      } else {
        clock[i] = this.dateformat(total_micro_second);


      }
    }

    that.clock = clock;

    if (total_micro_seconds.length < 1) {
      if (that.timer != undefined) {
        clearTimeout(that.timer);
      }
    }
    var intervalTime = 1000;
    that.timer = setTimeout(() => {
      var temp_array = [];
      for (var i = 0; i < total_micro_seconds.length; i++) {
        var total_micro_second = total_micro_seconds[i] - 1000;
        temp_array[i] = total_micro_second;
      }
      this.countdowns(that, temp_array);
    }, intervalTime);
  },

  //分页 上拉加载更多
  loadMore(that, callb) {
    if (that.page >= that.totalPage) {
      that.loading = false;
      that.busy = true;
      return;
    }
    that.page++;
    callb();
  },
  goLogin: async function () {
    let params = {
      phone: 15218378694
    };
    const res = await http.post(api.send_SMS_verifyCode, params);
    if (res.data) {
      const res1 = await http.post(api.login_by_verifyCode, {
        phone: 15218378694,
        code: 1234
      });
      if (res1.data) {
        this.setStore('token', res1.data.tonken)
      }
    }

  },
  //操作多个定时器
  grounding: async function (that, typ) {
    let params = {};
    const res = await http.get(api.groupbooking, params);
    if (res.data) {
      if (res.data.gbookingMessage) {
        if (typ !== 'more') {
          that.groundInfo = res.data.gbookingMessage.splice(0, 2);
        } else {
          that.groundInfo = res.data.gbookingMessage
        }
        // that.groundInfo = [
        //   //正在拼团的商品
        //   {
        //     id: 3, // 商品id
        //     title: "LED灯箱灯条 拉不卡布软膜广告灯箱光源1", // 商品标题
        //     num: 356000, // 商品库存数量
        //     groupbooking_sum: 100, // 拼团人数
        //     surplusTime: 1520062982698, // 拼团剩余时间
        //     hours: 6, //剩余的小时数
        //     minutes: 58 //剩余的分钟
        //   },
        //   {
        //     id: 4,
        //     title: "LED灯箱灯条 拉不卡布软膜广告灯箱光源2",
        //     num: 356000,
        //     groupbooking_sum: 100,
        //     surplusTime: 1520062582698,
        //     hours: 6,
        //     minutes: 58
        //   },
        //   {
        //     id: 5,
        //     title: "LED灯箱灯条 拉不卡布软膜广告灯箱光源3",
        //     num: 356000,
        //     groupbooking_sum: 100,
        //     surplusTime: 1520073982698,
        //     hours: 6,
        //     minutes: 58
        //   }
        // ];
        var timeArr = [];
        for (var i = 0; i < that.groundInfo.length; i++) {
          timeArr[i] = that.groundInfo[i].surplusTime / 1000;
        }
        // console.log(timeArr);
        that.clock = this.countdownMore(timeArr, that);
      }
    }
  },
  pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = this.pad(date.getMinutes()) + ':';
    var s = this.pad(date.getSeconds());
    
    
    return Y + M + D + h + m + s;
  },
  setStore(name, content) {
    if (!name) return;
    console.log(typeof content !== 'string');
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  getStore(name) {
    if (!name) return;
    return window.localStorage.getItem(name);
  },
  removeStore(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
  }
};
