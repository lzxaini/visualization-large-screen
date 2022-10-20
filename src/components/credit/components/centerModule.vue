<!--
 * @Author: lzx
 * @Date: 2022-09-28 15:50:07
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-19 13:35:06
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\credit\components\centerModule.vue
-->
<!-- 中间模型 -->
<template>
  <div class="centerModule">
    <moduleTitle :title="state.title" class="test" />
    <div class="centerModule-body">
      <div class="centerModule-circle">
        <img src="@assets/credit-center.gif" alt="">
      </div>
      <div class="brief">
        <subtitle :title="'某某信用体系简介'" class="subtitle" />
        <p class="brief-content">
          {{state.brief}}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moduleTitle from '@/components/moduleTitle/moduleTitle.vue'
import subtitle from '@/components/subtitle/subtitle.vue'
import { reactive, watch } from 'vue';
// 获取props传过来的值
const props = defineProps<{
  creditCenterData: any
}>()
let state = reactive({
  title: '' as String,
  brief: '' as String
})
/*监听props*/
watch(props, (newVal, oldVal) => {
  state.title = newVal.creditCenterData.name
  state.brief = newVal.creditCenterData.value
})
</script>

<style scoped lang="scss">
.centerModule {
  width: 100%;
  height: calc(100% - 100px);

  .centerModule-body {
    width: 100%;
    height: calc(100% - 70px);
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // background-color: red;

    .centerModule-circle {
      width: 100%;
      height: 60%;
      // background-color: aqua;

      &>img {
        width: 100%;
        height: 100%;
      }
    }

    .brief {
      width: 100%;
      height: 30%;

      &>.subtitle {
        width: 233px;
      }

      .brief-content {
        width: 100%;
        height: 100%;
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #445C7F;
        text-indent: 35px;
        line-height: 36px;
      }
    }
  }
}
</style>
