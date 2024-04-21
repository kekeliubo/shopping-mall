import {reqSearchInfo} from '@/api'
//search模块的小仓库
const actions={
    //获取Search模块数据
    async getSearchList({commit},params={}){  //给params设置默认值为空对象
        let result=await reqSearchInfo(params);
        if(result.code===200){
            commit('GETSEARCHLIST',result.data);
        }
    }
}
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList;
    }
}
const state={
    searchList:{}
}
//getters用于简化仓库中的数据
const getters={
    //这里的state是当前仓库中的state
    goodsList(state){
        //当网络太慢或者没网  state.searchList.goodsList的返回值为undefined 因此需要将其默认设置为空数组
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    }

}

export default({
    actions,
    mutations,
    state,
    getters
})