/*
 * @Author: lzx
 * @Date: 2022-09-20 10:34:26
 * @LastEditors: lzx
 * @LastEditTime: 2022-09-20 14:38:52
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\store\index.ts
 */
import { defineStore } from 'pinia'

// 测试
export const useTestStore = defineStore('', {
  state: () => {
    return {
      current: 1
    }
  },
  // 类似于computed 可以帮我们去修饰我们的值
  getters: {

  },
  // 可以操作异步 和 同步提交state
  actions: {

  }
})
