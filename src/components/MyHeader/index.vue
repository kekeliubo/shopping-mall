<template>
  <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>Welcome！</p>
                        <p v-if="!userName">
                            <span>Please</span>
                            <router-link to="/login">Login</router-link>
                            <router-link to="/register" class="register">Free Registration</router-link>
                        </p>
                        <p v-else>
                            <a>{{userName}}</a>
                            <a class="register" @click="loginOut">Log out</a>
                        </p>
                    </div>
                    <!-- <div class="typeList">
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div> -->
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" to="/home" style="display: flex; align-items: center;">
                        <img src="./images/logo.png" alt="" style="width: 50px;">
                        <span style="font-size: 12px; color: #d81e06;">Shopping</span>
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input 
                        type="text" 
                        id="autocomplete" 
                        class="input-error input-xxlarge" 
                        v-model="keyword"/>
                        <button 
                        class="sui-btn btn-xlarge btn-danger" 
                        type="button" 
                        @click="goSearch">search</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:'',
    data(){
        return {
            keyword:''
        }
    },
    methods:{
        goSearch(){
            let location={
                    name:'search',
                    params:{keyword:this.keyword||undefined}
                }
            //如果有query参数，也要带过去
            if(this.$route.query){
                location.query=this.$route.query;
            }
             this.$router.push(location);
        },
        async loginOut(){
            //1 发请求，需要通知服务器，把现在用户身份token【销毁】
            //2 清除仓库数据+本地存储数据【都需要清理】
            try{
                //退出登录成功
                await this.$store.dispatch('userLogOut');
                // 回到首页
                this.$router.push('/home')
            }catch(err){
                alert(err.message)
            }
        }
    },
    mounted() {
        //通过全局事件总线清除关键字
        this.$bus.$on('clear',()=>{
            this.keyword='';
        }),
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name;
        }
    }
}
</script>

<style scoped lang="less">
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 0px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>