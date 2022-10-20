/*
 * @Author: lzx
 * @Date: 2022-05-09 13:16:58
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 16:44:11
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\utils\api\mock.ts
 */

import request from "@/utils/request";

/**
 * 大屏接口
 * @returns 
 */
export async function getMockData() {
  return await request({
    url: 'https://www.fastmock.site/mock/f3eca50b344861c74198f59f4e91f81a/dp/api/mockData',
    method: 'get'
  })
}

/**
 * 视频
 * @returns 
 */
export async function getVideoFun() {
  return await request({
    url: 'https://www.fastmock.site/mock/f3eca50b344861c74198f59f4e91f81a/dp/api/mockVideoList',
    method: 'post'
  })
}

/**
 * 轮播图
 * @returns 
 */
export async function getSlideshowFun() {
  return await request({
    url: 'https://www.fastmock.site/mock/f3eca50b344861c74198f59f4e91f81a/dp/api/mockSlideshow',
    method: 'post'
  })
}

/**
 * 展示图
 * @returns 
 */
export async function getShowImgFun() {
  return await request({
    url: 'https://www.fastmock.site/mock/f3eca50b344861c74198f59f4e91f81a/dp/api/mockShowImg',
    method: 'post'
  })
}