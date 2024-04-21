//路由配置信息
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false},
        name:'login'
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/search:keyword?',
        component:Search,
        meta:{show:true},
        name:'search',
        //布尔值写法
        // props:true
        //对象写法  额外的给路由组件传递一些props参数
        // props:{a:1,b:2}
        // 函数写法
        // props:($route)=>{
        //     return {keyWord:$route.params.keyWord,k:$route.query.keyWord}           
        //  }
    },
    {
        path:'/detail:skuId?',
        name:'detail',
        component:Detail,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/shopcart',
        name:'shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        name:'trade',
        component:Trade,
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path:'/pay',
        name:'pay',
        component:Pay,
    },
    {
        path:'/paysuccess',
        name:'paysuccess',
        component:PaySuccess,
        beforeEnter: (to, from, next) => {
            if(from.path=="/pay"){
                next();
            }
        }
    },
    {
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        //项目重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        path:'*',
        redirect:'/home'
    }
]