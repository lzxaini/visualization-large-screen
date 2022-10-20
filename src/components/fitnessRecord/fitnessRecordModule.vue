<!--
 * @Author: lzx
 * @Date: 2022-09-21 13:24:36
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 15:15:25
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\fitnessRecord\fitnessRecordModule.vue
-->
<!-- 某某健康档案 -->
<template>
  <div class="fitnessRecordModule module-bg-color">
    <moduleTitle :title="state.data.title" />
    <div class="fitnessRecord-body">
      <div class="record">
        <div class="record-body">
          <i class="unit-iocn">单位：人</i>
          <subtitle :title="'健康档案统计'" class="subtitle" />
          <ul class="record-list">
            <li class="record-list-body" v-for="item in state.data.iconList">
              <img :src="require(`@assets/icon/${item.icon}`)" class="record-list-icon" />
              <div class="record-list-content">
                <span>{{item.num}}</span>
                <span>{{item.name}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="record-histogram">
          <i class="unit-iocn">单位：人</i>
          <subtitle :title="'档案年龄段分布'" class="subtitle" />
          <div ref="histogram" class="histogram"></div>
        </div>
      </div>
      <div class="distribution">
        <div class="distribution-chart">
          <subtitle :title="'老年人常见病分布'" class="subtitle" />
          <div ref="distributionPieChart" class="distribution-pie-chart"></div>
        </div>
        <div class="bubble-effects">
          <bubbleEffects />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import moduleTitle from '@/components/moduleTitle/moduleTitle.vue'
import subtitle from '@/components/subtitle/subtitle.vue'
import bubbleEffects from './components/bubbleEffects.vue'
import * as echarts from 'echarts'
import { autoShowActive } from '@/utils/tool'
import { onMounted, reactive, ref } from 'vue';
let histogram = ref<any>(null)
let distributionPieChart = ref<any>(null)
// 获取props传过来的值
const props = defineProps<{
  dpIndexRespList: any
}>()
let state = reactive({
  data: {} as any
})
// 档案的柱状图
const histogramCharts = () => {
  const myChart = echarts.init(histogram.value)
  const option = {
    grid: { show: false, top: '10%', right: '0%', bottom: '15%', left: '12%' },
    xAxis: {
      type: 'category',
      data: state.data.ageLable,
      axisLabel: {
        interval: 0, // 设置数据间隔
      }
    },
    yAxis: {
      // name: '人数',
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
        barWidth: '35px',
        data: state.data.ageData,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top',
            },
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#F4DCCE' },
                { offset: 1, color: '#FF8A08' }
              ]
            )
          }
        }
      }
    ]
  }
  myChart.setOption(option)
}
// 常见病的饼状图
const pieCharts = () => {
  const myChart = echarts.init(distributionPieChart.value)
  const option = {
    color: ['#3191FF', '#41D6EF', '#FEAA13', '#D3EFF8'],
    legend: {
      orient: 'vertical', // 图例列表的布局朝向
      x: '60%',      //可设定图例在左、右、居中
      y: 'center',     //可设定图例在上、下、居中
      // padding: [0, 0, 0, 0], // 具体位置数值
      itemGap: 20, // 图例每项之间的间隔
      textStyle: {
        color: '#2C3542',
        fontSize: 11
      },
      itemHeight: 7,
      itemWidth: 7,
      icon: 'circle', // 设置legend的图标圆形
      formatter: function (name: string) { // 通过回调设置legend的formatter来 显示具体数值
        for (var i = 0; i < option.series[0].data.length; i++) {
          var dpercent = option.series[0].data[i].value
          if (option.series[0].data[i].name === name) {
            return name + ' ' + dpercent + '人';
          }
        }
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}：{c}人'
      // formatter: '{d}%',// 显示百分比，
    },
    series: [
      {
        type: 'pie',
        radius: ['55%', '75%'],
        avoidLabelOverlap: false,
        label: {
          // show: true,
          // position: 'inner',
          // fontSize: '8px',
          // formatter: '{d}%',// 显示百分比，
          normal: {
            show: false,
            // 设置位置
            position: 'center',
            // 通过padding撑开大小
            padding: [4, 4, 4, 4],
            // 背景颜色
            // backgroundColor: '#fff',
            color: '#4c4a4a',
            // total和total 可以理解为类名，在下边定义样式以|分开中间是换行
            formatter: '{total|{b}}' + '\n\r' + '{active|{c}}',
            rich: {
              total: {
                fontSize: 14,
                color: '#00000073'
              },
              active: {
                fontSize: 25,
                color: '#000',
                lineHeight: 30,
              },
            }
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '10px',
            fontWeight: 'none'
          }
        },
        labelLine: {
          show: false
        },
        data: state.data.pieData,
        center: ["24%", "50%"]
      }
    ]
  }
  myChart.setOption(option)
  autoShowActive(myChart, state.data.pieData.length)
}
const getFitnessRecord = () => {
  let data = JSON.parse(props.dpIndexRespList[0].value.replace(/'/g, '"'))
  state.data = data
  histogramCharts()
  pieCharts()
}
onMounted(() => {
  getFitnessRecord()
})
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.unit-iocn {
  position: absolute;
  right: 0;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2C3542;
}

.fitnessRecordModule {
  width: 100%;
  height: 100%;
  background-image: url('@assets/layout/fitness-record-background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .fitnessRecord-body {
    width: calc(100% - 37px * 2);
    height: calc(100% - 100px);
    margin: 0 37px;
    display: flex;
    justify-content: space-between;

    .record {
      width: 45%;
      height: calc(100% - 38px);
      padding-top: 38px;

      .record-body {
        position: relative;
        width: 100%;
        height: auto;

        &>.subtitle {
          width: 179px;
        }

        .record-list {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;

          &>.record-list-body {
            width: 30%;
            text-align: center;

            .record-list-icon {
              width: 90px;
              height: 90px;
            }

            .record-list-content {
              width: 100%;

              span {
                display: block;
              }

              &>span:nth-child(1) {
                font-size: 40px;
                font-family: D-DIN-Bold, D-DIN;
                font-weight: bold;
                color: #0C73FF;
              }

              &>span:nth-child(2) {
                font-size: 20px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #445C7F;
              }
            }
          }
        }
      }

      .record-histogram {
        position: relative;
        width: 100%;
        height: auto;
        margin-top: 60px;

        &>.subtitle {
          width: 201px;
        }

        .histogram {
          width: 100%;
          height: 250px;
          padding-top: 25px;
        }
      }
    }

    .distribution {
      width: 50%;
      height: calc(100% - 38px);
      padding-top: 38px;
      // background-color: red;

      .distribution-chart {
        &>.subtitle {
          width: 237px;
        }

        .distribution-pie-chart {
          width: 100%;
          height: 300px;
        }
      }

      .bubble-effects {
        width: 100%;
        height: 220px;
        // background-color: red;
      }
    }
  }
}
</style>
