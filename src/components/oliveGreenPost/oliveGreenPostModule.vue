<!--
 * @Author: lzx
 * @Date: 2022-09-21 13:26:12
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 17:29:18
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen\src\components\oliveGreenPost\oliveGreenPostModule.vue
-->
<!-- 社区驿站 -->
<template>
  <div class="oliveGreenPost module-bg-color">
    <moduleTitle :title="state.data.title" />
    <ul class="moduble-body">
      <li class="age">
        <div class="age-charts">
          <subtitle :title="'年龄分布统计'" class="subtitle" />
          <div ref="gender" class="gender"></div>
        </div>
        <div class="passenger">
          <subtitle :title="'社区·常旅客'" class="subtitle" />
          <passenger />
        </div>
      </li>
      <li class="soldier">
        <div class="soldier-body">
          <subtitle :title="'某某某某·退役军人数量'" class="subtitle" />
          <div class="list">
            <div ref="soldierChartsDom" class="soldierCharts"></div>
            <ul class="peopleNumber">
              <li v-for="(item, index) in state.data.soldierList" :key="index">
                <span>{{item.name}}</span>
                <p>
                  <span>{{item.total}}</span>
                  <span>人</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="elegantDemeanour">
          <subtitle :title="'五彩主题活动·风采展示'" class="subtitle" />
          <elegantDemeanour />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import moduleTitle from '@/components/moduleTitle/moduleTitle.vue'
import subtitle from '@/components/subtitle/subtitle.vue'
import passenger from './components/passenger.vue'
import elegantDemeanour from './components/elegantDemeanour.vue'
import * as echarts from 'echarts'
import { onMounted, reactive, ref } from 'vue';
import { autoShowActive } from '@/utils/tool'
let gender = ref<any>(null)
let soldierChartsDom = ref<any>(null)
// 获取props传过来的值
const props = defineProps<{
  dpIndexRespList: any
}>()
interface State {
  data?: any,
  passengerSlideshow?: any,
  StyleShowSlideshow?: any
}
let state: State = reactive({
  data: {}, // 所有数据集合
  passengerSlideshow: [], // 旅客轮播图数据
  StyleShowSlideshow: [], // 风采展示轮播图数据
})
// 年龄的折线图
const genderLineCharts = () => {
  const myChart = echarts.init(gender.value)
  const option = {
    grid: { show: false, top: '30%', right: '20%', bottom: '15%', left: '12%' },
    xAxis: {
      type: 'category',
      data: state.data.genderLineData.ageLable,
    },
    yAxis: {
      name: '人数',
      type: 'value',
      axisLabel: {
        color: '#999'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      valueFormatter: (value: number) => value + ' 名'
    },
    legend: {
      orient: 'horizontal', // 图例列表的布局朝向
      x: 'right',      //可设定图例在左、右、居中
      y: 'top',     //可设定图例在上、下、居中
      padding: [0, 60, 0, 0], // 具体位置数值
      data: ['男性', '女性'],
      itemHeight: 12,
      itemWidth: 12,
      icon: 'circle', // 设置legend的图标圆形
    },
    series: [
      {
        name: '女性',
        type: 'line',
        stack: 'Total',
        data: state.data.genderLineData.woman,
      },
      {
        name: '男性',
        type: 'line',
        stack: 'Total',
        data: state.data.genderLineData.man,
        itemStyle: {
          color: '#FF9C00'
        },
      }
    ]
  }
  myChart.setOption(option)
  // autoShowActive(myChart, state.data.genderLineData.man.length)
}
// 某某某某·退役军人数量饼状图
const soldierCharts = () => {
  const myChart = echarts.init(soldierChartsDom.value)
  const option = {
    // graphic: [{ // 环形图中间内容
    //   type: 'text',
    //   left: '16%',
    //   top: 'center',
    //   style: {
    //     text: '在档人数' + '\n' + `${state.gridding.total}人`,
    //     textAlign: 'center',
    //     color: '#D1EFF7', // 文字的颜色
    //     width: 30,
    //     height: 30,
    //     fontSize: 10,
    //   }
    // }],
    color: ['#187AFF', '#8693FE', '#41D6EF', '#FD9320', '#D3EFF8'],
    legend: {
      orient: 'vertical', // 图例列表的布局朝向
      x: '50%',      //可设定图例在左、右、居中
      y: 'center',     //可设定图例在上、下、居中
      // padding: [0, 70, 0, 0], // 具体位置数值
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
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '70%'],
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
                fontSize: 10,
                color: '#00000073'
              },
              active: {
                fontSize: 20,
                color: '#000',
                lineHeight: 30,
              },
            }
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'none'
          }
        },
        labelLine: {
          show: false
        },
        data: state.data.gridding,
        center: ["24%", "50%"]
      }
    ]
  }
  myChart.setOption(option)
  autoShowActive(myChart, state.data.gridding.length)
}
// 获取数据
const getOliveGreen = () => {
  // 数据格式化
  let data = JSON.parse(props.dpIndexRespList[0].value.replace(/'/g, '"'))
  state.data = data
  genderLineCharts()
  soldierCharts()
}
onMounted(() => {
  getOliveGreen()
})
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.oliveGreenPost {
  width: 100%;
  height: 100%;

  .moduble-body {
    width: calc(100% - 27px * 2);
    height: calc(100% - 133px);
    margin: 33px 27px 0 27px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    // li {
    //   width: calc(100% / 2);
    //   height: 50%;
    // }

    .age {
      width: 40%;
      height: 100%;

      .age-charts {
        width: 100%;
        height: 40%;

        &>.subtitle {
          width: 180px;
        }

        .gender {
          width: 100%;
          height: calc(100% - 36px);
        }
      }

      .passenger {
        width: 80%;
        height: 60%;

        &>.subtitle {
          width: 180px;
          margin-top: 50px;
        }
      }
    }

    .soldier {
      width: 60%;

      .soldier-body {
        width: 100%;
        height: 45%;

        &>.subtitle {
          width: 290px;
        }

        .list {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;

          .soldierCharts {
            width: 50%;
            height: calc(100% - 36px);
            // background-color: red;
          }

          .peopleNumber {
            width: 45%;
            height: calc(100% - 36px);

            li {
              width: 100%;
              height: auto;
              display: flex;
              margin-top: 10px;

              &>span:nth-child(1) {
                display: block;
                width: 60%;
                font-size: 20px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #445C7F;
                line-height: 28px;
              }

              p {
                width: 40%;
                margin: 0;
                padding: 0;
                text-align: right;

                &>span:nth-child(1) {
                  width: 100%;
                  font-size: 40px;
                  font-family: D-DIN-Bold, D-DIN;
                  font-weight: bold;
                  color: #187AFF;
                  line-height: 32px;
                }

                &>span:nth-child(2) {
                  width: 100%;
                  font-size: 18px;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #187AFF;
                  line-height: 24px;
                }
              }
            }
          }
        }
      }

      .elegantDemeanour {
        width: 100%;
        height: calc(50% - 20px);
        margin-top: 20px;

        &>.subtitle {
          width: 290px;
        }
      }
    }
  }
}
</style>
