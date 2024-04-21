import {reqAddressInfo,reqOrderInfo} from '@/api'
//trade模块的小仓库
const actions={
     //获取用户地址
     async getUserAddress({commit}){
        let result=await reqAddressInfo();
        if(result.code==200){
            commit('GETUSERADDRESS',result.data)
        }
     },
     //获取商品清单数据
     async getOrderInfo({commit}){
        let result=await reqOrderInfo();
        if(result.code==200){
            commit('GETORDERINFO',result.data);
        }
     }
}
const mutations={
    GETUSERADDRESS(state,userAddress){
        state.address=userAddress;
    },
    GETORDERINFO(state,orderInfo){
        state.order=orderInfo;
    }
}
const state={
 address:[],
 order:{}
}
const getters={
    
}

export default({
    actions,
    mutations,
    state,
    getters
})