<template>
  <router-view />
</template>
<style>
#app {
  /* background: linear-gradient(197deg, #D6E4FB 0%, #CFD9ED 25%, #CDD8EC 83%, #B5C0EF 100%); */
  background-image: url('@assets/layout/background.png');
  background-size: 100% 100%;
  background-attachment: fixed;
}

/* 每个模块背景色 */
.module-bg-color {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 10px 30px 0px rgba(160, 163, 174, 0.4);
  border-radius: 20px;
  border-image: linear-gradient(233deg, rgba(225, 233, 250, 1), rgba(255, 255, 255, 1), rgba(255, 255, 255, 1), rgba(217, 228, 249, 1)) 8 8;
  backdrop-filter: blur(30px);
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
</style>