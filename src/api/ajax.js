import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//start进度条开始  done进度条结束
//引入进度条样式
import "nprogress/nprogress.css"

//当前模块引入store
import store from '@/store'

//1、利用axios对象的方法create，去创建一个axios实例
// 2、request就是axios，只不过稍微配置一下
const requests=axios.create({
    //基础路径 发请求时会自动出现
    baseURL:'/api',
    //代表请求超时时间
    timeout:5000
})

// 请求拦截器，可以在发请求之前处理一些业务
requests.interceptors.request.use((config)=>{
    //config是一个配置对象  对象里面有headers请求头
    if(store.state.detail.uuid){
        //请求头添加一个字段 {userTempId}
        config.headers.userTempId=store.state.detail.uuid;
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token;
    }
    nprogress.start();
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    //成功回调函数：服务器相应数据回来后，响应拦截器可以检测到
    //进度条结束
    nprogress.done();
    return res.data;
},(err)=>{
    return Promise.reject(new Error('faile'));
})




//对外暴露
export default requests;