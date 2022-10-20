<!--
 * @Author: lzx
 * @Date: 2022-09-28 10:41:28
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-09 17:28:27
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\components\fitnessRecord\components\bubbleEffects.vue
-->
<template>
  <div class="bubble" ref="bubble">
    <div v-for="item in 8" :class="'test' + item">
      <img :src="require('@assets/icon/tag-'+item+'.png')" class="bubble-icon" />
    </div>
    <div v-for="item in 8" :class="'test' + item">
      <img :src="require('@assets/icon/tag-'+item+'.png')" class="bubble-icon" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from "vue";
let bubble = ref(null);

let state = reactive({
  container: [], // 存放10个球的每个具体信息，包括坐标，速度等值
  circles: [], // 获取运动边界和10个div
  arr: [],
  maxW: 0, // 初始化运动的最大宽和高，初始定义0
  maxH: 0,
  cwidth: 0, // 小球的直径
});

// 初始化
const initBody = () => {
  state.circles = bubble.value.children;
  state.container = [];
  state.arr = [];
  state.maxW = bubble.value.clientWidth;
  state.maxH = bubble.value.clientHeight;
  state.cwidth = state.circles[0].offsetWidth;
  state.maxW = bubble.value.clientWidth - state.circles[0].clientWidth; // 为了让小球不卡在浏览器边缘
  state.maxH = bubble.value.clientHeight - state.circles[0].clientHeight; // 所以要减去自身的宽高
  // bubble.value.style.width = 350 + 'px';   //将容器的宽高和文档显示区宽高相等
  // bubble.value.style.height = 170 + 'px';
  // bubble.value.style.background = 'blue';
  //数组对象的初始化
  for (var i = 0; i < state.circles.length; i++) {
    state.arr = [];
    state.arr.x = Math.floor(Math.random() * (state.maxW + 1)); //初始x坐标
    state.arr.y = Math.floor(Math.random() * (state.maxH + 1)); //初始y坐标
    state.arr.cx = state.arr.x + state.circles[0].offsetWidth / 2; //圆心x坐标
    state.arr.cy = state.arr.y + state.circles[0].offsetHeight / 2; //圆心y坐标
    state.arr.movex = Math.floor(Math.random() * 2); //x轴移动方向
    state.arr.movey = Math.floor(Math.random() * 2); //y轴移动方向
    // state.arr.speed = 2 + Math.floor(Math.random() * 4);//随机速度
    state.arr.speed = 0.5; //随机速度
    state.arr.timer = null; //计时器
    state.arr.index = i; //索引值
    state.container.push(state.arr); //存放所有的属性值
    state.circles[i].style.left = state.arr.x + "px"; //小球位置初始化
    state.circles[i].style.top = state.arr.y + "px";
  }
  //对每一个小球绑定计时器，让小球动起来
  for (var i = 0; i < state.container.length; i++) {
    move(state.container[i]);
  }
};
// 移动函数
const move = (balls) => {
  // 每个球单独有定时器
  balls.timer = setInterval(function () {
    if (balls.movex === 1) {
      // 如果往右跑，则一直加速度，碰到边界，改为反方向运动
      balls.x += balls.speed;
      if (balls.x + balls.speed >= state.maxW) {
        // 防止小球出界
        balls.x = state.maxW;
        balls.movex = 0; //小球运动方向发生改变
      }
    } else {
      balls.x -= balls.speed; // 1和0表示正反方向
      if (balls.x - balls.speed <= 0) {
        balls.x = 0;
        balls.movex = 1;
      }
    }
    if (balls.movey === 1) {
      balls.y += balls.speed;
      if (balls.y + balls.speed >= state.maxH) {
        balls.y = state.maxH;
        balls.movey = 0;
      }
    } else {
      balls.y -= balls.speed;
      if (balls.y - balls.speed <= 0) {
        balls.y = 0;
        balls.movey = 1;
      }
    }
    balls.cx = balls.x + state.circles[0].offsetWidth / 2; //小球圆心等于：运动中x的值加上自身的半径
    balls.cy = balls.y + state.circles[0].offsetHeight / 2;
    state.circles[balls.index].style.left = balls.x + "px"; //小球相对于屏幕的位置
    state.circles[balls.index].style.top = balls.y + "px";
    crash(balls.index); //每个小球进行碰撞检测
  }, 25);
};
// 碰撞函数
const crash = (a) => {
  var ball1x = state.container[a].cx; //在数组中任意球的圆心坐标
  var ball1y = state.container[a].cy; //思路：先随便拿一个球，然后遍历所有球，拿这个球和所有球的圆心距离比较
  for (var i = 0; i < state.container.length; i++) {
    if (i !== a) {
      //判断取出来的球不是本身，才能和其他球进行距离判断
      var ball2x = state.container[i].cx; //将其他球的圆心坐标赋值给球2
      var ball2y = state.container[i].cy;
      //圆心距 求两个点之间的距离,开平方
      var distence = Math.sqrt(
        (ball1x - ball2x) * (ball1x - ball2x) +
        (ball1y - ball2y) * (ball1y - ball2y)
      );
      if (distence <= state.cwidth) {
        //球心距离和求直径比较
        if (ball1x > ball2x) {
          //当前位于未知求的右方
          if (ball1y > ball2y) {
            //预设未知球撞当前球，然后当前球改变运动
            state.container[a].movex = 1; //1表示为正值，对应的右和下
            state.container[a].movey = 1; //0表示为负值，对应的左和上
          } else if (ball1y < ball2y) {
            state.container[a].movex = 1;
            state.container[a].movey = 0;
          } else {
            state.container[a].movex = 1;
          }
        } else if (ball1x < ball2x) {
          if (ball1y > ball2y) {
            state.container[a].movex = 0;
            state.container[a].movey = 0;
          } else if (ball1y < ball2y) {
            state.container[a].movex = 0;
            state.container[a].movey = 1;
          } else {
            state.container[a].movex = 0;
          }
        } else {
          if (ball1y > ball2y) {
            state.container[a].movey = 1;
          } else if (ball1y < ball2y) {
            state.container[a].movey = 0;
          }
        }
      }
    }
  }
};
onMounted(() => {
  initBody();
});
</script>
<style scoped lang="scss">
.bubble {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;

  div {
    position: absolute;
    width: 60px;
    height: 60px;
    overflow: hidden;
    // -moz-border-radius: 50%;
    // -webkit-border-radius: 50%;
    // border-radius: 50%;
    // background-color: chartreuse;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .bubble-icon {
      width: 40px;
      height: 40px;
    }

    span {
      width: 100%;
      display: block;
      font-size: 12px;
      text-align: center;
    }
  }
}

.test2,
.test6,
.test8,
.test10,
.test20 {
  width: 100px !important;
  height: 100px !important;

  .bubble-icon {
    width: 60px !important;
    height: 60px !important;
  }

  span {
    display: none !important;
  }
}

.test3,
.test5,
.test7,
.test9,
.test13,
.test15,
.test18 {
  width: 45px !important;
  height: 45px !important;

  .bubble-icon {
    width: 25px !important;
    height: 25px !important;
  }

  span {
    display: none !important;
  }
}
</style>
