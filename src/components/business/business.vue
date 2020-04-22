<template>
    <div class="main_box main_height">
        <header ref="header_h">
            <div style="width: 100%;margin:0 0.1rem">
                <search :dmsg="true"></search>
            </div>
        </header>

        <div class="main_div">
            <div class="left">
                <div
                    class="left_li"
                    v-for="(item,index) in leftlists"
                    :key="index"
                    :class="num==index?'active':''"
                    @click="getNum(index,item.children)">
                    <span>{{item.text}}</span>
                </div>
            </div>

            <div class="right">
                <div v-show="isUlliTwo&&navChildren.length>0" class="left_ul">
                    <div
                        class="left_ul_li"
                        v-for="(item1,index1) in navChildren"
                        :key="index1"
                        @click.stop="isUlliTwoAdd(item1.id)"
                    >{{item1.cate_name}}</div>
                </div>
                <div class="right_ul">
                    <div :style="'height:'+isvalist*0.925+'rem'" class="right_ul_cer" v-show='isUlliTwo&&navChildren.length>0'></div>
                    <van-list
                    v-model="loading"
                    :finished="finished"
                    offset="50"
                    finished-text="没有更多了"
                    @load="getDataTwo"
                    >
                    <div class="right_li" v-for="(item,index) in cpylist" :key="index">
                        <div class="right_route" @click="tapRoute({path:'/business/storemsg',query:{id: item.id}})">
                            <div class="imgDiv">
                                <van-image width="100%" height="100%" :src="item.imgurl"/>
                            </div>
                            <div class="right_por">
                                <div class="right_msg">
                                    <div class="p1">
                                        <div class="p1_span">{{item.name}}</div>
                                        <div v-if="item.is_promotion == 1" class="quality">品质商家</div>
                                    </div>
                                    <div style="margin: 0.02rem 0;" class="address">
                                        地址：{{item.address}}
                                    </div>
                                    <div class="address">
                                        <span>电话：</span>
                                        <span>{{item.mobile}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </van-list>
                </div>
            </div>
        </div>

        <router-link  to="/mine/nearby">
            <div class="iconDiv">
                <img src="../../assets/img/fjsj.png" alt />
                <div>商家入驻</div>
            </div>
        </router-link>
    </div>
</template>

<script>
import Header from "../header/header";
import Search from "../search/search";
import clientWw from "../../assets/js/conmon";
import Bus from "../../assets/js/bus";
export default {
    name: "business",
    components: { Search, Header },
    data() {
        return {
            msg: "附近商家",
            height: "1rem",
            num: sessionStorage.getItem('businessNum')?sessionStorage.getItem('businessNum'):0,
            isUlliTwo: true,
            isUlliTwoHeight: 1,
            leftlists: [],   //一级导航列表
            navChildren: [],  //二级导航列表
            cpylist: [],    //商家列表
            listNum: 0,
            keywords: '',
            loading:false,
            finished:false,
            page:0,  //数据条数
            isvalist:11,
            navigation:false,   //导航id


        };
    },
    methods: {
        //选择一级导航列表时
        getNum(index, children) {
            this.listNum = index
            this.num = index;
            this.navChildren = children;
            this.isUlliTwoHeight = index;
            this.isUlliTwo = true;
            if(!index){
                sessionStorage.removeItem('businessNum');
                sessionStorage.removeItem('businessNumId');
                this.finished = false;
                this.page = 0;
                this.navigation = false;
                this.cpylist=[];
                this.getDataTwo();
            }
        },

        //转换数据格式
        navPush(list) {
            for (var i in list) {
                this.leftlists.push({
                    id: list[i].id,
                    text: list[i].cate_name,
                    children: list[i].sub
                });
            }
            this.leftlists.unshift({
                id: 0,
                text: "全部",
                children: []
            });
        },

        //获取导航列表
        getData() {
            let ad_data = {
                method: "get.user.strre.category.list"
            };
            this.$post("/api/v1/UserStoreCategory", ad_data)
            .then(res => {
                // console.log(res);
                this.navPush(res.data);
            })
            .catch(function(error) {
                console.log(error,1);
            });
        },

        //获取商家列表
        getDataTwo() {
            let {page,navigation,keywords,cpylist,latitude,longitude} = this;
            let ad_data = {
                method: "get.user.store.list",
                cate_id: 0,
                page,
                page_size: 10,
                // latitude,
                // longitude
            };
            if(navigation) ad_data.cate_id = navigation?navigation:0;
            if(keywords) ad_data.keywords = keywords;
            this.loading = true;
            this.$post("/api/v1/userStore", ad_data)
                .then(res => {
                    // console.log(res)
                    this.loading = false;
                    let {data} = res;
                    if(!data||data.length<=0) this.finished = true;  //数据全部加载完成
                    else{
                        this.cpylist = this.cpylist.concat(data)
                        this.page = page+data.length;
                        cpylist = cpylist.concat(data)
                    }
                    if(cpylist.length<10){
                        this.finished = true;  //数据全部加载完成
                        this.isvalist = 11;
                    }else{
                        this.isvalist = cpylist.length+1;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        //点击二级导航列表时
        isUlliTwoAdd(id) {
            // console.log(id)
            sessionStorage.setItem('businessNumId',id);
            sessionStorage.setItem("businessNum",this.num);
            this.finished = false;
            this.isUlliTwo = false;
            this.navigation = id;
            this.page = 0;
            this.cpylist = [];
            this.getDataTwo();
        },

        //跳转到商家详情
        tapRoute(obj){
            this.$router.push(obj);
        }
    },
    created() {
        // console.log(this.num)
        this.getData();
        if(sessionStorage.getItem("businessNum")){
            let id = sessionStorage.getItem('businessNumId');
            this.isUlliTwoAdd(id);
        }else{
            Bus.$on('searchD', (data) => {
                this.finished = false;
                this.page = 0;
                this.navigation = false;
                this.cpylist=[];
                this.keywords = data;
                this.getDataTwo();
            });
        }

    },
    // mounted() {
        // let clientW = clientWw.clientWw();
        // let h =
        //     window.innerHeight ||
        //     document.documentElement.clientHeight ||
        //     document.body.clientHeight; //浏览器高度
        // let topH = this.$refs.header_h.offsetHeight;
        // this.height = (h - topH - (70 * clientW) / 100) / clientW + "rem";
    // }
};
</script>

<style lang="scss" scoped>
.main_height {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100%;
    header {
        display: flex;
        align-items: center;
        padding: 0.1rem 0;
        border-bottom: 1px solid #f2f2f2;
    }
    .main_div {
        width: 100%;
        height: 100%;
        padding-bottom: 1.2rem;
        background-color: rgb(242, 242, 242);
        display: flex;
        .left {
            width: 1rem;
            height: 100%;
            background-color: #fff;
            overflow-y: auto;
            .left_li {
                height: 0.51rem;
                border-bottom: 1px solid #f2f2f2;
                text-align: center;
                line-height: 0.51rem;
            }
            .left_li:active{
                opacity: 0.8;
            }
            .active {
                color: #090;
                background-color: #f2f2f2;
                border-left: 3px solid #090;
            }
        }
        .right {
            height: 100%;
            flex: 1;
            position: relative;
            .left_ul {
                width: 1rem;
                border-left: 1px solid #f2f2f2;
                background-color: #fff;
                position: absolute;
                top: 0;
                left: 0;
                overflow-y: auto;
                z-index: 10001;
                .left_ul_li {
                    height: 0.51rem;
                    border-bottom: 1px solid #f2f2f2;
                    line-height: 0.51rem;
                    color: #000;
                }
                .left_ul_li:active{
                    opacity: 0.8;
                    color: #090;
                }
            }
            .right_ul{
                width: 100%;
                height: 100%;
                padding: 0.05rem 0.05rem;
                padding-bottom: 0;
                overflow-y: auto;
                position: relative;
                .right_ul_cer{
                    position: absolute;
                    z-index: 20;
                    width: 100%;
                    background-color: rgba(0,0,0,0.2);;
                }
                .right_li {
                    width: 100%;
                    background-color: #fff;
                    padding: 0.05rem;
                    margin-bottom: 0.05rem;
                    text-align: left;
                    .right_route {
                        width: 100%;
                        display: flex;
                        .imgDiv{
                            width: 0.78rem;
                            height: 0.78rem;
                        }
                        .right_por{
                            flex: 1;
                            margin-left: 0.05rem;
                            position: relative;
                            .right_msg {
                                width: 100%;
                                margin-top: 0.13rem;
                                position: absolute;
                                .p1 {
                                    color: #000 !important;
                                    font-size: 0.14rem;
                                    display: flex;
                                    align-items: center;
                                    .p1_span {
                                        width: 50%;
                                        flex: 1;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                    }
                                    .quality {
                                        margin-left: 5px;
                                        line-height: 0.18rem;
                                        background-color: #009900;
                                        border-radius: 0.18rem;
                                        padding: 0 5px;
                                        color: #fff;
                                        font-size: 0.10rem;
                                    }
                                }

                                .address {
                                    width: 1.6rem;
                                    color: #999;
                                    font-size: 0.12rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }

                                .long {
                                    text-align: right;
                                    color: #009900;
                                    font-size: 0.12rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .iconDiv{
    position: fixed;
    bottom: 0.8rem;
    right: 0.15rem;
    >img{
      border-radius: 50%;
      box-shadow: 0px 0px 10px 5px rgba(36, 35, 35, 0.3);
      width: 0.45rem;
      height: 0.45rem;
      background-color: #fff;
    }
    >div{
      margin: 0.05rem 0;
      color: #fff;
      border-radius: 10px;
      padding: 0 0.05rem;
      background-color: $sss-color;
      box-shadow: 0px 0px 10px 5px rgba(36, 35, 35, 0.3);
    }

  }
}
</style>
