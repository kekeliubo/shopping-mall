import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut} from '@/api'
//user模块的小仓库
const actions={
     //获取验证码
     async getCode({commit},phone){
        let result=await reqGetCode(phone);
       if(result.code==200){
        commit('GETCODE',result.data)
        return 'ok'
       }else{
        return Promise.reject(new Error('faile'))
       }
     },
     //用户注册
     async userRegister({commit},data){
        let result=await reqUserRegister(data);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
        }
     },
     //登陆业务
     async userLogin({commit},data){
        let result=await reqUserLogin(data);
        //服务器下发token，作为用户的唯一标识
        // 将来通过带token找服务器要用户信息进行展示
        if(result.code==200){
           commit('USERLOGIN',result.data.token);
        // 持久化存储token
        localStorage.setItem('TOKEN',result.data.token)   
           return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
     },
     //获取用户信息
     async getUserInfo({commit}){
        let result= await reqUserInfo();
        if(result.code==200){
            commit('GETUSERINFO',result.data);
           
        }
     },
     //退出登录
     async userLogOut({commit}){
        //只是想服务器发送一次请求,让服务器清除数据
        let result=await reqLogOut();
        if(result.code==200){
            commit('CLEAR');
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
     }
}
const mutations={
    GETCODE(state,code){
        state.code=code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo;
    },
    //清除本地数据
    CLEAR(state){
        //清空store和localstorage中的用户数据
        state.userInfo={};
        state.token='';
        localStorage.removeItem('TOKEN')
    }
}
const state={
 code:'',
 token:localStorage.getItem('TOKEN'),
 userInfo:{}
}
const getters={
    
}

export default({
    actions,
    mutations,
    state,
    getters
})