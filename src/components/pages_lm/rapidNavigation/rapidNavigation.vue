<template>
  <div class="ranav_app" id='rapNavig' :class="show?'isShow':''"
    @click="tapIsShow" v-show="isPageShow" @touchmove='aa'
        :style="{top:wz>-1?wz+'px':'70%'}">
      <div class="ranavText" :class="show?'':'ranavShow'">
          <van-icon  :name="!show?'arrow-left':'arrow'" />
          <span>{{show?'收起':'快速导航'}}</span>
            <div class="navList">
                <div class="list" v-for="(item,i) of list" :key="i" @click="taptz(item.path)">
                    <van-icon size="20" :name="item.icon" />
                    <span style="font-size:0.12rem;">{{item.title}}</span>
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
                {title:'首页',icon:'wap-home-o',path:'/'},
                {title:'分类',icon:'apps-o',path:'/classification'},
                {title:'附件商家',icon:'location-o',path:'/business'},
                {title:'购物车',icon:'shopping-cart-o',path:'/my_cart'},
                {title:'我的',icon:'user-o',path:'/mine'}
            ],
            show:false,   //打开关闭
            isPageShow:false,  //显示隐藏
            wz:-1,   //移动高度
            maxgd:0,   //最大高度
        }
    },
    created(){
        this.maxgd = document.documentElement.clientHeight || document.body.clientHeight;
        let {path} = this.$route;
        if(path==='/'||path==='/classification'||path==='/business'||path==='/my_cart'||path==='/mine'){
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
            if(path==='/'||path==='/classification'||path==='/business'||path==='/my_cart'||path==='/mine'){
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
    // top: 80%;
    z-index: 10001;
    // transition: all 0.5s;
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
        left: calc(100vw - 230px);
        // transition: all 0.5s;
        .navList{
            width: 180px;
            padding:0.1rem 0;
            background-color: #fff;
            border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
            position: absolute;
            // top: 0;
            right: -180px;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;
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
