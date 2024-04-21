<template>
  <div id="app">
    <MyHeader/>
    <router-view></router-view>
    <!--MyFooter组件 在Home Search中显示  在Login Register中不显示 -->
    <!-- <MyFooter v-show="$route.meta.show"/> -->
  </div>
</template>

<script>

import MyHeader from "./components/MyHeader"
import MyFooter  from "./components/MyFooter"
export default {
  name: 'App',
  components:{
    MyHeader,
    MyFooter
  },
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库中
     this.$store.dispatch('categoryList');
  },
}
</script>

<style>

</style>
