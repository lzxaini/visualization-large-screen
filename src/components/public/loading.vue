<!--
 * @Author: lzx
 * @Date: 2022-10-19 16:55:12
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-19 17:16:16
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\public\loading.vue
-->
<template>
  <div class="loading-box">
    <div class="loading">
      <h2>{{content}}</h2>
      <span class="loading-item"></span>
      <span class="loading-item"></span>
      <span class="loading-item"></span>
      <span class="loading-item"></span>
      <span class="loading-item"></span>
      <span class="loading-item"></span>
      <span class="loading-item"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['content']
}
</script>

<style scoped lang="scss">
.loading-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  .loading {
    text-align: center;

    h2 {
      width: 100%;
      color: rgb(88, 88, 88);
      margin: 0;
      font-size: 50px;
      text-transform: uppercase;
      letter-spacing: 10px;
      padding: 5px;
    }

    .loading-item {
      display: inline-block;
      // vertical-align: middle;
      width: 50px;
      height: 50px;
      margin: 20px;
      background: #4747eb;
      border-radius: 50px;
      animation: loading 1s infinite alternate;
    }

    .loading-item:nth-of-type(2) {
      background: #43eded;
      animation-delay: 0.2s;
    }

    .loading-item:nth-of-type(3) {
      background: #43ec47;
      animation-delay: 0.4s;
    }

    .loading-item:nth-of-type(4) {
      background: #eae943;
      animation-delay: 0.6s;
    }

    .loading-item:nth-of-type(5) {
      background: #f98cb9;
      animation-delay: 0.8s;
    }

    .loading-item:nth-of-type(6) {
      background: #ffb504;
      animation-delay: 1.0s;
    }

    .loading-item:nth-of-type(7) {
      background: #e1464c;
      animation-delay: 1.2s;
    }

    @keyframes loading {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
}
</style>
