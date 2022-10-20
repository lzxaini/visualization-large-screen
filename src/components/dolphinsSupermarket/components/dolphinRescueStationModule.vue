<!--
 * @Author: lzx
 * @Date: 2022-09-21 13:27:38
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 17:31:34
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen\src\components\dolphinsSupermarket\components\dolphinRescueStationModule.vue
-->
<!-- 某某救助站 -->
<template>
  <div class="dolphinRescueStationModule module-bg-color">
    <moduleTitle :title="state.data.title" />
    <!-- test-map.png -->
    <ul class="dolphinRescueStation-body">
      <!-- 地图&设备 -->
      <li class="map">
        <img src="@assets/test-map.png" class="map-img" />
        <ul class="equipment">
          <li v-for="item in state.data.equipment">
            <span>{{item.name}}</span>
            <span>{{item.num}}<i>{{item.unit}}</i></span>
          </li>
        </ul>
      </li>
      <!-- 响应 -->
      <li class="icon-list">
        <ul class="icon-list-body">
          <li class="icon" v-for="item in state.data.iconList">
            <img :src="require(`@assets/icon/${item.img}`)" />
            <p class="icon-content">
              <span>{{item.num}}{{item.unit}}</span>
              <span>{{item.name}}</span>
            </p>
          </li>
        </ul>
      </li>
      <!-- 内容 -->
      <li class="body-content">
        {{state.data.briefs}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import moduleTitle from '@/components/moduleTitle/moduleTitle.vue'
import { onMounted, reactive, watch, watchEffect } from 'vue';
// 获取props传过来的值
const props = defineProps<{
  dolphin: any
}>()
let state = reactive({
  data: {} as any
})
const getFitnessRecord = (val: any) => {
  let data = JSON.parse(val.value.replace(/'/g, '"'))
  state.data = data
}
/*监听props*/
watch(props, (newVal, oldVal) => {
  getFitnessRecord(newVal.dolphin)
})
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

p {
  padding: 0;
  margin: 0;
}

.dolphinRescueStationModule {
  width: 857px;
  height: 100%;
  // background-color: red;

  .dolphinRescueStation-body {
    width: calc(100% - 37px * 2);
    height: calc(100% - 100px);
    margin: 0 37px;

    .map {
      width: 100%;
      height: 340px;
      display: flex;
      align-items: center;
      margin-top: 17px;

      .map-img {
        width: 50%;
        height: 340px;
      }

      .equipment {
        width: 35%;
        height: auto;
        max-height: 100%;
        margin: 0 auto;

        li {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;

          span {
            display: inline-block;
          }

          span:nth-child(1) {
            font-size: 22px;
            font-family: "PingFangSC-Medium, PingFang SC";
            font-weight: 500;
            color: #445C7F;
            line-height: 30px;
          }

          span:nth-child(2) {
            font-size: 38px;
            font-family: "D-DIN-Bold, D-DIN";
            font-weight: bold;
            color: #3288FE;
            line-height: 32px;

            &>i {
              font-size: 18px;
              font-family: "PingFangSC-Medium, PingFang SC";
              font-weight: 500;
              color: #445C7F;
              line-height: 24px;
            }
          }
        }
      }
    }

    .icon-list {
      margin-top: 12px;

      .icon-list-body {
        display: flex;
        justify-content: space-between;

        &>.icon {
          width: calc(100% / 3);
          display: flex;
          align-items: center;

          &>img {
            width: 114px;
            height: 114px;
          }
        }

        .icon-content {
          margin-left: 32px;

          span {
            display: block;
          }

          span:nth-child(1) {
            font-size: 40px;
            font-family: D-DIN-Bold, D-DIN;
            font-weight: bold;
            color: #0C73FF;
          }

          span:nth-child(2) {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #445C7F;
          }
        }
      }
    }

    .body-content {
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #445C7F;
      text-indent: 40px;
      line-height: 36px;
      margin-top: 30px;
    }
  }
}
</style>