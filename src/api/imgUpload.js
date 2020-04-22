import {post, patch, put} from './https'

export default function OSS ( imgList ) {
    return new Promise((resolve, reject) => {
        post('/api/v1/uploads', {method: 'get.qiniu.upload.token'})
        .then((res) => {
            // console.log(res)
            let token = res.data.token;
            let domain = res.data.domain;
            let upimgs = [];
            let num = 0;
            for(let i in imgList){
                if(imgList[i].file){
                num+=1;
                const qiniu = require('qiniu-js');
                let postfix = imgList[i].file.name.substring(imgList[i].file.name.lastIndexOf('.'), imgList[i].file.name.length);
                let name = new Date().getTime() + Math.ceil(Math.random()*100)+postfix;
                const putExtra = {
                    fname: imgList[i].file.name,
                    params: {},
                    mimeType: ["image/png", "image/jpeg", "image/jpg"]
                }
                const config = {
                    useCdnDomain: true
                }
                let observable = qiniu.upload(imgList[i].file, name, token, putExtra, config);
                observable.subscribe({
                    next: (result) => {
                    },
                    error: (errResult) => {
                      console.log(errResult)
                    },
                    complete: (result) => {
                    //   console.log(result)
                      let add = domain+result.key;
                      upimgs.push(add);
                    //   if(upimgs.length == imgList.length){
                      if(upimgs.length == num){
                        resolve(upimgs);
                      }
                    }
                })

                }
            }
        }).catch(function (error) {
            reject({data:false})
            // console.log(error);
        });
    })
}
