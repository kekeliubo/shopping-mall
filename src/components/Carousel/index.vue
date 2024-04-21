<template>
   <div class="swiper-container" id="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name:'Carousel',
    props:['list'],
    watch:{
    list:{
        //list不发生变化，所以监听不到，需要立即执行
        immediate:true,
        handler(newvalue,oldvalue){
            this.$nextTick(()=>{
                var mySwiper = new Swiper ('.swiper-container', {
               loop: true, // 循环模式选项

               // 如果需要分页器
               pagination: {
                 el: '.swiper-pagination',
                 //点击小球也能切换
                 clickable:true
               },

               // 如果需要前进后退按钮
               navigation: {
                 nextEl: '.swiper-button-next',
                 prevEl: '.swiper-button-prev',
               },
               })
            })
        }
    }
   }
}
</script>

<style>

</style>