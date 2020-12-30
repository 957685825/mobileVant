<!--
 * @Author: sunyuese
 * @Date: 2020-07-08 16:12:32
 * @LastEditors: sunyuese
 * @LastEditTime: 2020-07-10 13:02:25
 * @Description: 文件说明
 * @FilePath: \vue-base\src\App.vue
-->
<template>
  <div id="app">
    <transition :name="transitionName">
      <navigation>
        <router-view class="router" />
      </navigation>
    </transition>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk'
import { share } from '@/api/home'
export default {
  data() {
    return {
      transitionName: 'van-slide-right'
    }
  },
  created() {
    this.$navigation.on('forward', () => {
      this.transitionName = 'van-slide-right'
    })
    this.$navigation.on('back', () => {
      this.transitionName = 'van-slide-left'
    })
    // this.getShareInfo()
  },
  mounted() {
    // this.getShareInfo()
  },
  methods: {
    getShareInfo() {
      let data = {
        url: decodeURIComponent(location.href.split('#')[0])
      }
      share(data).then(res => {
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: false,
          // 必填，公众号的唯一标识，填自己的！
          appId: res.appId,
          // 必填，生成签名的时间戳，刚才接口拿到的数据
          timestamp: res.timestamp,
          // 必填，生成签名的随机串
          nonceStr: res.nonceStr,
          // 必填，签名，见附录1
          signature: res.signature,
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
        console.log('zhegedifangyezhixignle')
        wx.ready(function() {
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            // 分享时的标题
            title: '分享标题',
            // 分享时的链接
            link: data.url,
            // 分享时的图标
            imgUrl:
              'http://img1.imgtn.bdimg.com/it/u=2469425459,2788543188&fm=26&gp=0.jpg',
            success: function() {
              console.log('分享成功')
            },
            cancel: function() {
              console.log('取消分享')
            },
            error: function(e) {
              console.log(e)
            }
          })
          // 分享给朋友
          wx.onMenuShareAppMessage({
            title: '这里是标题',
            link: data.url,
            desc: '测试描述',
            imgUrl:
              'http://img1.imgtn.bdimg.com/it/u=2469425459,2788543188&fm=26&gp=0.jpg',
            success: function() {
              console.log('分享成功')
            },
            cancel: function() {
              console.log('取消分享')
            },
            error: function(e) {
              console.log(e)
            }
          })
        })
      })
    }
  }
}
</script>
<style lang="less">
html {
  width: 100%;
  height: 100%;
  border: none;
}
body {
  width: 100%;
  height: 100%;
  border: none;
}
#app {
  height: 100%;
  overflow: hidden;
  font-family: PingFangSC-Regular;
  background-color: #f1f3f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
//   .playbill {
//     background-color: red !important;
//   }
// }
// @media only screen and (width: 375px) and (height: 690px) {
//   .playbill {
//     background-color: red !important;
//   }
// }
/** 解决路由切换动画上下闪动问题 */
.router {
  position: absolute;
  top: safe-area-inset-top;
  top: env(safe-area-inset-top);
  width: 100%;
  transition: all 0.377s ease;
  backface-visibility: hidden;
}
</style>
