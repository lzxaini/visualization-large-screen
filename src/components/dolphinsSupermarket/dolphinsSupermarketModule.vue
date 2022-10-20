<!--
 * @Author: lzx
 * @Date: 2022-09-23 13:20:13
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-18 14:49:39
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\dolphinsSupermarket\dolphinsSupermarketModule.vue
-->
<template>
  <div class="dolphinsSupermarket">
    <dolphinRescueStationModule :dolphin="dolphin" />
    <supermarketModule :supermarket="supermarket" />
  </div>
</template>

<script>
import { toRefs, reactive, onMounted, watchEffect, onUnmounted } from 'vue'
import supermarketModule from './components/supermarketModule.vue' // 某某超市
import dolphinRescueStationModule from './components/dolphinRescueStationModule.vue' // 某某救助站
export default {
  props: ['dpIndexRespList'],
  components: {
    dolphinRescueStationModule,
    supermarketModule
  },
  setup (props) {
    let state = reactive({
      supermarket: [],
      dolphin: []
    })
    const getData = () => {
      state.supermarket = props.dpIndexRespList.filter(item => item.code === 'yl_supermarket')[0]
      state.dolphin = props.dpIndexRespList.filter(item => item.code === 'yl_dolphin')[0]
    }
    onMounted(() => {
      getData()
    })
    return { ...toRefs(state) }
  }
}
</script>

<style scoped lang="scss">
.dolphinsSupermarket {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
