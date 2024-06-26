//API进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList   get请求 无参数

export const reqCategoryList=()=>{
    //发请求:axios发请求返回结果是Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}

//获取banner(Hone首页轮播图接口)
export const reqBannerList=()=>{
    //发请求:axios发请求返回结果是Promise对象
    return mockRequests.get('/banner')
}

//获取floor数据
export const reqFloorList=()=>mockRequests.get('/floor')
// 获取搜索模块数据  地址:/api/list  请求方式:POST 需要带参数
/*
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */

//当前这个接口 给服务器传递的params参数至少是一个空对象
export const reqSearchInfo=(params)=>requests({
    url:'/list',
    method:'post',
    data:params
})


//获取商品详情  地址：/api/item/{ skuId }
export const reqGoodsInfo=(skuId)=>requests({
    url:`/item/${skuId}`,
    method:'get'
})

//将产品添加到购物车中或者更新某一个产品的个数
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

//获取购物车列表数据接口
export const reqCartList=()=>requests({
    url:'/cart/cartList',
    method:'get'
})

//删除购物车产品的接口
export const reqDeleteCartById=(skuId)=>requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})

//修改购物车中商品的选中状态
export const reqUpdateChecked=(skuId,isChecked)=>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})

//注册组件获取验证码
export const reqGetCode=(phone)=>requests({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
});

//注册
export const reqUserRegister=(data)=>requests({
    url:'/user/passport/register',
    data,
    method:'post'
})

//登录
export const reqUserLogin=(data)=>requests({
    url:'/user/passport/login',
    method:'post',
    data
})

// 获取用户信息(需要带着token请求用户信息)
export const reqUserInfo=()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

//退出登录
export const reqLogOut=()=>requests({
    url:'/user/passport/logout',
    method:'get'
})

//获取用户地址信息
export const reqAddressInfo=()=>requests({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
})

//获取商品清单
export const reqOrderInfo=()=>requests({
    url:'/order/auth/trade',
    method:'get'
})

//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data
})

//获取订单支付信息
export const reqPayInfo=(orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

//获取订单支付状态
export const reqPayStatus=(orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})

//获取个人中心的数据
export const reqMyorderList=(page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})
