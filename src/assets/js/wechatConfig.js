import { get } from '../../api/https'
import wx from 'weixin-js-sdk'
import store from "../../store";
import { Toast } from 'vant';

const wechatAuth = async function (url, shareConfig,ditu) {
  // wx.checkJsApi({
  //   jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage", "onMenuShareTimeline", "getLocation"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //   success: function (res) {
  //     console.log(res)
  //   }
  // });
  get("wxshare/wxconfig/myapi.php?urlparam=" + url)
    .then((response) => {
      if (response.data && response.status === 200) {
        let authRes = response.data;
        wx.config({
          debug: false,
          appId: authRes.appId,
          timestamp: authRes.timestamp,
          nonceStr: authRes.nonceStr,
          signature: authRes.signature,
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage", "onMenuShareTimeline", "getLocation", 'openLocation']
        });
        
          
        wx.ready(function () {
          if(ditu){
            //获取地理位置
            wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                geocoder.getAddress(new qq.maps.LatLng(latitude, longitude));
                wx.openLocation({
                  latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                  longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                  name: '', // 位置名
                  address: '', // 地址详情说明
                  scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                  infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
              },

            });
          }

          //  好友
          wx.updateAppMessageShareData({
            title: shareConfig.title,
            desc: shareConfig.desc,
            link: location.href + '?' + 'state=' + 101779,
            imgUrl: shareConfig.imgUrl,
            success: function () {//设置成功
              console.log(location.href + '?' + 'state=' + 101779,'我是分享地址')
              console.log("分享成功");
            },
            cancel: function () {
              console.log("取消分享");
            }
          });
          // 朋友圈
          wx.updateTimelineShareData({
            title: shareConfig.title,
            link: location.href.split('state')[0] + (location.search ? '&' : '?') + 'state=' + shareConfig.link,
            imgUrl: shareConfig.imgUrl,
            success: function () {//设置成功
              //shareSuccessCallback();
            },
            cancel: function () {
              console.log("取消分享");
            }
          });
        })
        // wx.error(function (res) {
        //   Toast("微信验证失败");
        // });
      }
    }).catch(function (error) {
      console.log(error);
    });

};
//将经纬度解析为详细的地址
const geocoder = new qq.maps.Geocoder({
  complete: function (result) {
    let address = result.detail;  //保存result的详细地址信息
    console.log(result);//
    console.log(result.detail.location);//

  }
});

export default wechatAuth;

