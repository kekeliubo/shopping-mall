import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'
//home模块的小仓库
const actions={
    //通过API里面的接口函数调用，向服务器发送请求，获取服务器数据
    async categoryList({commit}){
        let result=await reqCategoryList();
        if(result.code===200){
            commit('CATEGORYLIST',result.data);
        }
    },
    //获取banner数据
    async getBannerList({commit}){
        let result=await reqBannerList();
        if(result.code===200){
            commit('GETBANNERLIST',result.data);
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result=await reqFloorList();
        if(result.code===200){
            commit('GETFLOORLIST',result.data);
        }
    }
}
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList;
    }
}
const state={
    //state
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters={}

export default({
    actions,
    mutations,
    state,
    getters
})