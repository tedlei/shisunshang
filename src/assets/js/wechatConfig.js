import { get,post } from '../../api/https'
import wx from 'weixin-js-sdk'
import store from "../../store";
import { Toast,Dialog } from 'vant';
import address from '../../../static/address';

const wechatAuth = async function (url, to, userinfo, goods) {
  // wx.checkJsApi({
  //   jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage", "onMenuShareTimeline", "getLocation"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //   success: function (res) {
  //     console.log(res)
  //   }
  // });
  get("wxshare/wxconfig/myapi.php?urlparam=" + encodeURIComponent(url))
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
            // Toast('签名成功');
          //if(ditu){
            //   //获取地理位置
            //   wx.getLocation({
            //     type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //     success: function (res) {
            //       let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            //       let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            //       var speed = res.speed; // 速度，以米/每秒计
            //       var accuracy = res.accuracy; // 位置精度
            //       geocoder.getAddress(new qq.maps.LatLng(latitude, longitude));
            //       wx.openLocation({
            //         latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
            //         longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
            //         name: '', // 位置名
            //         address: '', // 地址详情说明
            //         scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            //         infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            //       });
            //     },
            //   });
          //}
          function is_ios() {
            var u = navigator.userAgent;
            if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                return true;
            } else {
                return false;
        　  }
          }
          let urls = '';
          if(['/goodsdetails', '/business', '/help/helpDetail', '/news/newsdetail', '/storeDetails'].includes(to.path)){
            //   console.log('我是5个不跳转')
            if(is_ios()){
                urls = sessionStorage.getItem('ios_share_url');
                urls = urls.indexOf('?') > -1 ? urls+'&state='+userinfo.referee_number : urls+'?state='+userinfo.referee_number;
              }else{
                urls = 'http://' + location.host + to.fullPath;
                urls = urls.indexOf('?') > -1 ? urls+'&state='+userinfo.referee_number : urls+'?state='+userinfo.referee_number;
            }
          }else{
            //   console.log('我是跳转/')
            if(is_ios()){
                urls = sessionStorage.getItem('ios_share_url');
                urls = urls.indexOf('?') > -1 ? urls+'&state='+userinfo.referee_number : urls+'?state='+userinfo.referee_number;
              }else{
                urls = 'http://' + location.host;
                urls = urls.indexOf('?') > -1 ? urls+'&state='+userinfo.referee_number : urls+'?state='+userinfo.referee_number;
            }
          }
        //   console.log(urls);
          //  好友
            let titles = '';
            for(let item of address){
                if(item.domain==location.host){
                    titles = item.title;
                }
            }
            // if(location.host == )
            wx.updateAppMessageShareData({
              title: goods?goods.title:titles,
              desc: goods?goods.desc:titles+'!Come on.!',
              link: urls,
              imgUrl: goods?goods.imgUrl:'http://test.gj.wjeys.com/public/up/test_gj_wjeys_com-2-2-20200414144028-14_106_130_90-628585.jpg',
              success:  () => {//设置成功
                // console.log(url + '?' + 'state=' + userinfo.referee_number,'我是分享地址')
                // console.log(urls,'我是分享地址')
                // console.log("分享成功");
                let msg = {
                  method: 'add.sign.share.item',
                };
                post('/api/v1/userSign', msg)
                    .then((res) => {
                        // console.log(res);
                    }).catch(function (error) {
                    console.log(error);
                });

              },
              cancel: function () {
                console.log("取消分享");
              }
            });
          //朋友圈
            wx.updateTimelineShareData({
              title: goods?goods.title:titles,//朋友圈没有描述
              link: urls,
              imgUrl: goods?goods.imgUrl:'http://test.gj.wjeys.com/public/up/test_gj_wjeys_com-2-2-20200414144028-14_106_130_90-628585.jpg',
              success:  () => {//设置成功
                //shareSuccessCallback();
              },
              cancel: function () {
                console.log("取消分享");
              }
            });
        })
        wx.error(function (res) {
          // Toast("微信验证失败");
        });
      }
    }).catch(function (error) {
    //   console.log(error);
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

