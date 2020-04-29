<template>
  <div class="ranav_app" id='rapNavig' :class="show?'isShow':''"
    @click="tapIsShow" v-show="isPageShow" @touchmove='aa'
        :style="{top:wz>-1?wz+'px':'70%'}">
      <div class="ranavText" :class="show?'':'ranavShow'">
          <van-icon  :name="!show?'arrow-left':'arrow'" />
          <span>{{show?'收起':'快速导航'}}</span>
            <div class="navList">
                <div class="list" v-for="(item,i) of list" :key="i" @click="taptz(item.path)">
                    <div class="iconImg">
                        <img :style="{left:item.icon+'%'}" class="img" src="../../../assets/img/nav_icon.png">
                    </div>
                    <span style="font-size:0.12rem;margin-top:0.02rem">{{item.title}}</span>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            list:[
                {title:'首页',icon:-135,path:'/'},
                {title:'分类',icon:0,path:'/classification'},
                {title:'附近商家',icon:-260,path:'/business'},
                {title:'购物车',icon:-380,path:'/my_cart'},
                {title:'我的',icon:-515,path:'/mine'}
            ],
            show:false,   //打开关闭
            isPageShow:false,  //显示隐藏
            wz:-1,   //移动高度
            maxgd:0,   //最大高度
            pathList:[
                '/','/classification','/business','/my_cart','/mine','/author'
            ]
        }
    },
    created(){
        this.maxgd = document.documentElement.clientHeight || document.body.clientHeight;
        let {path} = this.$route;
        if(this.pathList.indexOf(path)>-1){
            this.isPageShow = false
        }else this.isPageShow = true;
    },
    methods:{
        tapIsShow(){
            this.show = !this.show;
        },
        taptz(path){
            this.$router.push({path});
        },
        aa(e){
            let maxgd = this.maxgd;
            let clientY = e.targetTouches[0].clientY;
            clientY=clientY<0?0:clientY
            this.wz = clientY>maxgd-40?maxgd-40:clientY
        }
    },
    watch:{
        $route(to,from){
            this.show = false;
            let {path} = to;
            if(this.pathList.indexOf(path)>-1){
                this.isPageShow = false;
            }else this.isPageShow = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.ranav_app{
    width:50px;
    height: 40px;
    position: fixed;
    left: calc(100vw - 50px);
    z-index: 10001;
    .ranavText{
        width: 50px;
        height: 40px;
        display: flex;
        background: rgba(0,0,0,0.7);
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        color:#fff;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 75%;
        left: calc(100vw - 250px);
        .navList{
            width: 200px;
            padding:0.1rem 0;
            background-color: #fff;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            position: absolute;
            right: -200px;
            display: flex;
            flex-wrap: wrap;
            .list{
                width: 33.33333%;
                height: 100%;
                padding:0;
                padding-top:0.1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #333;
                .iconImg{
                    width: 21px;
                    height: 21px;
                    overflow: hidden;
                    position: relative;
                    .img{
                        width: 600%;
                        max-width: initial;
                        height: auto;
                        position: absolute;
                        bottom: 0;
                    }
                }
            }
        }
    }
    .ranavShow{
        top: 0;
        left: 0;
    }
}
.isShow{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    top: 0 !important;;
    left: 0;
}
</style>
