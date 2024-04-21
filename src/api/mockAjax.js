import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//start进度条开始  done进度条结束
//引入进度条样式
import "nprogress/nprogress.css"

//1、利用axios对象的方法create，去创建一个axios实例
// 2、request就是axios，只不过稍微配置一下
const mockRequests=axios.create({
    //基础路径 发请求时会自动出现
    baseURL:'/mock',
    //请求不能超过5s
    timeout:5000
})

// 请求拦截器，可以在发请求之前处理一些业务
mockRequests.interceptors.request.use((config)=>{
    //config是一个配置对象  对象里面有headers请求头
    nprogress.start();
    return config;
})

// 响应拦截器
mockRequests.interceptors.response.use((res)=>{
    //成功回调函数：服务器相应数据回来后，响应拦截器可以检测到
    //进度条结束
    nprogress.done();
    return res.data;
},(err)=>{
    return Promise.reject(new Error('faile'));
})




//对外暴露
export default mockRequests;