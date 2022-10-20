<!--
 * @Author: lzx
 * @Date: 2022-09-22 09:41:38
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 15:08:53
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\credit\components\portrayal.vue
-->
<!-- 信用画像 -->
<template>
  <div class="portrayal">
    <moduleTitle :title="state.data.title" class="test" />
    <ul class="portrayal-body">
      <li class="portrayal-body-list grade-crowd">
        <subtitle :title="'数币钱包使用情况'" class="subtitle" />
        <div ref="gradeCrowdChart" class="grade-crowd-chart"></div>
      </li>
      <li class="portrayal-body-list age-crowd">
        <subtitle :title="'年龄段人群分布'" class="subtitle" />
        <div ref="ageCrowdChart" class="age-crowd-chart"></div>
      </li>
      <li class="portrayal-body-list interests">
        <subtitle :title="'某某分·权益场景'" class="subtitle" />
        <ul class="interests-body">
          <li class="interests-body-list" v-for="item in state.data.iconList">
            <img :src="require(`@assets/icon/${item.icon}`)" class="interests-body-list-icon" />
            <span class="interests-body-list-title">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import moduleTitle from '@/components/moduleTitle/moduleTitle.vue'
import subtitle from '@/components/subtitle/subtitle.vue'
import * as echarts from 'echarts'
import { onMounted, reactive, ref, watch } from 'vue';
let gradeCrowdChart = ref<any>(null)
let ageCrowdChart = ref<any>(null)
// 获取props传过来的值
const props = defineProps<{
  portrayalData: any
}>()
let state = reactive({
  data: {} as any, // 数据
})
// 等级分布的柱状图
const gradeCrowd = () => {
  const myChart = echarts.init(gradeCrowdChart.value)
  const option = {
    grid: { show: false, top: '10%', right: '10%', bottom: '15%', left: '12%' },
    xAxis: {
      // name: '人数',
      type: 'value',
      axisLabel: {
        color: '#999',
        fontSize: '11px'
      }
    },
    yAxis: {
      type: 'category',
      data: state.data.gradeData.gradeLable,
      axisLabel: {
        interval: 0, // 设置数据间隔
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '{b}：' + '<br />总人数：' + '￥{c}'
    },
    series: [
      {
        type: 'bar',
        smooth: true,
        // barWidth: '20px',
        barGap: 30, // 柱间距离
        data: state.data.gradeData.gradeValue,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'right',
            },
            color: new echarts.graphic.LinearGradient(
              1, 0, 0, 0,
              [
                { offset: 0, color: '#E2EBF9' },
                { offset: 1, color: '#358FFE' }
              ]
            )
          }
        }
      }
    ]
  }
  myChart.setOption(option)
}
// 年龄分布的柱状图
const ageCrowd = () => {
  const myChart = echarts.init(ageCrowdChart.value)
  const option = {
    grid: { show: false, top: '10%', right: '10%', bottom: '15%', left: '12%' },
    xAxis: {
      type: 'category',
      data: state.data.ageData.ageLable,
      axisLabel: {
        interval: 0, // 设置数据间隔
      }
    },
    yAxis: {
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
      formatter: '{b}：' + '<br />总人数：' + '￥{c}'
    },
    series: [
      {
        type: 'bar',
        smooth: true,
        barWidth: '20px',
        data: state.data.ageData.ageValue,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%'
            },
            // 每根柱子颜色设置
            color: function (params: { dataIndex: any | number; }) {
              const colorList = [
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: '#BEEBF6' },
                    { offset: 1, color: '#51D9F0' }
                  ],
                  false
                ),
                // 2
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: '#AFD0FB' },
                    { offset: 1, color: '#147DFE' }
                  ],
                  false
                ),
                // 3
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: '#F3D6C2' },
                    { offset: 1, color: '#FC972C' }
                  ],
                  false
                ),
                // 4
                new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: '#D3DEFA' },
                    { offset: 1, color: '#8E9CFD' }
                  ],
                  false
                )
              ]
              return colorList[params.dataIndex]
            }
          }
        }
      }
    ]
  }
  myChart.setOption(option)
}
/*监听props*/
watch(props, (newVal, oldVal) => {
  let data = JSON.parse(newVal.portrayalData.value.replace(/'/g, '"'))
  state.data = data
  gradeCrowd()
  ageCrowd()
})
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.portrayal {
  width: 100%;
  height: 100%;

  // background-color: red;
  .portrayal-body {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .portrayal-body-list {
      width: calc(100% - 30px * 2);
      margin: 0 30px;
    }

    .grade-crowd,
    .age-crowd {
      height: 35%;

      .grade-crowd-chart,
      .age-crowd-chart {
        width: 100%;
        height: 300px;
      }

      &>.subtitle {
        width: 249px;
      }
    }

    .age-crowd {
      &>.subtitle {
        width: 201px;
      }
    }

    .interests {
      height: 20%;

      &>.subtitle {
        width: 226px;
      }

      .interests-body {
        width: 100%;
        height: calc(100% - 36px);
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 0;

        .interests-body-list {
          width: 120px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          .interests-body-list-icon {
            width: 80px;
            height: 80px;
          }

          .interests-body-list-title {
            display: block;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #165BC1;
          }
        }
      }
    }
  }

}
</style>
