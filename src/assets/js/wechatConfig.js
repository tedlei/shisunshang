import {get} from '../../api/https'
import wx from 'weixin-js-sdk'
import store from "../../store";


const wechatAuth = async function (type, shareConfig) {
  let url = encodeURIComponent(window.location.href.split('#')[0]);
  let sourceUrl = localStorage.getItem('sourceUrl');

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
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "getLocation",]
        });
      }
    }).catch(function (error) {
    console.log(error);
  });
  if (type == 'first') {
    wx.ready(() => {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          geocoder.getAddress(new qq.maps.LatLng(latitude, longitude));
        }
      });
      wx.updateAppMessageShareData({
        title: shareConfig.title,
        desc: shareConfig.desc,
        link: location.origin + sourceUrl + '?state=' + shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: function () {//设置成功
          console.log("分享成功");
        },
        cancel: function () {
          console.log("取消分享");
        }
      });
      wx.updateTimelineShareData({
        title: shareConfig.title,
        desc: shareConfig.desc,
        link: location.origin + sourceUrl + '?state=' + shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: function () {//设置成功
          //shareSuccessCallback();
        },
        cancel: function () {
          console.log("取消分享");
        }
      });
    })
  }

};
//将经纬度解析为详细的地址
const geocoder = new qq.maps.Geocoder({
  complete: function (result) {
    let address = result.detail;  //保存result的详细地址信息
    console.log(result);//
  }
});

export default wechatAuth;

