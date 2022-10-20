<!--
 * @Author: lzx
 * @Date: 2022-09-26 10:31:13
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 16:42:17
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\oliveGreenPost\components\passenger.vue
-->
<!-- 旅客轮播图 -->
<template>
  <div class="passenger-slideshow">
    <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="3"
      :coverflowEffect="state.coverflowEffect" :modules="state.modules" :initialSlide="1" :autoplay="state.autoplay"
      :loop="true" :loopedSlides="5" class="mySwiper">
      <swiper-slide class="swiper-item" v-for="item in state.imgList">
        <img :src="item.location" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import { getSlideshowFun } from '@/utils/api/mock'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import { onMounted, reactive } from "vue";
let state = reactive({
  coverflowEffect: {
    slideShadows: false, // 页面阴影效果
    rotate: 0, // 旋转的角度
    stretch: 20, // 拉伸,图片间左右的间距和密集度，越大靠得越近
    depth: 300, // 深度,切换图片间上下的间距和密集度，值越大z轴距离越远，看起来越小。
    modifier: 0.8, // 修正值,该值越大前面的效果越明显
  },
  modules: [EffectCoverflow, Pagination, Autoplay],
  autoplay: {
    delay: 3000, //3秒切换一次
    pauseOnMouseEnter: true, //悬停停止切换
  },
  imgList: [] as any[], // 图片列表
})
const getImgListInfo = () => {
  getSlideshowFun().then((res: any) => {
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
.passenger-slideshow {
  width: 100%;
  height: calc(100% - 40px - 38px);
  // margin: 0 auto;

  .mySwiper {
    width: 100%;
    height: 198px;
    margin-top: 38px;
    overflow: hidden !important;

    .swiper-item {
      width: 149px;
      height: 198px;
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
