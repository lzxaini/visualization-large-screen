/*
 * @Author: lzx
 * @Date: 2022-09-20 13:38:52
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 15:55:33
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\utils\tool.ts
 */

import mitt from 'mitt'
/**
 * 生成6位随机字符串
 * @returns 
 */
const randomCode = () => {
  let character = ''
  let len = 6;
  let code = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASFGHJKLZXCVBNM'
  let maxPos = code.length;
  for (let i = 0; i < len; i++) {
    character += code.charAt(Math.floor(Math.random() * maxPos))
  }
  return character
}

// mitt.js传值
const mitts = mitt()

/**
 * echarts自动选中数据
 * @param myChart echarts实例
 * @param lengths 数据长度
 */
const autoShowActive = (myChart: any, lengths: any) => {
  //自动切换顺序
  var activeIndex = 0;
  setInterval(function () {
    if (activeIndex < lengths) {
      myChart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
      myChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: activeIndex });
      myChart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: activeIndex });
      activeIndex++;
    } else {
      activeIndex = 0;
    }
  }, 3000);
}

/**
 * 天气
 * @param code 天气编码
 * @returns 
 */
const weatherCode = (code: string) => {
  switch (code) {
    case '100':
    case '150':
      return 'weather-qt.png' // 晴天
      break
    case '101':
    case '102':
    case '151':
    case '153':
      return 'weather-dy.png'  // 多云
      break
    case '152':
      return 'weather-dyzq.png'  // 少云
      break
    case '103':
      return 'weather-qzdy.png'  // 晴转多云
      break
    case '104':
      return 'weather-yt.png' // 阴天
      break
    case '300':
    case '301':
    case '305':
    case '306':
    case '307':
    case '308':
    case '309':
    case '310':
    case '311':
    case '312':
    case '313':
    case '314':
    case '315':
    case '316':
    case '317':
    case '318':
    case '350':
    case '351':
    case '399':
      return 'weather-xyt.png' // 雨天
      break
    case '302':
    case '303':
    case '304':
      return 'weather-ly.png' // 雷雨天
      break
    case '400':
    case '401':
    case '402':
    case '403':
    case '404':
    case '405':
    case '406':
    case '407':
    case '408':
    case '409':
    case '410':
    case '456':
    case '457':
    case '499':
      return 'weather-xt.png' // 雪天
      break
    case '500':
    case '501':
    case '502':
    case '503':
    case '504':
    case '507':
    case '508':
    case '509':
    case '510':
    case '511':
    case '512':
    case '513':
    case '514':
    case '515':
      return 'weather-wm.png' // 雾霾
      break
    default:
      return 'weather-dyzq.png'
  }
}
// 导出方法
export {
  randomCode,
  mitts,
  autoShowActive,
  weatherCode
}