<template>
  <div>
    <!-- 三级联动组件 -->
    <!-- <TypeNav/> -->
    <!-- <ListContainer/> -->
    <!-- 今日推荐 -->
    <!-- <Recommend/> -->
    <!-- Rank -->
    <!-- <Rank/> -->
    <!-- 猜你喜欢 -->
    <!-- <Like/> -->
    <!-- floor -->
    <!-- <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/> -->
    <!-- 商标 -->
    <!-- <Brand/> -->
  </div>
</template>

<script>
import ListContainer from './ListConner'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
  name:'',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    //派发action获取Floor组件中的数据
    this.$store.dispatch('getFloorList');
  },
  computed:{
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }

}
</script>

<style>

</style>