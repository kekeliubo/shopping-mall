//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router'
import routes from './routes'
//引入store
import store from '@/store'

//先把VueRouter原型的push方法保存一份
let originPush=VueRouter.prototype.push;
//先把VueRouter原型的replace方法保存一份
let originReplace=VueRouter.prototype.replace;
//重写push|replace
//第一个参数，告诉原来的push往哪里跳
//第二个参数为成功的回调  第三个参数为失败的回调
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        //修改originPush的上下文为VueRouter的实例
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        //修改originPush的上下文为VueRouter的实例
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
Vue.use(VueRouter);

let router=new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置  y=p代表滚动条在最上方
        return {y:0}
      }
});
router.beforeEach(async(to,from,next)=>{
    let token=store.state.user.token;
    //用户信息
    let name=store.state.user.userInfo.name;
    //用户已经登陆
    if(token){
        if(to.path=="/login"){
            //用户已经登陆 就不能去login了
            next('/')
        }else{
            //用户已经登陆 但去的不是login
            if(name){
                //有用户信息
                next();
            }else{
                //没有用户信息 就派发action获取用户信息
                try{
                    await store.dispatch('getUserInfo');
                    next();
                }catch(err){
                    //token失败了 获取不到用户信息，重新登录
                    //清除token
                    await store.dispatch('userLogOut');
                    next('/login')
                }
            }
            
        }
    }else{
        //未登录  不能去trade pay paysuccess center
        if(to.path=="/trade"||to.path.indexOf('/pay')!=-1||to.path.indexOf('/center')!=-1){
            next('/login?redirect='+to.path)
        }else{
            next();
        }
    }
})
export default router;