<!--
 * @Author: lzx
 * @Date: 2022-09-21 13:22:33
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-19 11:14:07
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\credit\creditModule.vue
-->
<!-- 某某信用 -->
<template>
  <div class="creditModule module-bg-color">
    <div class="creditModule-title">
      <moduleTitle :title="state.navListData.title" class="test" />
    </div>
    <main class="creditModule-body">
      <div class="creditModule-banner">
        <ul class="creditModule-banner-icon">
          <li class="icon" v-for="item in state.navListData.iconList">
            <img :src="require(`@assets/icon/${item.icon}`)" />
            <p class="icon-content">
              <span>{{item.num}}</span>
              <span>{{item.text}}</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="creditModule-container">
        <div class="creditModule-center">
          <centerModule :creditCenterData="state.creditCenterData" />
        </div>
        <div class="creditModule-left">
          <portrayal :portrayalData="state.portrayalData" />
        </div>
        <div class="creditModule-right">
          <DigitalLife :digitalLifeData="state.digitalLifeData" />
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import moduleTitle from '@/components/moduleTitle/moduleTitle.vue'
import DigitalLife from './components/DigitalLife.vue' // 数字生活
import portrayal from './components/portrayal.vue' // 信用画像
import centerModule from './components/centerModule.vue' // 信用画像
import { onMounted, reactive } from 'vue';
// 获取props传过来的值
const props = defineProps<{
  dpIndexRespList: any
}>()
let state = reactive({
  navListData: {} as any, // 导航栏数据
  digitalLifeData: {}, // 数字生活数据
  creditCenterData: {}, // 信用中心数据
  portrayalData: {} // 信用画像数据
})
// 获取数据
const getOliveGreen = () => {
  // 数据格式化
  for (const index in props.dpIndexRespList) {
    // console.log('测试', props.dpIndexRespList[index])
    switch (props.dpIndexRespList[index].code) {
      case 'yl_credit_nav':
        state.navListData = JSON.parse(props.dpIndexRespList[index].value.replace(/'/g, '"'))
        break;
      case 'yl_credit_digitalLife':
        state.digitalLifeData = props.dpIndexRespList[index]
        break;
      case 'yl_credit_center':
        state.creditCenterData = props.dpIndexRespList[index]
        break;
      case 'yl_credit_portrayal':
        state.portrayalData = props.dpIndexRespList[index]
        break;
    }
  }
}
onMounted(() => {
  getOliveGreen()
})
</script>
<style scoped lang="scss">
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.creditModule {
  width: 100%;
  height: 100%;

  .creditModule-title {
    position: relative;
    width: 100%;
    height: 100px;

    &::after {
      left: 0;
      background: linear-gradient(90deg, rgba(100, 196, 253, 0) 0%, rgba(185, 215, 255, 0.79) 68%, #446FB1 99%);
    }

    &::before {
      right: 0;
      background: linear-gradient(90deg, #446FB1 0%, rgba(185, 215, 255, 0.79) 32%, rgba(100, 196, 253, 0) 100%);
    }

    &::after,
    &::before {
      position: absolute;
      content: ' ';
      top: 50%;
      transform: translateY(-50%);
      width: 40%;
      height: 12px;
    }
  }

  .creditModule-body {
    width: 100%;
    height: calc(100% - 100px);

    .creditModule-banner {
      width: calc(100% - 30px * 2);
      height: 109px;
      padding: 50px 30px;

      .creditModule-banner-icon {
        display: flex;
        justify-content: space-between;

        &>.icon {
          width: calc(100% / 6);
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

    .creditModule-container {
      position: relative;
      width: 100%;
      height: calc(100% - 209px);
      display: flex;
      // background-color: rebeccapurple;

      .creditModule-center {
        position: absolute;
        width: 35%;
        height: 100%;
        top: 0;
        left: 50%;
        transform: translate(-50%);
        // background-color: #446FB1;
      }

      .creditModule-left {
        position: absolute;
        width: 30%;
        height: 100%;
        top: 0;
        left: 0;
        // background-color: antiquewhite;
      }

      .creditModule-right {
        position: absolute;
        width: 30%;
        height: 100%;
        top: 0;
        right: 0;
        // background-color: antiquewhite;
      }
    }
  }

}
</style>
