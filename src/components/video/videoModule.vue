<!--
 * @Author: lzx
 * @Date: 2022-09-21 13:20:57
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 16:41:32
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\video\videoModule.vue
-->
<!-- 某某视频&轮播 -->
<template>
  <div class="videoModule">
    <video :src="state.videoUrl" autoplay="true" muted="true" loop="true" controls></video>
    <!-- <swiper :pagination="{
      dynamicBullets: true,
    }" :modules="state.modules" :loop="true" :autoplay="state.autoplay" class="mySwiper"
      v-if="state.activeModule === 'img'">
      <swiper-slide class="swiper-item" v-for="item in 4">
        <img src="http://p0.qhimg.com/bdr/__85/t01db650dae853bbf7d.jpg"
          style="width: 100%;height: 100%;background-size: 100%;" />
      </swiper-slide>
    </swiper> -->
  </div>
</template>
<script setup lang="ts">
import { getVideoFun } from '@/utils/api/mock'
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
import { Autoplay } from "swiper";
import { onMounted, reactive } from "vue";
const props = defineProps<{
  elegantDemeanourSlideshow: any
}>()
let state = reactive({
  activeModule: 'img',
  modules: [Autoplay, Pagination],
  autoplay: {
    delay: 3000, //3秒切换一次
    pauseOnMouseEnter: true, //悬停停止切换
  },
  videoUrl: '', // 图片列表
});
const getImgListInfo = () => {
  getVideoFun().then((res: any) => {
    if (res.code === '1') {
      let arr = [] as any[]
      res.data.forEach((item: any) => {
        arr.push(item.sort)
      })
      arr.sort()
      let minIndex = arr[0]
      // 永远找设置的sort最小的一条，有多个就选第一个
      state.videoUrl = res.data.filter((item: any) => item.sort === minIndex)[0].location
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
.videoModule {
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: 20px;
  }

  .mySwiper {
    width: 100%;
    height: 100%;
  }
}
</style>
