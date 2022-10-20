<!--
 * @Author: lzx
 * @Date: 2022-09-21 13:29:08
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 15:05:30
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\dolphinsSupermarket\components\supermarketModule.vue
-->
<!-- 某某超市 -->
<template>
  <div class="supermarketModule module-bg-color">
    <moduleTitle :title="state.data.title" />
    <ul class="supermarket-body">
      <li class="deal-data">
        <ul class="deal-data-body">
          <li class="deal-data-list" v-for="item in state.data.iconList">
            <i>{{item.name}}<span>{{item.unit}}</span></i>
            <span>{{item.content}}</span>
          </li>
        </ul>
        <img src="@assets/icon/shop-icon.png" class="shop-icon" />
      </li>
      <li class="deal-trend">
        <subtitle :title="'月度交易趋势'" class="subtitle" />
        <div ref="dealTrend" class="line-charts"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import subtitle from '@/components/subtitle/subtitle.vue'
import moduleTitle from '@/components/moduleTitle/moduleTitle.vue'
import * as echarts from 'echarts'
import { onMounted, reactive, ref, watch } from 'vue';
let dealTrend = ref<any>(null)
// 获取props传过来的值
const props = defineProps<{
  supermarket: any
}>()
let state = reactive({
  data: {} as any
})
// 年龄的折线图
const dealTrendLineCharts = () => {
  const myChart = echarts.init(dealTrend.value)
  const option = {
    grid: { show: false, top: '30%', right: '0%', bottom: '15%', left: '15%' },
    xAxis: {
      type: 'category',
      data: state.data.dayList,
      axisLabel: {
        interval: 5, // 设置数据间隔
      }
    },
    yAxis: {
      name: '金额',
      type: 'value',
      axisLabel: {
        color: '#999',
        fontSize: '11px'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      // valueFormatter: (value: number) => '￥' + value
      formatter: '{b}消费' + '<br />' + '￥{c}'
    },
    // legend: {
    //   orient: 'horizontal', // 图例列表的布局朝向
    //   x: 'right',      //可设定图例在左、右、居中
    //   y: 'top',     //可设定图例在上、下、居中
    //   // padding: [0, 60, 0, 0], // 具体位置数值
    //   data: ['交易金额'],
    //   itemHeight: 12,
    //   itemWidth: 12,
    //   icon: 'circle', // 设置legend的图标圆形
    // },
    color: ['#187AFF'],
    series: [
      {
        type: 'line',
        // stack: 'Total',
        smooth: true,
        data: state.data.dailySpending,
      }
    ]
  }
  myChart.setOption(option)
}
const getFitnessRecord = (val: any) => {
  let data = JSON.parse(val.value.replace(/'/g, '"'))
  state.data = data
  dealTrendLineCharts()
}
/*监听props*/
watch(props, (newVal, oldVal) => {
  getFitnessRecord(newVal.supermarket)
})
onMounted(() => {
})
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.supermarketModule {
  width: 460px;

  .supermarket-body {
    width: calc(100% - 60px);
    height: calc(100% - 100px - 25px);
    margin: 25px 30px 0 30px;

    .deal-data {
      width: 100%;

      .deal-data-body {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .deal-data-list {
          width: 33%;
          text-align: center;

          &>i {
            font-size: 40px;
            font-family: "D-DIN-Bold, D-DIN";
            font-weight: bold;
            color: #FF711E;
            font-style: normal;

            &>span {
              font-size: 20px;
            }
          }

          &>span {
            display: block;
            font-size: 20px;
            font-family: "PingFangSC-Medium, PingFang SC";
            font-weight: 500;
            color: #445C7F;
            margin-top: 15px;
          }
        }
      }

      .shop-icon {
        width: 100%;
        height: 213px;
        margin-top: 12px;
      }
    }

    .deal-trend {
      .subtitle {
        width: 180px;
      }

      .line-charts {
        width: 100%;
        height: 220px;
      }
    }
  }
}
</style>
