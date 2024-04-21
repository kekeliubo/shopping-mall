import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
//Carousel轮播图--全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name,Carousel)
//Pagination分页器--全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
//element-ui
import {Button,MessageBox} from 'element-ui'
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//lazyload
import VueLazyload from 'vue-lazyload'
import gif from '@/assets/images/1.gif'
Vue.use(VueLazyload,{
  loading:gif
})

//引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'

//引入mockServer.js
import '@/mock/mockServer'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接收api文件夹里面全部的请求函数
import * as API from '@/api'

new Vue({
  render: h => h(App),
  //注册路由信息，当这里写router时，组件身上都有$route和$router属性
  router,
  //注册仓库:组件实例身上多了 $store属性
  store,
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  }
}).$mount('#app')
