import {get} from '../../api/https'
import wx from 'weixin-js-sdk'
import store from "../../store";

const wechatAuth = async function (authUrl, shareConfig) {
    let url = encodeURIComponent(window.location.href.split('#')[0])
    get("wxshare/wxconfig/myapi.php?urlparam=" + url, authUrl)
      .then((response) => {

        if (response.data && response.status === 200) {
          let authRes = response.data;
          wx.config({
            debug: false,
            appId: authRes.appId,
            timestamp: authRes.timestamp,
            nonceStr: authRes.nonceStr,
            signature: authRes.signature,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
          });
        }
      }).catch(function (error) {
      console.log(error);
    });
    wx.ready(() => {
      wx.updateAppMessageShareData({
        title: shareConfig.title,
        desc: shareConfig.desc,
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: function () {//设置成功
          console.log(123)
          //shareSuccessCallback();
        },

      });
      wx.updateTimelineShareData({
        title: shareConfig.title,
        desc: shareConfig.desc,
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: function () {//设置成功
          //shareSuccessCallback();
        }
      });

    })
    // if (authRes && authRes.code == 101) {
    //   wx.config({
    //     //debug: true,
    //     appId: authRes.data.appId,
    //     timestamp: authRes.data.timestamp,
    //     nonceStr: authRes.data.nonceStr,
    //     signature: authRes.data.signature,
    //     jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage", "onMenuShareTimeline"]
    //   });
    //
    //   wx.ready(() => {
    //     wx.updateAppMessageShareData({
    //       title: shareConfig.title,
    //       desc: shareConfig.desc,
    //       link: shareConfig.link,
    //       imgUrl: shareConfig.imgUrl,
    //       success: function () {//设置成功
    //         //shareSuccessCallback();
    //       }
    //     });
    //     wx.updateTimelineShareData({
    //       title: shareConfig.title,
    //       link: shareConfig.link,
    //       imgUrl: shareConfig.imgUrl,
    //       success: function () {//设置成功
    //         //shareSuccessCallback();
    //       }
    //     });
    //
    //   });
    // }
  }
;

export default wechatAuth;

// function shareSuccessCallback() {
//   if (!store.state.user.uid) {
//     return false;
//   }
//   store.state.cs.stream({
//     eid: "share",
//     tpc: "all",
//     data: {
//       uid: store.state.user.uid,
//       truename: store.state.user.truename || ""
//     }
//   });
//   http.get("/pfront/member/share_score", {
//     params: {
//       uid: store.state.user.uid
//     }
//   });
// }
