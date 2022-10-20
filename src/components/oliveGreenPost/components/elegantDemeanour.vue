<!--
 * @Author: lzx
 * @Date: 2022-09-26 10:31:13
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 16:42:39
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\oliveGreenPost\components\elegantDemeanour.vue
-->
<!-- 风采展示轮播图 -->
<template>
  <div class="elegantDemeanour-slideshow">
    <swiper :slidesPerView="3" :freeMode="true" :speed="2500" :slidesPerGroup="1" :initialSlide="1"
      :autoplay="state.autoplay" :loop="true" :modules="state.modules" class="mySwiper">
      <swiper-slide class="swiper-item" v-for="item in state.imgList">
        <img :src="item.location" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { getShowImgFun } from '@/utils/api/mock'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Autoplay } from "swiper";
import { onMounted, reactive } from "vue";
let state = reactive({
  modules: [Autoplay],
  autoplay: {
    delay: 0.1, // 0.1秒切换一次
    disableOnInteraction: false, // 悬停停止切换
    pauseOnMouseEnter: true, // 悬停停止切换
  },
  imgList: [] as any[], // 图片列表
});
const getImgListInfo = () => {
  getShowImgFun().then((res: any) => {
    if (res.code === '1') {
      state.imgList = res.data
    } else {
      console.log('失败', res)
    }
  }).catch(err => {
    console.log('失败', err)
  })
}
onMounted(() => {
  getImgListInfo()
})
</script>
<style scoped lang="scss">
.elegantDemeanour-slideshow {
  width: 100%;
  height: calc(100% - 40px - 38px);
  // margin: 0 auto;

  .mySwiper {
    width: 100%;
    height: 190px;
    margin-top: 38px;
    overflow: hidden !important;

    .swiper-item {
      width: 256px;
      height: 190px;
      overflow: hidden !important;
      // background-color: red;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
