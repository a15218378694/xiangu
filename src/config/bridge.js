export default {
  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
  },
  getSheBei() {
    let u = navigator.userAgent;
    let device = ""; //当前设备信息
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
      device = "Android";
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
      device = "iPhone";
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
      device = "WindowsPhone";
    }
    return device
  }
}
