/*
 * @Author: sunyuese
 * @Date: 2020-07-08 16:12:32
 * @LastEditors: sunyuese
 * @LastEditTime: 2020-07-17 12:51:08
 * @Description: 发送请求
 * @FilePath: \vue-base\src\api\home.js
 */

import { get } from '@/utils/request'

export const getDemoData = (data = {}) => {
  return get('home/demo/api', data)
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       success: true,
  //       data: {
  //         name: '子君',
  //         公众号: '前端有的玩',
  //         掘金: '前端进击者'
  //       }
  //     })
  //   }, 2000)
  // })
}
let basUrl = 'http://sz.szaxsoft.com/initWXJSInterface'
export const share = (data = {}) => {
  return get(basUrl, data)
}
