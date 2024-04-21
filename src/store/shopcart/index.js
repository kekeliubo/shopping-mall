import {reqCartList,reqDeleteCartById,reqUpdateChecked} from '@/api'
//search模块的小仓库
const actions={
    //获取购物车数据
    async getCartList({commit}){  //给params设置默认值为空对象
        let result=await reqCartList();
        if(result.code===200){
            commit('GETCARTLIST',result.data);
        }
    },
    //删除购物车商品
    async deleteCart({commit},skuId){
        let result=await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //修改购物车中某一商品的选中状态
    async changeChecked({commit},{skuId,isChecked}){
        let result=await reqUpdateChecked(skuId,isChecked);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //删除所有勾选的商品
    //把执行上下文的dispatch 和 getters解构出来
    async deleteAllCheckedCart({dispatch,getters}){
        let promises=[];
        getters.cartList.cartInfoList.forEach((item)=>{
           promises.push(item.isChecked==1?dispatch('deleteCart',item.skuId):'');
        });
        // 只要全部的promise都成功就返回成功的结果
        return Promise.all(promises);
    },
    //修改全部产品的勾选状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promises=[];
        state.cartList[0].cartInfoList.forEach((item)=>{
            promises.push(dispatch('changeChecked',{skuId:item.skuId,isChecked}));
        })
        //最终返回结果
        return Promise.all(promises);
    }
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList;
    }
}
const state={
   cartList:[]
}
//getters用于简化仓库中的数据
const getters={
   cartList(state){
    return state.cartList[0]||{}
   },
   
}

export default({
    actions,
    mutations,
    state,
    getters
})