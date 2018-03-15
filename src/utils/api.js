let isTest = location.href.includes('test')
let baseUrl = 'http://merchant.xljkj.cn'
if (isTest) {
  baseUrl = 'http://test.merchant.xljkj.cn'
}


export default {
  baseUrl,
  // baseUrl: 'http://merchant.xljkj.cn',
  recommend: "/home/recommend",//商城首页显示接口
  productmodule: "/home/productmodule",//商城首页 商品分类列表的接口
  module: "/home/module",//商城首页点击去到商品某类详情模块接口
  lookmore: "/home/groupbooking/lookmore",//首页点击查看更多
  prodetails: "/details",//商品详情页
  pro: "/buy/pro",//商品详情页点击拼团
  order: "/pro/order",//商品 确定下单 获得orderid
  showPro: "/shoppingcat/showPro",//显示购物车商品
  showtotalprice: "/shoppingcat/showtotalprice",//购物车选择的商品的总价
  delete: "/shoppingcat/delete",//删除购物车商品
  groupbooking: '/home/groupbooking',//商城首页正在拼团接口
  send_SMS_verifyCode: "/login/redis/send_SMS_verifyCode.ajax",//短信验证码发送接口
  login_by_verifyCode: "/login/redis/login_by_verifyCode.ajax",//短信验证码登录
  outrepertory: "/pro/outrepertory",//商品添加规格 的库存判断
  login_by_wechat: "/login/login_by_wechat.ajax",//微信登录
  pageviews: "/statistics/pageviews",//商品浏览量统计
  login_by_password: "/login/login_by_password.ajax",//密码登录
  binding_phone: "/login/binding_phone.ajax",//绑定手机号码
  login_by_wechat: "/login/login_by_wechat.ajax",//微信登录
  addPro: '/shoppingcat/addPro',//加入购物车
  finishpay: '/groupbooking/finishpay',//去参团，或者支付完成跳转到的拼团详情页面
  billboard: '/home/billboard',//首页轮播图
  collectproduct: '/collectproduct',//收藏商品
  collectproductDet: '/delete/collectproduct',//删除或者取消收藏
  submitorder: '/pro/submitorder',//立即支付
  getProPrice: '/pro/getProPrice',//根据商品规格 获得相应的价格
  invitefriends: '/groupbooking/invitefriends',//邀请好友开团
  unitprice: '/buy/unitprice',//商品详情页点击单价购买
  sharedetails: '/sharedetails',//拼团分享出 的页面
  gototuxedo: '/groupbooking/gototuxedo',//外链进来 去参团
  finishcutdown: '/groupbooking/finishcutdown'//拼团详情 倒计时结束
};
