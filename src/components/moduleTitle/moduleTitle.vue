<!--
 * @Author: lzx
 * @Date: 2022-09-22 13:17:26
 * @LastEditors: lzx
 * @LastEditTime: 2022-09-23 14:31:44
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\moduleTitle\moduleTitle.vue
-->
<template>
  <div class="moduleTitle">
    <div class="module-title">{{title}}</div>
    <span class="title-line"></span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: String
}>()
</script>
<style scoped lang="scss">
.moduleTitle {
  width: calc(100% - 27px * 2);
  height: 100px;
  margin: 0 27px;

  .module-title {
    width: 100%;
    height: 100%;
    font-size: 44px;
    font-family: "PingFangSC-Semibold, PingFang SC";
    font-weight: 600;
    color: #445C7F;
    text-align: center;
    line-height: 100px;
    // padding: 20px 0;
  }

  .title-line {
    position: relative;
    display: block;
    width: 100%;
    height: 2px;
    opacity: 0.2;
    background-color: #445C7F;
  }

  .title-line::after {
    position: absolute;
    left: 0;
    bottom: -5px;
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    background: #445C7F;
    /* opacity: 0.2; */
    border-radius: 50%;
  }

  .title-line::before {
    position: absolute;
    right: 0;
    bottom: -5px;
    display: block;
    content: '';
    width: 12px;
    height: 12px;
    background: #445C7F;
    /* opacity: 0.2; */
    border-radius: 50%;
  }
}
</style>