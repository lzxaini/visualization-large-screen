<!--
 * @Author: lzx
 * @Date: 2022-09-22 09:41:38
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 15:17:29
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\credit\components\DigitalLife.vue
-->
<!-- 数字生活 -->
<template>
  <div class="digitalLife">
    <moduleTitle :title="state.data.title" class="test" />
    <ul class="digitalLife-body">
      <li class="digitalLife-body-list digital-wallets">
        <subtitle :title="'数币钱包使用情况'" class="subtitle" />
        <ul class="digital-wallets-body">
          <li class="digital-wallets-body-list" v-for="item in state.data.iconList">
            <img :src="require(`@assets/icon/${item.icon}`)" class="digital-wallets-body-icon" />
            <p class="digital-wallets-body-content">
              <span>{{item.num}}</span>
              <i>{{item.name}}</i>
            </p>
          </li>
        </ul>
      </li>
      <li class="digitalLife-body-list trend">
        <subtitle :title="'数币消费趋势'" class="subtitle" />
        <div ref="trendCharts" class="trend-charts"></div>
      </li>
      <li class="digitalLife-body-list interests">
        <subtitle :title="'实时权益核销情况'" class="subtitle" />
        <div class="interests-title">
          <span>核销权益</span>
          <span>核销时间</span>
        </div>
        <ul class="roll-show">
          <li class="roll-show-list" v-for="item in state.data.interestsInfo">
            <span>{{item.title}}</span>
            <span>{{item.time}}</span>
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
import { reactive, ref, watch } from 'vue';
let trendCharts = ref<any>(null)
// 获取props传过来的值
const props = defineProps<{
  digitalLifeData: any
}>()
let state = reactive({
  data: {} as any, // 数据
})
// 年龄分布的柱状图
const trend = () => {
  const myChart = echarts.init(trendCharts.value)
  const option = {
    grid: { show: false, top: '20%', right: '5%', bottom: '15%', left: '12%' },
    xAxis: {
      type: 'category',
      data: state.data.mouthLable,
      axisLabel: {
        interval: 0, // 设置数据间隔
        fontSize: '9px'
      }
    },
    yAxis: {
      name: '金额',
      type: 'value',
      axisLabel: {
        color: '#999',
        fontSize: '8px'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '{b}：' + '<br />总人数：' + '￥{c}'
    },
    color: ['#FF9C00'],
    series: [
      {
        type: 'line',
        smooth: true,
        data: state.data.mouthValue,
        itemStyle: {
          normal: {
            label: {
              show: false,
              position: 'top',
              formatter: '{c}%'
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
  let data = JSON.parse(newVal.digitalLifeData.value.replace(/'/g, '"'))
  state.data = data
  trend()
})
</script>

<style scoped lang="scss">
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.digitalLife {
  width: 100%;
  height: 100%;

  .digitalLife-body {
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .digitalLife-body-list {
      width: calc(100% - 30px * 2);
      margin: 0 30px;
    }

    .digital-wallets {
      height: 30%;

      &>.subtitle {
        width: 235px;
      }

      .digital-wallets-body {
        width: 100%;
        height: calc(100% - 36px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;

        .digital-wallets-body-list {
          width: 150px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;

          .digital-wallets-body-icon {
            width: 100px;
            height: 100px;
          }

          .digital-wallets-body-content {
            margin: 0;
            padding: 0;
            width: 100%;
            text-align: center;

            &>span {
              display: block;
              font-size: 30px;
              font-family: D-DIN-Bold, D-DIN;
              font-weight: bold;
              color: #0C73FF;
            }

            &>i {
              display: block;
              font-size: 20px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #445C7F;
            }
          }
        }
      }
    }

    .trend {
      height: 35%;

      &>.subtitle {
        width: 180px;
      }

      .trend-charts {
        width: 100%;
        height: 300px;
      }
    }

    .interests {
      height: 22%;
      margin-bottom: 3%;

      &>.subtitle {
        width: 226px;
      }

      .interests-title {
        margin-top: 20px;
        width: 100%;
        height: 30px;
        background: #E1EDFE;
        display: flex;

        &>span {
          display: block;
          text-align: center;
          width: 50%;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #445C7F;
          line-height: 28px;
        }
      }

      .roll-show {
        width: 100%;
        height: calc(100% - 28px - 36px - 28px);
        overflow-y: auto;

        .roll-show-list {
          width: 100%;
          height: 24px;
          display: flex;
          padding: 4px 0;
          border-bottom: 1px solid #CCC;

          &>span {
            display: block;
            text-align: center;
            width: 50%;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #1D2129;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

}
</style>
