import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
//detail模块的小仓库
const actions={
     //获取Detail模块数据
     async getGoodsInfo({commit},skuId){  //给params设置默认值为空对象
        let result=await reqGoodsInfo(skuId);
        if(result.code===200){
            commit('GETGOODSINFO',result.data);
        }
    },
    // 将产品加入到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){  //给params设置默认值为空对象
        let result=await reqAddOrUpdateShopCart(skuId,skuNum);
        //不需要三连环存储数据
        if(result.code==200){
            //加入购物车成功
            return 'ok';
        }else{
            // 加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    },
}
const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo;
    },
}
const state={
   goodsInfo:{},
   //游客临时身份
   uuid:getUUID()
}
const getters={
    //路径导航简化的数据
    categoryView(state){
        //state.goodsInfo的初始状态为空对象  他的categoryView属性为undefined  因此输出控制台会报错
        return state.goodsInfo.categoryView||{};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodsInfo.skuInfo||{};
    },
    // 售卖属性的简化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[];
    }
    
}

export default({
    actions,
    mutations,
    state,
    getters
})