/*
 * @Author: lzx
 * @Date: 2022-05-09 13:16:58
 * @LastEditors: lzx
 * @LastEditTime: 2022-10-20 13:42:03
 * @Description: Fuck Bug
 * @FilePath: \visualization-large-screen-vue\src\utils\api\api.ts
 */

import request from "@/utils/request";

/**
 * @description 登录
 * @params {object} data
 * **/
export async function login(data: object) {
  return await request({
    url: `/login`,
    method: 'post',
    data
  })
}
/**
 * 天气接口
 * @returns 
 */
export async function getWeather() {
  return await request({
    url: 'https://devapi.qweather.com/v7/weather/now?location=101190401&key=eab45886b8ed4348bd33384f42adf7b7',
    method: 'get'
  })
}
/**
 * 获取大屏数据
 */
export async function getAllDataList() {
  return await request({
    url: 'dp/view/index',
    method: 'post',
    data: {}
  })
}
/**
 * 获取大屏数据
 */
export async function getImgListInfoFun(data: Object) {
  return await request({
    url: 'dp/manager/media/detail',
    method: 'post',
    data
  })
}