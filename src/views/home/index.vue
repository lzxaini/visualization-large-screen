<!--
 * @Author: lzx
 * @Date: 2022-09-20 13:35:09
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 17:20:59
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen\src\views\home\index.vue
-->
<template>
  <div class="home-title" v-cloak v-if="!loading">
    <ul class="home-title-body">
      <li class="people-number vertical-center">
        <span>在馆人数：<i class="num">45人</i></span>
        <span>当日累计入馆：<i class="num">53人</i></span>
        <span>当日出馆人数：<i class="num">8人</i></span>
      </li>
      <li class="home-center-title vertical-center">某某数字生活服务中心</li>
      <li class="weather-date vertical-center">
        <div class="weather-img" v-if="nowDateWeather.weather !== ''">
          <img :src="require(`@assets/weather/${nowDateWeather.weather}`)" alt="" />
        </div>
        <span>{{nowDateWeather.Ymd}}</span>
        <span>{{nowDateWeather.nowWeek}}</span>
        <span>{{nowDateWeather.time}}</span>
      </li>
    </ul>
  </div>
  <div class="home" v-if="!loading">
    <template v-for="item in domList" :key="item.position">
      <div :class="'module-' + item.position">
        <component :is="item.containerCode" :dpIndexRespList="item.dpIndexRespList"></component>
      </div>
    </template>
  </div>
  <!-- 页面loading -->
  <Loading :content="loadingText" v-if="loading" />
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { getWeather } from '@/utils/api/api'
import moment from 'moment'
import creditModule from '@/components/credit/creditModule.vue' // 某某信用
import fitnessRecordModule from '@/components/fitnessRecord/fitnessRecordModule.vue' // 健康档案
import oliveGreenPostModule from '@/components/oliveGreenPost/oliveGreenPostModule.vue' // 社区驿站
import videoModule from '@/components/video/videoModule.vue' // 视频监控
import dolphinsSupermarketModule from '@/components/dolphinsSupermarket/dolphinsSupermarketModule.vue' // 某某救助站
import Loading from '@/components/public/loading.vue' // 某某信用
// mock数据
import { getMockData } from '@/utils/api/mock'
import { weatherCode } from '@/utils/tool'
export default {
  components: {
    creditModule,
    fitnessRecordModule,
    oliveGreenPostModule,
    dolphinsSupermarketModule,
    videoModule,
    Loading
  },
  setup() {
    let state = reactive({
      loading: true, // 页面loading
      loadingText: '数据加载中...', // 页面loading文字
      domList: [] as any[],
      nowDateWeather: {
        Ymd: '',
        nowWeek: '',
        time: '',
        weather: '',
      } as any
    })
    // 获取当前时间及天气
    const getDateWeather = () => {
      // let data = new Date()
      let data = moment().format('YYYY年MM月DD日'); // 获取年月日
      let time = moment().format('HH:mm'); // 获取时分
      let week: any = weekChange(moment().format('E')); // 获取星期几
      state.nowDateWeather = {
        Ymd: data,
        nowWeek: week,
        time: time,
        weather: ''
      }
      weatherChange()
    }
    // 星期转换
    const weekChange = (week: any) => {
      switch (week) {
        case '1':
          return '星期一'
        case '2':
          return '星期二'
        case '3':
          return '星期三'
        case '4':
          return '星期四'
        case '5':
          return '星期五'
        case '6':
          return '星期六'
        case '7':
          return '星期日'
      }
    }
    // 天气图片转换
    const weatherChange = () => {
      getWeather().then((res: any) => {
        if (res.code === '200') {
          state.nowDateWeather.weather = weatherCode(res.now.icon)
        } else {
        }
      })
    }
    // 获取组件位置和数据
    const getDomListData = () => {
      // getMockData()
      getMockData().then((res: any) => {
        if (res.code === '1') {
          state.loading = false
          let data = res.data.dpContainerRespList
          for (let i = 0; i < data.length; i++) {
            // 把布局数值修改，将不允许拖动-1改为2，原有的2和后面的往后移动一位
            switch (data[i].position) {
              case '-1':
                data[i].position = 2
                break
              case '1':
                data[i].position = 1
                break
              case '2':
                data[i].position = 3
                break
              case '3':
                data[i].position = 4
                break
              case '4':
                data[i].position = 5
                break
            }
          }
          state.domList = data
        } else {
          state.loadingText = '数据加载失败，请联系管理员！'
          console.log('失败', res)
        }
      }).catch(err => {
        state.loadingText = '数据加载失败，请联系管理员！'
        console.log('失败', err)
      })
    }
    onMounted(() => {
      getDateWeather()
      getDomListData()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
// 布局样式
@import './style/layout.scss';
@import '../../assets/font/font.css';

.vertical-center {
  // display: flex;
  // align-items: center;
  line-height: 167px;
}

.home-title {
  width: 100%;
  height: 167px;
  font-size: 30px;
  line-height: 100px;
  text-align: center;

  .home-title-body {
    width: calc(100% - 68px * 2);
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    // background-color: red;

    .people-number {
      width: 30%;
      height: 100%;
      font-size: 48px;
      font-family: "PingFangSC-Semibold, PingFang SC";
      font-weight: 600;
      color: #445C7F;
      text-align: left;

      span:nth-child(1),
      span:nth-child(2) {
        &::after {
          content: '|';
          margin: 0 18px;
          opacity: 0.5;
          color: #445C7F;
          font-weight: 300;
        }
      }

      &>span>.num {
        font-style: normal;
        color: #29CC19 !important;
      }
    }

    .home-center-title {
      width: 40%;
      height: 100%;
      font-size: 108px;
      font-family: "FZSKJW--GB1-0, FZSKJW--GB1";
      font-weight: normal;
      color: #335B7F;
    }

    .weather-date {
      width: 30%;
      height: 100%;
      font-size: 48px;
      font-family: "PingFangSC-Semibold, PingFang SC";
      font-weight: 600;
      color: #445C7F;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .weather-img {
        display: flex;
        align-items: center;
        width: 100px;
        height: 60px;

        &::after {
          content: '|';
          margin: 0 18px;
          opacity: 0.5;
          color: #445C7F;
          font-weight: 300;
        }

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
        }
      }

      span:nth-child(1),
      span:nth-child(2),
      span:nth-child(3) {
        &::after {
          content: '|';
          margin: 0 18px;
          opacity: 0.5;
          color: #445C7F;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
