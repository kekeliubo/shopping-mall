<template>
  <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveShow" @mouseenter="enterShow">
                    <h2 class="all">全部商品分类</h2>
                    <transition name="sort">
                        <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                            <h3 @mouseenter="changeBgc(index)" >
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <!-- 二三级分类 -->
                            <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>
                    </transition>
                </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
            </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
//引入lodash用于函数节流和防抖   这种方法把lodash所有的功能函数都引入了
// import _ from 'lodash'
//按需引入
import throttle from 'lodash/throttle'
export default {
    name:'TypeNav',
    data(){
        return {
            currentIndex:-1,
            show:true
        }
    },
    methods: {
        // 节流写法
        changeBgc:throttle(function(index){
            this.currentIndex=index;
        },50),
        goSearch(e){
            //编程式导航+事件委派
            //存在的问题：如何确定点击的一定是a标签-----给所有的a标签绑定自定义属性
            let element=e.target;
            let {categoryname,category1id,category2id,category3id}=element.dataset;   //注意真正的自定义属性名为小写
            //如果标签有categoryname属性 一定是a标签  通过categoryid判断是几级分类
            if(categoryname){
                //整理路由跳转的参数
                let location={name:'search'};
                let query={categoryName:categoryname}
                if(category1id){
                    query.categoryId=category1id;
                }else if(category2id){
                    query.categoryId=category2id;
                }else{
                    query.categoryId=category3id;
                }
                //判断：路由跳转时如果有params参数也应该带过去
                if(this.$route.params){
                    //动态给location添加params属性
                    location.params=this.$route.params;
                    //动态给location添加query属性
                    location.query=query;
                    //路由跳转
                    this.$router.push(location);
                }
                
            }
        },
        enterShow(){
            this.show=true;
        },
        leaveShow(){
            this.currentIndex=-1;
            //判断是Search组件时才执行
            if(this.$route.path!=='/home'){
                this.show=false;
            }
        }
    },
    //组件挂载完毕：可以服务器发送请求
    mounted() {
        //组件挂载完毕 改变show值
        if(this.$route.path!=='/home'){
            this.show=false;
        }
    },
    computed:{
        //右侧需要的是一个函数，当使用这个计算属性时，右侧函数会执行一次
        // 注入一个参数state，其实伟大仓库中的数据
        ...mapState({
            categoryList:(state)=>{
                return state.home.categoryList;
            }
        })
    }
}
</script>

<style scoped lang="less">
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    .cur{
                        background-color: skyblue;
                    }

                }
            }
            // 过渡动画的样式
            .sort-enter,.sort-leave-to{
                height: 0;
            }
            .sort-enter-to,.sort-leave{
                height: 461px;
            }
            //定义动画时间、速率
            .sort-enter-active{
                transition: all .5s linear;
                overflow: hidden;
            }
             
        }
    }
</style>