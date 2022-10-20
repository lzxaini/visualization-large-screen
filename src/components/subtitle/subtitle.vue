<!--
 * @Author: lzx
 * @Date: 2022-09-23 14:24:31
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 14:59:17
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\subtitle\subtitle.vue
-->
<!-- 胶囊形状小标题 -->
<template>
  <div class="subtitle">{{title}}</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: String
}>()
</script>

<style scoped lang="scss">
.subtitle {
  height: 36px;
  background: linear-gradient(180deg, #D9E9FF 0%, #EAF2FE 74%, #F3F8FF 100%);
  box-shadow: inset 0px 1px 2px 0px #B1CDF8;
  border-radius: 18px;
  // border: 2px solid;
  border-image: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(169, 194, 232, 1), rgba(255, 255, 255, 1)) 2 2;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #445C7F;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}
</style>
