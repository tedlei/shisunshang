import {get} from '../../api/https'
import store from "../../store";

const wechatAuth = async function (authUrl, shareConfig) {
    let authRes = '';
    get('/wxshare/wxconfig/myapi.php', authUrl)
      .then((response) => {
        if (response.data && response.status === 200) {
          let authRes = response.data
          wx.config({
            //debug: true,
            appId: authRes.data.appId,
            timestamp: authRes.data.timestamp,
            nonceStr: authRes.data.nonceStr,
            signature: authRes.data.signature,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
          });

          wx.ready(() => {
            wx.updateAppMessageShareData({
              title: shareConfig.title,
              desc: shareConfig.desc,
              link: shareConfig.link,
              imgUrl: shareConfig.imgUrl,
              success: function () {//设置成功
                //shareSuccessCallback();
              }
            });
          })
        }
      }).catch(function (error) {
      console.log(error);
    });

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
